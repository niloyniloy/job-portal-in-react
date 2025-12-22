
import { useParams, Link } from "react-router-dom";
import { CDN_URL, getCompanyProfileBySlug, renderProfileImage, formatSalary, timeAgo } from "./../../api/ApiCalls";
import { useState, useEffect } from "react";


function CompanyProfile() {

	const { companySlug } = useParams();
	const [company, setCompany] = useState({
		name: "",
		description: "",
		location: "",
		logoUrl: "",
		employeeCount: "",
		industry: "",
		websiteUrl: "",
		email: "",
		phone: "",
		socialLinks: { linkedin: "", facebook: "", twitter: "", instagram: "", github: "" },
		jobs: []
	});
	const [error, setError] = useState(null);
	const [toast, setToast] = useState({ message: "", type: "" });

	const handleShare = () => {
		navigator.clipboard.writeText(window.location.href);
		setToast({ message: "Link copied to clipboard", type: "success" });
		setTimeout(() => setToast({ message: "", type: "" }), 3000);
	};

	useEffect(() => {
		getCompanyProfileBySlug(companySlug, setCompany, setError);
	}, [companySlug]);

	if (error) {
		return (
			<main className="container mx-auto px-4 py-8">
				<div className="card p-12 text-center">
					<svg
						className="mx-auto h-12 w-12 text-muted-foreground mb-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 className="text-lg font-semibold mb-2">{error}</h3>
					<p className="text-sm text-muted-foreground mb-4">
						The company you're looking for doesn't exist or has been removed.
					</p>
					<Link to="/" className="btn btn-primary">
						Back to Home
					</Link>
				</div>
			</main>
		);
	}

	return (
		<>
			<>
				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					{/* Company Header */}
					<div className="card p-8 mb-8">
						<div className="flex flex-col md:flex-row gap-6 items-center">
							{/* Company Logo */}
							<div className="flex-shrink-0">
								<div className="h-32 w-32 rounded-xl bg-[hsl(var(--color-secondary))] flex items-center justify-center overflow-hidden">
									{company.logoUrl ? (
										<img src={renderProfileImage(company.logoUrl)} alt={company.name} className="h-full w-full object-cover" />
									) : (
										<svg className="h-16 w-16 text-[hsl(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" /><rect x="5" y="7" width="14" height="9" /></svg>
									)}
								</div>
							</div>
							{/* Company Info */}
							<div className="flex-1 h-full items-center">
								<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
									<div>
										<h1 className="text-3xl font-bold mb-2">{company.name}</h1>
										<div className="flex flex-wrap items-center gap-3 text-[hsl(var(--color-muted-foreground))]">
											<span className="flex items-center gap-1">
												<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" /></svg>
												{company.industry}
											</span>
											<span>•</span>
											<span className="flex items-center gap-1">
												<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
												{company.location}
											</span>
											<span>•</span>
											<span className="flex items-center gap-1">
												<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
												{company.employeeCount} employees
											</span>
										</div>
									</div>
									<div className="flex gap-2">
										<button className="btn btn-outline" onClick={handleShare}>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="share-2" class="lucide lucide-share-2 h-4 w-4 mr-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
											Share
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content Column */}
						<div className="lg:col-span-2 space-y-6">
							{/* About Company */}
							<div className="card p-6">
								<h2 className="text-xl font-semibold mb-4">About Company</h2>
								<div className="space-y-4 text-[hsl(var(--color-foreground))]">
									<p>
										{company.description}
									</p>
								</div>
							</div>

							{/* Open Positions */}
							<div className="card p-6" id="jobs">
								<div className="flex items-center justify-between mb-4">
									<h2 className="text-xl font-semibold">Open Positions</h2>
									<span className="text-sm text-[hsl(var(--color-muted-foreground))]">
										{company.jobs?.length || 0} jobs available
									</span>
								</div>
								<div className="space-y-4">
									{company.jobs?.map((job) => (
										<article key={job.id} className="border border-[hsl(var(--color-border))] rounded-lg p-4 hover:shadow-md transition-shadow">
											<div className="flex items-start justify-between gap-4 mb-3">
												<div className="flex-1">
													<h3 className="text-lg font-semibold mb-1">
														<a href={`/job-details/${job.slug}`} className="hover:underline">
															{job.title}
														</a>
													</h3>
													<div className="flex flex-wrap items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))]">
														<span className="flex items-center gap-1">
															<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
															{job.location}
														</span>
														<span>•</span>
														<span className="flex items-center gap-1">
															<svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
															{timeAgo(job.createdAt)}
														</span>
														<span className="flex items-center gap-1">
															<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="users" class="lucide lucide-users h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
															{job.applicants} applicants
														</span>
													</div>
												</div>
											</div>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-3 line-clamp-2">
												{job.description}
											</p>
											<div className="flex flex-wrap gap-2 mb-3">
												<span className="badge badge-secondary">{job.type}</span>
												<span className="badge badge-outline">{job.workMode}</span>
												{job.skills?.slice(0, 3).map((skill) => (
													<span key={skill} className="badge badge-outline">{skill}</span>
												))}
											</div>
											<div className="flex items-center justify-between pt-3 border-t border-[hsl(var(--color-border))]">
												<span className="text-sm font-semibold text-[hsl(var(--color-primary))]">
													{formatSalary(job.salaryMin, job.salaryMax)}
												</span>
												<div className="flex gap-2">
													<a
														href={`/job-details/${job.slug}`}
														className="btn btn-outline text-sm"
													>
														View Details
													</a>
												</div>
											</div>
										</article>
									))}
								</div>
								
							</div>
						</div>
						{/* Sidebar Column */}
						<div className="lg:col-span-1 space-y-6">
							{/* Contact Information */}
							<div className="card p-6">
								<h3 className="text-lg font-semibold mb-4">Contact Information</h3>
								<div className="space-y-3">
									<div className="flex items-start gap-3">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="globe" class="lucide lucide-globe h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>
										<div>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
												Website
											</p>
											<a
												href={company.websiteUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
											>
												{company.websiteUrl}
											</a>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="mail" class="lucide lucide-mail h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
										<div>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
												Email
											</p>
											<a
												href={`mailto:${company.email}`}
												className="text-sm font-medium text-[hsl(var(--color-primary))] hover:underline"
											>
												{company.email}
											</a>
										</div>
									</div>
									{company.phone && (
										<div className="flex items-start gap-3">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="phone" class="lucide lucide-phone h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"></path></svg>
											<div>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
													Phone
												</p>
												<a href={`tel:${company.phone}`} className="text-sm font-medium">
													{company.phone}
												</a>
											</div>
										</div>
									)}
									<div className="flex items-start gap-3">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="map-pin" class="lucide lucide-map-pin h-5 w-5 text-[hsl(var(--color-muted-foreground))] flex-shrink-0 mt-0.5"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg>
										<div>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
												Headquarters
											</p>
											<p className="text-sm font-medium">
												{company.location}
											</p>
										</div>
									</div>
								</div>
							</div>
							{/* Social Media */}
							<div className="card p-6">
								<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
								<div className="space-y-2">
									{company.socialLinks?.linkedin && (
										<a
											href={company.socialLinks.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="linkedin" class="lucide lucide-linkedin h-5 w-5 text-[hsl(var(--color-muted-foreground))]"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
											<span className="text-sm font-medium">LinkedIn</span>
										</a>
									)}
									{company.socialLinks?.facebook && (
										<a
											href={company.socialLinks.facebook}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="facebook" class="lucide lucide-facebook h-5 w-5 text-[hsl(var(--color-muted-foreground))]"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
											<span className="text-sm font-medium">Facebook</span>
										</a>
									)}

									{company.socialLinks?.twitter && (
										<a
											href={company.socialLinks?.twitter}
											target="_blank"
											className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="twitter" class="lucide lucide-twitter h-5 w-5 text-[hsl(var(--color-muted-foreground))]"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
											<span className="text-sm font-medium">Twitter</span>
										</a>

									)}

									{company.socialLinks?.instagram && (
										<a
											href={company.socialLinks?.instagram}
											target="_blank"
											className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="instagram" class="lucide lucide-instagram h-5 w-5 text-[hsl(var(--color-muted-foreground))]"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
											<span className="text-sm font-medium">Instagram</span>
										</a>
									)}

									{company.socialLinks?.github && (
										<a
											href={company.socialLinks?.github}
											target="_blank"
											className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="github" class="lucide lucide-github h-5 w-5 text-[hsl(var(--color-muted-foreground))]"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
											<span className="text-sm font-medium">GitHub</span>
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				</main>
				{toast.message && (
					<div
						className={`fixed top-6 z-[9999] left-1/3 right-6 w-80 rounded-md px-4 py-3 text-sm text-white shadow-lg
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
		</>

	)
}

export default CompanyProfile
