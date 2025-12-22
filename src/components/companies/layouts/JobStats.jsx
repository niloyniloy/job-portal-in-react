

function JobStats({ stats }) {

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{/* Stat Card 1 */}
				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 0v10l8 4" /></svg>
						</div>
					</div>
					<h3 className="text-2xl font-bold mb-1">{stats.activeJobs}</h3>
					<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
						Active Jobs
					</p>
				</div>
				{/* Stat Card 2 */}
				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users h-4 w-4 mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
						</div>
					</div>
					<h3 className="text-2xl font-bold mb-1">{stats.totalApplicants}</h3>
					<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
						Total Applicants
					</p>
				</div>
				{/* Stat Card 3 */}
				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="h-12 w-12 rounded-lg bg-yellow-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
						</div>
					</div>
					<h3 className="text-2xl font-bold mb-1">{stats.pendingReviews}</h3>
					<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
						Pending Reviews
					</p>
				</div>
				{/* Stat Card 4 */}
				<div className="card p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
							<svg className="h-6 w-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
						</div>
					</div>
					<h3 className="text-2xl font-bold mb-1">{stats.shortLists}</h3>
					<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
						Shortlisted
					</p>
				</div>
			</div>
		</>
	)
}

export default JobStats
