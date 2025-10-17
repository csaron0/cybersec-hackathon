<script lang="ts">
	let email: string = '';
	function login() {
		localStorage.setItem('email', email);
        window.location.href = '/';
	}
</script>

<form action="" onsubmit={login} class="mx-auto my-auto">
	<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">Login</legend>

		<label class="label">Email</label>
		<input type="email" class="input" placeholder="Email" bind:value={email} />

		<label class="label">Password</label>
		<input type="password" class="input" placeholder="Password" />

		<button type="submit" class="btn mt-4 btn-neutral">Login</button>
	</fieldset>
</form>
