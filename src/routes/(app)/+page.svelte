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

	// Incident types with descriptions and icons
	const incidentTypes = [
		{
			id: 'ransomware',
			title: 'Ransomware Attack',
			description:
				'Report incidents involving file encryption, ransom demands, or suspected ransomware activity.',
			icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
			urgency: 'Critical',
			urgencyClass: 'badge-error'
		},
		{
			id: 'phishing',
			title: 'Phishing Attack',
			description:
				'Report suspicious emails, fake websites, or social engineering attempts targeting credentials.',
			icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
			urgency: 'High',
			urgencyClass: 'badge-warning'
		},
		{
			id: 'malware',
			title: 'Malware Infection',
			description:
				'Report suspected malware, viruses, trojans, or any malicious software on systems.',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
			urgency: 'High',
			urgencyClass: 'badge-warning'
		},
		{
			id: 'data-breach',
			title: 'Data Breach',
			description: 'Report unauthorized access, data theft, or exposure of sensitive information.',
			icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
			urgency: 'Critical',
			urgencyClass: 'badge-error'
		},
		{
			id: 'ddos',
			title: 'DDoS Attack',
			description:
				'Report distributed denial of service attacks or unusual traffic patterns affecting services.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			urgency: 'High',
			urgencyClass: 'badge-warning'
		},
		{
			id: 'insider-threat',
			title: 'Insider Threat',
			description:
				'Report suspicious activities by employees or other authorized users within the organization.',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			urgency: 'Medium',
			urgencyClass: 'badge-info'
		},
		{
			id: 'system-compromise',
			title: 'System Compromise',
			description: 'Report unauthorized access to systems, servers, or network infrastructure.',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
			urgency: 'Critical',
			urgencyClass: 'badge-error'
		},
		{
			id: 'suspicious-activity',
			title: 'Suspicious Activity',
			description:
				'Report any other suspicious behavior, unusual network activity, or potential security concerns.',
			icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
			urgency: 'Medium',
			urgencyClass: 'badge-info'
		}
	];

	function handleIncidentTypeClick(incidentType: string) {
		// Navigate to initial report page with incident type as query parameter
		goto(`/initial-report?type=${incidentType}`);
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

<!-- Tabbed Interface -->
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
			class="card cursor-pointer bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
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

<!-- Quick Actions -->
<div class="mt-12">
	<div class="card bg-base-200">
		<div class="card-body">
			<h3 class="mb-4 card-title">Quick Actions</h3>
			<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<button class="btn btn-outline">
					<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					View All Reports
				</button>
				<button class="btn btn-outline">
					<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
						/>
					</svg>
					Response Playbooks
				</button>
				<button class="btn btn-outline">
					<svg class="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					System Settings
				</button>
			</div>
		</div>
	</div>
</div>
