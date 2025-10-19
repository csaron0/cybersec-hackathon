<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getAllIncidentTypes } from '$lib/stores/incidentTypes';
	import { getActiveIncidentsWithStatus } from '$lib/stores/incidents';
	import IncidentClockWidget from '$lib/components/IncidentClockWidget.svelte';

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

	// Get incident types from centralized store
	const incidentTypes = getAllIncidentTypes();

	// Get active incidents for clock display
	const activeIncidents = getActiveIncidentsWithStatus().slice(0, 3); // Show top 3 most recent

	function handleIncidentTypeClick(incidentType: string) {
		// Navigate to initial report page with incident type as query parameter
		goto(`/initial-report?type=${incidentType}`);
	}

	function handleActiveIncidentClick(incidentId: string) {
		goto(`/incident/${incidentId}`);
	}
</script>

<svelte:head>
	<title>BoboLink Security Dashboard</title>
</svelte:head>

<!-- Header -->
<div class="mb-8">
	<h1 class="text-3xl font-bold">Welcome back, {user.name}</h1>
	<p class="mt-2 text-base-content/70">Last login: {user.lastLogin}</p>
</div>

<!-- Active Incidents with Clocks -->
{#if activeIncidents.length > 0}
	<div class="mb-8">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-2xl font-bold">Active Incidents</h2>
			<a href="/incidents" class="btn btn-ghost btn-sm">
				View All
				<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</a>
		</div>

		<div class="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
			{#each activeIncidents as incident}
				<div
					class="cursor-pointer transition-transform hover:scale-[1.02]"
					on:click={() => handleActiveIncidentClick(incident.id)}
					on:keydown={(e) => e.key === 'Enter' && handleActiveIncidentClick(incident.id)}
					role="button"
					tabindex="0"
				>
					<IncidentClockWidget
						discoveryTime={incident.created}
						title="{incident.title.slice(0, 25)}{incident.title.length > 25 ? '...' : ''}"
						compact={true}
						criticalThresholdHours={24}
						warningThresholdHours={8}
					/>
				</div>
			{/each}
		</div>
	</div>
{/if}

<!-- Report New Incident Section -->
<div class="mb-8">
	<h2 class="mb-4 text-2xl font-bold">Report New Incident</h2>
	<p class="mb-6 text-base-content/70">
		Select the type of security incident you need to report. Click on any card to start the
		reporting process.
	</p>
</div>

<!-- Incident Type Cards -->
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#each incidentTypes as incident}
		<div
			class="card cursor-pointer bg-base-200 shadow-xl transition-shadow hover:shadow-2xl"
			on:click={() => handleIncidentTypeClick(incident.id)}
			on:keydown={(e) => e.key === 'Enter' && handleIncidentTypeClick(incident.id)}
			role="button"
			tabindex="0"
		>
			<div class="card-body">
				<!-- Urgency Badge -->
				<div class="mb-4 card-actions justify-end">
					<div class="badge {incident.urgencyClass}">{incident.urgency}</div>
				</div>

				<!-- Icon -->
				<div class="mb-4 flex justify-center">
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
						<svg
							class="h-8 w-8 text-primary-content"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d={incident.icon}
							/>
						</svg>
					</div>
				</div>

				<!-- Content -->
				<h3 class="mb-2 card-title justify-center text-center text-lg">{incident.title}</h3>
				<p class="mb-4 text-center text-sm leading-relaxed text-base-content/70">
					{incident.description}
				</p>

				<!-- Action -->
				<div class="card-actions justify-center">
					<button class="btn btn-sm btn-primary">
						Report Incident
						<svg class="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	{/each}
</div>
