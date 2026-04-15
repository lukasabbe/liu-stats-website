import { writable } from 'svelte/store';
import { translations, type Locale } from './translations';
import type { TranslationKey } from './translations';

function createLocaleStore() {
	const { subscribe, set, update } = writable<Locale>('en');

	return {
		subscribe,
		set,
		setSwedish: () => set('sv'),
		setEnglish: () => set('en'),
		toggle: () =>
			update((current) => {
				return current === 'en' ? 'sv' : 'en';
			})
	};
}

export const locale = createLocaleStore();

export function t(key: TranslationKey): string {
	let currentLocale: Locale = 'en';
	locale.subscribe((l) => (currentLocale = l))();
	return translations[currentLocale][key];
}

export function getTranslation(key: TranslationKey, currentLocale: Locale): string {
	return translations[currentLocale][key];
}
