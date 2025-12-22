import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCompanyProfile, updateCompanyProfile, uploadCompanyLogo, CDN_URL } from "../../api/ApiCalls";
import { useAuthStore } from "./../../states/AuthStore";

function EditCompanyProfile() {
	const [companyProfile, setCompanyProfile] = useState({});
	const setUser = useAuthStore((s) => s.setUser);
	const [formData, setFormData] = useState({
		name: "",
		industry: "",
		description: "",
		location: "",
		websiteUrl: "",
		logoUrl: "",
		employeeCount: "",
		foundedYear: "",
		socialLinks: {
			linkedin: "",
			facebook: "",
			twitter: "",
			instagram: "",
			github: ""
		}
	});
	const [toast, setToast] = useState({ message: "", type: "" });
	const [logoUploading, setLogoUploading] = useState(false);

	useEffect(() => {
		getCompanyProfile(setCompanyProfile, setToast);
	}, []);

	useEffect(() => {
		if (companyProfile) {
			setFormData({
				name: companyProfile.name || "",
				industry: companyProfile.industry || "",
				description: companyProfile.description || "",
				location: companyProfile.location || "",
				websiteUrl: companyProfile.websiteUrl || "",
				logoUrl: companyProfile.logoUrl || "",
				employeeCount: companyProfile.employeeCount || "",
				foundedYear: companyProfile.foundedYear || "",
				socialLinks: {
					linkedin: companyProfile.socialLinks?.linkedin || "",
					facebook: companyProfile.socialLinks?.facebook || "",
					twitter: companyProfile.socialLinks?.twitter || "",
					instagram: companyProfile.socialLinks?.instagram || "",
					github: companyProfile.socialLinks?.github || ""
				}
			});
		}
	}, [companyProfile]);

	const handleInputChange = (e) => {
		const { id, value } = e.target;
		if (id.startsWith('social-')) {
			const socialField = id.replace('social-', '');
			setFormData(prev => ({
				...prev,
				socialLinks: {
					...prev.socialLinks,
					[socialField]: value
				}
			}));
		} else {
			setFormData(prev => ({ ...prev, [id]: value }));
		}
	};

	const handleLogoUpload = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setLogoUploading(true);
		uploadCompanyLogo(file, setUser, setToast)
			.then((data) => {
				setFormData(prev => ({
					...prev,
					logoUrl: data.logoUrl
				}));
			})
			.catch(() => {})
			.finally(() => setLogoUploading(false));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!formData.name || !formData.industry || !formData.description || !formData.location || !formData.logoUrl) {
			setToast({ message: "Please fill all required fields", type: "error" });
			setTimeout(() => setToast({ message: "", type: "" }), 3000);
			return;
		}

		updateCompanyProfile(formData, setUser, setToast, (updatedData) => {
			setCompanyProfile(updatedData);
		});
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
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="9 18 15 12 9 6"></polyline></svg>
						<span className="text-[hsl(var(--color-foreground))]">Edit Profile</span>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">Edit Company Profile</h1>
							<p className="text-[hsl(var(--color-muted-foreground))]">
								Update your company information and preferences
							</p>
						</div>
						<Link to="/company/dashboard" className="btn btn-outline" reloadDocument>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
							Cancel
						</Link>
					</div>
				</div>

				{/* Edit Form */}
				<form className="space-y-6" onSubmit={handleSubmit}>
					{/* Company Logo */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Company Logo</h2>
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="relative flex-shrink-0">
								<div className="h-32 w-32 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center overflow-hidden">
									{formData.logoUrl ? (
										<img 
											src={formData.logoUrl.includes('http') ? formData.logoUrl : `${CDN_URL}${formData.logoUrl}`} 
											alt="Company Logo" 
											className="w-full h-full object-cover rounded-lg" 
										/>
									) : (
										<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-400"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
									)}
								</div>
							</div>
							<div className="flex-1">
								<h3 className="font-medium mb-2">Upload Company Logo</h3>
								<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
									JPG, PNG or GIF. Max size of 5MB.
								</p>
								<label className="btn btn-primary cursor-pointer">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
									{logoUploading ? 'Uploading...' : 'Upload Logo'}
									<input
										type="file"
										className="hidden"
										onChange={handleLogoUpload}
										accept="image/*"
										disabled={logoUploading}
									/>
								</label>
							</div>
						</div>
					</div>

					{/* Basic Information */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Basic Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="name" className="label block mb-2">
									Company Name *
								</label>
								<input
									type="text"
									id="name"
									className="input"
									placeholder="Enter company name"
									value={formData.name}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="industry" className="label block mb-2">
									Industry *
								</label>
								<input
									type="text"
									id="industry"
									className="input"
									placeholder="e.g. Technology, Healthcare"
									value={formData.industry}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="location" className="label block mb-2">
									Location *
								</label>
								<input
									type="text"
									id="location"
									className="input"
									placeholder="e.g. San Francisco, CA"
									value={formData.location}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div>
								<label htmlFor="websiteUrl" className="label block mb-2">
									Website URL
								</label>
								<input
									type="url"
									id="websiteUrl"
									className="input"
									placeholder="https://yourcompany.com"
									value={formData.websiteUrl}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="employeeCount" className="label block mb-2">
									Employee Count
								</label>
								<input
									type="text"
									id="employeeCount"
									className="input"
									placeholder="e.g. 100-500"
									value={formData.employeeCount}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="foundedYear" className="label block mb-2">
									Founded Year
								</label>
								<input
									type="number"
									id="foundedYear"
									className="input"
									placeholder="e.g. 2020"
									value={formData.foundedYear}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

					{/* About */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">About</h2>
						<div>
							<label htmlFor="description" className="label block mb-2">
								Company Description *
							</label>
							<textarea
								id="description"
								className="textarea"
								rows={6}
								placeholder="Describe your company, mission, and values..."
								value={formData.description}
								onChange={handleInputChange}
								required
							/>
						</div>
					</div>

					{/* Social Profiles */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Social Profiles</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="social-linkedin" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
									LinkedIn
								</label>
								<input
									type="url"
									id="social-linkedin"
									className="input"
									placeholder="https://linkedin.com/company/yourcompany"
									value={formData.socialLinks.linkedin}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="social-facebook" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-2"><path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3z"></path></svg>
									Facebook
								</label>
								<input
									type="url"
									id="social-facebook"
									className="input"
									placeholder="https://facebook.com/yourcompany"
									value={formData.socialLinks.facebook}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="social-twitter" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2s9 5 20 5a9.5 9.5 0 0 0-9-5.5c4.75 2.25 7-7 7-7"></path></svg>
									Twitter
								</label>
								<input
									type="url"
									id="social-twitter"
									className="input"
									placeholder="https://twitter.com/yourcompany"
									value={formData.socialLinks.twitter}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="social-instagram" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 inline mr-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><circle cx="17.5" cy="6.5" r="1.5"></circle></svg>
									Instagram
								</label>
								<input
									type="url"
									id="social-instagram"
									className="input"
									placeholder="https://instagram.com/yourcompany"
									value={formData.socialLinks.instagram}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label htmlFor="social-github" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-2"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
									GitHub
								</label>
								<input
									type="url"
									id="social-github"
									className="input"
									placeholder="https://github.com/yourcompany"
									value={formData.socialLinks.github}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

					{/* Form Actions */}
					<div className="card p-6">
						<div className="flex flex-col sm:flex-row gap-3 justify-end">
							<Link to="/company/dashboard" className="btn btn-outline" reloadDocument>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
								Cancel
							</Link>
							<button type="submit" className="btn btn-primary">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
								Save Changes
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

export default EditCompanyProfile;