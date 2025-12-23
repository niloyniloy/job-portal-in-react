
import { useParams, Link } from "react-router-dom";
import { CDN_URL, updateUsersProfile, formatResumeDate, renderProfileImage, getUsersProfie, uploadResume, getMyApplicationsWithFilters, uploadProfilePicture } from "./../../api/ApiCalls";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "./../../states/AuthStore";

function EditUserProfile() {

	const [usersProfile, setUsersProfile] = useState({});
	const [formData, setFormData] = useState({});
	const [MyApplications, setMyApplications] = useState({ count: "", data: [] });
	const [statusLists, setStatusLists] = useState([]);
	const [toast, setToast] = useState({ message: "", type: "" });
	const [uploading, setUploading] = useState(false);
	const [resumeUploading, setResumeUploading] = useState(false);
	const setUser = useAuthStore((s) => s.setUser);
	const skillRef = useRef(null);

	useEffect(() => {
		getUsersProfie(setUsersProfile);
		getMyApplicationsWithFilters({}, setMyApplications, setStatusLists);
	}, []);

	useEffect(() => {
		setFormData(usersProfile);
	}, [usersProfile]);

	const updateProfileImage = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setUploading(true);
		uploadProfilePicture(file, setToast, setUser)
			.then((data) => {
				setUsersProfile(prev => ({
					...prev,
					profilePictureUrl: data.profilePictureUrl
				}));
				setFormData(prev => ({
					...prev,
					profilePictureUrl: data.profilePictureUrl
				}));
			})
			.catch(() => { })
			.finally(() => setUploading(false));
	}

	const updateResumeFile = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setResumeUploading(true);

		uploadResume(file, setToast)
			.then((data) => {
				setUsersProfile(prev => ({
					...prev,
					resumeUrl: data.resumeUrl,
					resumeOriginalName: data.resumeOriginalName,
					resumeUploadDate: data.resumeUploadDate,
					resumeSize: data.resumeSize
				}));

				setFormData(prev => ({
					...prev,
					resumeUrl: data.resumeUrl,
					resumeOriginalName: data.resumeOriginalName,
					resumeUploadDate: data.resumeUploadDate,
					resumeSize: data.resumeSize
				}));
			})
			.finally(() => setResumeUploading(false));
	};

	const updateUserProfile = (e) => {
		const { id, value } = e.target;
		setFormData(prev => ({
			...prev,
			[id]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setUsersProfile(formData);

		updateUsersProfile(usersProfile, setToast);
	};

	const addSkills = () => {

		if (skillRef.current.value.trim().length == 0) {

			alert("Please provide skills");
		} else {
			const newSkill = skillRef.current.value;
			setUsersProfile(prev => ({
				...prev,
				skills: [...prev.skills, newSkill]
			}));

			skillRef.current.value = '';
		}
	}

	const deleteSkills = (index) => {

		if (confirm("Are you sure to delete?")) {

			setUsersProfile(prev => {
				const updatedSkills = prev.skills.filter(
					(_, i) => i !== index
				);

				return {
					...prev,
					skills: updatedSkills
				};
			});
		}
	}

	const addNewExperience = () => {

		const newExperience = {
			companyName: "",
			description: "",
			employmentType: "",
			endDate: "",
			location: "",
			startDate: "",
			title: ""
		};

		setUsersProfile(prev => ({
			...prev,
			experience: [newExperience, ...prev.experience]
		}));
	}

	const updateWorkExperience = (e, index) => {

		const { name, value } = e.target;
		setUsersProfile(prev => {
			const updatedExperience = [...prev.experience];
			updatedExperience[index] = {
				...updatedExperience[index],
				[name]: value
			};
			return {
				...prev,
				experience: updatedExperience
			};
		});
	};

	const removeProfilePic = (index) => {

		if (confirm("Are you sure to delete?")) {

			setUsersProfile(prev => {
				const updatedExperience = prev.experience.filter(
					(_, i) => i !== index
				);

				return {
					...prev,
					experience: updatedExperience
				};
			});
		}
	}

	const removeWorkExperience = (index) => {

		if (confirm("Are you sure to delete?")) {

			setUsersProfile(prev => {
				const updatedExperience = prev.experience.filter(
					(_, i) => i !== index
				);

				return {
					...prev,
					experience: updatedExperience
				};
			});
		}
	}
	const addNewEducation = () => {

		const newEducation = {
			schoolName: "",
			degree: "",
			fieldOfStudy: "",
			startDate: "",
			endDate: "",
		};

		setUsersProfile(prev => ({
			...prev,
			education: [newEducation, ...prev.education]
		}));
	}

	const updateEducation = (e, index) => {

		const { name, value } = e.target;
		setUsersProfile(prev => {
			const updatedEducation = [...prev.education];
			updatedEducation[index] = {
				...updatedEducation[index],
				[name]: value
			};
			return {
				...prev,
				education: updatedEducation
			};
		});
	};

	const removeEducation = (index) => {

		if (confirm("Are you sure to delete?")) {

			setUsersProfile(prev => {
				const updatedEducation = prev.education.filter(
					(_, i) => i !== index
				);

				return {
					...prev,
					education: updatedEducation
				};
			});
		}
	}

	return (
		<>
			<main className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Page Header */}
				<div className="mb-8">
					<div className="flex items-center gap-2 text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
						<Link
							to={`/user/dashboard`}
							className="hover:text-[hsl(var(--color-primary))]"
							reloadDocument
						>
							Dashboard
						</Link>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="9 18 15 12 9 6"></polyline></svg>
						<Link
							to={`/user-profile`}
							className="hover:text-[hsl(var(--color-primary))]"
							reloadDocument
						>
							My Profile
						</Link>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="9 18 15 12 9 6"></polyline></svg>
						<span className="text-[hsl(var(--color-foreground))]">Edit Profile</span>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
							<p className="text-[hsl(var(--color-muted-foreground))]">
								Update your personal information and preferences
							</p>
						</div>
						<a href="/user-profile" className="btn btn-outline">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
							Cancel
						</a>
					</div>
				</div>
				{/* Edit Form */}
				<form className="space-y-6" onSubmit={handleSubmit}>
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Profile Photo</h2>
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="relative flex-shrink-0">
								<div
									className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
								>
									<img src={renderProfileImage(formData?.profilePictureUrl) || ''} className="rounded-full" />
								</div>
								<div
									className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white cursor-pointer hover:bg-[hsl(var(--color-primary))]/90 transition-colors"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M14.5 4h-5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"></path><circle cx="12" cy="12" r="3"></circle></svg>
								</div>
							</div>
							<div className="flex-1">
								<h3 className="font-medium mb-2">
									Upload Profile Picture
								</h3>
								<p
									className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4"
								>
									JPG, PNG or GIF. Max size of 5MB.
								</p>
								<div className="flex gap-2">
									<label className="btn btn-primary cursor-pointer">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
										{uploading ? 'Uploading...' : 'Upload Photo'}
										<input
											type="file"
											className="hidden"
											onChange={(e) => updateProfileImage(e)}
											accept="image/*"
											disabled={uploading}
										/>
									</label>

								</div>
							</div>
						</div>
					</div>
					{/* Basic Information */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Basic Information</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="name" className="label block mb-2">
									Name *
								</label>
								<input
									type="text"
									id="name"
									className="input"
									placeholder="Enter name"
									value={formData?.name || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="email" className="label block mb-2">
									Email Address *
								</label>
								<input
									type="email"
									id="email"
									className="input"
									placeholder="Enter email"
									value={formData?.email || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="phone" className="label block mb-2">
									Phone Number *
								</label>
								<input
									type="tel"
									id="phone"
									className="input"
									placeholder="Enter phone number"
									value={formData?.phone || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="title" className="label block mb-2">
									Professional Title
								</label>
								<input
									type="text"
									id="title"
									className="input"
									placeholder="e.g. Full Stack Developer"
									value={formData?.title || ''}
									onChange={updateUserProfile}
								/>
							</div>
						</div>
					</div>
					{/* Location */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Location</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label htmlFor="city" className="label block mb-2">
									City *
								</label>
								<input
									type="text"
									id="city"
									className="input"
									placeholder="Enter city"
									value={formData?.city || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="state" className="label block mb-2">
									State/Province *
								</label>
								<input
									type="text"
									id="state"
									className="input"
									placeholder="Enter state"
									value={formData?.state || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="country" className="label block mb-2">
									Country *
								</label>
								<input
									type="text"
									id="country"
									className="input"
									placeholder="Enter country"
									value={formData?.country || ''}
									onChange={updateUserProfile}
									required=""
								/>
							</div>
							<div>
								<label htmlFor="zipCode" className="label block mb-2">
									Zip Code
								</label>
								<input
									type="text"
									id="zipCode"
									className="input"
									placeholder="Enter zip code"
									value={formData?.zipCode || ''}
									onChange={updateUserProfile}
								/>
							</div>
						</div>
					</div>
					{/* About */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">About</h2>
						<div>
							<label htmlFor="bio" className="label block mb-2">
								Professional Summary
							</label>
							<textarea
								id="bio"
								className="textarea"
								rows={5}
								placeholder="Write a brief summary about yourself..."
								value={formData?.bio || ''}
								onChange={updateUserProfile}
							/>
						</div>
					</div>
					{/* Skills */}
					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Skills</h2>
						<div className="mb-4">
							<label htmlFor="skillInput" className="label block mb-2">
								Add Skills
							</label>
							<div className="flex gap-2">
								<input
									type="text"
									id="skillInput"
									className="input flex-1"
									placeholder="Type a skill and press Enter"
									ref={skillRef}
								/>
								<button type="button" onClick={() => addSkills()} className="btn btn-primary">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
									Add
								</button>
							</div>
							<p
								className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2"
							>
								Add skills relevant to your profession. Press Enter
								or click Add to add each skill.
							</p>
						</div>
						<div>
							<label className="label block mb-3">Current Skills</label>
							<div className="flex flex-wrap gap-2">
								{usersProfile?.skills?.map((skill, index) => (
									<span className="badge badge-secondary inline-flex items-center gap-1">
										{skill}
										<button onClick={() => deleteSkills( index )} type="button" className="hover:text-red-600">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
										</button>
									</span>
								))}
							</div>
						</div>
					</div>
					{/* Experience */}
					<div className="card p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold">Work Experience</h2>
							<button onClick={() => addNewExperience()} type="button" className="btn btn-outline">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
								Add Experience
							</button>
						</div>
						<div className="space-y-6">
							{usersProfile?.experience?.map((exp, index) => (
								<div className="p-4 border border-[hsl(var(--color-border))] rounded-lg">
									<div className="flex items-start justify-between mb-4">
										<h3 className="font-medium"></h3>
										<button
											type="button"
											onClick={() => removeWorkExperience(index)}
											className="btn-ghost p-1 text-red-600 hover:bg-red-50"
										>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
										</button>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="label block mb-2">Title</label>
											<input
												type="text"
												name="title"
												className="input"
												value={exp.title}
												onChange={(e) => updateWorkExperience(e, index)}
											/>
										</div>
										<div>
											<label className="label block mb-2">Company</label>
											<input
												type="text"
												name="companyName"
												className="input"
												value={exp.companyName}
												onChange={(e) => updateWorkExperience(e, index)}
											/>
										</div>
										<div>
											<label className="label block mb-2">Employment Type</label>
											<input
												type="text"
												name="employmentType"
												className="input"
												value={exp.employmentType}
												onChange={(e) => updateWorkExperience(e, index)}
											/>
										</div>
										<div>
											<label className="label block mb-2">Location</label>
											<input
												type="text"
												name="location"
												className="input"
												value={exp.location}
												onChange={(e) => updateWorkExperience(e, index)}
											/>
										</div>
										<div>
											<label className="label block mb-2">Start Date</label>
											<input 
												type="month" 
												name="startDate" 
												className="input" 
												onChange={(e) => updateWorkExperience(e, index)}
												value={exp.startDate ? new Date(exp.startDate).toISOString().slice(0, 7) : ''} 
											/>
										</div>
										<div>
											<label className="label block mb-2">End Date</label>
											<input 
												type="month" 
												name="endDate" 
												className="input" 
												onChange={(e) => updateWorkExperience(e, index)}
												value={exp.endDate ? new Date(exp.endDate).toISOString().slice(0, 7) : 'Present'}
											/>
										</div>
										<div>
											<label className="label block mb-4">Description</label>
											<textarea
												className="textarea"
												rows={6}
												name="description"
												onChange={(e) => updateWorkExperience(e, index)}
												placeholder="Write a brief summary about your job responsibility"
												value={exp?.description || ''}

											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Education */}
					<div className="card p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold">Education</h2>
							<button onClick={() => addNewEducation()} type="button" className="btn btn-outline">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
								Add Education
							</button>
						</div>
						{usersProfile?.education?.map((edu, index) => (
							<div className="p-4 border border-[hsl(var(--color-border))] rounded-lg">
								<div className="flex items-start justify-between mb-4">
									<h3 className="font-medium"></h3>
									<button
										type="button"
										onClick={() => removeEducation(index)}
										className="btn-ghost p-1 text-red-600 hover:bg-red-50"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
									</button>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label className="label block mb-2">Field of study</label>
										<input
											type="text"
											className="input"
											name="fieldOfStudy"
											value={edu.fieldOfStudy}
											onChange={(e) => updateEducation(e, index)}
										/>
									</div>
									<div>
										<label className="label block mb-2">Degree</label>
										<input
											type="text"
											className="input"
											name="degree"
											value={edu.degree}
											onChange={(e) => updateEducation(e, index)}
										/>
									</div>
									<div>
										<label className="label block mb-2">Institution</label>
										<input
											type="text"
											className="input"
											name="schoolName"
											value={edu.schoolName}
											onChange={(e) => updateEducation(e, index)}
										/>
									</div>
									<div></div>
									<div>
										<label className="label block mb-2">Start Year</label>
										<input
											type="number"
											className="input"
											name="startDate"
											value={edu.startDate}
											onChange={(e) => updateEducation(e, index)}
										/>
									</div>
									<div>
										<label className="label block mb-2">End Year</label>
										<input
											type="number"
											className="input"
											name="endDate"
											value={edu.endDate}
											onChange={(e) => updateEducation(e, index)}
										/>
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Resume/CV</h2>
						<div className="space-y-4">
							{/* Current Resume */}
							<div className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg">
								<div className="flex items-center gap-3 mb-3">
									<div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[hsl(var(--color-primary))]"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-sm truncate">
											<a target="_blank" href={`${CDN_URL}${formData?.resumeUrl}`}>
												{formData?.resumeOriginalName || ''}
											</a>
										</p>
										<p className="text-xs text-[hsl(var(--color-muted-foreground))]">
											Updated {formatResumeDate(formData?.resumeUploadDate)} • {formData?.resumeSize || ''}
										</p>
									</div>
									{/* Remove should be implemented on the local state until the user saves the changes. */}
								</div>
							</div>
							{/* Upload New Resume */}
							<div>
								<label className="btn btn-outline w-full cursor-pointer">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
									
									{resumeUploading ? "Uploading..." : "Upload New Resume"}
									<input
										type="file"
										className="hidden"
										accept=".pdf,.doc,.docx"
										onChange={updateResumeFile}
										disabled={resumeUploading}
									/>
								</label>
								<p className="text-xs text-[hsl(var(--color-muted-foreground))] mt-2">
									Supported formats: PDF, DOC, DOCX. Max size: 5MB
								</p>
							</div>
						</div>
					</div>

					<div className="card p-6">
						<h2 className="text-xl font-semibold mb-6">Social Profiles</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="linkedin" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-1"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
									LinkedIn
								</label>
								<input
									type="url"
									id="linkedinUrl"
									className="input"
									placeholder="https://linkedin.com/in/username"
									value={formData?.linkedinUrl || ''}
								/>
							</div>
							<div>
								<label htmlFor="github" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 inline mr-1"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
									GitHub
								</label>
								<input
									type="url"
									className="input"
									id="githubUrl"
									placeholder="https://github.com/username"
									value={formData?.githubUrl || ''}
								/>
							</div>
							<div>
								<label htmlFor="portfolio" className="label block mb-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 inline mr-1"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
									Portfolio Website
								</label>
								<input
									type="url"
									className="input"
									id="portfolioUrl"
									placeholder="https://yourwebsite.com"
									value={formData?.portfolioUrl || ''}
								/>
							</div>
						</div>
					</div>

					{/* Form Actions */}
					<div className="card p-6">
						<div className="flex flex-col sm:flex-row gap-3 justify-end">
							<a href="/user-profile" className="btn btn-outline">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
								Cancel
							</a>
							<button type="submit" className="btn btn-primary">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
								Save Changes
							</button>
						</div>
					</div>
				</form>
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

	)
}

export default EditUserProfile
