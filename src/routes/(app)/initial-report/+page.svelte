<script lang="ts">
	// Types for the form structure
	interface Question {
		id: string;
		title: string;
		description: string;
		type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'datetime-local';
		required: boolean;
		options?: string[];
		answer: string | string[];
	}

	// Mock questions for ransomware incident
	let questions: Question[] = [
		{
			id: 'incident_discovery',
			title: 'How was the ransomware incident discovered?',
			description: 'Describe how you first became aware of the ransomware attack.',
			type: 'select',
			required: true,
			options: [
				'User reported encrypted files',
				'Antivirus alert',
				'System performance issues',
				'Ransom note discovered',
				'IT monitoring systems',
				'Other'
			],
			answer: ''
		},
		{
			id: 'discovery_time',
			title: 'When was the incident first discovered?',
			description: 'Provide the date and time when the ransomware was first detected.',
			type: 'datetime-local',
			required: true,
			answer: ''
		},
		{
			id: 'affected_systems',
			title: 'Which systems are affected?',
			description:
				'List all systems, servers, or devices that appear to be compromised or encrypted.',
			type: 'textarea',
			required: true,
			answer: ''
		},
		{
			id: 'ransom_note',
			title: 'Was a ransom note found?',
			description: 'Indicate if attackers left any ransom demands or instructions.',
			type: 'radio',
			required: true,
			options: ['Yes', 'No', 'Unknown'],
			answer: ''
		},
		{
			id: 'ransom_details',
			title: 'Ransom note details',
			description:
				'If a ransom note was found, provide the content or key details (amount demanded, payment method, deadline, etc.).',
			type: 'textarea',
			required: false,
			answer: ''
		},
		{
			id: 'data_encrypted',
			title: 'What types of data appear to be encrypted?',
			description: 'Select all types of data that have been affected by the encryption.',
			type: 'checkbox',
			required: true,
			options: [
				'Documents and files',
				'Database files',
				'Email systems',
				'Backup files',
				'System files',
				'Customer data',
				'Financial records',
				'Other'
			],
			answer: []
		},
		{
			id: 'backup_status',
			title: 'What is the status of your backups?',
			description: 'Indicate the current state of your backup systems and data recovery options.',
			type: 'select',
			required: true,
			options: [
				'Backups available and verified clean',
				'Backups available but not verified',
				'Backups partially compromised',
				'Backups fully compromised',
				'No recent backups available',
				'Unknown'
			],
			answer: ''
		},
		{
			id: 'network_isolated',
			title: 'Have affected systems been isolated from the network?',
			description: 'Indicate if containment measures have been implemented.',
			type: 'radio',
			required: true,
			options: ['Yes, fully isolated', 'Partially isolated', 'No isolation yet', 'Unknown'],
			answer: ''
		},
		{
			id: 'business_impact',
			title: 'Current business impact',
			description: 'Describe how the incident is currently affecting business operations.',
			type: 'textarea',
			required: true,
			answer: ''
		},
		{
			id: 'initial_vector',
			title: 'Suspected attack vector',
			description: 'If known, how do you believe the attackers gained initial access?',
			type: 'select',
			required: false,
			options: [
				'Phishing email',
				'Malicious attachment',
				'Compromised credentials',
				'Remote desktop protocol (RDP)',
				'Vulnerable software/service',
				'USB/removable media',
				'Supply chain compromise',
				'Unknown',
				'Other'
			],
			answer: ''
		}
	];

	// Form submission state
	let isSubmitting = false;
	let submitMessage = '';

	// Handle form submission
	async function handleSubmit() {
		// Validate required fields
		const missingFields = questions.filter((q) => {
			if (!q.required) return false;
			if (q.type === 'checkbox') {
				return Array.isArray(q.answer) && q.answer.length === 0;
			}
			return !q.answer || q.answer === '';
		});

		if (missingFields.length > 0) {
			submitMessage = `Please fill in all required fields: ${missingFields.map((f) => f.title).join(', ')}`;
			return;
		}

		isSubmitting = true;
		submitMessage = '';

		try {
			// Mock API call - replace with actual endpoint
			await new Promise((resolve) => setTimeout(resolve, 2000));

			console.log('Submitting incident report:', {
				incidentType: 'ransomware',
				timestamp: new Date().toISOString(),
				responses: questions.reduce(
					(acc, q) => {
						acc[q.id] = q.answer;
						return acc;
					},
					{} as Record<string, any>
				)
			});

			submitMessage = 'Incident report submitted successfully!';

			// Reset form after successful submission
			setTimeout(() => {
				questions = questions.map((q) => ({
					...q,
					answer: q.type === 'checkbox' ? [] : ''
				}));
				submitMessage = '';
			}, 3000);
		} catch (error) {
			submitMessage = 'Error submitting report. Please try again.';
		} finally {
			isSubmitting = false;
		}
	}

	// Handle checkbox changes
	function handleCheckboxChange(questionId: string, option: string, checked: boolean) {
		questions = questions.map((q) => {
			if (q.id === questionId && Array.isArray(q.answer)) {
				if (checked) {
					return { ...q, answer: [...q.answer, option] };
				} else {
					return { ...q, answer: q.answer.filter((a) => a !== option) };
				}
			}
			return q;
		});
	}
</script>

<svelte:head>
	<title>Ransomware Incident Report</title>
</svelte:head>

<!-- Header -->
<div class="card mb-6 bg-base-100 shadow-xl">
	<div class="card-body">
		<div class="mb-4 flex items-center">
			<div class="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-error/20">
				<svg class="h-6 w-6 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
					></path>
				</svg>
			</div>
			<div>
				<h1 class="text-3xl font-bold">Ransomware Incident Report</h1>
				<p class="mt-1 text-base-content/70">
					Please provide detailed information about the ransomware incident
				</p>
			</div>
		</div>
		<div class="alert alert-error">
			<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
				<path
					fill-rule="evenodd"
					d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
			<div>
				<p>
					<strong>Important:</strong> This form helps collect critical information for incident response.
					Please be as detailed and accurate as possible.
				</p>
			</div>
		</div>
	</div>
</div>

<!-- Form -->
<form on:submit|preventDefault={handleSubmit} class="space-y-6">
	{#each questions as question, index}
		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<h3 class="card-title text-lg">
					{index + 1}. {question.title}
					{#if question.required}
						<span class="text-error">*</span>
					{/if}
				</h3>
				<p class="mb-4 text-base-content/70">{question.description}</p>

				<div class="form-control w-full">
					{#if question.type === 'text'}
						<input
							id={question.id}
							type="text"
							bind:value={question.answer}
							required={question.required}
							class="input-bordered input w-full"
							placeholder="Enter your answer..."
						/>
					{:else if question.type === 'textarea'}
						<textarea
							id={question.id}
							bind:value={question.answer}
							required={question.required}
							rows="4"
							class="textarea-bordered textarea w-full"
							placeholder="Provide detailed information..."
						></textarea>
					{:else if question.type === 'select'}
						<select
							id={question.id}
							bind:value={question.answer}
							required={question.required}
							class="select-bordered select w-full"
						>
							<option value="">Select an option...</option>
							{#each question.options || [] as option}
								<option value={option}>{option}</option>
							{/each}
						</select>
					{:else if question.type === 'radio'}
						<div class="space-y-3">
							{#each question.options || [] as option}
								<label class="label cursor-pointer justify-start">
									<input
										type="radio"
										name={question.id}
										value={option}
										bind:group={question.answer}
										required={question.required}
										class="radio ml-3 radio-primary"
									/>
									<span class="label-text">{option}</span>
								</label>
							{/each}
						</div>
					{:else if question.type === 'checkbox'}
						<div class="space-y-3">
							{#each question.options || [] as option}
								<label class="label cursor-pointer justify-start">
									<input
										type="checkbox"
										checked={Array.isArray(question.answer) && question.answer.includes(option)}
										on:change={(e) =>
											handleCheckboxChange(question.id, option, e.currentTarget.checked)}
										class="checkbox ml-3 checkbox-primary"
									/>
									<span class="label-text">{option}</span>
								</label>
							{/each}
						</div>
					{:else if question.type === 'date'}
						<input
							id={question.id}
							type="date"
							bind:value={question.answer}
							required={question.required}
							class="input-bordered input w-full"
						/>
					{:else if question.type === 'datetime-local'}
						<input
							id={question.id}
							type="datetime-local"
							bind:value={question.answer}
							required={question.required}
							class="input-bordered input w-full"
						/>
					{/if}
				</div>
			</div>
		</div>
	{/each}

	<!-- Submit section -->
	<div class="rounded-lg bg-base-100 p-6 shadow-sm">
		{#if submitMessage}
			<div
				class="mb-4 rounded-md p-4 {submitMessage.includes('Error')
					? 'border border-red-200 bg-red-50 text-red-700'
					: submitMessage.includes('fill in')
						? 'border border-yellow-200 bg-yellow-50 text-yellow-700'
						: 'border border-green-200 bg-green-50 text-green-700'}"
			>
				{submitMessage}
			</div>
		{/if}

		<button
			type="submit"
			disabled={isSubmitting}
			class="flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if isSubmitting}
				<svg
					class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				Submitting Report...
			{:else}
				Submit Incident Report
			{/if}
		</button>

		<p class="mt-3 text-center text-sm text-gray-500">
			All information will be securely stored and used only for incident response purposes.
		</p>
	</div>
</form>

<style>
	/* Custom scrollbar for textareas */
	textarea::-webkit-scrollbar {
		width: 8px;
	}

	textarea::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 4px;
	}

	textarea::-webkit-scrollbar-thumb {
		background: #c1c1c1;
		border-radius: 4px;
	}

	textarea::-webkit-scrollbar-thumb:hover {
		background: #a8a8a8;
	}
</style>
