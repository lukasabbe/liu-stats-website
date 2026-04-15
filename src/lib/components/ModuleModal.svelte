<script lang="ts">
	import { BarChart } from 'layerchart';
	import { Dialog } from 'bits-ui';
	import { X } from 'lucide-svelte';
	import type { Module } from 'liu-tentor-package';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let { moduleData, open = $bindable(false) }: { moduleData: Module; open: boolean } = $props();
	let currentLocale = $state<Locale>('en');

	locale.subscribe((l) => (currentLocale = l));

	const colors = $derived.by(() => {
		const passingGrades = moduleData.grades.filter((g) => g.grade !== 'U');
		const minOrder = Math.min(...passingGrades.map((g) => g.gradeOrder));
		const maxOrder = Math.max(...passingGrades.map((g) => g.gradeOrder));
		const range = maxOrder - minOrder || 1;

		return moduleData.grades.map((g) => {
			if (g.grade === 'U') {
				return '#ef4444';
			}
			const normalized = (g.gradeOrder - minOrder) / range;
			const hue = 120 - normalized * 60;
			const saturation = 80 - normalized * 20;
			return `hsl(${hue}, ${saturation}%, 45%)`;
		});
	});

	const totalStudents = $derived(moduleData.grades.reduce((sum, g) => sum + g.quantity, 0));
	const passedStudents = $derived(
		moduleData.grades.filter((g) => g.grade !== 'U').reduce((sum, g) => sum + g.quantity, 0)
	);
	const passRate = $derived(
		totalStudents > 0 ? ((passedStudents / totalStudents) * 100).toFixed(1) : 0
	);

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString(currentLocale === 'sv' ? 'sv-SE' : 'en-US');
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-black/50" />
		<Dialog.Content
			class="fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg border border-gray-300 bg-gray-50 p-6 shadow-xl dark:border-gray-700 dark:bg-[#1a1a1a]"
		>
			<div class="mb-4 flex items-start justify-between">
				<div>
					<Dialog.Title class="text-2xl font-bold">{moduleData.moduleCode}</Dialog.Title>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						{formatDate(moduleData.date)}
					</p>
				</div>
				<Dialog.Close
					class="rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<X class="h-5 w-5" />
				</Dialog.Close>
			</div>

			<div class="mb-6 grid grid-cols-2 gap-4">
				<div class="rounded-lg border bg-gray-50 p-4 text-center dark:bg-[#1a1a1a]">
					<p class="text-3xl font-bold">{totalStudents}</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						{getTranslation('totalStudents', currentLocale)}
					</p>
				</div>
				<div class="rounded-lg border bg-gray-50 p-4 text-center dark:bg-[#1a1a1a]">
					<p class="text-3xl font-bold">{passRate}%</p>
					<p class="text-sm text-gray-500 dark:text-gray-400">
						{getTranslation('passRate', currentLocale)}
					</p>
				</div>
			</div>

			<h3 class="mb-2 text-lg font-semibold">
				{getTranslation('gradeDistribution', currentLocale)}
			</h3>
			<BarChart
				data={moduleData.grades}
				x="grade"
				y="quantity"
				cRange={colors}
				orientation="vertical"
				height={200}
				padding={{ top: 20, right: 20, bottom: 40, left: 40 }}
			/>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
