import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCompanyJobs, deleteCompanyJob } from "../../api/ApiCalls";

function ManageJobs() {
	const [jobs, setJobs] = useState({ count: 0, totalPages: 1, currentPage: 1, data: [] });
	const [filters, setFilters] = useState({ page: 1, search: "", sort: "newest", status: "" });
	const [toast, setToast] = useState({ message: "", type: "" });

	useEffect(() => {
		getCompanyJobs(filters, setJobs);
	}, [filters]);

	const deleteJob = (jobId) => {
		if (!confirm("Are you sure you want to delete this job?")) return;
		deleteCompanyJob(jobId, setToast, () => getCompanyJobs(filters, setJobs));
	};

	const formatDate = (dateString) => {
		if (!dateString) return "N/A";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
	};

	const getStatusBadgeClass = (status) => {
		const classes = {
			"Active": "badge-success",
			"Archived": "badge-warning",
			"Closed": "badge-danger"
		};
		return classes[status] || "badge-secondary";
	};

	const handleSearch = (e) => {
		setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }));
	};

	const handleSort = (sort) => {
		setFilters(prev => ({ ...prev, sort, page: 1 }));
		document.getElementById('sortFilter').classList.remove('show');
	};

	const handleStatus = (status) => {
		setFilters(prev => ({ ...prev, status, page: 1 }));
		document.getElementById('statusFilter').classList.remove('show');
	};

	const getStatusLabel = () => {
		const labels = { "Active": "Active", "Closed": "Closed", "Archived": "Archived" };
		return labels[filters.status] || "Status";
	};

	const getSortLabel = () => {
		const labels = { "newest": "Newest First", "oldest": "Oldest First" };
		return labels[filters.sort] || "Sort";
	};

	const handlePageChange = (page) => {
		setFilters(prev => ({ ...prev, page }));
	};

	const getShowingText = () => {
		const start = (filters.page - 1) * 10 + 1;
		const end = Math.min(filters.page * 10, jobs.count);
		return `Showing ${start} to ${end} of ${jobs.count} jobs`;
	};

	function toggleDropdown(id) {
		const dropdown = document.getElementById(id);
		dropdown.classList.toggle("hidden");

		// Close dropdown when clicking outside
		document.addEventListener("click", function closeDropdown(e) {
			if (
				!e.target.closest(`#${id}`) &&
				!e.target.closest("button")
			) {
				dropdown.classList.add("hidden");
				document.removeEventListener("click", closeDropdown);
			}
		});

		dropdown.classList.toggle("show");
	}
	return (
		<>
			<main className="container mx-auto px-4 py-8">
				<div className="mb-8">
					<div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
						<Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]" reloadDocument>
							Dashboard
						</Link>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-right" class="lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
						<span className="text-[hsl(var(--color-foreground))]">Manage Jobs</span>
					</div>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div>
							<h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
							<p className="text-[hsl(var(--color-muted-foreground))]">View and manage your job postings</p>
						</div>
						<Link to="/company/post-job" className="btn btn-primary" reloadDocument>
							<svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
							Post New Job
						</Link>
					</div>
				</div>

				<div className="card p-6 mb-6">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="flex-1">
							<div className="relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="search" class="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(var(--color-muted-foreground))]"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
								<input
									type="text"
									placeholder="Search jobs..."
									value={filters.search}
									onChange={handleSearch}
									className="input pl-10 w-full"
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<div className="dropdown">
								<button onClick={() => toggleDropdown('statusFilter')} className="btn btn-outline">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="filter" class="lucide lucide-filter h-4 w-4 mr-2"><path d="M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"></path></svg>
									{getStatusLabel()}
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-down" class="lucide lucide-chevron-down h-4 w-4 ml-2"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
								<div id="statusFilter" className="dropdown-content card p-2 hidden">
									<button onClick={() => handleStatus("")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">All</button>
									<button onClick={() => handleStatus("Active")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">Active</button>
									<button onClick={() => handleStatus("Closed")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">Closed</button>
									<button onClick={() => handleStatus("Archived")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">Archived</button>
								</div>
							</div>
							<div className="dropdown">
								<button onClick={() => toggleDropdown('sortFilter')} className="btn btn-outline">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="arrow-up-down" class="lucide lucide-arrow-up-down h-4 w-4 mr-2"><path d="m21 16-4 4-4-4"></path><path d="M17 20V4"></path><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path></svg>
									{getSortLabel()}
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-down" class="lucide lucide-chevron-down h-4 w-4 ml-2"><path d="m6 9 6 6 6-6"></path></svg>
								</button>
								<div id="sortFilter" className="dropdown-content card p-2 hidden">
									<button onClick={() => handleSort("newest")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">Newest First</button>
									<button onClick={() => handleSort("oldest")} className="w-full text-left text-sm p-2 hover:bg-accent rounded">Oldest First</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-[hsl(var(--color-muted))] border-b border-[hsl(var(--color-border))]">
								<tr>
									<th className="text-left p-4 font-semibold">Job Title</th>
									<th className="text-left p-4 font-semibold">Status</th>
									<th className="text-left p-4 font-semibold">Applicants</th>
									<th className="text-left p-4 font-semibold">Posted</th>
									<th className="text-left p-4 font-semibold">Expires</th>
									<th className="text-left p-4 font-semibold">Actions</th>
								</tr>
							</thead>
							<tbody>
								{jobs.data.map((job) => (
									<tr key={job.id} className="border-b border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-accent))]">
										<td className="p-4">
											<div>
												<h3 className="font-semibold mb-1">{job.title}</h3>
												<p className="text-sm text-[hsl(var(--color-muted-foreground))] line-clamp-1 mb-2">{job.description}</p>
												<div className="flex flex-wrap gap-1">
													{job.skills?.map((skill) => (
														<span key={skill} className="badge badge-secondary text-xs">{skill}</span>
													))}
												</div>
											</div>
										</td>
										<td className="p-4">
											<span className={`badge ${getStatusBadgeClass(job.status)}`}>{job.status}</span>
										</td>
										<td className="p-4">
											<span className="text-sm font-semibold">{job.applicants}</span>
										</td>
										<td className="p-4">
											<span className="text-sm">{formatDate(job.createdAt)}</span>
										</td>
										<td className="p-4">
											<span className="text-sm">{formatDate(job.deadline)}</span>
										</td>
										<td className="p-4">
											<div className="flex gap-2">
												<Link to={`/company/post-job/${job.slug}`} className="btn-ghost p-2" title="Edit" reloadDocument>
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="edit" class="lucide lucide-edit h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
												</Link>
												<button style={{paddingBottom:"20px"}} onClick={() => deleteJob(job.id)} className="btn-ghost p-2 text-red-600" title="Delete">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="trash-2" class="lucide lucide-trash-2 h-4 w-4"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="p-4 border-t border-[hsl(var(--color-border))] flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-sm text-[hsl(var(--color-muted-foreground))]">{getShowingText()}</p>
						<div className="flex gap-2">
							<button
								onClick={() => handlePageChange(filters.page - 1)}
								disabled={filters.page === 1}
								className="btn btn-outline text-sm"
							>
								<i data-lucide="chevron-left" className="h-4 w-4" />
								Previous
							</button>
							{[...Array(jobs.totalPages)].map((_, i) => (
								<button
									key={i + 1}
									onClick={() => handlePageChange(i + 1)}
									className={`btn ${filters.page === i + 1 ? "btn-primary" : "btn-outline"} text-sm`}
								>
									{i + 1}
								</button>
							))}
							<button
								onClick={() => handlePageChange(filters.page + 1)}
								disabled={filters.page === jobs.totalPages}
								className="btn btn-outline text-sm"
							>
								Next
								<i data-lucide="chevron-right" className="h-4 w-4" />
							</button>
						</div>
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
	);
}

export default ManageJobs;
