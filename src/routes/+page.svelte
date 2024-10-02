<script lang="ts">
	import { onMount } from 'svelte';
	import Divider from '../lib/Divider.svelte';
	import { BootStep, bootSteps } from '../lib/bootSteps.svelte';

	let isolated = '...';

	let memory = 2;
	function onMemoryUpdate(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		memory = +event.currentTarget?.value;
	}

	function runStep(stepNumber: number, step: BootStep) {
		for (let i = 0; i < stepNumber; i++) {
			if (bootSteps[i])
		}
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
{#each bootSteps as step, i (step.name)}
	<div>
		{i}. <input disabled={step.disabled} checked={step.autorun} type="checkbox" />
		<button on:click={() => runStep(i, step)}>{step.name}</button>
		<span>{step.success ? ' - ✅' : step.failed ? ' - ❌' : ''}</span>
	</div>
{/each}
<Divider />
