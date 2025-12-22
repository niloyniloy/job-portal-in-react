import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home'
import Footer from './components/Footer'

import JobSeekerLogin from './components/auth/JobSeekerLogin'
import CompanyLogin from './components/auth/CompanyLogin'
import JobSeekerRegister from './components/auth/JobSeekerRegister'
import CompanyRegister from './components/auth/CompanyRegister'
import { createBrowserRouter, useLocation, RouterProvider, Outlet } from "react-router-dom";
import JobDetails from './components/jobs/JobDetails'

import UserDashboard from './components/users/UserDashboard'
import MyApplications from './components/users/MyApplications'
import UserProfile from './components/users/UserProfile'
import UserProfileById from './components/users/UserProfileById'
import EditUserProfile from './components/users/EditUserProfile'

import Logout from './components/auth/Logout'
import NotFound from './components/NotFound'

import CompanyDashboard from './components/companies/CompanyDashboard'
import CompanyProfile from './components/companies/CompanyProfile'
import JobApplicants from './components/companies/JobApplicants'
import ManageJobs from './components/companies/ManageJobs'
import PostJob from './components/companies/PostJob'
import EditCompanyProfile from './components/companies/EditCompanyProfile'

const location = window.location;
const token = localStorage.getItem("token");

if (!token) {
	const userNotAllowedRoutes = [
		"/user/dashboard",
		"/user/applications",
		"/user-profile",
		"/user-profile/edit",
		"/company/dashboard",
		"/company/applicants",
		"/company/jobs",
		"/company/post-job",
	];

	let isAllowed = true;

	for (let i = 0; i < userNotAllowedRoutes.length; i++) {
		if (location.pathname.includes(userNotAllowedRoutes[i])) {
			isAllowed = false;
			break;
		}
	}

	if (!isAllowed) {
		window.location.replace("/");
	}
}


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{ index: true, element: <Home /> },
			{
				path: "login/user",
				element: <JobSeekerLogin />
			},
			{
				path: "login/company",
				element: <CompanyLogin />
			},
			{
				path: "register/user",
				element: <JobSeekerRegister />
			},
			{
				path: "register/company",
				element: <CompanyRegister />
			},
			{
				path: "/job-details/:jobSlug",
				element: <JobDetails />
			},
			{
				path: "/user/dashboard",
				element: <UserDashboard />
			},
			{
				path: "/user/applications",
				element: <MyApplications />
			},
			{
				path: "/user-profile",
				element: <UserProfile />
			},
			{
				path: "/user/:userId",
				element: <UserProfileById />
			},
			{
				path: "/user-profile/edit",
				element: <EditUserProfile />
			},
			{
				path: "/company/dashboard",
				element: <CompanyDashboard />
			},
			{
				path: "/company/profile/:companySlug",
				element: <CompanyProfile />
			},
			{
				path: "/company/applicants",
				element: <JobApplicants />
			},
			{
				path: "/company/jobs",
				element: <ManageJobs />
			},
			{
				path: "/company/post-job",
				element: <PostJob />
			},
			{
				path: "/company/post-job/:jobSlug",
				element: <PostJob />
			},
			{
				path: "/company/edit",
				element: <EditCompanyProfile />
			},
			{
				path: "/logout",
				element: <Logout />
			},
		],
		errorElement: <NotFound />
	},
	{
		path: "*",
		element: <NotFound />
	}
]);

createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
)
