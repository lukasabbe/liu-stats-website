<script lang="ts">
	import CoursePicker from '$lib/components/CoursePicker.svelte';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let currentLocale = $state<Locale>('en');
	locale.subscribe((l) => (currentLocale = l));
</script>

<div class="mx-auto mt-4 max-w-2xl px-4">
	<div class="rounded-lg border border-blue-300 bg-blue-50 p-4 text-center dark:border-blue-700 dark:bg-blue-950">
		<span class="rounded bg-blue-200 px-2 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-800 dark:text-blue-200">
			{getTranslation('evalBannerTitle', currentLocale)}
		</span>
		<p class="mt-2 text-sm text-blue-800 dark:text-blue-200">
			{getTranslation('evalBanner', currentLocale)}
		</p>
	</div>
</div>

<div class="m-10 flex flex-col items-center justify-center text-center font-mono">
	<h1 class="text-3xl font-bold">{getTranslation('welcome', currentLocale)}</h1>
	<p class="text-lg">{getTranslation('searchPrompt', currentLocale)}</p>
</div>

<div class="flex justify-center">
	<CoursePicker />
</div>
