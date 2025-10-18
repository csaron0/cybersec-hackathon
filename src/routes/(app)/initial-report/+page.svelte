<script lang="ts">
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

	// Mock questions organized in rows for a more compact layout
	let questionRows: Question[][] = [
		// Row 1: Discovery basics
		[
			{
				id: 'discovery_time',
				title: 'When discovered?',
				type: 'datetime-local',
				required: true,
				answer: '',
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
				answer: '',
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
				answer: '',
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
				answer: '',
				width: 'third'
			},
			{
				id: 'ransom_amount',
				title: 'Ransom amount',
				type: 'text',
				required: false,
				answer: '',
				width: 'third'
			},
			{
				id: 'payment_method',
				title: 'Payment method',
				type: 'select',
				required: false,
				options: ['Bitcoin', 'Cryptocurrency', 'Bank transfer', 'Other', 'Unknown'],
				answer: '',
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
				answer: [],
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
				answer: '',
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
				answer: '',
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
				answer: '',
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
				answer: '',
				width: 'full'
			}
		]
	];

	// Flatten for easier processing
	let questions: Question[] = questionRows.flat();

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
	<title>Ransomware Incident Report - BoboLink</title>
</svelte:head>

<!-- Header -->
<div class="mb-6">
	<div class="mb-4 flex items-center">
		<div class="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-error/20">
			<svg class="h-5 w-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
				></path>
			</svg>
		</div>
		<div>
			<h1 class="text-2xl font-bold">Ransomware Incident Report</h1>
			<p class="text-sm text-base-content/70">Complete this form to initiate incident response</p>
		</div>
	</div>
</div>

<!-- Form -->
<form on:submit|preventDefault={handleSubmit} class="space-y-4">
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
					class="card border border-base-300 bg-base-200 shadow-xl {question.width === 'full'
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

							{#if question.type === 'text'}
								<input
									id={question.id}
									type="text"
									bind:value={question.answer}
									required={question.required}
									class="input-bordered input input-sm w-full"
									placeholder="Enter value..."
								/>
							{:else if question.type === 'textarea'}
								<textarea
									id={question.id}
									bind:value={question.answer}
									required={question.required}
									rows="3"
									class="textarea-bordered textarea w-full textarea-sm"
									placeholder="Provide details..."
								></textarea>
							{:else if question.type === 'select'}
								<select
									id={question.id}
									bind:value={question.answer}
									required={question.required}
									class="select-bordered select w-full select-sm"
								>
									<option value="">Select...</option>
									{#each question.options || [] as option}
										<option value={option}>{option}</option>
									{/each}
								</select>
							{:else if question.type === 'radio'}
								<div class="flex w-full flex-wrap gap-3">
									{#each question.options || [] as option}
										<label class="label cursor-pointer p-0">
											<input
												type="radio"
												name={question.id}
												value={option}
												bind:group={question.answer}
												required={question.required}
												class="radio mr-2 radio-sm radio-primary"
											/>
											<span class="label-text text-sm">{option}</span>
										</label>
									{/each}
								</div>
							{:else if question.type === 'checkbox'}
								<div class="flex w-full flex-wrap gap-3">
									{#each question.options || [] as option}
										<label class="label cursor-pointer p-0">
											<input
												type="checkbox"
												checked={Array.isArray(question.answer) && question.answer.includes(option)}
												on:change={(e) =>
													handleCheckboxChange(question.id, option, e.currentTarget.checked)}
												class="checkbox ml-2 checkbox-sm checkbox-primary"
											/>
											<span class="label-text text-sm">{option}</span>
										</label>
									{/each}
								</div>
							{:else if question.type === 'date'}
								<input
									id={question.id}
									type="date"
									bind:value={question.answer}
									required={question.required}
									class="input-bordered input input-sm w-full"
								/>
							{:else if question.type === 'datetime-local'}
								<input
									id={question.id}
									type="datetime-local"
									bind:value={question.answer}
									required={question.required}
									class="input-bordered input input-sm w-full"
								/>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/each}

	<!-- Submit section -->
	<div class="rounded-lg border border-base-300 bg-base-200 p-6 shadow-xl">
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
