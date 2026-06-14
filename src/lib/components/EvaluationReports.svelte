<script lang="ts">
	import { LineChart, Spline, Labels } from 'layerchart';
	import { ChevronDown } from 'lucide-svelte';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	type EvaluateQuestion = {
		title: string;
		avgValue: number;
	};

	type EvaluateReport = {
		title: string;
		date: string;
		courseCode: string;
		year: string;
		semester: string;
		questions: EvaluateQuestion[];
	};

	let { reports }: { reports: EvaluateReport[] } = $props();

	let currentLocale = $state<Locale>('en');
	let ready = $state(false);
	let questionsWithData = $state<[string, { date: Date; avgValue: number }[]][]>([]);

	locale.subscribe((l) => (currentLocale = l));

	$effect(() => {
		if (!ready) return;
		const map = new SvelteMap<string, { date: Date; avgValue: number }[]>();
		for (const report of reports) {
			for (const q of report.questions) {
				if (!map.has(q.title)) {
					map.set(q.title, []);
				}
				if (q.avgValue !== 0) {
					map.get(q.title)!.push({
						date: new Date(report.date),
						avgValue: q.avgValue
					});
				}
			}
		}
		for (const values of map.values()) {
			values.sort((a, b) => a.date.getTime() - b.date.getTime());
		}
		questionsWithData = Array.from(map.entries());
	});

	$effect(() => {
		requestAnimationFrame(() => {
			ready = true;
		});
	});

	let openCharts = new SvelteSet<string>();

	function swedishDate(v: Date) {
		return v.toLocaleDateString('sv-SE');
	}

	function toggle(key: string) {
		if (openCharts.has(key)) {
			openCharts.delete(key);
		} else {
			openCharts.add(key);
		}
	}
</script>

<div class="mx-auto max-w-5xl space-y-6 p-4">
	{#if ready}
		{#each questionsWithData as [questionTitle, data] (questionTitle)}
			{@const isOpen = openCharts.has(questionTitle)}
			<div class="rounded-lg border border-gray-300 p-4 dark:border-gray-700">
				<h2 class="mb-4 text-base font-semibold">{questionTitle}</h2>
				<LineChart
					{data}
					x="date"
					y="avgValue"
					yDomain={[1, 5]}
					height={300}
					padding={{ top: 25, right: 20, bottom: 50, left: 65 }}
					props={{
						xAxis: {
							format: 'year',
							tickLabelProps: { style: 'font-size: 16px', dy: 25 }
						},
						yAxis: {
							tickLabelProps: { style: 'font-size: 16px', dx: -25 }
						},
						tooltip: {
							header: { format: swedishDate }
						}
					}}
				>
					{#snippet marks({ context })}
						{#each context.series.visibleSeries as s (s.key)}
							<Spline seriesKey={s.key} />
							<Labels seriesKey={s.key} placement="outside" offset={6} />
						{/each}
					{/snippet}
				</LineChart>
				<div class="mt-2 flex justify-center">
					<button
						onclick={() => toggle(questionTitle)}
						class="flex cursor-pointer items-center gap-1 rounded border px-3 py-1 text-sm transition-all active:scale-95"
					>
						{isOpen
							? getTranslation('closeData', currentLocale)
							: getTranslation('showData', currentLocale)}
						<ChevronDown class="h-4 w-4 transition-transform {isOpen ? 'rotate-180' : ''}" />
					</button>
				</div>
				{#if isOpen}
					<div class="mt-3 overflow-x-auto">
						<table class="w-full text-left text-sm">
							<thead>
								<tr class="border-b border-gray-300 dark:border-gray-700">
									<th class="py-2 pr-4 font-semibold">{getTranslation('date', currentLocale)}</th>
									<th class="py-2 font-semibold">{getTranslation('average', currentLocale)}</th>
								</tr>
							</thead>
							<tbody>
								{#each data as d (d.date.getTime())}
									<tr class="border-b border-gray-200 dark:border-gray-800">
										<td class="py-2 pr-4 text-gray-600 dark:text-gray-400"
											>{d.date.toLocaleDateString('sv-SE')}</td
										>
										<td class="py-2 font-mono">{d.avgValue.toFixed(2)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
