<script lang="ts">
	let email: string = '';
	function login() {
		localStorage.setItem('email', email);
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>BoboLink - Login</title>
</svelte:head>

<form action="" onsubmit={login} class="mx-auto my-auto">
	<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<div class="mb-4 flex justify-center">
			<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-white p-2 shadow-md">
				<img src="/bobolink_no_text.png" alt="BoboLink Logo" class="h-full w-full object-contain" />
			</div>
		</div>
		<legend class="fieldset-legend">BoboLink Login</legend>

		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">Email</label>
		<input type="email" class="input" placeholder="Email" bind:value={email} />

		<!-- svelte-ignore a11y_label_has_associated_control -->
		<label class="label">Password</label>
		<input type="password" class="input" placeholder="Password" />

		<button type="submit" class="btn mt-4 btn-neutral">Login</button>
	</fieldset>
</form>
