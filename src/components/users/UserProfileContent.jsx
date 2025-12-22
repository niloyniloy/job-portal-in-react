import { Link } from "react-router-dom";
import { CDN_URL, formatResumeDate, renderProfileImage } from "./../../api/ApiCalls";
import { formatMonthYear } from "./../../helpers/dateFormatters";

const isJobSeeker = localStorage.getItem("user") === 'USER' ? true : false;

function UserProfileContent({ usersProfile, statusLists, formatExperienceDates, formatEducationDates }) {
	return (
		<>
			<main className="container mx-auto px-4 py-8">
				{/* Profile Header */}
				<div className="card p-8 mb-8">
					<div className="flex flex-col md:flex-row items-start md:items-center gap-6">
						{/* Profile Photo */}
						<div className="relative flex-shrink-0">
							<div className="h-32 w-32 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
								<img className="rounded-full" src={renderProfileImage(usersProfile?.profilePictureUrl)} alt="user profile" />
							</div>
							<div className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-[hsl(var(--color-primary))] flex items-center justify-center border-4 border-white">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
									<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
									<circle cx="12" cy="13" r="3" />
								</svg>
							</div>
						</div>
						{/* Profile Info */}
						<div className="flex-1">
							<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
								<div>
									<h1 className="text-3xl font-bold mb-2">{usersProfile?.name}</h1>
									<p className="text-lg text-[hsl(var(--color-muted-foreground))] mb-2">
										{usersProfile?.title}
									</p>
									<div className="flex flex-wrap items-center gap-3 text-sm text-[hsl(var(--color-muted-foreground))]">
										<span className="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
												<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
												<circle cx="12" cy="10" r="3" />
											</svg>
											{usersProfile?.location}
										</span>
										<span>•</span>
										<span className="flex items-center gap-1">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
												<rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
												<line x1="16" y1="2" x2="16" y2="6" />
												<line x1="8" y1="2" x2="8" y2="6" />
												<line x1="3" y1="10" x2="21" y2="10" />
											</svg>
											Member since {formatMonthYear(usersProfile?.createdAt)}
										</span>
									</div>
								</div>
								{isJobSeeker && (
									<Link to={`/user-profile/edit`} className="btn btn-primary">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
											<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
											<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
										</svg>
										Edit Profile
									</Link>
								)}

							</div>
							{/* Quick Stats */}
							{isJobSeeker && (
								<div className="grid grid-cols-3 gap-4 pt-4 border-t border-[hsl(var(--color-border))]">
									<div>
										<p className="text-2xl font-bold text-[hsl(var(--color-primary))]">
											12
										</p>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Applications
										</p>
									</div>
									{statusLists.map((status, index) => (
										<div key={index}>
											<p className="text-2xl font-bold text-[hsl(var(--color-primary))]">
												{status.count}
											</p>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
												{status.status}
											</p>
										</div>
									))}

								</div>
							)}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Main Content Column */}
					<div className="lg:col-span-2 space-y-6">
						{/* About */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">About</h2>
							<p className="text-[hsl(var(--color-foreground))] leading-relaxed">
								{usersProfile?.bio}
							</p>
						</div>
						{/* Contact Information */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Contact Information</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-primary))]">
											<rect x="2" y="4" width="20" height="16" rx="2" />
											<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Email
										</p>
										<p className="font-medium">{usersProfile?.email}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-primary))]">
											<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Phone
										</p>
										<p className="font-medium">{usersProfile?.phone}</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-primary))]">
											<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
											<circle cx="12" cy="10" r="3" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											Location
										</p>
										<p className="font-medium"> {usersProfile?.location} </p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-primary))]">
											<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
											<rect x="2" y="9" width="4" height="12" />
											<circle cx="4" cy="4" r="2" />
										</svg>
									</div>
									<div>
										<p className="text-sm text-[hsl(var(--color-muted-foreground))]">
											LinkedIn
										</p>
										<a
											href={usersProfile?.linkedinUrl}
											className="font-medium text-[hsl(var(--color-primary))] hover:underline"
										>
											{usersProfile?.linkedinUrl}
										</a>
									</div>
								</div>
							</div>
						</div>
						{/* Skills */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Skills</h2>
							<div className="flex flex-wrap gap-2">
								{usersProfile?.skills?.map((skill) => (
									<span key={skill} className="badge badge-secondary">{skill}</span>
								))}
							</div>
						</div>
						{/* Experience */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Work Experience</h2>
							<div className="space-y-6">
								{usersProfile?.experience?.map((exp) => (
									<div key={exp.id} className="relative pl-8 pb-6 border-l-2 border-[hsl(var(--color-border))] last:pb-0">
										<div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-[hsl(var(--color-primary))] border-2 border-white" />
										<div>
											<h3 className="font-semibold mb-1">
												{exp.title}
											</h3>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-2">
												{exp.companyName} • {exp.employmentType}
											</p>
											<p className="text-xs text-[hsl(var(--color-muted-foreground))] mb-3">
												{formatExperienceDates(exp.startDate, exp.endDate)}
											</p>
											<p className="text-sm text-[hsl(var(--color-foreground))]">
												{exp.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						{/* Education */}
						<div className="card p-6">
							<h2 className="text-xl font-semibold mb-4">Education</h2>
							{usersProfile?.education?.map((edu) => (
								<div key={edu.id} className="space-y-4">
									<div className="flex gap-4">
										<div className="h-12 w-12 rounded-lg bg-[hsl(var(--color-secondary))] flex items-center justify-center flex-shrink-0">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[hsl(var(--color-primary))]">
												<path d="M22 10v6m0 0a10 10 0 1 1-20 0v0m20 0V8c0-.5-.37-.93-.88-1.22L12 2l-9.12 4.78C2.37 7.07 2 7.5 2 8v2m20 0a10 10 0 0 1-20 0m0 0V8" />
												<path d="M12 16v-4m0 0L6 9m6 3l6-3" />
											</svg>
										</div>
										<div>
											<h3 className="font-semibold mb-1">
												{edu.degree}
											</h3>
											<p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-1">
												{edu.schoolName}
											</p>
											<p className="text-xs text-[hsl(var(--color-muted-foreground))]">
												{formatEducationDates(edu.startDate, edu.endDate)}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					{/* Sidebar Column */}
					<div className="lg:col-span-1 space-y-6">
						{/* Resume */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold mb-4">Resume</h3>
							<div className="space-y-4">
								<div className="p-4 bg-[hsl(var(--color-secondary))] rounded-lg">
									<div className="flex items-center gap-3 mb-3">
										<div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
											<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-[hsl(var(--color-primary))]">
												<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
												<polyline points="14 2 14 8 20 8" />
												<line x1="12" y1="11" x2="12" y2="17" />
												<line x1="9" y1="14" x2="15" y2="14" />
											</svg>
										</div>
										<div className="flex-1 min-w-0">
											<p className="font-medium text-sm truncate">
												{usersProfile?.resumeOriginalName}
											</p>
											<p className="text-xs text-[hsl(var(--color-muted-foreground))]">
												Updated {formatResumeDate(usersProfile?.resumeUploadDate)}
											</p>
										</div>
									</div>
									<div className="flex gap-2">
										<a target="_blank" href={renderProfileImage(usersProfile?.resumeUrl)} className="btn btn-outline w-full text-xs h-9">
											<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 mr-2">
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
												<polyline points="7 10 12 15 17 10" />
												<line x1="12" y1="15" x2="12" y2="3" />
											</svg>
											Download
										</a>
									</div>
								</div>
								{isJobSeeker && (
									<Link to={`/user-profile/edit`} className="btn btn-outline w-full" reloadDocument>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
											<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
											<polyline points="17 8 12 3 7 8" />
											<line x1="12" y1="3" x2="12" y2="15" />
										</svg>
										Update Resume
									</Link>
								)}
							</div>
						</div>
						{/* Social Links */}
						<div className="card p-6">
							<h3 className="text-lg font-semibold mb-4">Social Profiles</h3>
							<div className="space-y-2">
								{usersProfile?.linkedinUrl && (
									<a
										href={usersProfile?.linkedinUrl}
										target="_blank"
										className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]">
											<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
											<rect x="2" y="9" width="4" height="12" />
											<circle cx="4" cy="4" r="2" />
										</svg>
										<span className="text-sm font-medium">LinkedIn</span>
									</a>
								)}

								{usersProfile?.githubUrl && (
									<a
										href={usersProfile?.githubUrl}
										target="_blank"
										className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]">
											<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c2.6-.4 5.5-2 5.5-7-.1-1.6-.6-3-1.6-4.2.1-.6.1-1.2 0-1.8-.5-.5-1.5-.7-2.5-.3-.9.3-1.9 1-2.9 2.3-1-.3-2.1-.5-3.5-.5s-2.4.2-3.5.5C7.5 2.7 6.5 2 5.5 1.7c-1-.4-2 .2-2.5.7-.1.6-.1 1.2 0 1.8-1 1.2-1.5 2.6-1.4 4.2 0 5 2.9 6.6 5.5 7-.5.4-.9 1.1-1 1.9-.5.3-1.5.5-2.5.4-1.6-.1-3-1.3-3.5-2.6-.3-.7-1.3-1.3-2.2-1.3-.9 0-1.7.5-1.7 1.2 0 .6.8 1.1 1.5 1.3.8.2 1.6.9 2 1.6.5 1.2 1.9 2.3 3.8 2.3 1.3 0 2.5-.1 2.5-.1v3.5" />
										</svg>
										<span className="text-sm font-medium">GitHub</span>
									</a>
								)}

								{usersProfile?.portfolioUrl && (
									<a
										href={usersProfile?.portfolioUrl}
										target="_blank"
										className="flex items-center gap-3 p-2 rounded-md hover:bg-[hsl(var(--color-accent))] transition-colors"
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[hsl(var(--color-muted-foreground))]">
											<circle cx="12" cy="12" r="10" />
											<line x1="2" y1="12" x2="22" y2="12" />
											<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
										</svg>
										<span className="text-sm font-medium">Portfolio</span>
									</a>
								)}
							</div>
						</div>
						{/* Quick Actions */}
						{isJobSeeker && (
							<div className="card p-6">
								<h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
								<div className="space-y-2">
									<Link
										to="/user/dashboard"
										className="btn btn-outline w-full justify-start"
										reloadDocument
									>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
											<rect x="3" y="3" width="7" height="7" />
											<rect x="14" y="3" width="7" height="7" />
											<rect x="14" y="14" width="7" height="7" />
											<rect x="3" y="14" width="7" height="7" />
										</svg>
										View Dashboard
									</Link>
									<Link to="/user/applications" className="btn btn-outline w-full justify-start">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
											<polyline points="14 2 14 8 20 8" />
											<line x1="12" y1="11" x2="12" y2="17" />
											<line x1="9" y1="14" x2="15" y2="14" />
										</svg>
										My Applications
									</Link>
								</div>
							</div>
						)}

					</div>
				</div>
			</main>
		</>
	);
}

export default UserProfileContent;
