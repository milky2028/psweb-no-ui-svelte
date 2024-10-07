<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Divider from '$lib/Divider.svelte';
	import { boot, DEFAULT_AUTOBOOT_CONFIG, setAutorun, type BootStep } from '$lib/boot.svelte';

	const AUTOBOOT_STORAGE_KEY = 'autoboot';
	let isolated = $state('...');
	let memory = $state(2);

	$effect(() => {
		const bootEntries = boot.map((step) => [step.id, step.autorun]);
		localStorage.setItem(AUTOBOOT_STORAGE_KEY, JSON.stringify(Object.fromEntries(bootEntries)));
	});

	onMount(() => {
		isolated = `${crossOriginIsolated}`;

		const autobootStorageKey = 'autoboot';
		const storedBootConfig = localStorage.getItem(autobootStorageKey);
		const autobootConfig: typeof DEFAULT_AUTOBOOT_CONFIG = storedBootConfig
			? JSON.parse(storedBootConfig)
			: { ...DEFAULT_AUTOBOOT_CONFIG };

		for (const [key, shouldAutorun] of Object.entries(autobootConfig)) {
			setAutorun(key, shouldAutorun);
		}
	});

	function onClear() {}

	function onCheckbox(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
		position: number,
	) {
		const { checked } = event.currentTarget;
		if (checked) {
			for (let i = 0; i <= position; i++) {
				const step = boot[i];
				step.autorun = checked;
			}
		} else {
			for (let i = position; i <= boot.length; i++) {
				const step = boot[i];
				step.autorun = checked;
			}
		}
	}

	async function runStep(position: number) {
		for (let i = 0; i <= position; i++) {
			const step = boot[i];
			if (!step.status) {
				step.status = '⏳';
				try {
					await boot[i].action();
					step.status = '✅';
				} catch {
					step.status = '❌';
				}
			}
		}
	}
</script>

<Divider />

<div><strong>crossOriginIsolated:</strong> {isolated}</div>

<Divider />

<div>
	This application allows you to step through Photoshop Web's booting process with a pre-configured
	memory amount.
	<br />
	Use the checkbox next to each step to configure that step to run automatically on page reload.
</div>
<button onclick={onClear}>Clear Autoboot</button>

<Divider />

<label>
	<div>Initial WebAssembly Memory Allotment: {memory}GB</div>
	<input style="width: 300px" type="range" min="1" max="3.75" step="0.25" bind:value={memory} />
</label>

<Divider />

<div>Boot Process</div>

{#each Object.values(boot) as step, i}
	<div>
		{i + 1}.
		<input
			disabled={step.disabled}
			type="checkbox"
			checked={step.autorun}
			oninput={(e) => onCheckbox(e, i)}
		/>
		<button disabled={step.disabled} onclick={() => runStep(i)}>{step.name}</button>
		{step.status ? ` - ${step.status}` : ''}
	</div>
{/each}
