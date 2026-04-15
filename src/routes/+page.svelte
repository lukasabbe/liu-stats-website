<script lang="ts">
	import CoursePicker from '$lib/components/CoursePicker.svelte';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let currentLocale = $state<Locale>('en');
	locale.subscribe((l) => (currentLocale = l));
</script>

<div class="m-10 flex flex-col items-center justify-center text-center font-mono">
	<h1 class="text-3xl font-bold">{getTranslation('welcome', currentLocale)}</h1>
	<p class="text-lg">{getTranslation('searchPrompt', currentLocale)}</p>
</div>

<div class="flex justify-center">
	<CoursePicker />
</div>
