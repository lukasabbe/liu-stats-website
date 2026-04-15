<script>
	let { path = '#', icon: Icon, ariaLabel = 'Link' } = $props();
</script>

<a
	href={path}
	aria-label={ariaLabel}
	class="relative inline-flex h-10 w-10 items-center justify-center rounded transition-all active:scale-95"
>
	<Icon size={24} class="text-black dark:text-white" />
</a>
