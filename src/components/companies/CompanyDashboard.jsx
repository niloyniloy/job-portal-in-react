
import { useParams, Link } from "react-router-dom";
import { getDashboardStats, getDashboardJobs, formatJobPostedDate, getDashboardApplicants, formatApplicantDate, renderProfileImage, CDN_URL } from "./../../api/ApiCalls";
import { useState, useEffect } from "react";
import JobStats from './layouts/JobStats'
import { useAuthStore } from "./../../states/AuthStore";

function CompanyDashboard() {
	const [stats, setStats] = useState({
		activeJobs: 0,
		totalApplicants: 0,
		pendingReviews: 0,
		shortLists: 0
	});
	const [jobs, setJobs] = useState([]);
	const [applicants, setApplicants] = useState([]);
	const [toast, setToast] = useState(null);
	const user = useAuthStore((s) => s.user);

	useEffect(() => {
		getDashboardStats(setStats, setToast);
		getDashboardJobs(setJobs, setToast);
		getDashboardApplicants(setApplicants, setToast);
	}, []);

	return (
		<>
			<main className="container mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
					<p className="text-[hsl(var(--color-muted-foreground))]">
						Here's what's happening with your job postings today
					</p>
				</div>
				{/* Stats Grid */}
				<JobStats stats={stats} />

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Column */}
					<div className="lg:col-span-2 space-y-6">
						{/* Recent Jobs */}
						<div className="card">
							<div className="p-6 border-b border-[hsl(var(--color-border))]">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold">Recent Job Posts</h2>
									<Link
										to="/company/jobs"
										className="text-sm text-[hsl(var(--color-primary))] hover:underline"
									>
										View All
									</Link>
								</div>
							</div>
							<div className="divide-y divide-[hsl(var(--color-border))]">
								{jobs.map((job) => (
									<div key={job.id} className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
										<div className="flex items-start justify-between mb-3">
											<div className="flex-1">
												<h3 className="font-semibold mb-1">
													<Link
														to={`/job-details/${job.slug}`}
														className="hover:text-[hsl(var(--color-primary))]"
													>
														{job.title}
													</Link>
												</h3>
												<div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
													<span className="flex items-center gap-1">
														<svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
														{job.location}
													</span>
													<span className="flex items-center gap-1">
														<svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 0v10l8 4" /></svg>
														{job.type}
													</span>
													<span className="flex items-center gap-1">
														<svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
														{formatJobPostedDate(job.createdAt)}
													</span>
												</div>
											</div>
										</div>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-4 text-sm">
												<span className="text-[hsl(var(--color-muted-foreground))]">
													<span className="font-semibold text-[hsl(var(--color-foreground))]">
														{job.applicants}
													</span>
													&nbsp; applicants
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Link to={`/job-details/${job.slug}`} className="btn btn-outline text-xs h-8" reloadDocument>
													<svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
													View
												</Link>
												<Link to={`/company/post-job/${job.slug}`} className="btn btn-outline text-xs h-8" reloadDocument>
													<svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
													Edit
												</Link>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Recent Applicants */}
						<div className="card">
							<div className="p-6 border-b border-[hsl(var(--color-border))]">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold">Recent Applicants</h2>
									<Link
										to={`/company/applicants`}
										className="text-sm text-[hsl(var(--color-primary))] hover:underline"
									>
										View All
									</Link>
								</div>
							</div>
							<div className="divide-y divide-[hsl(var(--color-border))]">
								{applicants.map((applicant) => (
									<div key={applicant.id} className="p-6 hover:bg-[hsl(var(--color-accent))] transition-colors">
										<div className="flex items-start gap-4">
											<img src={renderProfileImage(applicant.user.profilePictureUrl)} alt={applicant.user.name} className="h-12 w-12 rounded-full object-cover flex-shrink-0" />
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between mb-2">
													<div>
														<h3 className="font-semibold mb-1">{applicant.user.name}</h3>
														<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
															Applied for &nbsp;
															<span className="font-medium text-[hsl(var(--color-foreground))]">
																{applicant.job.title}
															</span>
														</p>
													</div>
													<span className="text-xs text-[hsl(var(--color-muted-foreground))]">
														{formatApplicantDate(applicant.updatedAt)} ago
													</span>
												</div>
												<div className="flex items-center gap-2">
													<button className="btn btn-primary text-xs h-8">
														<svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
														{applicant.status}
													</button>
													<Link to={`/user/${applicant.user?.id}`} className="btn btn-outline text-xs h-8" reloadDocument>
														<svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
														View Profile
													</Link>
													<a href={renderProfileImage(applicant.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-xs h-8">
														<svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
														Resume
													</a>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
					{/* Sidebar Column */}
					<div className="lg:col-span-1 space-y-6">
						{/* Quick Actions */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
							<div className="space-y-2">
								<Link to="/company/post-job" className="btn btn-primary w-full justify-start" reloadDocument>
									<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
									Post New Job
								</Link>
								<Link to="/company/jobs" className="btn btn-outline w-full justify-start" reloadDocument>
									<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
									Manage Jobs
								</Link>
								<Link to="/company/applicants" className="btn btn-outline w-full justify-start" reloadDocument>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users h-4 w-4 mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
									View Applicants
								</Link>
								<Link to="/company/edit" className="btn btn-outline w-full justify-start" reloadDocument>
									<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
									Company Settings
								</Link>
							</div>
						</div>
						{/* Tips Card */}
						<div className="card p-6 bg-blue-50 border-blue-200">
							<div className="flex items-start gap-3">
								<div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
									<svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" /></svg>
								</div>
								<div>
									<h4 className="font-semibold mb-2 text-blue-900">Pro Tip</h4>
									<p className="text-sm text-blue-800">
										Jobs with detailed descriptions get 40% more quality applicants.
										Keep your postings updated!
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>

	)
}

export default CompanyDashboard
