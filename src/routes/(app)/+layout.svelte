<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { children } = $props();

	// Mock user data
	const user = {
		name: 'John Doe',
		email: 'john.doe@company.com',
		role: 'Security Analyst'
	};

	// Navigation items
	const navigation = [
		{
			name: 'Dashboard',
			href: '/',
			icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z M3 7l9-4 9 4M5 10v10a1 1 0 001 1h3m0-11v11m0-11h4m-4 11h4m0-11v11a1 1 0 001-1h3'
		},
		{
			name: 'Active Incidents',
			href: '/incidents',
			icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
		},
		{
			name: 'Reports',
			href: '/reports',
			icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
		},
		{
			name: 'Playbooks',
			href: '/playbooks',
			icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
		},
		{
			name: 'Settings',
			href: '/settings',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		}
	];

	function handleNavigation(href: string) {
		goto(href);
	}

	function handleLogout() {
		localStorage.removeItem('email');
		goto('/login');
	}

	function isCurrentPage(href: string): boolean {
		return $page.url.pathname === href;
	}
</script>

<div class="drawer lg:drawer-open">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

	<!-- Page content -->
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar w-full bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						></path>
					</svg>
				</label>
			</div>
			<div class="mx-2 flex-1 px-2">
				<div class="flex items-center">
					<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
						<svg class="h-5 w-5 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
					<span class="text-lg font-bold">SecureOps</span>
				</div>
			</div>
			<div class="flex-none">
				<div class="dropdown dropdown-end">
					<div tabindex="0" role="button" class="placeholder btn avatar btn-circle btn-ghost">
						<div class="w-10 rounded-full bg-neutral text-neutral-content">
							<span class="text-sm"
								>{user.name
									.split(' ')
									.map((n) => n[0])
									.join('')}</span
							>
						</div>
					</div>
					<ul
						tabindex="0"
						class="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<div class="justify-between">
								<div>
									<div class="font-semibold">{user.name}</div>
									<div class="text-sm opacity-50">{user.role}</div>
								</div>
							</div>
						</li>
						<li><hr /></li>
						<li>
							<button onclick={handleLogout}>
								<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<!-- Page content here -->
		<main class="flex-1 p-6">
			{@render children?.()}
		</main>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side">
		<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
		<aside class="min-h-full w-80 bg-base-200 p-4">
			<!-- Sidebar content here -->
			<div class="mb-6 flex items-center">
				<div class="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
					<svg class="h-5 w-5 text-primary-content" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						></path>
					</svg>
				</div>
				<span class="text-lg font-bold">SecureOps</span>
			</div>

			<ul class="menu w-full">
				{#each navigation as item}
					<li>
						<button
							class="flex w-full items-center text-left {isCurrentPage(item.href) ? 'active' : ''}"
							onclick={() => handleNavigation(item.href)}
						>
							<svg class="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d={item.icon}
								/>
							</svg>
							{item.name}
						</button>
					</li>
				{/each}
			</ul>
		</aside>
	</div>
</div>
