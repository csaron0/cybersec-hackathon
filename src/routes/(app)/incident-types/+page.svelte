<script lang="ts">
	import { goto } from '$app/navigation';

	// Types
	interface PersonnelAssignment {
		id: string;
		name: string;
		role: string;
		department: string;
		email: string;
		phone: string;
		alertLevel: 'immediate' | 'urgent' | 'standard';
	}

	interface FormField {
		id: string;
		title: string;
		description: string;
		type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'datetime-local';
		required: boolean;
		options?: string[];
	}

	interface IncidentType {
		id: string;
		name: string;
		description: string;
		severity: 'Critical' | 'High' | 'Medium' | 'Low';
		icon: string;
		color: string;
		formFields: FormField[];
		draftTemplate: string;
		personnel: PersonnelAssignment[];
		autoAlerts: boolean;
		slaHours: number;
		created: Date;
		lastModified: Date;
	}

	// State
	let incidentTypes: IncidentType[] = [
		{
			id: '1',
			name: 'Ransomware Attack',
			description: 'Malicious encryption of systems and data with ransom demands',
			severity: 'Critical',
			icon: '🔒',
			color: 'error',
			formFields: [
				{
					id: 'discovery_method',
					title: 'How was the ransomware discovered?',
					description: 'Describe how you first became aware of the attack',
					type: 'select',
					required: true,
					options: [
						'User reported encrypted files',
						'Antivirus alert',
						'System monitoring',
						'Ransom note'
					]
				},
				{
					id: 'affected_systems',
					title: 'Which systems are affected?',
					description: 'List all compromised systems and devices',
					type: 'textarea',
					required: true
				}
			],
			draftTemplate: `# Ransomware Incident Response

## Executive Summary
[Brief overview of the ransomware attack]

## Incident Details
- **Discovery Time**: [When was it discovered]
- **Affected Systems**: [List of impacted systems]
- **Ransom Demand**: [Amount and payment method]

## Immediate Actions
- [ ] Isolate affected systems
- [ ] Preserve evidence
- [ ] Notify stakeholders
- [ ] Assess backup integrity

## Communication Plan
[Stakeholder notification strategy]`,
			personnel: [
				{
					id: '1',
					name: 'Mike Johnson',
					role: 'Security Team Lead',
					department: 'IT Security',
					email: 'mike.johnson@bobolink.com',
					phone: '+1-555-0101',
					alertLevel: 'immediate'
				},
				{
					id: '2',
					name: 'Sarah Wilson',
					role: 'IT Director',
					department: 'Information Technology',
					email: 'sarah.wilson@bobolink.com',
					phone: '+1-555-0102',
					alertLevel: 'immediate'
				}
			],
			autoAlerts: true,
			slaHours: 2,
			created: new Date('2024-10-15'),
			lastModified: new Date('2024-10-17')
		},
		{
			id: '2',
			name: 'Data Breach',
			description: 'Unauthorized access to sensitive or confidential data',
			severity: 'Critical',
			icon: '🛡️',
			color: 'error',
			formFields: [
				{
					id: 'breach_type',
					title: 'Type of data breach',
					description: 'What type of data was potentially compromised',
					type: 'checkbox',
					required: true,
					options: [
						'Customer data',
						'Employee records',
						'Financial data',
						'Healthcare records',
						'Other'
					]
				}
			],
			draftTemplate: `# Data Breach Incident Response

## Incident Overview
[Description of the breach]

## Data Assessment
- **Type of Data**: [What data was accessed]
- **Number of Records**: [Estimated volume]
- **Data Sensitivity**: [Classification level]

## Legal and Compliance
- [ ] Notify legal team
- [ ] Review regulatory requirements
- [ ] Prepare breach notifications`,
			personnel: [
				{
					id: '3',
					name: 'Legal Team',
					role: 'Legal Counsel',
					department: 'Legal',
					email: 'legal@bobolink.com',
					phone: '+1-555-0200',
					alertLevel: 'immediate'
				}
			],
			autoAlerts: true,
			slaHours: 1,
			created: new Date('2024-10-10'),
			lastModified: new Date('2024-10-16')
		}
	];

	let showCreateModal = false;
	let editingType: IncidentType | null = null;
	let activeTab = 'overview';

	// Form state for creating/editing
	let formData = {
		name: '',
		description: '',
		severity: 'Medium' as 'Critical' | 'High' | 'Medium' | 'Low',
		icon: '⚠️',
		color: 'warning',
		autoAlerts: true,
		slaHours: 4
	};

	function openCreateModal() {
		editingType = null;
		formData = {
			name: '',
			description: '',
			severity: 'Medium',
			icon: '⚠️',
			color: 'warning',
			autoAlerts: true,
			slaHours: 4
		};
		showCreateModal = true;
	}

	function editIncidentType(type: IncidentType) {
		editingType = type;
		formData = {
			name: type.name,
			description: type.description,
			severity: type.severity,
			icon: type.icon,
			color: type.color,
			autoAlerts: type.autoAlerts,
			slaHours: type.slaHours
		};
		showCreateModal = true;
	}

	function saveIncidentType() {
		if (editingType) {
			// Update existing
			const index = incidentTypes.findIndex((t) => t.id === editingType!.id);
			incidentTypes[index] = {
				...editingType,
				...formData,
				lastModified: new Date()
			};
		} else {
			// Create new
			const newType: IncidentType = {
				id: Date.now().toString(),
				...formData,
				formFields: [],
				draftTemplate: `# ${formData.name} Incident Response\n\n## Overview\n[Incident description]\n\n## Response Actions\n- [ ] Initial assessment\n- [ ] Containment measures\n- [ ] Investigation\n- [ ] Recovery planning`,
				personnel: [],
				created: new Date(),
				lastModified: new Date()
			};
			incidentTypes = [...incidentTypes, newType];
		}
		showCreateModal = false;
		editingType = null;
	}

	function deleteIncidentType(id: string) {
		if (confirm('Are you sure you want to delete this incident type?')) {
			incidentTypes = incidentTypes.filter((t) => t.id !== id);
		}
	}

	function getSeverityClass(severity: string): string {
		switch (severity) {
			case 'Critical':
				return 'badge-error';
			case 'High':
				return 'badge-warning';
			case 'Medium':
				return 'badge-info';
			case 'Low':
				return 'badge-success';
			default:
				return 'badge-neutral';
		}
	}

	function navigateToFormBuilder(typeId: string) {
		goto(`/incident-types/${typeId}/form-builder`);
	}

	function navigateToTemplateEditor(typeId: string) {
		goto(`/incident-types/${typeId}/template-editor`);
	}

	function navigateToPersonnelManager(typeId: string) {
		goto(`/incident-types/${typeId}/personnel`);
	}
</script>

<svelte:head>
	<title>Incident Type Management - BoboLink</title>
</svelte:head>

<!-- Header -->
<div class="mb-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold">Incident Type Management</h1>
			<p class="mt-2 text-base-content/70">
				Configure incident types, forms, templates, and personnel assignments for rapid crisis
				response
			</p>
		</div>
		<button class="btn btn-primary" on:click={openCreateModal}>
			<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				></path>
			</svg>
			Create New Type
		</button>
	</div>
</div>

<!-- Stats Overview -->
<div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
	<div class="stat rounded-lg bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
		<div class="stat-title">Total Types</div>
		<div class="stat-value text-primary">{incidentTypes.length}</div>
		<div class="stat-desc">Configured incident types</div>
	</div>
	<div class="stat rounded-lg bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
		<div class="stat-title">Critical Types</div>
		<div class="stat-value text-error">
			{incidentTypes.filter((t) => t.severity === 'Critical').length}
		</div>
		<div class="stat-desc">High-priority incidents</div>
	</div>
	<div class="stat rounded-lg bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
		<div class="stat-title">Auto-Alerts</div>
		<div class="stat-value text-success">{incidentTypes.filter((t) => t.autoAlerts).length}</div>
		<div class="stat-desc">With automatic notifications</div>
	</div>
	<div class="stat rounded-lg bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
		<div class="stat-title">Avg SLA</div>
		<div class="stat-value text-info">
			{Math.round(incidentTypes.reduce((sum, t) => sum + t.slaHours, 0) / incidentTypes.length)}h
		</div>
		<div class="stat-desc">Response time target</div>
	</div>
</div>

<!-- Main Content -->
<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
	<!-- Incident Types List -->
	<div class="lg:col-span-2">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-header">
				<div class="flex items-center justify-between border-b border-base-300 p-4">
					<h2 class="text-xl font-semibold">Incident Types</h2>
					<div class="badge badge-neutral">{incidentTypes.length} types</div>
				</div>
			</div>
			<div class="card-body p-0">
				<div class="space-y-4 p-4">
					{#each incidentTypes as type}
						<div class="card bg-base-100 shadow-lg transition-shadow hover:shadow-xl">
							<div class="card-body">
								<div class="mb-4 flex items-start justify-between">
									<div class="flex items-center gap-3">
										<div class="text-2xl">{type.icon}</div>
										<div>
											<h3 class="text-lg font-bold">{type.name}</h3>
											<p class="text-sm text-base-content/70">{type.description}</p>
										</div>
									</div>
									<div class="flex items-center gap-2">
										<span class="badge {getSeverityClass(type.severity)}">{type.severity}</span>
										<div class="dropdown dropdown-end">
											<div tabindex="0" role="button" class="btn btn-ghost btn-sm">
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
													></path>
												</svg>
											</div>
											<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
											<ul
												tabindex="0"
												class="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
											>
												<li><button on:click={() => editIncidentType(type)}>Edit Type</button></li>
												<li>
													<button on:click={() => navigateToFormBuilder(type.id)}
														>Form Builder</button
													>
												</li>
												<li>
													<button on:click={() => navigateToTemplateEditor(type.id)}
														>Template Editor</button
													>
												</li>
												<li>
													<button on:click={() => navigateToPersonnelManager(type.id)}
														>Personnel Manager</button
													>
												</li>
												<li class="divider"></li>
												<li>
													<button class="text-error" on:click={() => deleteIncidentType(type.id)}
														>Delete</button
													>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
									<div>
										<span class="font-medium">Form Fields:</span>
										<div class="text-base-content/70">{type.formFields.length} fields</div>
									</div>
									<div>
										<span class="font-medium">Personnel:</span>
										<div class="text-base-content/70">{type.personnel.length} assigned</div>
									</div>
									<div>
										<span class="font-medium">SLA:</span>
										<div class="text-base-content/70">{type.slaHours}h response</div>
									</div>
									<div>
										<span class="font-medium">Auto-Alerts:</span>
										<div class="text-base-content/70">
											{#if type.autoAlerts}
												<span class="badge badge-xs badge-success">Enabled</span>
											{:else}
												<span class="badge badge-xs badge-error">Disabled</span>
											{/if}
										</div>
									</div>
								</div>

								<div class="mt-4 flex gap-2">
									<button
										class="btn border-none bg-base-200 shadow-md transition-shadow btn-sm hover:shadow-lg"
										on:click={() => navigateToFormBuilder(type.id)}
									>
										📝 Form Builder
									</button>
									<button
										class="btn border-none bg-base-200 shadow-md transition-shadow btn-sm hover:shadow-lg"
										on:click={() => navigateToTemplateEditor(type.id)}
									>
										📄 Template Editor
									</button>
									<button
										class="btn border-none bg-base-200 shadow-md transition-shadow btn-sm hover:shadow-lg"
										on:click={() => navigateToPersonnelManager(type.id)}
									>
										👥 Personnel Manager
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Quick Setup Guide -->
	<div class="lg:col-span-1">
		<div class="card bg-base-100 shadow-xl">
			<div class="card-header">
				<div class="border-b border-base-300 p-4">
					<h2 class="text-xl font-semibold">Quick Setup Guide</h2>
				</div>
			</div>
			<div class="card-body">
				<div class="space-y-4">
					<div class="alert alert-info">
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							></path>
						</svg>
						<div>
							<h3 class="font-bold">Getting Started</h3>
							<div class="text-xs">Follow these steps to set up incident types</div>
						</div>
					</div>

					<div class="steps steps-vertical">
						<div class="step step-primary">
							<div class="step-content">
								<h4 class="font-semibold">Create Incident Type</h4>
								<p class="text-sm text-base-content/70">Define the basic incident category</p>
							</div>
						</div>
						<div class="step">
							<div class="step-content">
								<h4 class="font-semibold">Build Report Form</h4>
								<p class="text-sm text-base-content/70">Design custom intake questions</p>
							</div>
						</div>
						<div class="step">
							<div class="step-content">
								<h4 class="font-semibold">Create Draft Template</h4>
								<p class="text-sm text-base-content/70">Prepare response document template</p>
							</div>
						</div>
						<div class="step">
							<div class="step-content">
								<h4 class="font-semibold">Assign Personnel</h4>
								<p class="text-sm text-base-content/70">Configure automatic notifications</p>
							</div>
						</div>
					</div>

					<div class="card bg-base-200/50 shadow-md">
						<div class="card-body p-4">
							<h4 class="mb-2 font-semibold">Features Overview</h4>
							<ul class="space-y-1 text-sm">
								<li>• Modular form builder for intake</li>
								<li>• Template editor for responses</li>
								<li>• Personnel assignment system</li>
								<li>• Automatic alert configuration</li>
								<li>• SLA time tracking</li>
								<li>• Department-based routing</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Create/Edit Modal -->
{#if showCreateModal}
	<div class="modal-open modal">
		<div class="modal-box w-11/12 max-w-2xl">
			<h3 class="mb-4 text-lg font-bold">
				{editingType ? 'Edit' : 'Create'} Incident Type
			</h3>

			<form on:submit|preventDefault={saveIncidentType} class="space-y-4">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="form-control">
						<label class="label" for="name">
							<span class="label-text">Name *</span>
						</label>
						<input
							id="name"
							type="text"
							bind:value={formData.name}
							class="input-bordered input"
							required
							placeholder="e.g., Data Breach"
						/>
					</div>

					<div class="form-control">
						<label class="label" for="severity">
							<span class="label-text">Severity *</span>
						</label>
						<select id="severity" bind:value={formData.severity} class="select-bordered select">
							<option value="Critical">Critical</option>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
					</div>
				</div>

				<div class="form-control">
					<label class="label" for="description">
						<span class="label-text">Description *</span>
					</label>
					<textarea
						id="description"
						bind:value={formData.description}
						class="textarea-bordered textarea h-24"
						required
						placeholder="Describe this type of incident..."
					></textarea>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div class="form-control">
						<label class="label" for="icon">
							<span class="label-text">Icon</span>
						</label>
						<input
							id="icon"
							type="text"
							bind:value={formData.icon}
							class="input-bordered input"
							placeholder="🔒"
						/>
					</div>

					<div class="form-control">
						<label class="label" for="sla">
							<span class="label-text">SLA Hours</span>
						</label>
						<input
							id="sla"
							type="number"
							bind:value={formData.slaHours}
							class="input-bordered input"
							min="1"
						/>
					</div>

					<div class="form-control">
						<!-- svelte-ignore a11y_label_has_associated_control -->
						<label class="label">
							<span class="label-text">Auto-Alerts</span>
						</label>
						<input
							type="checkbox"
							bind:checked={formData.autoAlerts}
							class="toggle mt-2 toggle-primary"
						/>
					</div>
				</div>

				<div class="modal-action">
					<button type="button" class="btn" on:click={() => (showCreateModal = false)}>
						Cancel
					</button>
					<button type="submit" class="btn btn-primary">
						{editingType ? 'Update' : 'Create'} Type
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
