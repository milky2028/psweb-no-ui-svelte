Base stuff

<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import Divider from '../lib/Divider.svelte';

	let status = '...';
	let isolated = '...';

	let memory = 2;
	function onMemoryUpdate(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		memory = +event.currentTarget?.value;
	}

	onMount(() => {
		isolated = `${window.crossOriginIsolated}`;
	});
</script>

<div>Status: {status}</div>
<div>crossOriginIsolated: {isolated}</div>
<Divider />

<div>
	This application allows you to step through Photoshop Web's booting process with a pre-configured
	memory amount.
	<br />
	Use the checkbox next to each step to configure that step to run automatically on page reload.
</div>

<button>Clear Autoboot Stages</button>
<Divider />

<label>
	<div>
		Initial WebAssembly Memory Allotment:
		<span id="configured-memory">{memory}</span>GB
	</div>
	<input
		on:input={onMemoryUpdate}
		style="width: 300px"
		type="range"
		min={1}
		max={3.75}
		step={0.25}
	/>
</label>
<Divider />

<div>Boot Process</div>
<Divider /> -->
