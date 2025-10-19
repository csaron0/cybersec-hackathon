<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DocxEditor from '$lib/components/DocxEditor.svelte';
	import IncidentWorkflow from '$lib/components/IncidentWorkflow.svelte';
	import {
		getIncidentById,
		getStatusName,
		getInitialReportData,
		type Question
	} from '$lib/stores/incidents';
	// Types
	interface ChatMessage {
		id: string;
		user: string;
		message: string;
		timestamp: Date;
		avatar?: string;
	}

	// Component state
	let incidentId: string;
	let chatMessages: ChatMessage[] = [];
	let newMessage = '';
	let documentContent = '';
	let chatContainer: HTMLElement;
	let isTyping = false;
	let typingUsers: string[] = [];
	let currentUser = 'John Doe'; // This would come from auth in real app
	let activeTab = 'documentation'; // New tab state
	let workflowComponent: IncidentWorkflow; // Reference to workflow component

	// Mock incident data - will be loaded from store
	let incident = {
		id: '',
		title: 'Loading...',
		statusIndex: 0,
		priority: 'Medium',
		assignee: 'Unassigned',
		created: new Date(),
		description: 'Loading incident details...'
	};

	// Initial report data - will be loaded from store
	let questionRows: Question[][] = [];

	// Simulated WebSocket connection for real-time features
	let ws: WebSocket | null = null;
	let reconnectInterval: number;

	onMount(() => {
		// Authentication check
		const email = localStorage.getItem('email');
		if (!email) {
			goto('/login');
			return;
		}

		incidentId = $page.params.id || 'unknown';
		loadIncidentData();
		initializeWebSocket();
		loadInitialData();
	});

	onDestroy(() => {});

	function loadIncidentData() {
		// Load incident data from centralized store
		const foundIncident = getIncidentById(incidentId);

		incident = foundIncident || {
			id: incidentId,
			title: `Incident #${incidentId}`,
			statusIndex: 0, // Incident Opened
			priority: 'Medium',
			assignee: 'Unassigned',
			created: new Date(),
			description: 'Incident details are being loaded...'
		};

		// Load initial report data from centralized store
		const initialReportData = getInitialReportData(incidentId);
		questionRows = initialReportData || [];
	}

	function loadInitialData() {
		// Load initial chat messages
		chatMessages = [
			{
				id: '1',
				user: 'Maritime Security Team',
				message:
					'Malware detected in TOS and PCS systems. Immediate containment initiated. Coordinating with port operations for manual procedures.',
				timestamp: new Date(Date.now() - 3600000), // 1 hour ago
				avatar: '⚓'
			},
			{
				id: '2',
				user: 'Communications Manager',
				message:
					'Preparing multilingual statements in Dutch, English, and German. Press briefing scheduled for 14:00. Customer notifications being coordinated.',
				timestamp: new Date(Date.now() - 3000000) // 50 minutes ago
			},
			{
				id: '3',
				user: 'Port Operations Chief',
				message:
					'23 container ships and 8 bulk carriers currently affected. Switched to manual cargo processing. Estimated 4-6 hour delays. Economic impact assessment ongoing.',
				timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
				avatar: '🚢'
			},
			{
				id: '4',
				user: 'IT Security',
				message:
					'Wiper malware confirmed. Lateral movement contained to operational systems. Critical infrastructure protected. Forensic analysis in progress.',
				timestamp: new Date(Date.now() - 900000), // 15 minutes ago
				avatar: '🛡️'
			}
		];

		// Load initial document content with markdown formatting
		documentContent = `# Incident Response Report - Port of Rotterdam Malware Disruption

## Incident Overview
- **ID**: ${incident.id}
- **Status**: ${workflowComponent?.getStatusName(incident.statusIndex) || 'Investigation & Analysis'}
- **Priority**: ${incident.priority}
- **Assigned to**: ${incident.assignee}
- **Created**: ${incident.created.toLocaleString()}
- **Location**: Port of Rotterdam, Netherlands
- **Incident Type**: Critical Infrastructure Malware Attack

## Description
${incident.description}

## Impact Assessment
- **Operational Impact**: 75% reduction in container throughput
- **Economic Impact**: €15M per day estimated losses
- **Vessels Affected**: 31 ships awaiting berth assignments
- **Systems Compromised**: TOS, PCS, VTMS, Cargo Handling Equipment
- **International Impact**: Supply chain disruptions across Netherlands, Germany, Belgium

## Multilingual Communication Status
- **Dutch**: Press release prepared, customer notifications sent
- **English**: International shipping line communications active
- **German**: Coordination with German logistics partners ongoing
- **Press Conference**: Scheduled for 14:00 CET (multilingual)

## Timeline of Events
- [x] **06:45 CET**: Malware detected by monitoring systems
- [x] **07:15 CET**: Critical systems isolation initiated
- [x] **07:45 CET**: Manual procedures activated
- [x] **08:30 CET**: Stakeholder notifications begun
- [x] **09:00 CET**: Media response team activated
- [x] **10:30 CET**: International coordination established
- [ ] **14:00 CET**: Press conference scheduled
- [ ] **EOD**: Full system assessment completion target

## Technical Analysis
### Malware Characteristics
- **Type**: Wiper malware with lateral movement capabilities
- **Vector**: Email attachment (under investigation)
- **Scope**: Operational technology (OT) systems primarily affected
- **Containment**: Critical infrastructure protected, manual operations in effect

### Systems Status
- **Terminal Operating System (TOS)**: Offline - manual processing active
- **Port Community System (PCS)**: Degraded - critical functions manual
- **Vessel Traffic Management (VTMS)**: Backup systems operational
- **Cargo Handling Equipment**: 12 cranes offline, manual operations

### Indicators of Compromise (IOCs)
\`\`\`
File Hash: 7b42b35f2f5e8c9a1d3f2e4b6c8d9a0e1f2b3c4d
IP Address: 185.220.101.42 (suspected C&C)
Domain: logistics-update[.]nl (typosquatting)
Process: ContainerUpdate.exe (malicious payload)
\`\`\`

## Stakeholder Communications
### Internal
- Port Authority executive team briefed
- Operations teams coordinating manual procedures
- IT security conducting forensic analysis

### External
- Shipping lines notified of delays and alternate procedures
- Customs authorities coordinated for expedited processing
- Government agencies (Ministry of Infrastructure) informed
- EU partners alerted for supply chain contingencies

## Response Actions Taken
- [x] Isolated operational technology systems
- [x] Activated manual cargo processing procedures
- [x] Initiated multilingual stakeholder communications
- [x] Coordinated with national cybersecurity authorities
- [x] Preserved forensic evidence
- [ ] Complete malware analysis
- [ ] System restoration and testing
- [ ] Post-incident review and policy updates

## Recovery Strategy
1. **Immediate**: Maintain manual operations while systems are restored
2. **Short-term**: Selective system restoration with enhanced monitoring
3. **Long-term**: Infrastructure hardening and resilience improvements

---
*Document updated: ${new Date().toLocaleString()} CET*
*Next update scheduled: ${new Date(Date.now() + 3600000).toLocaleString()} CET*
`;

		scrollToBottom();
	}

	function initializeWebSocket() {
		// In a real app, this would connect to your WebSocket server
		// For demo purposes, we'll simulate WebSocket behavior

		// Simulate receiving messages
		setInterval(() => {
			if (Math.random() > 0.95) {
				// 5% chance every second
				simulateIncomingMessage();
			}
		}, 1000);
	}

	function simulateIncomingMessage() {
		const users = ['Sarah Wilson', 'Mike Johnson', 'Alex Chen', 'Lisa Park'];
		const messages = [
			'Status update: containment is holding.',
			'Found additional IOCs in the logs.',
			'Coordinating with legal team on notification requirements.',
			'Updated the timeline with new findings.',
			'All affected users have been notified.',
			'Forensic image completed for server-01.',
			'Network traffic analysis shows no data exfiltration.',
			'Malware sample uploaded to threat intelligence platform.'
		];

		const randomUser = users[Math.floor(Math.random() * users.length)];
		const randomMessage = messages[Math.floor(Math.random() * messages.length)];

		if (randomUser !== currentUser) {
			const newMsg: ChatMessage = {
				id: Date.now().toString(),
				user: randomUser,
				message: randomMessage,
				timestamp: new Date(),
				avatar: ['👩‍🔬', '👨‍🔧', '👨‍💻', '👩‍💼'][Math.floor(Math.random() * 4)]
			};

			chatMessages = [...chatMessages, newMsg];
			scrollToBottom();
		}
	}

	function sendMessage() {
		if (!newMessage.trim()) return;

		const message: ChatMessage = {
			id: Date.now().toString(),
			user: currentUser,
			message: newMessage.trim(),
			timestamp: new Date(),
			avatar: '👤'
		};

		chatMessages = [...chatMessages, message];
		newMessage = '';
		scrollToBottom();

		// In a real app, you would send this to your WebSocket server
		// ws?.send(JSON.stringify({ type: 'chat_message', data: message }));
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 100);
	}

	function handleDocumentChange(content: string) {
		// In a real app, you would debounce this and send changes to the server
		documentContent = content;
		isTyping = true;
		setTimeout(() => {
			isTyping = false;
		}, 1000);
	}

	function formatTimestamp(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();

		if (diff < 60000) return 'Just now';
		if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
		if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
		return date.toLocaleDateString();
	}
</script>

<svelte:head>
	<title>Incident #{incidentId} - BoboLink</title>
</svelte:head>

<!-- Header -->
<div class="mb-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">{incident.title}</h1>
		</div>
		<div class="text-right">
			<div class="text-sm text-base-content/70">Assigned to</div>
			<div class="font-medium">{incident.assignee}</div>
		</div>
	</div>
</div>

<!-- Workflow Component -->
<div class="mb-6">
	<IncidentWorkflow bind:this={workflowComponent} currentStageIndex={incident.statusIndex} />
</div>

<!-- Tab Navigation -->
<div class="mb-6">
	<div class="tabs-bordered tabs">
		<button
			class="tab-lg tab {activeTab === 'documentation' ? 'tab-active' : ''}"
			on:click={() => (activeTab = 'documentation')}
		>
			📋 Incident Documentation
		</button>
		<button
			class="tab-lg tab {activeTab === 'initial-report' ? 'tab-active' : ''}"
			on:click={() => (activeTab = 'initial-report')}
		>
			📝 Initial Report
		</button>
	</div>
</div>

<!-- Main Content Grid -->
<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
	{#if activeTab === 'documentation'}
		<!-- Document Editor - Takes up 2 columns on large screens -->
		<div class="lg:col-span-2">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-header">
					<div class="flex items-center justify-between border-b border-base-300 p-4">
						<h2 class="text-lg font-semibold">Incident Documentation</h2>
						<div class="flex items-center gap-2">
							{#if isTyping}
								<span class="loading loading-sm loading-dots"></span>
								<span class="text-xs text-base-content/60">Someone is typing...</span>
							{/if}
							<div class="badge badge-sm badge-success">
								<svg class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Auto-saved
							</div>
						</div>
					</div>
				</div>
				<div class="card-body p-0">
					<DocxEditor />
				</div>
			</div>
		</div>
	{:else if activeTab === 'initial-report'}
		<!-- Initial Report View - Takes up 2 columns on large screens -->
		<div class="lg:col-span-2">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-header">
					<div class="flex items-center justify-between border-b border-base-300 p-4">
						<h2 class="text-lg font-semibold">Initial Incident Report</h2>
						<div class="flex items-center gap-2">
							<div class="badge badge-sm badge-info">Read-only</div>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="space-y-4">
						{#each questionRows as row, rowIndex}
							<div
								class="grid gap-4 {row.length === 1
									? 'grid-cols-1'
									: row.length === 2
										? 'grid-cols-1 md:grid-cols-2'
										: 'grid-cols-1 md:grid-cols-3'}"
							>
								{#each row as question}
									<div
										class="card border border-base-300 bg-base-200 shadow-md {question.width ===
										'full'
											? 'md:col-span-full'
											: question.width === 'half'
												? 'md:col-span-1'
												: 'md:col-span-1'}"
									>
										<div class="card-body p-4">
											<div class="form-control">
												<!-- svelte-ignore a11y_label_has_associated_control -->
												<label class="label mb-3">
													<span class="label-text font-medium">
														{question.title}
														{#if question.required}
															<span class="text-error">*</span>
														{/if}
													</span>
												</label>
												{#if question.description}
													<p class="mb-2 text-sm text-base-content/60">{question.description}</p>
												{/if}

												{#if question.type === 'text' || question.type === 'date' || question.type === 'datetime-local'}
													<div
														class="input-bordered input input-sm flex w-full items-center bg-base-100"
													>
														{#if question.type === 'datetime-local'}
															{#if typeof question.answer === 'string' && question.answer}
																{new Date(question.answer).toLocaleString()}
															{:else}
																<span class="text-sm text-base-content/60">Invalid date</span>
															{/if}
														{:else if Array.isArray(question.answer)}
															{question.answer.join(', ')}
														{:else}
															{question.answer}
														{/if}
													</div>
												{:else if question.type === 'textarea'}
													<div
														class="textarea-bordered textarea min-h-20 w-full bg-base-100 textarea-sm whitespace-pre-line"
													>
														{question.answer}
													</div>
												{:else if question.type === 'select'}
													<div
														class="select-bordered select flex w-full items-center bg-base-100 select-sm"
													>
														{question.answer}
													</div>
												{:else if question.type === 'radio'}
													<div class="rounded bg-base-100 p-3">
														<span class="text-sm font-medium">{question.answer}</span>
													</div>
												{:else if question.type === 'checkbox'}
													<div class="rounded bg-base-100 p-3">
														<div class="space-y-2">
															{#each Array.isArray(question.answer) ? question.answer : [] as selectedOption}
																<div class="flex items-center gap-2">
																	<span class="badge badge-sm badge-primary">✓</span>
																	<span class="text-sm">{selectedOption}</span>
																</div>
															{/each}
														</div>
													</div>
												{/if}
											</div>
										</div>
									</div>
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Chat Panel -->
	<div class="lg:col-span-1">
		<div class="card h-full bg-base-100 shadow-xl">
			<div class="card-header">
				<div class="flex items-center justify-between border-b border-base-300 p-4">
					<h2 class="text-lg font-semibold">Team Chat</h2>
					<div class="flex items-center gap-2">
						<span class="badge badge-sm badge-primary">{chatMessages.length}</span>
					</div>
				</div>
			</div>

			<!-- Chat Messages -->
			<div bind:this={chatContainer} class="h-80 flex-1 space-y-4 overflow-y-auto p-4">
				{#each chatMessages as message (message.id)}
					<div class="chat {message.user === currentUser ? 'chat-end' : 'chat-start'}">
						<div class="avatar chat-image">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs text-primary-content"
							>
								{message.avatar || message.user.charAt(0)}
							</div>
						</div>
						<div class="chat-header text-xs opacity-70">
							{message.user}
							<time class="ml-1">{formatTimestamp(message.timestamp)}</time>
						</div>
						<div class="chat-bubble {message.user === currentUser ? 'chat-bubble-primary' : ''}">
							{message.message}
						</div>
					</div>
				{/each}

				{#if typingUsers.length > 0}
					<div class="chat-start chat">
						<div class="avatar chat-image">
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-base-300">
								<span class="loading loading-xs loading-dots"></span>
							</div>
						</div>
						<div class="chat-bubble bg-base-200 text-base-content">
							<span class="loading loading-sm loading-dots"></span>
						</div>
					</div>
				{/if}
			</div>

			<!-- Chat Input -->
			<div class="card-actions border-t border-base-300 p-4">
				<div class="flex w-full gap-2">
					<textarea
						bind:value={newMessage}
						on:keypress={handleKeyPress}
						class="textarea-bordered textarea h-12 flex-1 resize-none"
						placeholder="Type a message... (Enter to send)"
						rows="1"
					></textarea>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="btn btn-square btn-primary"
						on:click={sendMessage}
						disabled={!newMessage.trim()}
					>
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Bottom Actions -->
<div class="mt-6 flex justify-between">
	<button class="btn btn-ghost" on:click={() => history.back()}>
		<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 19l-7-7m0 0l7-7m7 7h18"
			/>
		</svg>
		Back
	</button>

	<div class="flex gap-2">
		<button class="btn btn-outline" on:click={() => {}}>
			<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			Export Report
		</button>
		<button class="btn btn-outline">
			<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
				/>
			</svg>
			Share
		</button>
		<button class="btn btn-primary">
			<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
				/>
			</svg>
			Update Status
		</button>
	</div>
</div>
