import { Link } from "react-router-dom";
import { timeAgo, checkUserLoggedIn, renderProfileImage, submitApplication, withdrawJobApplicaton, getMyJobApplications } from "./../../api/ApiCalls";
import { useState, useEffect } from "react";
import Modal from './../Modal'
import ApplyJob from './ApplyJob'

function JobCard({ jobs }) {

	const [rendeModal, setRenderModal] = useState(false);
	const [coverMessage, setCoverMessage] = useState("");
	const [applyJobId, setApplyJobId] = useState("");
	const [toast, setToast] = useState({ message: "", type: "" });
	const [errorMsg, setErrorMsg] = useState("");
	const [MyAppliedJobs, setMyAppliedJobs] = useState([]);


	useEffect(() => {
		getMyJobApplications(setMyAppliedJobs);
	}, []);

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
			getMyJobApplications(setMyAppliedJobs);
		} else {
			setErrorMsg("Cover letter is required");
		}

	}

	const withdrawApplicaton = (jobId) => {

		if (confirm("Are you sure to withdraw application?")) {

			const applicationId = getApplicationIdByJobId(MyAppliedJobs, jobId);
			withdrawJobApplicaton(applicationId);
			setMyAppliedJobs(prev =>
				prev.filter(app => app.id !== applicationId)
			);
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

	return (
		<>
			{jobs.map((job) => (

				<article className="card p-6 hover:shadow-md transition-shadow">
					<div className="flex flex-col md:flex-row gap-4">
						{/* Company Logo */}
						<div className="flex-shrink-0">
							{job?.company?.logoUrl ? (
								<div className="h-16 w-16 bg-[hsl(var(--color-secondary))] flex items-center justify-center">
									<img src={renderProfileImage(job?.company?.logoUrl)} alt={job?.company?.name} className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center" />
								</div>
							) : (
								<div className="h-16 w-16 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center">
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
						{/* Job Details */}
						<div className="flex-1 space-y-3">
							<div className="flex items-start justify-between gap-4">
								<div>
									<h3 className="text-lg font-semibold mb-1">

										<Link
											to={`/job-details/${job.slug}`}
											className="hover:underline"
											reloadDocument
										>
											{job.title}
										</Link>
									</h3>
									<div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
										<a
											href="company-profile.html"
											className="hover:text-primary font-medium"
										>
											{job.company.name}
										</a>
										<span>•</span>
										<span className="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin h-4 w-4"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
											{job.company.location}
										</span>
										<span>•</span>
										<span className="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="clock" class="lucide lucide-clock h-4 w-4"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
											{timeAgo(job.createdAt)}
										</span>
									</div>
								</div>
							</div>
							<p className="text-sm text-muted-foreground line-clamp-2">
								{job.description}
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="badge badge-primary">{job.type}</span>
								<span className="badge badge-primary">{job.workMode}</span>
								{job.skills.map((skill) => (
									<span className="badge badge-secondary">{skill}</span>
								))}

							</div>
							<div className="flex flex-wrap items-center justify-between gap-4 pt-2">
								<div className="flex items-center gap-4">
									<span className="text-sm font-semibold text-primary">
										${job.salaryMin} - ${job.salaryMax}
									</span>
									<span className="text-xs text-muted-foreground flex items-center gap-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
										{job.applicants} applicants
									</span>
								</div>
								<div className="flex gap-2">
									<Link
										to={`/job-details/${job.slug}`}
										className="btn btn-outline text-sm"
										target="_blank"
										reloadDocument
									>
										View Details
									</Link>
									{hasAppliedToJob(MyAppliedJobs, job.id) ? (
										<button
											className="btn btn-primary text-sm"
											onClick={() => withdrawApplicaton(job.id)}
										>
											Withdraw
										</button>
									) : (
										<button
											className="btn btn-primary text-sm"
											onClick={() => applyForAJob(job.id)}
										>
											Apply Now
										</button>
									)}

								</div>
							</div>
						</div>
					</div>
				</article>
			))}

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

export default JobCard
