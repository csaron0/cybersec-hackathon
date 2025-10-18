<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import DocxEditor from '$lib/components/DocxEditor.svelte';
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

	// Mock incident data
	let incident = {
		id: '',
		title: 'Loading...',
		status: 'Open',
		priority: 'High',
		assignee: 'Jane Smith',
		created: new Date(),
		description: 'Loading incident details...'
	};

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
				status: 'Critical',
				priority: 'Critical',
				assignee: 'Security Team Alpha',
				created: new Date('2024-10-17T09:30:00'),
				description:
					'Multiple workstations in the finance department have been encrypted. Ransom note found on affected systems.'
			},
			'2': {
				id: '2',
				title: 'Phishing Campaign - HR Department',
				status: 'Investigating',
				priority: 'High',
				assignee: 'Jane Smith',
				created: new Date('2024-10-17T11:15:00'),
				description:
					'Employees reported suspicious emails claiming to be from HR with malicious attachments.'
			},
			'3': {
				id: '3',
				title: 'Data Breach - Customer Database',
				status: 'Contained',
				priority: 'Critical',
				assignee: 'Security Team Beta',
				created: new Date('2024-10-17T14:20:00'),
				description: 'Unauthorized access detected to customer database. Investigation ongoing.'
			}
		};

		incident = incidents[incidentId as keyof typeof incidents] || {
			id: incidentId,
			title: `Incident #${incidentId}`,
			status: 'Open',
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
- **Status**: ${incident.status}
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

	function getStatusClass(status: string): string {
		switch (status.toLowerCase()) {
			case 'critical':
				return 'badge-error';
			case 'high':
				return 'badge-warning';
			case 'investigating':
				return 'badge-info';
			case 'contained':
				return 'badge-success';
			case 'open':
				return 'badge-primary';
			default:
				return 'badge-ghost';
		}
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
			<div class="mt-2 flex items-center gap-4">
				<span class="badge {getStatusClass(incident.status)}">{incident.status}</span>
				<span class="text-sm text-base-content/70">#{incident.id}</span>
				<span class="text-sm text-base-content/70"
					>Created: {incident.created.toLocaleDateString()}</span
				>
			</div>
		</div>
		<div class="text-right">
			<div class="text-sm text-base-content/70">Assigned to</div>
			<div class="font-medium">{incident.assignee}</div>
		</div>
	</div>
</div>

<!-- Main Content Grid -->
<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
				<DocxEditor
					content={documentContent}
					placeholder="Start documenting the incident response..."
					onUpdate={handleDocumentChange}
					incidentData={incident}
				/>
			</div>
		</div>
	</div>

	<!-- Chat Panel -->
	<div class="lg:col-span-1">
		<div class="card h-full bg-base-100 shadow-xl">
			<div class="card-header">
				<div class="flex items-center justify-between border-b border-base-300 p-4">
					<h2 class="text-lg font-semibold">Team Chat</h2>
					<div class="flex items-center gap-2">
						<span class="badge badge-sm badge-primary">{chatMessages.length}</span>
						<div class="badge badge-sm badge-success">
							<div class="h-2 w-2 animate-pulse rounded-full bg-success"></div>
							<span class="ml-1">Live</span>
						</div>
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
