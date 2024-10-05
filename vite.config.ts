import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import isolation from 'vite-plugin-cross-origin-isolation';

export default defineConfig({
	plugins: [sveltekit(), isolation()]
});
