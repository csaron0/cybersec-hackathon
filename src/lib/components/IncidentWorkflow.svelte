<script lang="ts">
	export let currentStatus: string;
	export let incidentId: string;
	export let onStatusChange: (newStatus: string) => void;

	// Define the workflow stages
	const workflowStages = [
		{
			status: 'Drafting',
			description: 'Initial incident documentation and analysis',
			color: 'info',
			icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
			allowedRoles: ['Security Team', 'Analyst']
		},
		{
			status: 'Finalizing',
			description: 'Review and finalize incident details and response',
			color: 'warning',
			icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>`,
			allowedRoles: ['Security Lead', 'Incident Manager']
		},
		{
			status: 'Approval',
			description: 'Legal and PR review for press release approval',
			color: 'secondary',
			icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"></path></svg>`,
			allowedRoles: ['Legal Team', 'PR Manager', 'Compliance']
		},
		{
			status: 'Approved',
			description: 'Executive approval and ready for publication',
			color: 'success',
			icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
			allowedRoles: ['C-Suite', 'Executive Team']
		},
		{
			status: 'Closed',
			description: 'Case closed with evidence and documentation',
			color: 'neutral',
			icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`,
			allowedRoles: ['Security Team', 'Incident Manager']
		}
	];

	// Mock user role (in real app, this would come from auth)
	const currentUserRole = 'Security Team';

	function getCurrentStageIndex(): number {
		return workflowStages.findIndex((stage) => stage.status === currentStatus);
	}

	function canAdvanceToStage(stageIndex: number): boolean {
		const stage = workflowStages[stageIndex];
		const currentIndex = getCurrentStageIndex();

		// Can only advance to the next stage or stay in current stage
		if (stageIndex > currentIndex + 1 || stageIndex < currentIndex) {
			return false;
		}

		// Check if user has permission for this stage
		return stage.allowedRoles.includes(currentUserRole);
	}

	function handleStatusChange(newStatus: string) {
		const targetIndex = workflowStages.findIndex((stage) => stage.status === newStatus);
		if (canAdvanceToStage(targetIndex)) {
			onStatusChange(newStatus);
		}
	}

	function getStageClass(stage: any, index: number): string {
		const currentIndex = getCurrentStageIndex();

		if (index <= currentIndex) {
			return 'step step-primary';
		} else {
			return 'step';
		}
	}
</script>

<div class="card bg-base-100 shadow-lg">
	<div class="card-body">
		<h3 class="card-title text-lg">Incident Workflow</h3>

		<!-- Workflow Steps -->
		<div class="w-full overflow-x-auto">
			<ul class="steps steps-horizontal w-full min-w-max">
				{#each workflowStages as stage, index}
					<li class={getStageClass(stage, index)}>
						<div class="step-icon">
							{@html stage.icon}
						</div>
						<div class="step-content text-center">
							<div class="text-sm font-semibold">{stage.status}</div>
							{#if stage.status === currentStatus}
								<div class="mt-1 text-xs font-medium text-primary">← Current</div>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Action Buttons -->
		<div class="mt-4 card-actions justify-end">
			{#if getCurrentStageIndex() >= 0}
				{@const currentIndex = getCurrentStageIndex()}
				{@const nextStage = workflowStages[currentIndex + 1]}
				{@const canGoBack = currentIndex > 0 && canAdvanceToStage(currentIndex - 1)}
				{@const canAdvance = nextStage && canAdvanceToStage(currentIndex + 1)}

				{#if canGoBack}
					<button
						class="btn btn-outline btn-sm"
						on:click={() => handleStatusChange(workflowStages[currentIndex - 1].status)}
					>
						← Previous Stage
					</button>
				{/if}

				{#if canAdvance}
					<button
						class="btn btn-sm btn-primary"
						on:click={() => handleStatusChange(nextStage.status)}
					>
						Advance to {nextStage.status} →
					</button>
				{/if}

				{#if currentStatus === 'Approved'}
					<button class="btn btn-sm btn-success" on:click={() => handleStatusChange('Closed')}>
						Close Case 🔒
					</button>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style>
	.step-content {
		margin-top: 1rem;
		max-width: 120px;
	}

	.steps-horizontal .step::before {
		font-size: 1.3rem;
	}
</style>
