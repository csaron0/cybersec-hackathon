<script lang="ts">
	import {
		getWorkflowStages,
		getStatusName as getStatusNameFromStore
	} from '$lib/stores/incidents';

	export let currentStageIndex: number;

	// Get workflow stages from centralized store
	const workflowStages = getWorkflowStages();

	// Export function to get status name by index (for use by parent components)
	export function getStatusName(statusIndex: number): string {
		return getStatusNameFromStore(statusIndex);
	}

	console.log('Current Stage Index:', currentStageIndex);
</script>

<div class="card bg-base-100 shadow-lg">
	<div class="card-body">
		<h3 class="card-title text-lg">Incident Workflow</h3>

		<!-- Workflow Steps -->
		<div class="w-full overflow-x-auto">
			<ul class="steps steps-horizontal w-full min-w-max">
				{#each workflowStages as stage, index}
					<li class={index <= currentStageIndex ? 'step step-primary' : 'step'}>
						<span class="step-icon">
							{@html stage.icon}
						</span>
						<div class="step-content text-center">
							<div class="text-sm font-semibold">{stage.status}</div>
							{#if index === currentStageIndex}
								<div class="mt-1 text-xs font-medium text-primary">← Current {index}</div>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.step-content {
		margin-top: 0.5rem;
		max-width: 120px;
	}
</style>
