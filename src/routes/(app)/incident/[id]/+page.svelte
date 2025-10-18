<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DocxEditor from '$lib/components/DocxEditor.svelte';
	import IncidentWorkflow from '$lib/components/IncidentWorkflow.svelte';
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

	// Types for the form structure
	interface Question {
		id: string;
		title: string;
		description?: string;
		type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'datetime-local';
		required: boolean;
		options?: string[];
		answer: string | string[];
		width?: 'full' | 'half' | 'third';
	}

	// Mock incident data
	let incident = {
		id: '',
		title: 'Loading...',
		statusIndex: 0, // Changed from status string to statusIndex number
		priority: 'High',
		assignee: 'Jane Smith',
		created: new Date(),
		description: 'Loading incident details...'
	};

	// Initial report data structure - populated with mock data
	let questionRows: Question[][] = [
		// Row 1: Discovery basics
		[
			{
				id: 'discovery_time',
				title: 'When discovered?',
				type: 'datetime-local',
				required: true,
				answer: '2024-10-17T09:30',
				width: 'half'
			},
			{
				id: 'incident_discovery',
				title: 'How discovered?',
				type: 'select',
				required: true,
				options: [
					'User report',
					'Antivirus alert',
					'Performance issues',
					'Ransom note',
					'Monitoring',
					'Other'
				],
				answer: 'User report',
				width: 'half'
			}
		],
		// Row 2: Systems and impact
		[
			{
				id: 'affected_systems',
				title: 'Affected systems',
				description: 'List compromised systems/devices',
				type: 'textarea',
				required: true,
				answer:
					'• Finance Department Workstations (10 machines)\n• File Server: FS-FINANCE-01\n• Database Server: DB-CUSTOMER-02\n• Backup System: BACKUP-SRV-01 (partially affected)',
				width: 'full'
			}
		],
		// Row 3: Ransom info
		[
			{
				id: 'ransom_note',
				title: 'Ransom note found?',
				type: 'radio',
				required: true,
				options: ['Yes', 'No', 'Unknown'],
				answer: 'Yes',
				width: 'third'
			},
			{
				id: 'ransom_amount',
				title: 'Ransom amount',
				type: 'text',
				required: false,
				answer: '5.2 Bitcoin (~$280,000)',
				width: 'third'
			},
			{
				id: 'payment_method',
				title: 'Payment method',
				type: 'select',
				required: false,
				options: ['Bitcoin', 'Cryptocurrency', 'Bank transfer', 'Other', 'Unknown'],
				answer: 'Bitcoin',
				width: 'third'
			}
		],
		// Row 4: Data and backups
		[
			{
				id: 'data_encrypted',
				title: 'Encrypted data types',
				type: 'checkbox',
				required: true,
				options: ['Documents', 'Databases', 'Email', 'Backups', 'System files', 'Customer data'],
				answer: ['Documents', 'Databases', 'Customer data'],
				width: 'half'
			},
			{
				id: 'backup_status',
				title: 'Backup status',
				type: 'select',
				required: true,
				options: [
					'Available & clean',
					'Available unverified',
					'Partially compromised',
					'Fully compromised',
					'No backups'
				],
				answer: 'Partially compromised',
				width: 'half'
			}
		],
		// Row 5: Response actions
		[
			{
				id: 'network_isolated',
				title: 'Systems isolated?',
				type: 'radio',
				required: true,
				options: ['Fully isolated', 'Partially isolated', 'No isolation', 'Unknown'],
				answer: 'Fully isolated',
				width: 'half'
			},
			{
				id: 'initial_vector',
				title: 'Suspected attack vector',
				type: 'select',
				required: false,
				options: [
					'Phishing',
					'Malicious attachment',
					'Compromised credentials',
					'RDP',
					'Vulnerable software',
					'Unknown'
				],
				answer: 'Phishing',
				width: 'half'
			}
		],
		// Row 6: Business impact
		[
			{
				id: 'business_impact',
				title: 'Business impact',
				description: 'How is this affecting operations?',
				type: 'textarea',
				required: true,
				answer:
					'Finance department operations completely halted. Unable to process payments, invoices, or access customer billing data. Estimated revenue impact: $50,000/day until systems restored.',
				width: 'full'
			}
		]
	];

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
		// Mock incident data based on ID
		const incidents = {
			'1': {
				id: '1',
				title: 'Ransomware Attack - Finance Department',
				statusIndex: 1, // Initial Triage & Technical Review
				priority: 'Critical',
				assignee: 'Security Team Alpha',
				created: new Date('2024-10-17T09:30:00'),
				description:
					'Multiple workstations in the finance department have been encrypted. Ransom note found on affected systems.'
			},
			'2': {
				id: '2',
				title: 'Phishing Campaign - HR Department',
				statusIndex: 3, // Communications Drafting
				priority: 'High',
				assignee: 'Jane Smith',
				created: new Date('2024-10-17T11:15:00'),
				description:
					'Employees reported suspicious emails claiming to be from HR with malicious attachments.'
			},
			'3': {
				id: '3',
				title: 'Data Breach - Customer Database',
				statusIndex: 2, // Legal & Regulatory Assessment
				priority: 'Critical',
				assignee: 'Security Team Beta',
				created: new Date('2024-10-17T14:20:00'),
				description: 'Unauthorized access detected to customer database. Investigation ongoing.'
			},
			'4': {
				id: '4',
				title: 'DDoS Attack - Web Services',
				statusIndex: 4, // Management Approval
				priority: 'High',
				assignee: 'Network Team',
				created: new Date('2024-10-18T07:45:00'),
				description: 'Large-scale distributed denial of service attack targeting our web services.'
			},
			'5': {
				id: '5',
				title: 'Insider Threat - Suspicious Activity',
				statusIndex: 7, // Post-Incident Review & Closure
				priority: 'Medium',
				assignee: 'Security Team Alpha',
				created: new Date('2024-10-18T10:20:00'),
				description: 'Investigation completed. No malicious activity found.'
			}
		};

		incident = incidents[incidentId as keyof typeof incidents] || {
			id: incidentId,
			title: `Incident #${incidentId}`,
			statusIndex: 0, // Incident Opened
			priority: 'Medium',
			assignee: 'Unassigned',
			created: new Date(),
			description: 'Incident details are being loaded...'
		};
	}

	function loadInitialData() {
		// Load initial chat messages
		chatMessages = [
			{
				id: '1',
				user: 'Jane Smith',
				message:
					"I've started investigating this incident. Initial findings suggest this is a targeted attack.",
				timestamp: new Date(Date.now() - 3600000), // 1 hour ago
				avatar: '👩‍💻'
			},
			{
				id: '2',
				user: 'Mike Johnson',
				message:
					"Confirmed. We've isolated the affected systems. No lateral movement detected yet.",
				timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
				avatar: '👨‍🔧'
			},
			{
				id: '3',
				user: 'Sarah Wilson',
				message:
					"I'm documenting all findings in the shared document. Please review and add your observations.",
				timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
				avatar: '👩‍🔬'
			}
		];

		// Load initial document content with markdown formatting
		documentContent = `# Incident Response Report - ${incident.title}

## Incident Overview
- **ID**: ${incident.id}
- **Status**: ${workflowComponent?.getStatusName(incident.statusIndex) || 'Loading...'}
- **Priority**: ${incident.priority}
- **Assigned to**: ${incident.assignee}
- **Created**: ${incident.created.toLocaleString()}

## Description
${incident.description}

## Timeline of Events
- [x] **${new Date().toLocaleString()}**: Incident reported and investigation initiated
- [x] **${new Date(Date.now() - 1800000).toLocaleString()}**: Initial assessment completed
- [x] **${new Date(Date.now() - 900000).toLocaleString()}**: Containment measures implemented
- [ ] Forensic analysis in progress

## Technical Analysis
> *Add your technical findings here...*

### Indicators of Compromise (IOCs)
\`\`\`
File Hash: d41d8cd98f00b204e9800998ecf8427e
IP Address: 192.168.1.100
Domain: malicious-domain.com
Process: suspicious_process.exe
\`\`\`

## Impact Assessment
*Document the impact and affected systems...*

## Response Actions Taken
- [x] Isolated affected systems
- [x] Preserved evidence
- [x] Initiated communication protocols
- [ ] Complete forensic analysis
- [ ] Update security policies
- [ ] Conduct team debrief

## Notes
*Use this section for any additional observations or notes...*

---

**Last updated:** ${new Date().toLocaleString()} by ${currentUser}`;

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
