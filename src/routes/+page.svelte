<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Divider from '$lib/Divider.svelte';

	let status = '...';
	let isolated = '...';

	onMount(() => {
		isolated = `${crossOriginIsolated}`;
	});
</script>

<div>
	<div><strong>Status:</strong> {status}</div>
	<div><strong>crossOriginIsolated:</strong> {isolated}</div>
</div>

<Divider />
