import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createJob, updateJob, getJobById, getJobBySlug } from "../../api/ApiCalls";

function PostJob() {
	const { jobSlug } = useParams();
	const navigate = useNavigate();
	const [toast, setToast] = useState({ message: "", type: "" });
	const [skills, setSkills] = useState([]);
	const [skillInput, setSkillInput] = useState("");
	const [jobId, setJobId] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		type: "",
		workMode: "",
		category: "",
		experienceLevel: "",
		location: "",
		salaryMin: "",
		salaryMax: "",
		salaryPeriod: "Yearly",
		description: "",
		requirements: "",
		benefits: "",
		vacancies: 1,
		deadline: ""
	});

	useEffect(() => {
		if (jobSlug) {
			getJobBySlug(jobSlug, (data) => {
				setJobId(data.id);
				setFormData({
					title: data.title || "",
					type: data.type || "",
					workMode: data.workMode || "",
					category: data.category || "",
					experienceLevel: data.experienceLevel || "",
					location: data.location || "",
					salaryMin: data.salaryMin || "",
					salaryMax: data.salaryMax || "",
					salaryPeriod: data.salaryPeriod || "Yearly",
					description: data.description || "",
					requirements: data.requirements || "",
					benefits: data.benefits || "",
					vacancies: data.vacancies || 1,
					deadline: data.deadline ? data.deadline.split('T')[0] : ""
				});
				setSkills(data.skills || []);
			}, setToast);
		}
	}, [jobSlug]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		setFormData(prev => ({ ...prev, [id]: value }));
	};

	const addSkill = () => {
		if (skillInput.trim() && !skills.includes(skillInput.trim())) {
			setSkills([...skills, skillInput.trim()]);
			setSkillInput("");
		}
	};

	const removeSkill = (skillToRemove) => {
		setSkills(skills.filter(skill => skill !== skillToRemove));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!formData.title || !formData.type || !formData.workMode || !formData.category || 
			!formData.experienceLevel || !formData.salaryMin || !formData.salaryMax || 
			!formData.description || skills.length === 0 || !formData.vacancies) {
			setToast({ message: "Please fill all required fields", type: "error" });
			setTimeout(() => setToast({ message: "", type: "" }), 3000);
			return;
		}

		if (formData.deadline && new Date(formData.deadline) < new Date().setHours(0,0,0,0)) {
			setToast({ message: "Deadline cannot be set before today", type: "error" });
			setTimeout(() => setToast({ message: "", type: "" }), 3000);
			return;
		}

		const jobData = {
			...formData,
			salaryMin: Number(formData.salaryMin),
			salaryMax: Number(formData.salaryMax),
			vacancies: Number(formData.vacancies),
			skills,
			deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null
		};

		if (jobSlug && jobId) {
			updateJob(jobId, jobData, setToast, (responseData) => {
				setTimeout(() => navigate(`/company/post-job/${responseData.slug}`), 1000);
			});
		} else {
			createJob(jobData, setToast, (responseData) => {
				setTimeout(() => navigate(`/company/post-job/${responseData.slug}`), 1000);
			});
		}
	};

	return (
		<>
			<main className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Page Header */}
				<div className="mb-8">
					<div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
						<Link to="/company/dashboard" className="hover:text-[hsl(var(--color-primary))]" reloadDocument>
							Dashboard
						</Link>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="chevron-right" class="lucide lucide-chevron-right h-4 w-4"><path d="m9 18 6-6-6-6"></path></svg>
						<span className="text-[hsl(var(--color-foreground))]">{jobSlug ? 'Edit Job' : 'Create Job'}</span>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">{jobSlug ? 'Edit Job' : 'Post a New Job'}</h1>
							<p className="text-[hsl(var(--color-muted-foreground))]">
								Fill in the details to {jobSlug ? 'update the' : 'create a new'} job posting
							</p>
						</div>
						<Link to="/company/jobs" className="btn btn-outline" reloadDocument>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" class="lucide lucide-x h-4 w-4 mr-2"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
							Cancel
						</Link>
					</div>
				</div>
				{/* Create Job Form */}
				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Basic Information */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Basic Information</h2>
						<div className="space-y-6">
							<div>
								<label htmlFor="title" className="label block mb-2">
									Job Title *
								</label>
								<input
									type="text"
									id="title"
									value={formData.title}
									onChange={handleInputChange}
									className="input"
									placeholder="e.g. Senior Full Stack Developer"
									required
								/>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="type" className="label block mb-2">
										Job Type *
									</label>
									<select id="type" value={formData.type} onChange={handleInputChange} className="select" required>
										<option value="">Select job type</option>
										<option value="Full-time">Full-Time</option>
										<option value="Part-time">Part-Time</option>
										<option value="Contract">Contract</option>
										<option value="Freelance">Freelance</option>
										<option value="Internship">Internship</option>
									</select>
								</div>
								<div>
									<label htmlFor="workMode" className="label block mb-2">
										Work Mode *
									</label>
									<select id="workMode" value={formData.workMode} onChange={handleInputChange} className="select" required>
										<option value="">Select work mode</option>
										<option value="On-Site">On-Site</option>
										<option value="Remote">Remote</option>
										<option value="Hybrid">Hybrid</option>
									</select>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="category" className="label block mb-2">
										Category *
									</label>
									<select id="category" value={formData.category} onChange={handleInputChange} className="select" required>
										<option value="">Select category</option>
										<option value="Engineering">Engineering</option>
										<option value="Design">Design</option>
										<option value="Product">Product</option>
										<option value="Marketing">Marketing</option>
										<option value="Sales">Sales</option>
										<option value="Human Resources">Human Resources</option>
										<option value="Finance">Finance</option>
										<option value="Other">Other</option>
									</select>
								</div>
								<div>
									<label htmlFor="experienceLevel" className="label block mb-2">
										Experience Level *
									</label>
									<select id="experienceLevel" value={formData.experienceLevel} onChange={handleInputChange} className="select" required>
										<option value="">Select experience level</option>
										<option value="Entry">Entry Level (0-2 years)</option>
										<option value="Mid">Mid Level (2-5 years)</option>
										<option value="Senior">Senior Level (5-10 years)</option>
										<option value="Expert">Expert (10+ years)</option>
										<option value="Lead">Lead (15+ years)</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					{/* Location & Salary */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">
							Location &amp; Compensation
						</h2>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div>
									<label htmlFor="location" className="label block mb-2">
										Location *
									</label>
									<input
										type="text"
										id="location"
										value={formData.location}
										onChange={handleInputChange}
										className="input"
										placeholder="e.g. San Francisco"
									/>
								</div>
								<div>
									<label htmlFor="salaryMin" className="label block mb-2">
										Minimum Salary ($) *
									</label>
									<input
										type="number"
										id="salaryMin"
										value={formData.salaryMin}
										onChange={handleInputChange}
										className="input"
										placeholder="e.g. 100000"
										required
									/>
								</div>
								<div>
									<label htmlFor="salaryMax" className="label block mb-2">
										Maximum Salary ($) *
									</label>
									<input
										type="number"
										id="salaryMax"
										value={formData.salaryMax}
										onChange={handleInputChange}
										className="input"
										placeholder="e.g. 150000"
										required
									/>
								</div>
								<div>
									<label htmlFor="salaryPeriod" className="label block mb-2">
										Salary Period
									</label>
									<select id="salaryPeriod" value={formData.salaryPeriod} onChange={handleInputChange} className="select">
										<option value="Yearly">Yearly</option>
										<option value="Monthly">Monthly</option>
										<option value="Hourly">Hourly</option>
									</select>
								</div>
							</div>
						</div>
					</div>
					{/* Job Description */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Job Description</h2>
						<div className="space-y-6">
							<div>
								<label htmlFor="description" className="label block mb-2">
									Job Description *
								</label>
								<textarea
									id="description"
									value={formData.description}
									onChange={handleInputChange}
									className="textarea"
									rows={8}
									placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
									required
								/>
								<p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
									Provide a detailed description of the role and responsibilities
								</p>
							</div>
							<div>
								<label htmlFor="requirements" className="label block mb-2">
									Requirements &amp; Qualifications
								</label>
								<textarea
									id="requirements"
									value={formData.requirements.replace(/\\n/g, "\n")}
									onChange={handleInputChange}
									className="textarea"
									rows={6}
									placeholder="List the required skills, qualifications, and experience..."
								/>
							</div>
							<div>
								<label htmlFor="benefits" className="label block mb-2">
									Benefits &amp; Perks
								</label>
								<textarea
									id="benefits"
									value={formData.benefits.replace(/\\n/g, "\n")}
									onChange={handleInputChange}
									className="textarea"
									rows={5}
									placeholder="Describe the benefits, perks, and what makes your company a great place to work..."
								/>
							</div>
							
						</div>
					</div>
					{/* Skills & Requirements */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Required Skills</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="skillInput" className="label block mb-2">
									
									Add Skills *
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										id="skillInput"
										value={skillInput}
										onChange={(e) => setSkillInput(e.target.value)}
										onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
										className="input flex-1"
										placeholder="Type a skill and press Add"
									/>
									<button type="button" onClick={addSkill} className="btn btn-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="plus" class="lucide lucide-plus h-4 w-4 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
										Add
									</button>
								</div>
								<p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
									Add technical and soft skills required for this position
								</p>
							</div>
							{skills.length > 0 && (
								<div>
									<label className="label block mb-3">Added Skills</label>
									<div className="flex flex-wrap gap-2">
										{skills.map((skill) => (
											<span key={skill} className="badge badge-secondary inline-flex items-center gap-1">
												{skill}
												<button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-600">
													<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" class="lucide lucide-x h-3 w-3"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
												</button>
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
					{/* Application Details */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Application Settings</h2>
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label htmlFor="vacancies" className="label block mb-2">
										Number of Vacancies *
									</label>
									<input
										type="number"
										id="vacancies"
										value={formData.vacancies}
										onChange={handleInputChange}
										className="input"
										placeholder="e.g. 2"
										min={1}
										required
									/>
								</div>
								<div>
									<label htmlFor="deadline" className="label block mb-2">
										Application Deadline
									</label>
									<input type="date" id="deadline" value={formData.deadline} onChange={handleInputChange} className="input" />
								</div>
							</div>
						</div>
					</div>
					{/* Form Actions */}
					<div className="card p-6">
						<div className="flex flex-col sm:flex-row gap-3">
							<div className="flex-1" />
							<Link to="/company/jobs" className="btn btn-outline" reloadDocument>
								Cancel
							</Link>
							<button type="submit" className="btn btn-primary">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="send" class="lucide lucide-send h-4 w-4 mr-2"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path><path d="m21.854 2.147-10.94 10.939"></path></svg>
								{jobSlug ? 'Update Job' : 'Publish Job'}
							</button>
						</div>
					</div>
				</form>
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

export default PostJob;
