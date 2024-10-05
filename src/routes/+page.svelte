<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Divider from '$lib/Divider.svelte';

	let status = 'uninitialized';
	let isolated = '...';
	let memory = 2;

	onMount(() => {
		isolated = `${crossOriginIsolated}`;
	});

	function onClear() {}
</script>

<Divider />

<div><strong>Status:</strong> {status}</div>
<div><strong>crossOriginIsolated:</strong> {isolated}</div>

<Divider />

<div>
	This application allows you to step through Photoshop Web's booting process with a pre-configured
	memory amount.
	<br />
	Use the checkbox next to each step to configure that step to run automatically on page reload.
</div>
<button on:click={onClear}>Clear Autoboot</button>

<Divider />

<label>
	<div>Initial WebAssembly Memory Allotment: {memory}GB</div>
	<input style="width: 300px" type="range" min="1" max="3.75" step="0.25" bind:value={memory} />
</label>

<Divider />

<div>Boot Process</div>
