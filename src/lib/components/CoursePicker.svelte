<script lang="ts">
	import { goto } from '$app/navigation';
	import { Combobox } from 'bits-ui';
	import { ChevronsDownUp, Check, LoaderCircle, Search } from 'lucide-svelte';
	import { locale, getTranslation } from '$lib/i18n';
	import type { Locale } from '$lib/i18n/translations';

	let courses: string[] = $state([]);
	let loading = $state(true);
	let error = $state(false);
	let currentLocale = $state<Locale>('en');

	locale.subscribe((l) => (currentLocale = l));

	let inputValue = $state('');
	let selectedCourse = $state('');

	let filteredCourses = $derived(
		inputValue ? courses.filter((c) => c.includes(inputValue)).slice(0, 25) : courses.slice(0, 25)
	);

	$effect(() => {
		fetchCourses();
	});

	async function fetchCourses() {
		try {
			const res = await fetch('https://liutentor.lukasabbe.com/api/courses/');
			if (!res.ok) {
				error = true;
				return;
			}
			const data = await res.json();
			courses = data;
		} catch (e) {
			error = true;
		} finally {
			loading = false;
		}
	}

	function handleCourseSelect(course: string | undefined) {
		if (!course) return;
		inputValue = '';
		goto(`/${course}`);
	}
</script>

<Combobox.Root
	type="single"
	name="courseSelect"
	bind:value={selectedCourse}
	onValueChange={handleCourseSelect}
>
	<div class="group relative w-max">
		<div
			class="text-muted-foreground/60 pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2"
		>
			<Search class="size-4" />
		</div>

		<Combobox.Input
			oninput={(e) => {
				e.currentTarget.value = e.currentTarget.value.toUpperCase();
				inputValue = e.currentTarget.value;
			}}
			onkeydown={(e) => {
				if (e.key === 'Enter') {
					setTimeout(() => {
						if (inputValue && filteredCourses.length > 0) {
							const exactMatch = courses.find((c) => c === inputValue);
							const targetCourse = exactMatch || filteredCourses[0];
							handleCourseSelect(targetCourse);
						}
					}, 0);
				}
			}}
			class="border-input bg-background ring-offset-background placeholder:text-muted-foreground/50 flex h-10 w-74 rounded-lg border pr-10 pl-10 text-sm transition-all focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
			placeholder={getTranslation('searchCourse', currentLocale)}
			aria-label={getTranslation('searchCourse', currentLocale)}
		/>

		<Combobox.Trigger
			class="absolute inset-e-1 top-1/2 size-8 -translate-y-1/2 transition-all active:scale-95"
		>
			<ChevronsDownUp class="mx-auto size-4 opacity-50" />
		</Combobox.Trigger>
	</div>

	<Combobox.Content
		class="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 min-w-74 overflow-hidden rounded-xl border p-1 shadow-lg"
		sideOffset={6}
	>
		<Combobox.Viewport class="max-h-70 p-1">
			{#if loading}
				<div class="text-muted-foreground flex items-center justify-center py-8 text-sm">
					<LoaderCircle class="mr-2 size-4 animate-spin" />
					Loading courses...
				</div>
			{:else if error}
				<div class="text-destructive py-6 text-center text-sm font-medium">
					Failed to load courses.
				</div>
			{:else if filteredCourses.length === 0}
				<div class="text-muted-foreground py-6 text-center text-sm">No results found.</div>
			{:else}
				{#each filteredCourses as course (course)}
					<Combobox.Item
						value={course}
						label={course}
						class="data-highlighted:text-foreground relative flex w-full cursor-pointer items-center rounded-md py-2 pr-2 pl-8 text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-gray-100 dark:data-highlighted:bg-gray-800"
					>
						{#snippet children({ selected })}
							<span class="absolute left-2 flex h-4 w-4 items-center justify-center">
								{#if selected}
									<Check class="text-primary size-4" />
								{/if}
							</span>
							<span class="truncate font-medium">{course}</span>
						{/snippet}
					</Combobox.Item>
				{/each}
			{/if}
		</Combobox.Viewport>
	</Combobox.Content>
</Combobox.Root>
