<script>
	import { redirect } from '@sveltejs/kit';

	function login() {
		localStorage.setItem('email', 'true');
        window.location.href = '/';
	}
</script>

<form action="" onsubmit={login} class="mx-auto my-auto">
	<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">Login</legend>

		<label class="label">Email</label>
		<input type="email" class="input" placeholder="Email" required />

		<label class="label">Password</label>
		<input type="password" class="input" placeholder="Password" required />

		<button type="submit" class="btn mt-4 btn-neutral">Login</button>
	</fieldset>
</form>
