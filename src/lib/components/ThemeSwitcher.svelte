<script lang="ts">
	import { Toggle } from 'bits-ui';
	import { setMode, mode } from 'mode-watcher';
	import { Sun, Moon } from 'lucide-svelte';
	function handlePressedChange(pressed: boolean) {
		setMode(pressed ? 'dark' : 'light');
	}
</script>

<Toggle.Root
	pressed={mode.current === 'dark'}
	onPressedChange={handlePressedChange}
	class="relative inline-flex h-10 w-10 items-center justify-center rounded transition-all active:scale-95"
>
	<Sun
		class="h-5 w-5 scale-100 rotate-0 text-black transition-all dark:scale-0 dark:-rotate-90 dark:text-white"
	/>

	<Moon
		class="absolute h-5 w-5 scale-0 rotate-90 text-black transition-all dark:scale-100 dark:rotate-0 dark:text-white"
	/>

	<span class="sr-only">Toggle theme</span>
</Toggle.Root>
