<script lang="ts">
	import { page } from '$app/state';
	import { Button } from 'bits-ui';
	import CoursePie from '$lib/components/CoursePie.svelte';
	import { getCourseStatistic, type DataCourseStatistic } from 'liu-tentor-package';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';
	import type { LanguageContent } from 'liu-tentor-package';

	let course = page.params.course;

	let loading = $state(true);
	let error: null | Error = $state(null);
	let courseStats: DataCourseStatistic = $state({} as DataCourseStatistic);
	let currentPage = $state(0);
	let selectedModuleCode = $state<string | undefined>(undefined);
	let currentLocale = $state<Locale>('en');
	const perPage = 6;

	locale.subscribe((l) => (currentLocale = l));

	$effect(() => {
		getCourseStats();
	});

	async function getCourseStats() {
		if (!course) {
			error = new Error('Course not found');
			loading = false;
			return;
		}
		courseStats = (await getCourseStatistic(course)) ?? ({} as DataCourseStatistic);
		loading = false;
	}

	function next() {
		currentPage++;
	}

	function back() {
		if (currentPage > 0) {
			currentPage--;
		}
	}

	let filteredModules = $derived(
		selectedModuleCode
			? (courseStats.modules?.filter((m) => m.moduleCode === selectedModuleCode) ?? [])
			: (courseStats.modules ?? [])
	);

	let uniqueModuleCodes = $derived([
		...new Set(courseStats.modules?.map((m) => m.moduleCode) ?? [])
	]);

	function getLocalizedTitle(title: LanguageContent | undefined): string {
		if (!title) return '';
		return currentLocale === 'sv' ? title.sv : title.en;
	}
</script>

<div class="flex flex-col items-center justify-center text-center font-mono">
	<h1 class="text-3xl font-bold">
		{getTranslation('course', currentLocale)}
		{course?.toUpperCase()} - {courseStats.modules?.length ?? 0}
		{getTranslation('modules', currentLocale)}
	</h1>
	<p>{getLocalizedTitle(courseStats.courseTitle)}</p>
</div>

{#if loading}
	<p>{getTranslation('loading', currentLocale)}</p>
{:else if error}
	<p>{error.message}</p>
{:else if courseStats?.modules}
	<div class="mx-auto mt-8 flex max-w-5xl items-center justify-between px-4">
		<select bind:value={selectedModuleCode} class="h-10 min-w-[200px] rounded border px-3 py-2">
			<option value={undefined}>{getTranslation('allModules', currentLocale)}</option>
			{#each uniqueModuleCodes as code}
				<option value={code}>{code}</option>
			{/each}
		</select>
		<a
			href="https://studieinfo.liu.se/kurs/{course}"
			class="rounded border px-4 py-2 transition-all active:scale-95"
			target="_blank"
		>
			{getTranslation('courseWebsite', currentLocale)}
		</a>
	</div>

	{@const start = currentPage * perPage}
	{@const visibleModules = filteredModules.slice(start, start + perPage)}
	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-4 p-4 md:grid-cols-2">
		{#each visibleModules as module}
			<CoursePie moduleData={module} />
		{/each}
	</div>

	<div class="mt-4 flex justify-center gap-4 pb-8">
		<Button.Root
			onclick={back}
			disabled={currentPage === 0}
			class="rounded border px-4 py-2 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
		>
			{getTranslation('back', currentLocale)}
		</Button.Root>
		<span class="px-4 py-2">{currentPage + 1} / {Math.ceil(filteredModules.length / perPage)}</span>
		<Button.Root
			onclick={next}
			disabled={start + perPage >= filteredModules.length}
			class="rounded border px-4 py-2 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
		>
			{getTranslation('next', currentLocale)}
		</Button.Root>
	</div>
{/if}
