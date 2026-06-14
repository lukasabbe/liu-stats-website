import { writable } from 'svelte/store';
import { translations, type Locale } from './translations';
import type { TranslationKey } from './translations';

function createLocaleStore() {
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null;
	const { subscribe, set, update } = writable<Locale>(stored === 'sv' ? 'sv' : 'en');

	return {
		subscribe,
		set: (l: Locale) => {
			if (typeof localStorage !== 'undefined') localStorage.setItem('locale', l);
			set(l);
		},
		setSwedish: () => {
			if (typeof localStorage !== 'undefined') localStorage.setItem('locale', 'sv');
			set('sv');
		},
		setEnglish: () => {
			if (typeof localStorage !== 'undefined') localStorage.setItem('locale', 'en');
			set('en');
		},
		toggle: () =>
			update((current) => {
				const next = current === 'en' ? 'sv' : 'en';
				if (typeof localStorage !== 'undefined') localStorage.setItem('locale', next);
				return next;
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
