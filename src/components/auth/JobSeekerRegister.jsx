import { Link } from "react-router-dom";
import { useState } from "react";
import { registerJobSeeker } from "./../../api/ApiCalls";

function JobSeekerRegister() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		title: "",
		experience: "",
		location: "",
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

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) newErrors.email = "Email is required";
		if (!formData.phone.trim()) newErrors.phone = "Phone is required";
		if (!formData.title.trim()) newErrors.title = "Title is required";
		if (!formData.experience) newErrors.experience = "Experience level is required";
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

		const userData = {
			role: "USER",
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			title: formData.title,
			experience: formData.experience.toLowerCase(),
			location: formData.location || undefined,
			password: formData.password
		};

		registerJobSeeker(userData, setToast);
	};

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="max-w-2xl mx-auto">
				{/* Page Title */}
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M22 16c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"></path><path d="M18 19c-1.7 1.7-4.4 2-6.5.5"></path></svg>
					</div>
					<h1 className="text-4xl font-bold tracking-tight mb-3">
						Create Your Account
					</h1>
					<p className="text-lg text-muted-foreground">
						Join thousands of professionals finding their dream jobs
					</p>
				</div>

				{/* Account Type Toggle */}
				<div className="w-full text-center">
					<div className="card p-2 mb-8 inline-flex mx-auto w-full max-w-md">
						<div className="grid grid-cols-2 gap-2 w-full">
							<button className="btn btn-primary text-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								Job Seeker
							</button>
							<Link to={`/register/company`} className="btn btn-ghost text-center" reloadDocument>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
								Employer
							</Link>
						</div>
					</div>
				</div>

				{/* Registration Card */}
				<div className="card p-8 md:p-10">
					{/* Registration Form */}
					<form className="space-y-5" onSubmit={handleSubmit}>
						{/* Name Field */}
						<div className="space-y-1">
							<label htmlFor="name" className="label">
								Name <span className="text-red-500">*</span>
							</label>
							<div className="relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
								<input
									type="text"
									id="name"
									name="name"
									className="input pl-10"
									placeholder="John Doe"
									value={formData.name}
									onChange={handleChange}
								/>
							</div>
							{errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
						</div>

						{/* Email & Phone Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
										placeholder="john@example.com"
										value={formData.email}
										onChange={handleChange}
									/>
								</div>
								{errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
							</div>
							<div className="space-y-1">
								<label htmlFor="phone" className="label">
									Phone Number <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
									<input
										type="tel"
										id="phone"
										name="phone"
										className="input pl-10"
										placeholder="+880 1964405239"
										value={formData.phone}
										onChange={handleChange}
									/>
								</div>
								{errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
							</div>
						</div>

						{/* Title & Experience Row */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="space-y-1">
								<label htmlFor="title" className="label">
									Job Title <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 11h.01"></path><path d="M8 11h.01"></path></svg>
									<input
										type="text"
										id="title"
										name="title"
										className="input pl-10"
										placeholder="Senior Developer"
										value={formData.title}
										onChange={handleChange}
									/>
								</div>
								{errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
							</div>
							<div className="space-y-1">
								<label htmlFor="experience" className="label">
									Experience Level <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
									<select
										id="experience"
										name="experience"
										className="input pl-10"
										value={formData.experience}
										onChange={handleChange}
									>
										<option value="">Select experience level</option>
										<option value="Entry">Entry Level (0-2 years)</option>
										<option value="Mid">Mid Level (2-5 years)</option>
										<option value="Senior">Senior Level (5-10 years)</option>
										<option value="Expert">Expert (10+ years)</option>
										<option value="Lead">Lead (15+ years)</option>
									</select>
								</div>
								{errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
							</div>
						</div>

						{/* Location Field */}
						<div className="space-y-1">
							<label htmlFor="location" className="label">
								Location
							</label>
							<div className="relative">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
								<input
									type="text"
									id="location"
									name="location"
									className="input pl-10"
									placeholder="San Francisco, USA"
									value={formData.location}
									onChange={handleChange}
								/>
							</div>
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

						{/* Submit Button */}
						<button
							type="submit"
							className="btn btn-primary w-full text-base h-11 mt-2"
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><path d="M22 11h-2.5a2.5 2.5 0 0 0 0 5H22"></path><path d="M22 18v-3"></path></svg>
							Create Account
						</button>
					</form>

					{/* Sign In Link */}
					<div className="mt-8 text-center text-sm text-muted-foreground">
						Already have an account?
						<Link
							to={`/login/user`}
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

export default JobSeekerRegister;