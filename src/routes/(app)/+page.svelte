<script lang="ts">
	import { onMount } from "svelte";

    onMount(() => {
        const email = localStorage.getItem('email');
        if (!email) {
            window.location.href = '/login';
        }
    });
</script>
