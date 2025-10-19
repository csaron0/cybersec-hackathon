<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let discoveryTime: Date;
	export let title: string = 'Time Since Discovery';
	export let compact: boolean = false;
	export let criticalThresholdHours: number = 24;
	export let warningThresholdHours: number = 12;

	let elapsed = '';
	let totalMinutes = 0;
	let interval: NodeJS.Timeout;

	function updateElapsed() {
		const now = new Date();
		const diffMs = now.getTime() - discoveryTime.getTime();

		const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

		totalMinutes = Math.floor(diffMs / (1000 * 60));

		if (compact) {
			if (days > 0) {
				elapsed = `${days}d ${hours}h`;
			} else if (hours > 0) {
				elapsed = `${hours}h ${minutes}m`;
			} else {
				elapsed = `${minutes}m`;
			}
		} else {
			if (days > 0) {
				elapsed = `${days}d ${hours}h ${minutes}m ${seconds}s`;
			} else if (hours > 0) {
				elapsed = `${hours}h ${minutes}m ${seconds}s`;
			} else {
				elapsed = `${minutes}m ${seconds}s`;
			}
		}
	}

	function getStatusColor(): string {
		const hoursElapsed = totalMinutes / 60;

		if (hoursElapsed >= criticalThresholdHours) {
			return 'text-error';
		} else if (hoursElapsed >= warningThresholdHours) {
			return 'text-warning';
		}
		return 'text-success';
	}

	function getBackgroundColor(): string {
		const hoursElapsed = totalMinutes / 60;

		if (hoursElapsed >= criticalThresholdHours) {
			return 'bg-error/10 border-error/20';
		} else if (hoursElapsed >= warningThresholdHours) {
			return 'bg-warning/10 border-warning/20';
		}
		return 'bg-success/10 border-success/20';
	}

	onMount(() => {
		updateElapsed();
		interval = setInterval(updateElapsed, 1000);
	});

	onDestroy(() => {
		if (interval) {
			clearInterval(interval);
		}
	});
</script>

<div class="card border bg-base-100 shadow-md {getBackgroundColor()}">
	<div class="card-body {compact ? 'p-3' : 'p-4'}">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<!-- Clock Icon -->
				<div class="relative">
					<svg
						class="h-6 w-6 {getStatusColor()}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<circle cx="12" cy="12" r="10" stroke-width="2" />
						<polyline points="12,6 12,12 16,14" stroke-width="2" />
					</svg>

					<!-- Pulse animation for critical state -->
					{#if totalMinutes / 60 >= criticalThresholdHours}
						<div class="absolute inset-0 animate-ping rounded-full bg-error opacity-30"></div>
					{/if}
				</div>

				<div>
					<h3 class="text-xs font-medium text-base-content/70">{title}</h3>
					<div class="font-mono font-bold {compact ? 'text-sm' : 'text-lg'} {getStatusColor()}">
						{elapsed}
					</div>
				</div>
			</div>

			<!-- Status Indicator -->
			<div class="text-right">
				<div class="font-bold {compact ? 'text-sm' : 'text-lg'} {getStatusColor()}">
					{Math.floor(totalMinutes / 60)}h
				</div>
				<div class="text-xs opacity-70">
					{#if totalMinutes / 60 >= criticalThresholdHours}
						CRITICAL
					{:else if totalMinutes / 60 >= warningThresholdHours}
						WARNING
					{:else}
						ACTIVE
					{/if}
				</div>
			</div>
		</div>

		{#if !compact}
			<div class="mt-2 text-xs text-base-content/50">
				Discovered: {discoveryTime.toLocaleString()}
			</div>
		{/if}
	</div>
</div>
