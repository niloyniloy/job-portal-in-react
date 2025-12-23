
import { useParams, Link } from "react-router-dom";
import { getJobDetails, renderProfileImage, submitApplication, timeAgo, checkUserLoggedIn, getMyJobApplications, withdrawJobApplicaton, formatSalary, timeAgoWithoutPosted, getSimilarJobs } from "./../../api/ApiCalls";
import { useState, useEffect } from "react";
import { formatDeadLineDate } from "./../../helpers/dateFormatters";
import Modal from './../Modal'
import ApplyJob from './ApplyJob'
import MapPinIcon from './../icons/MapPinIcon'
import DollarSignIcon from './../icons/DollarSignIcon'
import BarChartIcon from './../icons/BarChartIcon'
import CalendarIcon from './../icons/CalendarIcon'
import UsersIcon from './../icons/UsersIcon'
import MapPinIconSmall from './../icons/MapPinIconSmall'
import ClockIcon from './../icons/ClockIcon'
import LinkedInIcon from './../icons/LinkedInIcon'
import TwitterIcon from './../icons/TwitterIcon'
import FacebookIcon from './../icons/FacebookIcon'
import LinkIcon from './../icons/LinkIcon'
import GlobeIcon from './../icons/GlobeIcon'
import MapPinIconMuted from './../icons/MapPinIconMuted'
import UsersIconMuted from './../icons/UsersIconMuted'
import CalendarIconMuted from './../icons/CalendarIconMuted'

function JobDetails({ jobs }) {

	const { jobSlug } = useParams();
	const [jobDetails, setJobDetails] = useState({ id: "" });
	const [simiarJobs, setSimilarJobsLists] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [jobId, setJobId] = useState("");
	const [rendeModal, setRenderModal] = useState(false);
	const [coverMessage, setCoverMessage] = useState("");
	const [errorMsg, setErrorMsg] = useState("");
	const [MyAppliedJobs, setMyAppliedJobs] = useState([]);
	const [applyJobId, setApplyJobId] = useState("");
	const [toast, setToast] = useState({ message: "", type: "" });

	const isJobSeeker = localStorage.getItem("user") === 'USER' ? true : false;

	useEffect(() => {

		getJobDetails(jobSlug, setJobDetails, setLoading, setJobId);
		if (isJobSeeker) {
			getMyJobApplications(setMyAppliedJobs);
		}
	}, [setMyAppliedJobs]);

	useEffect(() => {
		if (jobId.length > 0) {
			getSimilarJobs(jobId, setSimilarJobsLists);
		}
	}, [jobId]);

	const applyForAJob = (jobId) => {

		if (checkUserLoggedIn()) {

			setCoverMessage("");
			setApplyJobId(jobId);
			setRenderModal(true);
		} else {
			alert("Please login to apply for a job");
		}
	}

	const submitApplyJob = () => {

		if (coverMessage.trim().length > 0) {
			submitApplication(applyJobId, coverMessage, setCoverMessage, setApplyJobId, setRenderModal, setMyAppliedJobs, setToast);
		} else {
			setErrorMsg("Cover letter is required");
		}

	}

	const hasAppliedToJob = (applications, jobId) => {
		if (!Array.isArray(applications)) return false;

		return applications.some(app => app.jobId === jobId);
	};

	const getApplicationIdByJobId = (applications, jobId) => {
		if (!Array.isArray(applications)) return null;

		const application = applications.find(app => app.jobId === jobId);
		return application ? application.id : null;
	};

	const withdrawApplicaton = (jobId) => {

		if (confirm("Are you sure to withdraw application?")) {

			const applicationId = getApplicationIdByJobId(MyAppliedJobs, jobId);
			withdrawJobApplicaton(applicationId);
			setMyAppliedJobs(prev =>
				prev.filter(app => app.id !== applicationId)
			);
		}
	}

	const shareOnLinkedIn = () => {
		const url = window.location.href;
		const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
		window.open(linkedInUrl, '_blank');
	}

	const shareOnTwitter = () => {
		const url = window.location.href;
		const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check%20out%20this%20job:%20${encodeURIComponent(jobDetails.title)}`;
		window.open(twitterUrl, '_blank');
	}

	const shareOnFacebook = () => {
		const url = window.location.href;
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank');
	}

	const copyLinkToClipboard = () => {
		const url = window.location.href;
		navigator.clipboard.writeText(url).then(() => {
			setToast({ message: 'Link copied to clipboard!', type: 'success' });
			setTimeout(() => setToast({ message: '', type: '' }), 3000);
		});
	}

	return (
		<>
			{/* Main Content */}
			<main className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Column */}
					<div className="lg:col-span-2 space-y-6">
						{/* Job Header */}
						<div className="card p-6">
							<div className="flex items-start gap-4">
								<div className="flex-shrink-0">

									{jobDetails?.company?.logoUrl ? (
										<div className="h-20 w-20 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
											<img src={renderProfileImage(jobDetails?.company?.logoUrl)} alt={jobDetails?.company?.name} className="h-20 w-20" />
										</div>
									) : (
										<div className="h-20 w-20 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-10 w-10 text-[hsl(var(--color-primary))]"
											>
												<path d="M10 12h4" />
												<path d="M10 8h4" />
												<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
												<path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
												<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
											</svg>

										</div>
									)}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-start justify-between gap-4 mb-3">
										<div>
											<h1 className="text-3xl font-bold mb-2">
												{jobDetails.title}
											</h1>
											<div className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]">
												<span
													className="text-lg font-medium hover:text-[hsl(var(--color-primary))]"
												>
													{jobDetails?.company?.name}
												</span>
												<span>•</span>
												<span className="flex items-center gap-1">
													<MapPinIconSmall />
													{jobDetails?.company?.location}
												</span>
												<span>•</span>
												<span className="flex items-center gap-1">
													<ClockIcon />
													{timeAgo(jobDetails.createdAt)}
												</span>
											</div>
										</div>

									</div>
									<div className="flex flex-wrap gap-2">
										<span className="badge badge-secondary">{jobDetails.type}</span>
										<span className="badge badge-outline">{jobDetails.workMode}</span>
									</div>
								</div>
							</div>
						</div>
						{/* Job Overview */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Job Overview</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											data-lucide="briefcase"
											className="lucide lucide-briefcase h-5 w-5 text-[hsl(var(--color-primary))]"
										>
											<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
											<rect width="20" height="14" x="2" y="6" rx="2" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Job Type
										</p>
										<p className="font-medium">{jobDetails.type}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<MapPinIcon />
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Location
										</p>
										<p className="font-medium">{jobDetails?.company?.location} ({jobDetails.workMode})</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<DollarSignIcon />
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Salary
										</p>
										<p className="font-medium">{formatSalary(jobDetails.salaryMin, jobDetails.salaryMax)} / year</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<BarChartIcon />
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Experience
										</p>
										<p className="font-medium">{jobDetails.experienceLevel}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<CalendarIcon />
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Application Deadline
										</p>
										<p className="font-medium">{formatDeadLineDate(jobDetails.deadline)}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<UsersIcon />
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Applicants
										</p>
										<p className="font-medium flex items-center gap-1">

											{jobDetails.applicants} applications
										</p>
									</div>
								</div>
							</div>
						</div>
						{/* Job Description */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Job Description</h2>
							<div className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]">
								<p>
									{jobDetails.description}
								</p>
							</div>

						</div>

						{jobDetails?.requirements && (

							<div className="card p-6">
								<h2 className="text-xl font-semibold mb-4">Requirements & Qualifications</h2>
								<div className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]">
									<p style={{ whiteSpace: "pre-line" }}>
										{jobDetails.requirements
											.split("\\n")
											.map((line, index) => (
												<span key={index}>
													{line}
													<br />
												</span>
											))}
									</p>
								</div>
							</div>
						)}


						{jobDetails?.benefits && (
							<div className="card p-6">
								<h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
								<div className="prose prose-sm max-w-none space-y-4 text-[hsl(var(--color-foreground))]">
									<p style={{ whiteSpace: "pre-line" }}>
										{jobDetails.benefits
											.split("\\n")
											.map((line, index) => (
												<span key={index}>
													{line}
													<br />
												</span>
											))}
									</p>
								</div>
							</div>
						)}

						{/* Required Skills */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Required Skills</h2>
							<div className="flex flex-wrap gap-2">
								{jobDetails?.skills?.map((skill) => (
									<span className="badge badge-secondary">{skill}</span>
								))}
							</div>
						</div>
						{/* Similar Jobs */}
						{simiarJobs.length > 0 && (
							<div className="card p-6">
								<h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
								<div className="space-y-4">
									{/* Similar Job 1 */}
									{simiarJobs?.slice(0, 3).map((jobs) => (
										<article className="border-b border-[hsl(var(--color-border))] pb-4 last:border-0 last:pb-0">
											<div className="flex gap-4">
												<div className="flex-shrink-0">

													{jobs?.company?.logoUrl ? (
														<div className="h-20 w-20 bg-[hsl(var(--color-secondary))] flex items-center justify-center">
															<img src={renderProfileImage(jobs?.company?.logoUrl)} alt={jobs?.company?.name} className="h-20 w-20" />
														</div>
													) : (
														<div className="h-20 w-20 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
															<svg
																xmlns="http://www.w3.org/2000/svg"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																strokeWidth="2"
																strokeLinecap="round"
																strokeLinejoin="round"
																className="h-10 w-10 text-[hsl(var(--color-primary))]"
															>
																<path d="M10 12h4" />
																<path d="M10 8h4" />
																<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
																<path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
																<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
															</svg>

														</div>

													)}

												</div>

												<div className="flex-1 min-w-0">
													<h3 className="font-semibold mb-1">
														<Link to={`/job-details/${jobs.slug}`} className="hover:underline" reloadDocument>
															{jobs.title}
														</Link>
													</h3>
													<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
														{jobs.company?.name} • {jobs.location} • {jobs.workMode}
													</p>
													<div className="flex items-center justify-between">
														<span className="text-sm font-medium text-[hsl(var(--color-primary))]">
															{formatSalary(jobs.salaryMin, jobs.salaryMax)}
														</span>
														<Link
															to={`/job-details/${jobs.slug}`}
															className="text-sm text-[hsl(var(--color-primary))] hover:underline"
															reloadDocument>
															View Details
														</Link>
													</div>
												</div>
											</div>
										</article>
									))}
								</div>
							</div>
						)}
					</div>
					{/* Sidebar Column */}
					<div className="lg:col-span-1 space-y-6">
						{/* Apply Section (Sticky) */}
						<div className="card p-6 lg:sticky lg:top-24">
							<div className="space-y-4">
								<div className="text-center pb-4 border-b border-[hsl(var(--color-border))]">
									<p className="text-2xl font-bold text-[hsl(var(--color-primary))] mb-1">
										{formatSalary(jobDetails.salaryMin, jobDetails.salaryMax)}
									</p>
									<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
										Per year
									</p>
								</div>
								{isJobSeeker && (
									hasAppliedToJob(MyAppliedJobs, jobDetails.id) ? (
										<button
											className="btn btn-primary w-full text-base"
											onClick={() => withdrawApplicaton(jobDetails.id)}
										>
											Withdraw
										</button>
									) : (

										<button
											className="btn btn-primary w-full text-base"
											onClick={() => applyForAJob(jobDetails.id)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-4 w-4 mr-2"
											>
												<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
												<path d="m21.854 2.147-10.94 10.939" />
											</svg>

											Apply Now
										</button>
									)
								)}

								<div className="pt-4 border-[hsl(var(--color-border))] space-y-3">
									<div className="flex items-center justify-between text-sm">
										<span className="text-[hsl(var(--color-muted-foreground))]">
											Applicants
										</span>
										<span className="font-medium">{jobDetails.applicants}</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-[hsl(var(--color-muted-foreground))]">
											Posted
										</span>
										<span className="font-medium">{timeAgoWithoutPosted(jobDetails.createdAt)}</span>
									</div>
								</div>
							</div>
						</div>
						{/* Company Info */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold mb-4">About Company</h3>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									{jobDetails?.company?.logoUrl ? (
										<div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
											<img src={renderProfileImage(jobDetails?.company?.logoUrl)} alt={jobDetails?.company?.name} className="h-20 w-20" />
										</div>
									) : (
										<div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="h-10 w-10 text-[hsl(var(--color-primary))]"
											>
												<path d="M10 12h4" />
												<path d="M10 8h4" />
												<path d="M14 21v-3a2 2 0 0 0-4 0v3" />
												<path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
												<path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
											</svg>

										</div>
									)}


									<div>
										<h4 className="font-semibold">{jobDetails?.company?.name}</h4>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											{jobDetails?.company?.industry}
										</p>
									</div>
								</div>
								<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
									{jobDetails?.company?.description}
								</p>
								<div className="space-y-2 pt-2">
									<div className="flex items-center gap-2 text-sm">
										<GlobeIcon />
										<a
											href={jobDetails?.company?.websiteUrl}
											className="text-[hsl(var(--color-primary))] hover:underline"
										>
											{jobDetails?.company?.websiteUrl}
										</a>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<MapPinIconMuted />
										<span className="text-[hsl(var(--color-muted-foreground))]">
											{jobDetails?.company?.location}
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<UsersIconMuted />
										<span className="text-[hsl(var(--color-muted-foreground))]">
											{jobDetails?.company?.employeeCount} employees
										</span>
									</div>
									<div className="flex items-center gap-2 text-sm">
										<CalendarIconMuted />
										<span className="text-[hsl(var(--color-muted-foreground))]">
											Founded in {jobDetails?.company?.foundedYear}
										</span>
									</div>
								</div>
								<Link
									to={`/company/profile/${jobDetails?.company?.slug}`}
									className="btn btn-outline w-full mt-4"
									reloadDocument
								>
									View Company Profile
								</Link>
							</div>
						</div>
						{/* Share Job */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold mb-4">Share this Job</h3>
							<div className="flex gap-2">
								<button
									className="btn btn-outline flex-1"
									title="Share on LinkedIn"
									onClick={shareOnLinkedIn}
								>
									<LinkedInIcon />
								</button>
								<button className="btn btn-outline flex-1" title="Share on Twitter" onClick={shareOnTwitter}>
									<TwitterIcon />
								</button>
								<button
									className="btn btn-outline flex-1"
									title="Share on Facebook"
									onClick={shareOnFacebook}
								>
									<FacebookIcon />
								</button>
								<button className="btn btn-outline flex-1" title="Copy link" onClick={copyLinkToClipboard}>
									<LinkIcon />
								</button>
							</div>
						</div>

					</div>
				</div>
			</main>
			<Modal open={rendeModal} onClose={() => setRenderModal(false)}>
				<ApplyJob
					setCoverMessage={setCoverMessage}
					errorMsg={errorMsg}
					coverMessage={coverMessage}
					setRenderModal={setRenderModal}
					submitApplyJob={submitApplyJob}
					setErrorMsg={setErrorMsg}
				/>
			</Modal>
			{toast.message && (
				<div
					className={`fixed top-6 z-[9999] left-1/3 right-6 z-50 w-80 rounded-md px-4 py-3 text-sm text-white shadow-lg
					${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
				>
					<div className="flex items-center justify-between">
						<span>{toast.message}</span>
						<button onClick={() => setToast({ message: "", type: "" })} className="ml-4 text-white/80 hover:text-white">
							✕
						</button>
					</div>
				</div>
			)}
		</>

	)
}

export default JobDetails
