import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "./../states/AuthStore";
import { getLoggedInUserProfile, renderProfileImage } from "./../api/ApiCalls";

function Header() {

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [role, setRole] = useState('');
	const [userName, setUserName] = useState('');
	const dropdownRef = useRef(null);
	const location = useLocation();

	const setUser = useAuthStore((s) => s.setUser);
	const user = useAuthStore((s) => s.user);

	useEffect(() => {

		const token = localStorage.getItem("token");

		if (token) {
			getLoggedInUserProfile(setUser, setIsAuthenticated, setRole, location.pathname);
		} else {

		}
	}, []);

	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				const allDropdowns = document.querySelectorAll(".dropdown-content");

				allDropdowns.forEach((dd) => {
					document.getElementById("userDropdown").classList.remove("show");
				});
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	function toggleDropdown(dropdownId) {
		const dropdown = document.getElementById(dropdownId);
		const allDropdowns =
			document.querySelectorAll(".dropdown-content");

		// Close all other dropdowns
		allDropdowns.forEach((dd) => {
			if (dd.id !== dropdownId) {
				dd.classList.remove("show");
			}
		});

		dropdown.classList.toggle("show");
	}

	function closeDropdown() {
		const allDropdowns = document.querySelectorAll(".dropdown-content");
		allDropdowns.forEach((dd) => {
			dd.classList.remove("show");
		});
	}


	return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				<div className="flex items-center gap-8">
					<Link to={`/`} className="flex items-center space-x-2" reloadDocument>
						<svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m0 0v10l8 4" /></svg>
						<span className="text-xl font-bold">LWS Job Portal</span>
					</Link>
					<nav className="hidden md:flex items-center gap-6">
						{(isAuthenticated && role === 'USER') && (
							<>
								<Link
									to={`/`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>Jobs
								</Link>
								<Link
									to={`/user/dashboard`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>Dashboard
								</Link>
								<Link
									to={`/user/applications`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>My Applications</Link
								>
							</>
						)}

						{(isAuthenticated && role === 'COMPANY') && (
							<>
								<Link
									to={`/company/dashboard`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>Dashboard
								</Link>
								<Link
									to={`/company/jobs`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>Manage Jobs
								</Link>
								<Link
									to={`/company/applicants`}
									className="text-sm font-medium text-[hsl(var(--color-primary))]"
									reloadDocument
								>Applicants
								</Link>
							</>
						)}

					</nav>
				</div>
				<div className="flex items-center gap-4">
					{(!isAuthenticated) && (
						<>
							<Link to={`/jobseeker-login`} className="btn btn-ghost text-sm" reloadDocument>
								Sign In
							</Link>
							<Link to={`/company-login`} className="btn btn-primary text-sm" reloadDocument>
								Post a Job
							</Link>
						</>
					)}

					{(isAuthenticated && role === 'USER') && (
						<>
							<div className="dropdown" ref={dropdownRef}>
								<button className="btn text-sm h-9" onClick={() => toggleDropdown('userDropdown')}>
									<div className="flex items-center gap-2">

										{user.profilePictureUrl && role === 'USER' ? (
											<div className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center">
												<img src={renderProfileImage(user.profilePictureUrl)} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
											</div>
										) : (
											<div
												className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
											>
												<svg className="h-4 w-4 text-[hsl(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" /><rect x="5" y="7" width="14" height="9" /></svg>
											</div>
										)}

										<span className="text-sm font-medium hidden md:inline">
											{user.name}
										</span>
									</div>
									<svg className="ml-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" /></svg>
								</button>
								<div id="userDropdown" className="dropdown-content card p-2">
									<button className="w-full text-left text-sm p-2 hover:bg-accent rounded" onClick={closeDropdown}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-user-pen-icon lucide-user-pen"
											style={{ display: "inline" }}
										>
											<path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
											<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
											<circle cx={10} cy={7} r={4} />
										</svg>
										&nbsp;&nbsp;
										<Link to={`/user-profile`} reloadDocument>
											Profile
										</Link>
									</button>

									<button className="w-full text-left text-sm p-2 hover:bg-accent rounded" onClick={closeDropdown}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={12}
											height={12}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-log-out-icon lucide-log-out"
											style={{ display: "inline" }}
										>
											<path d="m16 17 5-5-5-5" />
											<path d="M21 12H9" />
											<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										</svg>
										&nbsp;&nbsp;
										<Link to={`/logout`} reloadDocument>
											Logout
										</Link>
									</button>
								</div>
							</div>
						</>
					)}

					{(isAuthenticated && role === 'COMPANY') && (
						<>
							<Link to={`/company/post-job`} className="btn btn-primary" reloadDocument>
								<svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
								Post Job
							</Link>

							<div className="dropdown" ref={dropdownRef}>
								<button className="btn text-sm h-9" onClick={() => toggleDropdown('userDropdown')}>
									<div className="flex items-center gap-2">
										{user.logoUrl && role === 'COMPANY' ? (
											<img src={renderProfileImage(user.logoUrl)} alt={user.name} className="h-8 w-8 rounded-full object-cover" />
										) : (
											<div
												className="h-8 w-8 rounded-full bg-[hsl(var(--color-secondary))] flex items-center justify-center"
											>
												<svg className="h-4 w-4 text-[hsl(var(--color-primary))]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" /><rect x="5" y="7" width="14" height="9" /></svg>
											</div>
										)}

										<span className="text-sm font-medium hidden md:inline">
											{user.name}
										</span>
									</div>
									<svg className="ml-2 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" /></svg>
								</button>
								<div id="userDropdown" className="dropdown-content card p-2">
									<button className="w-full text-left text-sm p-2 hover:bg-accent rounded" onClick={closeDropdown}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-user-pen-icon lucide-user-pen"
											style={{ display: "inline" }}
										>
											<path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
											<path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
											<circle cx={10} cy={7} r={4} />
										</svg>
										&nbsp;&nbsp;
										<Link to={`/company/profile/${user.slug}`} reloadDocument>
											Profile
										</Link>
									</button>

									<button className="w-full text-left text-sm p-2 hover:bg-accent rounded" onClick={closeDropdown}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={16}
											height={16}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-settings"
											style={{ display: "inline" }}
										>
											<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
											<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .67.39 1.27 1 1.51H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
										</svg>

										&nbsp;&nbsp;
										<Link to={`/company/edit`} reloadDocument>
											Settings
										</Link>
									</button>
									<button className="w-full text-left text-sm p-2 hover:bg-accent rounded" onClick={closeDropdown}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={12}
											height={12}
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth={2.5}
											strokeLinecap="round"
											strokeLinejoin="round"
											className="lucide lucide-log-out-icon lucide-log-out"
											style={{ display: "inline" }}
										>
											<path d="m16 17 5-5-5-5" />
											<path d="M21 12H9" />
											<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										</svg>
										&nbsp;&nbsp;
										<Link to={`/logout`} reloadDocument>
											Logout
										</Link>
									</button>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</header>
	)
}

export default Header
