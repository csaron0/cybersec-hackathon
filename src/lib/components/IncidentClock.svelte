<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let discoveryTime: Date;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let showSeconds: boolean = true;
	export let criticalThresholdHours: number = 24; // After this many hours, clock turns red
	export let warningThresholdHours: number = 12; // After this many hours, clock turns orange

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

		if (days > 0) {
			elapsed = showSeconds
				? `${days}d ${hours}h ${minutes}m ${seconds}s`
				: `${days}d ${hours}h ${minutes}m`;
		} else if (hours > 0) {
			elapsed = showSeconds ? `${hours}h ${minutes}m ${seconds}s` : `${hours}h ${minutes}m`;
		} else {
			elapsed = showSeconds ? `${minutes}m ${seconds}s` : `${minutes}m`;
		}
	}

	function getClockColor(): string {
		// Always return red color for urgent incident display
		return 'text-error';
	}

	function getClockSize(): string {
		switch (size) {
			case 'sm':
				return 'text-sm';
			case 'md':
				return 'text-lg';
			case 'lg':
				return 'text-xl';
			case 'xl':
				return 'text-3xl';
			default:
				return 'text-xl';
		}
	}

	function getBadgeColor(): string {
		// Always return red badge for urgent incident display
		return 'badge-error';
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

<div class="flex flex-col items-center space-y-2">
	<!-- Time Display -->
	<div class="text-center">
		<div class="font-mono font-bold {getClockSize()} {getClockColor()}">
			{elapsed}
		</div>
		<div class="mt-1 text-xs text-base-content/70">Time Since Discovery</div>

		<!-- Status Badge -->
		<div class="mt-2">
			<div class="badge badge-sm {getBadgeColor()}">
				CRITICAL - {Math.floor(totalMinutes / 60)}h elapsed
			</div>
		</div>
	</div>

	<!-- Discovery Time -->
	<div class="text-center text-xs text-base-content/50">
		Discovered: {discoveryTime.toLocaleString()}
	</div>
</div>
