<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		const email = localStorage.getItem('email');
		if (!email) {
			window.location.href = '/login';
		}
	});

	// Mock user data
	const user = {
		name: 'John Doe',
		lastLogin: new Date('2024-10-17T08:30:00').toLocaleDateString()
	};

	// Active incidents that can be accessed
	const activeIncidents = [
		{
			id: '1',
			title: 'Ransomware Attack - Finance Department',
			status: 'Critical',
			priority: 'Critical',
			assignee: 'Security Team Alpha',
			created: new Date('2024-10-17T09:30:00'),
			type: 'ransomware',
			description:
				'Suspicious encryption activity detected on multiple workstations in the finance department. Immediate containment measures are in effect.'
		},
		{
			id: '2',
			title: 'Phishing Campaign - HR Department',
			status: 'Investigating',
			priority: 'High',
			assignee: 'Jane Smith',
			created: new Date('2024-10-17T11:15:00'),
			type: 'phishing',
			description:
				'Multiple employees received suspicious emails claiming to be from HR requesting credential updates.'
		},
		{
			id: '3',
			title: 'Data Breach - Customer Database',
			status: 'Contained',
			priority: 'Critical',
			assignee: 'Security Team Beta',
			created: new Date('2024-10-17T14:20:00'),
			type: 'data-breach',
			description:
				'Unauthorized access detected to customer database. Access has been revoked and forensic analysis is underway.'
		},
		{
			id: '4',
			title: 'DDoS Attack - Web Services',
			status: 'Mitigating',
			priority: 'High',
			assignee: 'Network Team',
			created: new Date('2024-10-18T07:45:00'),
			type: 'ddos',
			description:
				'Large-scale distributed denial of service attack targeting our web services. Traffic filtering is active.'
		},
		{
			id: '5',
			title: 'Insider Threat - Suspicious Activity',
			status: 'Under Review',
			priority: 'Medium',
			assignee: 'Security Team Alpha',
			created: new Date('2024-10-18T10:20:00'),
			type: 'insider-threat',
			description:
				'Unusual data access patterns detected for employee ID 4521. Investigation in progress.'
		}
	];

	function handleActiveIncidentClick(incidentId: string) {
		goto(`/incident/${incidentId}`);
	}

	function getStatusClass(status: string): string {
		switch (status.toLowerCase()) {
			case 'critical':
				return 'badge-error';
			case 'investigating':
			case 'mitigating':
				return 'badge-warning';
			case 'contained':
			case 'resolved':
				return 'badge-success';
			case 'under review':
				return 'badge-info';
			default:
				return 'badge-neutral';
		}
	}

	function getPriorityClass(priority: string): string {
		switch (priority.toLowerCase()) {
			case 'critical':
				return 'badge-error';
			case 'high':
				return 'badge-warning';
			case 'medium':
				return 'badge-info';
			case 'low':
				return 'badge-success';
			default:
				return 'badge-neutral';
		}
	}

	function formatTimeAgo(date: Date): string {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const hours = Math.floor(diff / (1000 * 60 * 60));

		if (hours < 1) return 'Just now';
		if (hours === 1) return '1 hour ago';
		if (hours < 24) return `${hours} hours ago`;

		const days = Math.floor(hours / 24);
		if (days === 1) return '1 day ago';
		return `${days} days ago`;
	}

	// Filter options
	let statusFilter = 'all';
	let priorityFilter = 'all';
	let searchQuery = '';

	$: filteredIncidents = activeIncidents.filter((incident) => {
		const matchesStatus =
			statusFilter === 'all' || incident.status.toLowerCase() === statusFilter.toLowerCase();
		const matchesPriority =
			priorityFilter === 'all' || incident.priority.toLowerCase() === priorityFilter.toLowerCase();
		const matchesSearch =
			searchQuery === '' ||
			incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			incident.assignee.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesStatus && matchesPriority && matchesSearch;
	});
</script>

<svelte:head>
	<title>Active Incidents - BoboLink Security Dashboard</title>
</svelte:head>

<div class="container mx-auto p-6">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-base-content">Active Incidents</h1>
				<p class="mt-2 text-base-content/70">
					Monitor and manage all active security incidents. Click on any incident to join the
					response team.
				</p>
			</div>

			<!-- Quick Stats -->
			<div class="stats shadow">
				<div class="stat">
					<div class="stat-title">Total Active</div>
					<div class="stat-value text-primary">{activeIncidents.length}</div>
				</div>
				<div class="stat">
					<div class="stat-title">Critical</div>
					<div class="stat-value text-error">
						{activeIncidents.filter((i) => i.priority === 'Critical').length}
					</div>
				</div>
				<div class="stat">
					<div class="stat-title">High Priority</div>
					<div class="stat-value text-warning">
						{activeIncidents.filter((i) => i.priority === 'High').length}
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="card mb-6 bg-base-100 shadow-lg">
		<div class="card-body">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-4">
				<!-- Search -->
				<div class="form-control">
					<label class="label" for="search">
						<span class="label-text">Search incidents</span>
					</label>
					<input
						id="search"
						type="text"
						placeholder="Search by title, description, or assignee..."
						class="input-bordered input w-full"
						bind:value={searchQuery}
					/>
				</div>

				<!-- Status Filter -->
				<div class="form-control">
					<label class="label" for="status-filter">
						<span class="label-text">Status</span>
					</label>
					<select
						id="status-filter"
						class="select-bordered select w-full"
						bind:value={statusFilter}
					>
						<option value="all">All Statuses</option>
						<option value="critical">Critical</option>
						<option value="investigating">Investigating</option>
						<option value="contained">Contained</option>
						<option value="mitigating">Mitigating</option>
						<option value="under review">Under Review</option>
					</select>
				</div>

				<!-- Priority Filter -->
				<div class="form-control">
					<label class="label" for="priority-filter">
						<span class="label-text">Priority</span>
					</label>
					<select
						id="priority-filter"
						class="select-bordered select w-full"
						bind:value={priorityFilter}
					>
						<option value="all">All Priorities</option>
						<option value="critical">Critical</option>
						<option value="high">High</option>
						<option value="medium">Medium</option>
						<option value="low">Low</option>
					</select>
				</div>

				<!-- Actions -->
				<div class="form-control">
					<label class="label">
						<span class="label-text">Actions</span>
					</label>
					<button class="btn btn-primary" on:click={() => goto('/initial-report')}>
						<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4"
							/>
						</svg>
						Report New Incident
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Incidents List -->
	{#if filteredIncidents.length > 0}
		<div class="space-y-4">
			{#each filteredIncidents as incident}
				<div
					class="card cursor-pointer bg-base-100 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl"
					on:click={() => handleActiveIncidentClick(incident.id)}
					on:keydown={(e) => e.key === 'Enter' && handleActiveIncidentClick(incident.id)}
					role="button"
					tabindex="0"
				>
					<div class="card-body">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<div class="mb-3 flex flex-wrap items-center gap-3">
									<h3 class="card-title text-lg">{incident.title}</h3>
									<span class="badge {getStatusClass(incident.status)}">{incident.status}</span>
									<span class="badge {getPriorityClass(incident.priority)}"
										>{incident.priority}</span
									>
								</div>

								<p class="mb-3 leading-relaxed text-base-content/70">{incident.description}</p>

								<div class="flex flex-wrap items-center gap-4 text-sm text-base-content/60">
									<span class="flex items-center gap-1">
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
											/>
										</svg>
										#{incident.id}
									</span>
									<span class="flex items-center gap-1">
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
											/>
										</svg>
										{incident.assignee}
									</span>
									<span class="flex items-center gap-1">
										<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
										{formatTimeAgo(incident.created)}
									</span>
								</div>
							</div>

							<div class="flex items-center gap-2">
								<div class="tooltip" data-tip="Real-time chat available">
									<div class="badge badge-sm badge-success">
										<svg class="mr-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
											/>
										</svg>
										Live
									</div>
								</div>
								<svg
									class="h-5 w-5 text-base-content/50"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="card bg-base-100 py-12 text-center shadow-lg">
			<div class="card-body">
				<div class="mb-4">
					<svg
						class="mx-auto h-16 w-16 text-base-content/30"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="mb-2 text-lg font-semibold text-base-content/70">No Incidents Found</h3>
				<p class="text-base-content/50">
					{#if searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'}
						No incidents match your current filters. Try adjusting your search criteria.
					{:else}
						All incidents have been resolved or closed.
					{/if}
				</p>
				{#if searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'}
					<button
						class="btn mt-4 btn-outline"
						on:click={() => {
							searchQuery = '';
							statusFilter = 'all';
							priorityFilter = 'all';
						}}
					>
						Clear Filters
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>
