
import { useParams, Link } from "react-router-dom";
import { getMyApplicationsWithFilters, renderProfileImage, formatDate, withdrawJobApplication, getJobsRecommendations } from "./../../api/ApiCalls";
import { useState, useEffect } from "react"; 
import UserIcon from './../icons/UserIcon' 
import EditIcon from './../icons/EditIcon' 
import FileTextIcon from './../icons/FileTextIcon' 
import LightbulbIcon from './../icons/LightbulbIcon' 
import EyeIcon from './../icons/EyeIcon'
import MapPinIconSmall from './../icons/MapPinIconSmall'

function UserProfile() {

	const [appFilters, setAppFilter] = useState({ status: "", sort: "Newest First", date: "" });
	const [MyApplications, setMyApplications] = useState({ count: "", data: [] });
	const [recommendations, setRecommendations] = useState([]);
	const [statusLists, setStatusLists] = useState([]);

	useEffect(() => {
		getMyApplicationsWithFilters(appFilters, setMyApplications, setStatusLists);
		getJobsRecommendations(setRecommendations);
	}, []);

	const withdrawApplicaton = (applicationId) => {

		if (confirm("Are you sure to withdraw application?")) {

			withdrawJobApplication(applicationId, setMyApplications);
			setMyApplications(prev => ({
				...prev,
				data: prev.data.filter(app => app.id !== applicationId),
			}));
		}
	}

	return (
		<>
			<main className="container mx-auto px-4 py-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
					<p className="text-[hsl(var(--color-muted-foreground))]">
						Here's what's happening with your job search today.
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Column */}
					<div className="lg:col-span-2 space-y-6">
						{/* Recent Applications */}
						<div className="card p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold">Recent Applications</h2>
								<Link
									to={`/user/applications`}
									className="text-sm text-[hsl(var(--color-primary))] hover:underline"
									reloadDocument
								>
									View All
								</Link>
							</div>
							<div className="space-y-4">
								{/* Application 1 */}

								{MyApplications.data.map((job) => (
									<div className="border border-[hsl(var(--color-border))] rounded-lg p-4">
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0">
												<div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
													<img
														src={renderProfileImage(job?.job?.company?.logoUrl)}
														alt={job?.job?.company?.name}
													/>
												</div>
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between gap-2 mb-2">
													<div>
														<h3 className="font-semibold mb-1">
															<Link to={`/job-details/${job.job.slug}`} className="hover:underline" reloadDocument>
																{job.job.title}
															</Link>
														</h3>
														<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
															{job?.job?.company?.name}
														</p>
													</div>
													<span className="badge badge-success">{job.status}</span>
												</div>
												<div className="flex flex-wrap items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))] mb-3">
													<span className="flex items-center gap-1">
														<MapPinIconSmall />
														{job?.job?.company?.location}
													</span>
													<span>•</span>
													<span className="flex items-center gap-1">
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="calendar" className="lucide lucide-calendar h-3 w-3"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
														Applied on {formatDate(job.createdAt)}
													</span>
													<span>•</span>
													<span className="flex items-center gap-1">
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="dollar-sign" className="lucide lucide-dollar-sign h-3 w-3"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
														${job.job.salaryMin} - ${job.job.salaryMax}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<Link
														to={`/job-details/${job.job.slug}`}
														className="btn btn-outline text-xs h-8"
														reloadDocument
													>
														<EyeIcon />
														View Job
													</Link>
													<button onClick={() => withdrawApplicaton(job.id)} className="btn btn-primary  text-xs h-8">
														Withdraw Application
													</button>
												</div>
											</div>
										</div>
									</div>
								))}
								{/* Application 2 */}
							</div>
						</div>
						{/* Recommended Jobs */}
						<div className="card p-6">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold">Recommended for You</h2>
								<Link
									to="/"
									className="text-sm text-[hsl(var(--color-primary))] hover:underline"
								>
									Browse All Jobs
								</Link>
							</div>
							<div className="space-y-4">
								{/* Recommended Job 1 */}
								{recommendations.slice(0,3).map((job) => (
									<article className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow">
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0">
												<div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
													<img
														src={renderProfileImage(job?.company?.logoUrl)}
														alt={job.company?.name}
													/>
												</div>
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between gap-2 mb-2">
													<div>
														<h3 className="font-semibold mb-1">
															<Link to={`/job-details/${job.slug}`} className="hover:underline">
																{job.title}
															</Link>
														</h3>
														<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
															{job.company?.name}
														</p>
													</div>
												</div>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3">
													{job.description}
												</p>
												<div className="flex flex-wrap gap-2 mb-3">
													<span className="badge badge-secondary">{job.type}</span>
													<span className="badge badge-outline">{job.workMode}</span>
													{job.skills.map((skill) => (
														<span className="badge badge-outline">{skill}</span>
													))}
												</div>
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-3 text-xs text-[hsl(var(--color-muted-foreground))]">
														<span className="flex items-center gap-1">
															<MapPinIconSmall />
															{job.location}
														</span>
														<span className="font-semibold text-[hsl(var(--color-primary))]">
															${job.salaryMin} - ${job.salaryMax}
														</span>
													</div>
													<div className="flex gap-2">
														<Link
															to={`/job-details/${job.slug}`}
															className="btn btn-primary text-xs h-8"
														>
															View Details
														</Link>
													</div>
												</div>
											</div>
										</div>
									</article>
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
								<Link
									to={`/user-profile`}
									className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									reloadDocument
								>
									<UserIcon />
									<span className="text-sm font-medium">View Profile</span>
								</Link>
								<Link
									to={`/user-profile/edit`}
									className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									reloadDocument
								>
									<EditIcon />
									<span className="text-sm font-medium">Edit Profile</span>
								</Link>
								<Link
									to={`/user/applications`}
									className="flex items-center gap-3 p-3 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									reloadDocument
								>
									<FileTextIcon />
									<span className="text-sm font-medium">My Applications</span>
								</Link>
							</div>
						</div>
						{/* Tips */}
						<div className="card p-6 bg-blue-50 border-blue-200">
							<div className="flex items-start gap-3 mb-3">
								<LightbulbIcon />
								<div>
									<h3 className="text-sm font-semibold text-blue-900 mb-1">
										Pro Tip
									</h3>
									<p className="text-xs text-blue-700">
										Applications submitted within 24 hours of posting have a 3x higher
										response rate.
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

export default UserProfile
