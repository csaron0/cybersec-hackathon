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
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H7v14h7.04c2.09 0 3.71-1.7 3.71-3.79 0-1.52-.86-2.82-2.15-3.42zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Italic">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Underline">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 17c3.31 0 6-2.69 6-6V3h-2.5v8c0 1.93-1.57 3.5-3.5 3.5S8.5 12.93 8.5 11V3H6v8c0 3.31 2.69 6 6 6zm-7 2v2h14v-2H5z"
							/>
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Text Color & Highlight -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Text Color">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M7 21h10l-2-6H9l-2 6z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 3L8 14h8l-4-11z"
							/>
							<rect x="6" y="18" width="12" height="2" fill="currentColor" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Highlight">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
							<rect x="4" y="16" width="16" height="4" fill="currentColor" opacity="0.3" />
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Alignment -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Align Left">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z" />
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Center">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M3 3h18v2H3V3zm3 4h12v2H6V7zm-3 4h18v2H3v-2zm3 4h12v2H6v-2zm-3 4h18v2H3v-2z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Align Right">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M3 3h18v2H3V3zm6 4h12v2H9V7zm-6 4h18v2H3v-2zm6 4h12v2H9v-2zm-6 4h18v2H3v-2z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Justify">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Lists -->
				<div class="join">
					<button class="btn join-item btn-sm" title="Bullet List">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"
							/>
						</svg>
					</button>
					<button class="btn join-item btn-sm" title="Numbered List">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M2 17h2v.5H3v1h1v.5H2v1h3v-4H2v1zm1-9h1V4H2v1h1v3zm-1 3h1.8L2 13.1v.9h3v-1H3.2L5 10.9V10H2v1zm5-6v2h14V5H7zm0 14h14v-2H7v2zm0-6h14v-2H7v2z"
							/>
						</svg>
					</button>
				</div>

				<div class="divider mx-0 divider-horizontal"></div>

				<!-- Insert Tools -->
				<div class="flex items-center space-x-2">
					<button class="btn btn-sm" title="Insert Link">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
							/>
						</svg>
					</button>
					<button class="btn btn-sm" title="Insert Image">
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</button>
					<button class="btn btn-sm" title="Insert Table">
						<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v3h5V5H5zm7 0v3h5V5h-5zm5 5h-5v4h5v-4zm-7 0H5v4h5v-4zm0 6H5v3h5v-3zm2 0v3h5v-3h-5z"
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
