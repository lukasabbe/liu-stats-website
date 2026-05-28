<script lang="ts">
	import { PieChart } from 'layerchart';
	import ModuleModal from './ModuleModal.svelte';
	import type { Module } from 'liu-tentor-package';
	import { locale } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let { moduleData }: { moduleData: Module } = $props();
	let open = $state(false);
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

	function formatDate(date: string): string {
		return new Date(date).toLocaleDateString(currentLocale === 'sv' ? 'sv-SE' : 'en-US');
	}
</script>

<ModuleModal {moduleData} bind:open />

<div class="flex min-w-0 flex-col rounded-lg border border-gray-300 p-4">
	<button
		onclick={() => (open = true)}
		class="w-full cursor-pointer border-0 bg-transparent p-0 text-left"
	>
		<h1 class="mb-1 text-xl font-semibold">{moduleData.moduleCode}</h1>
	</button>
	<p class="mb-4 text-sm text-gray-500">{formatDate(moduleData.date)}</p>
	<div class="min-h-[300px]">
		<PieChart
			data={moduleData.grades}
			key="grade"
			value="quantity"
			cRange={colors}
			height={300}
			innerRadius={50}
			cornerRadius={2}
			padAngle={0.05}
			legend={true}
		/>
	</div>
</div>

<style>
	@media (pointer: coarse) {
		:global(.lc-tooltip-root) {
			display: none !important;
		}
	}
</style>
