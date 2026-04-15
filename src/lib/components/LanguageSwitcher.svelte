<script lang="ts">
	import { locale } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let currentLocale = $state<Locale>('en');

	locale.subscribe((l) => {
		currentLocale = l;
	});

	function toggle() {
		locale.toggle();
	}
</script>

<button onclick={toggle} class="rounded px-3 py-1.5 text-sm transition-all active:scale-95">
	{currentLocale === 'en' ? 'EN' : 'SV'}
</button>
