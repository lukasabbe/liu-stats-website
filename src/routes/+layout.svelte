<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import HeaderButton from '$lib/components/HeaderButton.svelte';
	import { locale, getTranslation } from '$lib/i18n';
	import { House } from 'lucide-svelte';
	import type { Locale } from '$lib/i18n/translations';

	let { children } = $props();

	let currentLocale = $state<Locale>('en');
	locale.subscribe((l) => (currentLocale = l));
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

	<div class="flex-1">{@render children()}</div>

	<footer
		class="flex w-full shrink-0 flex-col items-center justify-center gap-2 border-t p-4 text-sm text-gray-500 dark:text-gray-400"
	>
		<span>{getTranslation('notAffiliated', currentLocale)}</span>
		<div class="flex items-center gap-4">
			<a href="https://github.com/LiuStats" target="_blank" rel="noopener" class="hover:underline">
				{getTranslation('github', currentLocale)}
			</a>
			<span>|</span>
			<a
				href="https://github.com/lukasabbe/liu-stats-website"
				target="_blank"
				rel="noopener"
				class="hover:underline"
			>
				{getTranslation('myWebsite', currentLocale)}
			</a>
		</div>
	</footer>
</div>
