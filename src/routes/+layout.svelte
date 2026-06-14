<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import HeaderButton from '$lib/components/HeaderButton.svelte';
	import { locale, getTranslation } from '$lib/i18n';
	import { House, LoaderCircle } from 'lucide-svelte';
	import { navigating } from '$app/stores';
	import type { Locale } from '$lib/i18n/translations';

	let { children } = $props();

	let currentLocale = $state<Locale>('en');
	let loading = $state(false);
	let hideTimer: ReturnType<typeof setTimeout> | undefined;

	locale.subscribe((l) => (currentLocale = l));

	$effect(() => {
		const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null;
		if (!stored) {
			const lang = navigator.language;
			if (lang.startsWith('sv')) {
				locale.set('sv');
			}
		}
	});

	$effect(() => {
		const unsub = navigating.subscribe((v) => {
			if (v) {
				clearTimeout(hideTimer);
				loading = true;
			} else {
				hideTimer = setTimeout(() => {
					loading = false;
				}, 400);
			}
		});
		return unsub;
	});
</script>

<svelte:head><link rel="icon" /></svelte:head>
<ModeWatcher />

<div class="flex min-h-screen flex-col">
	<header class="flex w-full shrink-0 items-center justify-between p-4">
		<HeaderButton path="/" icon={House} ariaLabel="Home" />
		<div class="flex items-center gap-2">
			<LanguageSwitcher />
			<ThemeSwitcher />
		</div>
	</header>

	<div class="flex-1">
		{#if loading}
			<div class="flex items-center justify-center py-32">
				<div
					class="flex items-center gap-3 rounded-lg border border-gray-300 bg-gray-50 px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-[#1a1a1a]"
				>
					<LoaderCircle class="size-6 animate-spin text-gray-500 dark:text-gray-400" />
					<span class="text-gray-600 dark:text-gray-300">Loading...</span>
				</div>
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>

	<footer
		class="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t p-4 text-sm text-gray-500 dark:text-gray-400"
	>
		<span>{getTranslation('notAffiliated', currentLocale)}</span>
		<div class="flex items-center gap-4">
			<a
				href="https://github.com/lukasabbe/liu-stats-website"
				target="_blank"
				rel="noopener"
				class="hover:underline"
			>
				{getTranslation('github', currentLocale)}
			</a>
			<span>|</span>
			<a href="https://lukasabbe.com/" target="_blank" rel="noopener" class="hover:underline">
				{getTranslation('myWebsite', currentLocale)}
			</a>
		</div>
	</footer>
</div>

<style>
	:global(.lc-tooltip-container[data-variant='default']) {
		background-color: #fff !important;
		backdrop-filter: none !important;
	}

	:global(.dark .lc-tooltip-container[data-variant='default']) {
		background-color: #2a2a2a !important;
	}
</style>
