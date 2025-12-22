import { Link } from "react-router-dom";
import { useState } from "react";
import { registerCompany } from "./../../api/ApiCalls";

function CompanyRegister() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		websiteUrl: "",
		industry: "",
		foundedYear: "",
		employeeCount: "",
		location: "",
		description: "",
		password: "",
		confirmPassword: ""
	});
	const [errors, setErrors] = useState({});
	const [toast, setToast] = useState({ message: "", type: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: "" }));
		}
	};

	const isValidUrl = (url) => {
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Company name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		if (!formData.websiteUrl.trim()) newErrors.websiteUrl = "Website URL is required";
		if (formData.websiteUrl && !isValidUrl(formData.websiteUrl)) newErrors.websiteUrl = "Please enter a valid URL";
		if (!formData.industry) newErrors.industry = "Industry is required";
		if (!formData.location.trim()) newErrors.location = "Location is required";
		if (!formData.description.trim()) newErrors.description = "Description is required";
		if (!formData.password) newErrors.password = "Password is required";
		if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
		if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		const companyData = {
			role: "COMPANY",
			name: formData.name,
			email: formData.email,
			websiteUrl: formData.websiteUrl,
			industry: formData.industry,
			foundedYear: formData.foundedYear || undefined,
			employeeCount: formData.employeeCount || undefined,
			location: formData.location,
			description: formData.description,
			password: formData.password
		};

		registerCompany(companyData, setToast);
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-3xl mx-auto">
				{/* Page Title */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
					</div>
					<h1 className="text-4xl font-bold tracking-tight mb-3">
						Register Your Company
					</h1>
					<p className="text-lg text-muted-foreground">
						Start hiring top talent for your organization
					</p>
				</div>

				{/* Account Type Toggle */}
				<div className="w-full text-center">
					<div className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md">
						<div className="grid grid-cols-2 gap-2 w-full">
							<Link to={`/jobseeker-register`} className="btn btn-ghost text-center" reloadDocument>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								Job Seeker
							</Link>
							<button className="btn btn-primary text-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
								Employer
							</button>
						</div>
					</div>
				</div>

				{/* Registration Card */}
				<div className="card p-8 md:p-10">
					{/* Registration Form */}
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Company Information Section */}
						<div className="space-y-5">
							<div className="flex items-center gap-2 pb-2 border-b border-border">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
								<h2 className="text-lg font-semibold">Company Information</h2>
							</div>

							{/* Company Name */}
							<div className="space-y-1">
								<label htmlFor="name" className="label">
									Company Name <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
									<input
										type="text"
										id="name"
										name="name"
										className="input pl-10"
										placeholder="e.g., TechCorp Solutions"
										value={formData.name}
										onChange={handleChange}
									/>
								</div>
								{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
							</div>

							{/* Email */}
							<div className="space-y-1">
								<label htmlFor="email" className="label">
									Email Address <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
									<input
										type="email"
										id="email"
										name="email"
										className="input pl-10"
										placeholder="admin@company.com"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
							</div>

							{/* Website & Industry Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="space-y-1">
									<label htmlFor="websiteUrl" className="label">
										Company Website <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
										<input
											type="url"
											id="websiteUrl"
											name="websiteUrl"
											className="input pl-10"
											placeholder="https://example.com"
											value={formData.websiteUrl}
											onChange={handleChange}
										/>
									</div>
									{errors.websiteUrl && <p className="text-xs text-red-500 mt-1">{errors.websiteUrl}</p>}
								</div>
								<div className="space-y-1">
									<label htmlFor="industry" className="label">
										Industry <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 11h.01"></path><path d="M8 11h.01"></path></svg>
										<select
											id="industry"
											name="industry"
											className="input pl-10"
											value={formData.industry}
											onChange={handleChange}
										>
											<option value="">Select industry</option>
											<option value="technology">Technology</option>
											<option value="finance">Finance & Banking</option>
											<option value="healthcare">Healthcare</option>
											<option value="education">Education</option>
											<option value="retail">Retail & E-commerce</option>
											<option value="manufacturing">Manufacturing</option>
											<option value="consulting">Consulting</option>
											<option value="marketing">Marketing & Advertising</option>
											<option value="other">Other</option>
										</select>
									</div>
									{errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
								</div>
							</div>

							{/* Company Size & Founded Year Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="space-y-1">
									<label htmlFor="employeeCount" className="label">
										Company Size
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
										<select
											id="employeeCount"
											name="employeeCount"
											className="input pl-10"
											value={formData.employeeCount}
											onChange={handleChange}
										>
											<option value="">Select company size</option>
											<option value="1-10">1-10 employees</option>
											<option value="11-50">11-50 employees</option>
											<option value="51-200">51-200 employees</option>
											<option value="201-500">201-500 employees</option>
											<option value="501-1000">501-1000 employees</option>
											<option value="1000+">1000+ employees</option>
										</select>
									</div>
								</div>
								<div className="space-y-1">
									<label htmlFor="foundedYear" className="label">
										Founded Year
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
										<input
											type="number"
											id="foundedYear"
											name="foundedYear"
											className="input pl-10"
											placeholder="e.g., 2010"
											min={1800}
											max={2025}
											value={formData.foundedYear}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>

							{/* Location */}
							<div className="space-y-1">
								<label htmlFor="location" className="label">
									Headquarters Location <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
									<input
										type="text"
										id="location"
										name="location"
										className="input pl-10"
										placeholder="City, Country"
										value={formData.location}
										onChange={handleChange}
									/>
								</div>
								{errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
							</div>

							{/* Description */}
							<div className="space-y-1">
								<label htmlFor="description" className="label">
									Company Description <span className="text-red-500">*</span>
								</label>
								<textarea
									id="description"
									name="description"
									className="textarea min-h-[120px]"
									placeholder="Tell us about your company, mission, and what makes it a great place to work..."
									value={formData.description}
									onChange={handleChange}
								/>
								{errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
							</div>
						</div>

						{/* Account Security Section */}
						<div className="space-y-5">
							<div className="flex items-center gap-2 pb-2 border-b border-border">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
								<h2 className="text-lg font-semibold">Account Security</h2>
							</div>

							{/* Password Fields Row */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="space-y-1">
									<label htmlFor="password" className="label">
										Password <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
										<input
											type="password"
											id="password"
											name="password"
											className="input pl-10"
											placeholder="Create a strong password"
											value={formData.password}
											onChange={handleChange}
										/>
									</div>
									{errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
								</div>
								<div className="space-y-1">
									<label htmlFor="confirmPassword" className="label">
										Confirm Password <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
										<input
											type="password"
											id="confirmPassword"
											name="confirmPassword"
											className="input pl-10"
											placeholder="Re-enter your password"
											value={formData.confirmPassword}
											onChange={handleChange}
										/>
									</div>
									{errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
								</div>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-primary w-full text-base h-11 mt-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
							Register Company
						</button>
					</form>

					{/* Sign In Link */}
					<div className="mt-8 text-center text-sm text-muted-foreground">
						Already have an account?
						<Link
							to={`/company-login`}
							className="text-primary hover:underline font-medium"
							reloadDocument
						>
							Sign in
						</Link>
					</div>
				</div>
			</div>

			{/* Toast Notification */}
			{toast.message && (
				<div className={`fixed top-6 z-[9999] left-1/3 right-6 w-80 rounded-md px-4 py-3 text-sm text-white shadow-lg ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
					<div className="flex items-center justify-between">
						<span>{toast.message}</span>
						<button onClick={() => setToast({ message: "", type: "" })} className="ml-4 text-white/80 hover:text-white">✕</button>
					</div>
				</div>
			)}
		</main>
	);
}

export default CompanyRegister;