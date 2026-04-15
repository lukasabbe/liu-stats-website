<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex flex-col items-center justify-center p-10 text-center font-mono">
	<h1 class="text-3xl font-bold">Error {page.status}</h1>
	<p class="mt-2 text-gray-500 dark:text-gray-400">
		{page.error?.message || 'Something went wrong'}
	</p>
	<a
		href="/"
		class="mt-4 rounded border px-4 py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-800"
	>
		Go home
	</a>
</div>
