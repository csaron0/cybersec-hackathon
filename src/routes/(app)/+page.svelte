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
