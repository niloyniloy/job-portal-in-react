
import { Link } from "react-router-dom";
import { CDN_URL, renderProfileImage, timeAgo } from "./../../api/ApiCalls";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const baseURL = "http://localhost:9000/api";

function JobApplicants() {

	const [applicants, setApplicants] = useState({ count: 0, totalPages: 1, currentPage: 1, data: [] });
	const [filters, setFilters] = useState({ page: 1, status: "", experienceLevel: "", date: "" });
	const [toast, setToast] = useState({ message: "", type: "" });
	const statusRefs = useRef([]);
	const experienceRefs = useRef([]);
	const dateRefs = useRef([]);

	useEffect(() => {
		fetchApplicants();
	}, [filters]);

	const fetchApplicants = () => {
		const token = localStorage.getItem("token");
		axios.get(`${baseURL}/companies/applicants`, {
			headers: { Authorization: `Bearer ${token}` },
			params: filters
		}).then((response) => {
			setApplicants(prev => ({
				...response.data,
				data: filters.page === 1 ? response.data.data : [...prev.data, ...response.data.data]
			}));
		}).catch((error) => {

		});
	};

	const handleFilterChange = (type, value, checked) => {
		setFilters(prev => {
			const current = prev[type] ? prev[type].split(",") : [];
			const updated = checked ? [...current, value] : current.filter(v => v !== value);
			return { ...prev, [type]: updated.join(","), page: 1 };
		});
	};

	const handleDateChange = (value) => {
		setFilters(prev => ({ ...prev, date: value, page: 1 }));
	};

	const handleReset = () => {
		statusRefs.current.forEach(ref => ref && (ref.checked = false));
		experienceRefs.current.forEach(ref => ref && (ref.checked = false));
		dateRefs.current.forEach(ref => ref && (ref.checked = false));
		setFilters({ page: 1, status: "", experienceLevel: "", date: "" });
	};

	const handleLoadMore = () => {
		setFilters(prev => ({ ...prev, page: prev.page + 1 }));
	};

	const updateStatus = (applicationId, status) => {
		const token = localStorage.getItem("token");
		axios.patch(`${baseURL}/applications/${applicationId}/status`, { status }, {
			headers: { Authorization: `Bearer ${token}` }
		}).then(() => {
			setToast({ message: "Status updated successfully", type: "success" });
			setTimeout(() => setToast({ message: "", type: "" }), 3000);
			setApplicants(prev => ({
				...prev,
				data: prev.data.map(app => app.id === applicationId ? { ...app, status } : app)
			}));
		}).catch((error) => {
			setToast({ message: error.response?.data?.message || "Failed to update status", type: "error" });
			setTimeout(() => setToast({ message: "", type: "" }), 3000);
		});
	};

	const getStatusBadgeClass = (status) => {
		const classes = {
			"Hired": "bg-green-600 text-white",
			"Shortlisted": "bg-blue-600 text-white",
			"Rejected": "bg-red-600 text-white",
			"Interviewed": "badge-info",
			"New": "badge-info"
		};
		return classes[status] || "badge-info";
	};

	const getStatusButtons = (status) => {
		const buttons = {
			"New": ["Shortlisted", "Interviewed",  "Hired", "Rejected"],
			"Shortlisted": ["Interviewed",  "Hired", "Rejected"],
			"Interviewed": ["Hired", "Rejected"],
			"Hired": ["Rejected"]
		};
		return buttons[status] || [];
	};

	return (
		<>
			<>
				{/* Main Content */}
				<main className="container mx-auto px-4 py-8">
					{/* Page Header */}
					<div className="mb-8">
						<div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
							<Link
								to="/company/dashboard"
								className="hover:text-[hsl(var(--color-primary))]"
								reloadDocument
							>
								Dashboard
							</Link>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-right" class="lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
							<span className="text-[hsl(var(--color-foreground))]">Applicants</span>
						</div>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<h1 className="text-3xl font-bold mb-2">Job Applicants</h1>
								<p className="text-[hsl(var(--color-muted-foreground))]">
									Review and manage applicants
								</p>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
						{/* Filters Sidebar */}
						<aside className="lg:col-span-1">
							<div className="card p-6">
								<div className="flex items-center justify-between mb-4">
									<h3 className="font-semibold">Filters</h3>
									<button onClick={handleReset} className="text-sm text-[hsl(var(--color-primary))] hover:underline">
										Reset
									</button>
								</div>
								{/* Status Filter */}
								<div className="mb-6">
									<h4 className="text-sm font-medium mb-3">Application Status</h4>
									<div className="space-y-2">
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="New"
												ref={el => statusRefs.current[0] = el}
												onChange={(e) => handleFilterChange("status", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">New Applications</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Shortlisted"
												ref={el => statusRefs.current[1] = el}
												onChange={(e) => handleFilterChange("status", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Shortlisted</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Interviewed"
												ref={el => statusRefs.current[2] = el}
												onChange={(e) => handleFilterChange("status", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Interviewed</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Rejected"
												ref={el => statusRefs.current[3] = el}
												onChange={(e) => handleFilterChange("status", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Rejected</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Hired"
												ref={el => statusRefs.current[4] = el}
												onChange={(e) => handleFilterChange("status", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Hired</span>
										</label>
									</div>
								</div>
								{/* Experience Filter */}
								<div className="mb-6">
									<h4 className="text-sm font-medium mb-3">Experience Level</h4>
									<div className="space-y-2">
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Entry"
												ref={el => experienceRefs.current[0] = el}
												onChange={(e) => handleFilterChange("experienceLevel", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Entry Level (0-2 years)</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Mid"
												ref={el => experienceRefs.current[1] = el}
												onChange={(e) => handleFilterChange("experienceLevel", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Mid Level (3-5 years)</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Senior"
												ref={el => experienceRefs.current[2] = el}
												onChange={(e) => handleFilterChange("experienceLevel", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Senior (5+ years)</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Expert"
												ref={el => experienceRefs.current[3] = el}
												onChange={(e) => handleFilterChange("experienceLevel", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Expert (10+ years)</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="checkbox"
												value="Lead"
												ref={el => experienceRefs.current[4] = el}
												onChange={(e) => handleFilterChange("experienceLevel", e.target.value, e.target.checked)}
												className="rounded border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Lead (15+ years)</span>
										</label>
									</div>
								</div>
								{/* Date Filter */}
								<div>
									<h4 className="text-sm font-medium mb-3">Applied Date</h4>
									<div className="space-y-2">
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												name="date"
												value="last 7 days"
												ref={el => dateRefs.current[0] = el}
												onChange={(e) => handleDateChange(e.target.value)}
												className="border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Last 7 days</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												name="date"
												value="last 30 days"
												ref={el => dateRefs.current[1] = el}
												onChange={(e) => handleDateChange(e.target.value)}
												className="border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Last 30 days</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												name="date"
												value="3 months"
												ref={el => dateRefs.current[2] = el}
												onChange={(e) => handleDateChange(e.target.value)}
												className="border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">Last 3 months</span>
										</label>
										<label className="flex items-center gap-2 cursor-pointer">
											<input
												type="radio"
												name="date"
												value=""
												ref={el => dateRefs.current[3] = el}
												onChange={(e) => handleDateChange(e.target.value)}
												className="border-[hsl(var(--color-input))]"
											/>
											<span className="text-sm">All time</span>
										</label>
									</div>
								</div>
							</div>
						</aside>
						{/* Applicants List */}
						<div className="lg:col-span-3">
							{/* Applicant Cards */}
							<div className="space-y-4">
								{applicants.data.map((applicant) => (
									<div key={applicant.id} className="card p-6 hover:shadow-md transition-shadow">
										<div className="flex flex-col md:flex-row gap-6">
											<div className="flex-shrink-0">
												{applicant.user.profilePictureUrl ? (
													<img src={renderProfileImage(applicant.user.profilePictureUrl)} alt={applicant.user.name} className="h-16 w-16 rounded-full object-cover" />
												) : (
													<div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
														{applicant.user.name.charAt(0)}
													</div>
												)}
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
													<div>
														<h3 className="text-lg font-semibold mb-1">{applicant.user.name}</h3>
														<div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
															<span className="flex items-center gap-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path><rect x="2" y="4" width="20" height="16" rx="2"></rect></svg>
																{applicant.user.email}
															</span>
															<span className="flex items-center gap-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>
																{applicant.user.experienceLevel}
															</span>
															<span className="flex items-center gap-1">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
																Applied {timeAgo(applicant.createdAt).replace("Posted ", "")}
															</span>
														</div>
													</div>
													<span className={`badge ${getStatusBadgeClass(applicant.status)}`}>{applicant.status}</span>
												</div>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))]">Applied for &nbsp;<span class="font-medium text-[hsl(var(--color-foreground))]">{applicant.job?.title}</span></p>
												<br/>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">{applicant.coverLetter}</p>

												<div className="flex flex-wrap gap-2">
													<Link to={`/user/${applicant.user?.id}`} className="btn btn-outline text-sm h-9" reloadDocument>
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path><circle cx="12" cy="12" r="3"></circle></svg>
														View Profile
													</Link>
													<a href={renderProfileImage(applicant.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn btn-outline text-sm h-9" reloadDocument>
														<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>
														Resume
													</a>
													{getStatusButtons(applicant.status).map((status) => (
														status === "Shortlisted" ? (
															<button key={status} onClick={() => updateStatus(applicant.id, status)} className="btn btn-primary bg-blue-600 hover:bg-blue-700 transition text-sm h-9">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2"><path d="m16 11 2 2 4-4"></path><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
																Shortlist
															</button>
														) : status === "Interviewed" ? (
															<button key={status} onClick={() => updateStatus(applicant.id, status)} className="btn btn-primary text-sm h-9">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2"><path d="m16 11 2 2 4-4"></path><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
																Interview
															</button>
														) : status === "Hired" ? (

															<button key={status} onClick={() => updateStatus(applicant.id, status)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm h-9 flex items-center gap-2">
																<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
																	<circle cx="12" cy="12" r="10" />
																	<path d="M16 8l-5 5-3-3" />
																</svg>
																Hire
															</button>
														) : status === "Rejected" ? (
															<button key={status} onClick={() => updateStatus(applicant.id, status)} className="btn btn-outline text-sm h-9 text-red-600 hover:text-red-600">
																<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6"></path><path d="m9 9 6 6"></path></svg>
																Reject
															</button>
														) : null
													))}
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							{/* Load More */}
							{applicants.currentPage < applicants.totalPages && (
								<div className="mt-6 text-center">
									<button onClick={handleLoadMore} className="btn btn-outline">
										
										Load More Applicants
									</button>
								</div>
							)}
						</div>
					</div>
				</main>
				{toast.message && (
					<div className={`fixed top-6 z-[9999] left-1/3 right-6 w-80 rounded-md px-4 py-3 text-sm text-white shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
						<div className="flex items-center justify-between">
							<span>{toast.message}</span>
							<button onClick={() => setToast({ message: "", type: "" })} className="ml-4 text-white/80 hover:text-white">✕</button>
						</div>
					</div>
				)}
			</>
		</>
	)
}

export default JobApplicants
