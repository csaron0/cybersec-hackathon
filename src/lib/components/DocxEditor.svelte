<script lang="ts">
	export let title = 'Press Release Draft';
</script>

<!-- Static Word-like Document Editor -->
<div class="flex h-full flex-col">
	<!-- Word-like Editing Toolbar -->
	<div class="border-b border-gray-200 bg-white shadow-sm">
		<!-- Document Title Bar -->
		<div class="flex items-center justify-between border-b border-gray-100 px-6 py-3">
			<div class="flex items-center space-x-4">
				<h1 class="text-lg font-semibold text-gray-900">{title}</h1>
				<div class="flex items-center space-x-2 text-sm text-gray-500">
					<span>Last edited 5 minutes ago</span>
					<span>•</span>
					<span>Auto-saved</span>
				</div>
			</div>
			<div class="flex items-center space-x-2"></div>
		</div>

		<!-- Editing Tools Toolbar -->
		<div class="px-6 py-3">
			<div class="flex items-center space-x-4">
				<!-- Font Controls -->
				<div class="flex items-center space-x-2">
					<select class="select w-32 max-w-xs select-sm">
						<option>Calibri</option>
						<option>Arial</option>
						<option>Times New Roman</option>
						<option>Georgia</option>
					</select>
					<select class="select w-16 select-sm">
						<option>11</option>
						<option>12</option>
						<option>14</option>
						<option>16</option>
						<option>18</option>
						<option>24</option>
					</select>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Text Formatting -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Bold">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M12.83 11.17a4 4 0 010 5.66A4 4 0 019 20H4V4h5a4 4 0 013.83 3.17 3 3 0 010 4zM7 7v2h2a1 1 0 010 2H7v2h2a2 2 0 000-4H7z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Italic">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 4v12l-1.5-3h-1L10 4zM8 16h4l-2-4-2 4z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Underline">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M3 18h14v2H3v-2zM6 4v6a4 4 0 008 0V4h2v6a6 6 0 01-12 0V4h2z" />
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Text Color & Highlight -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Text Color">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M13.5 2l3 3L8 13.5l-3-3L13.5 2zM9 15l-1-1-4 4v2h2l4-4-1-1z" />
						</svg>
						<span class="ml-1 text-xs">A</span>
					</button>
					<button class="btn join-item btn-sm" title="Highlight">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M17.7 2.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 5.2 8.3 1.5c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4L10.2 6l-5.5 5.5c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3L12 7l3.7 3.7c.4.4 1 .4 1.4 0s.4-1 0-1.4L13.8 6l3.9-3.7z"
							/>
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Alignment -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Align Left">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 4h16v2H2V4zm0 4h10v2H2V8zm0 4h16v2H2v-2zm0 4h10v2H2v-2z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Center">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 4h16v2H2V4zm2 4h12v2H4V8zm-2 4h16v2H2v-2zm2 4h12v2H4v-2z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Align Right">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 4h16v2H2V4zm6 4h10v2H8V8zm-6 4h16v2H2v-2zm6 4h10v2H8v-2z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Justify">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path d="M2 4h16v2H2V4zm0 4h16v2H2V8zm0 4h16v2H2v-2zm0 4h16v2H2v-2z" />
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Lists -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Bullet List">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M3 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm0 4a1 1 0 110-2 1 1 0 010 2zm4-7h10v2H7V5zm0 4h10v2H7V9zm0 4h10v2H7v-2z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Numbered List">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M5.5 2v2h-1V2h1zm0 3v2h-1V5h1zm0 3v2h-1V8h1zM9 5h8v2H9V5zm0 4h8v2H9V9zm0 4h8v2H9v-2z"
							/>
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Insert Tools -->
				<div class="flex items-center space-x-2">
					<button class="btn btn-sm" title="Insert Link">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z"
							/>
							<path
								d="M7.414 15.414a2 2 0 01-2.828-2.828l3-3a2 2 0 012.828 0 1 1 0 001.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5z"
							/>
						</svg>
					</button>
					<button class="btn btn-sm" title="Insert Image">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<button class="btn btn-sm" title="Insert Table">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 1v3h3V5H5zm5 0v3h3V5h-3zm5 0v3h3V5h-3zM5 10v3h3v-3H5zm5 0v3h3v-3h-3zm5 0v3h3v-3h-3z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Document Container with Word-like appearance -->
	<div class="flex-1 overflow-auto bg-gray-100 py-8">
		<div class="mx-auto max-w-4xl">
			<!-- Page 1 -->
			<div class="page-container mb-8 bg-white shadow-lg">
				<div class="page-content">
					<!-- Company Header -->
					<div class="mb-8 border-b-2 border-gray-200 pb-6 text-center">
						<h1 class="mb-2 text-2xl font-bold text-gray-800">BOBOLINK CORPORATION</h1>
						<p class="text-gray-600">456 Innovation Drive, Tech Valley, TV 67890</p>
						<p class="text-gray-600">Phone: (555) 867-5309 | Email: press@bobolink.com</p>
					</div>

					<!-- Press Release Header -->
					<div class="mb-8 text-center">
						<h2 class="mb-4 text-lg font-bold text-gray-800">PRESS RELEASE</h2>
						<div class="mb-2 text-gray-600">FOR IMMEDIATE RELEASE</div>
						<div class="text-gray-600">
							{new Date().toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</div>
					</div>

					<!-- Press Release Content -->
					<div class="press-release-content">
						<h3 class="mb-4 text-xl leading-tight font-bold text-gray-900">
							[Headline: Company Announces Major Product Launch / Strategic Partnership / Financial
							Results]
						</h3>

						<p class="mb-4 text-justify leading-relaxed text-gray-800">
							<strong>[City, State] –</strong> [Opening paragraph with the most important information:
							who, what, when, where, why. This paragraph should summarize the entire announcement in
							2-3 sentences.]
						</p>

						<p class="mb-4 text-justify leading-relaxed text-gray-800">
							[Second paragraph providing additional context and details about the announcement.
							Include quotes from key executives or stakeholders.]
						</p>

						<blockquote class="my-6 border-l-4 border-blue-500 pl-4 text-gray-700 italic">
							"[Quote from CEO or relevant executive providing insight into the significance of this
							announcement]," said [Name], [Title] of [Company].
						</blockquote>

						<p class="mb-4 text-justify leading-relaxed text-gray-800">
							[Third paragraph with supporting details, background information, or additional
							context that helps readers understand the importance of the announcement.]
						</p>

						<p class="mb-4 text-justify leading-relaxed text-gray-800">
							[Additional paragraphs as needed with more details, statistics, or supporting
							information.]
						</p>

						<!-- Company Boilerplate -->
						<div class="mt-8 border-t border-gray-200 pt-6">
							<h4 class="mb-2 font-bold text-gray-900">About [Company Name]</h4>
							<p class="text-justify leading-relaxed text-gray-800">
								[Standard company description: Founded in [year], [Company] is a leading [industry
								description]. The company [brief description of what the company does, its mission,
								and key achievements]. For more information, visit [website].]
							</p>
						</div>
					</div>
				</div>

				<!-- Page Footer -->
				<div class="page-footer">
					<div class="text-center text-sm text-gray-500">Page 1 of 1</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-container {
		width: 8.5in;
		min-height: 11in;
		margin: 0 auto;
		position: relative;
		border: 1px solid #d1d5db;
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.page-content {
		padding: 1in;
		min-height: 9in;
		font-family: 'Times New Roman', serif;
		font-size: 12pt;
		line-height: 1.5;
	}

	.page-footer {
		position: absolute;
		bottom: 0.5in;
		left: 0;
		right: 0;
		padding: 0 1in;
	}

	.press-release-content h3 {
		line-height: 1.3;
		font-family: 'Times New Roman', serif;
	}

	.press-release-content p {
		margin-bottom: 1rem;
		font-family: 'Times New Roman', serif;
	}

	.press-release-content blockquote {
		margin: 1.5rem 0;
		padding-left: 1rem;
		border-left: 4px solid #3b82f6;
		font-style: italic;
		color: #374151;
		font-family: 'Times New Roman', serif;
	}

	@media print {
		.page-container {
			box-shadow: none;
			border: none;
			width: 100%;
		}

		body {
			background: white !important;
		}

		.bg-gray-100 {
			background: white !important;
		}
	}

	@media screen and (max-width: 768px) {
		.page-container {
			width: 100%;
			margin: 0;
		}

		.page-content {
			padding: 0.5in;
		}
	}
</style>
