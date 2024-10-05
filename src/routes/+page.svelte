<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Divider from '$lib/Divider.svelte';

	let status = 'uninitialized';
	let isolated = '...';

	onMount(() => {
		isolated = `${crossOriginIsolated}`;
	});
</script>

<Divider />

<div><strong>Status:</strong> {status}</div>
<div><strong>crossOriginIsolated:</strong> {isolated}</div>

<Divider />
