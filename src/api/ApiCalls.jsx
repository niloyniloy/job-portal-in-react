import { useEffect } from "react";
import axios from "axios";

export const CDN_URL = import.meta.env.VITE_API_URL;
export const baseURL = import.meta.env.VITE_API_URL+"/api";



export const loadAllJobs = (filterData = {}, updateJobs) => {

    axios.get(`${baseURL}/jobs`, {
        params: filterData
    })
        .then((response) => {
            updateJobs((prev) => (
                {
                    ...prev,
                    data: [...prev.data, ...response.data.data],
                    count: response.data.count,
                    page: filterData.page
                }
            ));
        })
        .catch((error) => {

        });
};

export const getJobDetails = (jobId, updateJobs, setLoading, setJobId) => {

    axios.get(`${baseURL}/jobs/${jobId}`)
        .then((response) => {
            setJobId(response.data.data.id);
            setLoading(false);
            updateJobs(response.data.data);
        })
        .catch((error) => {

        });
};

export const getSimilarJobs = (jobId, updateJobs) => {

    axios.get(`${baseURL}/jobs/${jobId}/similar`)
        .then((response) => {
            updateJobs(response.data.data);
        })
        .catch((error) => {

        });
};

export const checkJobSeekerLogin = (email, password, setError) => {

    axios.post(`${baseURL}/auth/login`, {
        email,
        password,
        role: "USER",
    }).then((response) => {

        // ✅ Save token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "USER");

        // Redirect after login
        window.location.replace("/user/dashboard");
    }).catch((error) => {
        setError(error.response.data.message);
    });

};

export const checkCompanyLogin = (email, password, setError) => {

    axios.post(`${baseURL}/auth/login`, {
        email,
        password,
        role: "COMPANY",
    }).then((response) => {

        // ✅ Save token
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "COMPANY");

        // Redirect after login
        window.location.replace("/company/dashboard");
    }).catch((error) => {
        setError(error.response.data.message);
    });

};

export function timeAgo(dateString) {

    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return `Posted ${rtf.format(-count, interval.label)}`;
        }
    }

    return "Posted just now";
}

export function timeAgoWithoutPosted(dateString) {

    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return ` ${rtf.format(-count, interval.label)}`;
        }
    }

    return " just now";
}

export const formatDate = (isoDate) => {
    const date = new Date(isoDate);

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
};

export const checkUserLoggedIn = () => {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("user");

    if (userRole !== 'USER') {
        return false;
    } else {
        return true;
    }
}


export const submitApplication = (jobId, coverLetter, setCoverMessage, setApplyJobId, setRenderModal, setMyAppliedJobs, setToast) => {

    axios.post(`${baseURL}/applications/jobs/${jobId}/apply`, {
        coverLetter: coverLetter
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }).then((response) => {

        setCoverMessage("");
        setApplyJobId("");
        setRenderModal(false);
        setToast({ message: "Job Applications submitted", type: "success" })
        setMyAppliedJobs((prev) => ([...prev, response.data.data]));

    }).catch((error) => {
        setToast({ message: error.response.data.message, type: "error" })
    });

};

export const getMyJobApplications = (setMyAppliedJobs) => {

    if (checkUserLoggedIn()) {

        axios.get(`${baseURL}/applications/my-applications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            setMyAppliedJobs(response.data.data);

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }

};


export const withdrawJobApplicaton = (applicationId, setMyAppliedJobs) => {

    if (checkUserLoggedIn()) {

        axios.delete(`${baseURL}/applications/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            setMyAppliedJobs(prev =>
                prev.filter(app => app.id !== applicationId)
            );
            setToast({ message: "Your application successfully withdrawn", type: "success" })

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }

};

export const withdrawJobApplication = (applicationId) => {

    if (checkUserLoggedIn()) {

        axios.delete(`${baseURL}/applications/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            //setToast({ message: "Your application successfully withdrawn", type: "success" })

        }).catch((error) => {
            //setToast({ message: error.response.data.message, type: "error" })
        });
    }

};

export const getMyApplicationsWithFilters = (appFilters, setMyApplications, setStatusLists) => {

    if (checkUserLoggedIn()) {

        axios.get(`${baseURL}/applications/my-applications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: appFilters
        }).then((response) => {

            setMyApplications(response.data);
            const statusList = createStatusList(response.data);
            setStatusLists(prev => {
                if (prev.length > 0) return prev; // already set, do nothing
                return statusList;
            });

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }
};

export const getJobsRecommendations = (setRecommendations) => {

    if (checkUserLoggedIn()) {

        axios.get(`${baseURL}/jobs/recommendations`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            setRecommendations(response.data.data);

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }

};

const createStatusList = (responseData) => {
    if (!responseData?.data) return [];

    const statusMap = responseData.data.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(statusMap)
        .map(([status, count]) => ({ status, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 2);
};

export const getUsersProfie = (setUsersProfile) => {

    if (checkUserLoggedIn()) {

        axios.get(`${baseURL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            setUsersProfile(response.data.data);

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }
};

export const uploadProfilePicture = (file, setToast, setUser) => {

    if (!checkUserLoggedIn()) {
        return Promise.reject(new Error("User not logged in"));
    }

    if (!file) {
        setToast({ message: "No file selected", type: "error" });
        return Promise.reject(new Error("No file selected"));
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        setToast({ message: "Invalid file type. Only JPG, PNG, GIF allowed", type: "error" });
        return Promise.reject(new Error("Invalid file type"));
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        setToast({ message: "File size exceeds 5MB limit", type: "error" });
        return Promise.reject(new Error("File too large"));
    }

    const formData = new FormData();
    formData.append('profilePicture', file);

    return axios.post(`${baseURL}/users/profile-picture`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        setToast({ message: "Profile picture updated successfully", type: "success" });
        setUser( response.data.data );
        
        return response.data.data;
    }).catch((error) => {
        const errorMsg = error.response?.data?.message || "Failed to upload profile picture";
        setToast({ message: errorMsg, type: "error" });
        throw error;
    });
};


export const uploadResume = (file, setToast) => {

    if (!checkUserLoggedIn()) {
        return Promise.reject(new Error("User not logged in"));
    }

    if (!file) {
        setToast({ message: "No file selected", type: "error" });
        return Promise.reject(new Error("No file selected"));
    }

    const validTypes = [
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx
    ];

    if (!validTypes.includes(file.type)) {
        setToast({ message: "Invalid file type. Only PDF, DOC, DOCX allowed", type: "error" });
        return Promise.reject(new Error("Invalid file type"));
    }

    const maxSize = 25 * 1024 * 1024;
    if (file.size > maxSize) {
        setToast({ message: "File size exceeds 25MB limit", type: "error" });
        return Promise.reject(new Error("File too large"));
    }

    const formData = new FormData();
    formData.append('resume', file);

    return axios.post(`${baseURL}/users/resume`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        setToast({ message: "Resume updated successfully", type: "success" });
        return response.data.data;
    }).catch((error) => {
        const errorMsg = error.response?.data?.message || "Failed to upload Resume";
        setToast({ message: errorMsg, type: "error" });
        throw error;
    });
};

export const renderProfileImage = (image = '') => {

    if (image.includes("http")) {

        return image;
    } else if (image.length > 0) {

        return CDN_URL + image;
    } else {
        return "";
    }
}


export function formatResumeDate(isoString) {

    const date = new Date(isoString);

    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC"
    });
}

export const updateUsersProfile = (usersProfile, setToast) => {

    if (checkUserLoggedIn()) {

        axios.put(`${baseURL}/users/profile`, usersProfile, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {

            setToast({ message: "Profile info updated successfully", type: "success" });

        }).catch((error) => {
            setToast({ message: error.response.data.message, type: "error" })
        });
    }
};


export const checkCompanyLoggedIn = () => {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("user");

    if (userRole !== 'COMPANY') {
        return false;
    } else {
        return true;
    }
}



export const getDashboardStats = (setStats, setToast) => {

    if (checkCompanyLoggedIn()) {

        axios.get(`${baseURL}/companies/dashboard/stats`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setStats(response.data.data);
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to fetch stats", type: "error" });
        });
    }
};

export const getDashboardJobs = (setJobs, setToast) => {

    if (checkCompanyLoggedIn()) {

        axios.get(`${baseURL}/companies/jobs?sort=newest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setJobs(response.data.data.slice(0, 5));
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to fetch jobs", type: "error" });
        });
    }
};

export const formatJobPostedDate = (createdAt) => {
    const date = new Date(createdAt);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return `Posted ${rtf.format(-count, interval.label)}`;
        }
    }

    return "Posted just now";
}


export const getDashboardApplicants = (setApplicants, setToast) => {

    if (checkCompanyLoggedIn()) {

        axios.get(`${baseURL}/companies/applicants?sort=newest`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setApplicants(response.data.data.slice(0, 3));
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to fetch applicants", type: "error" });
        });
    }
};

export const formatApplicantDate = (updatedAt) => {
    const date = new Date(updatedAt);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
            return rtf.format(-count, interval.label);
        }
    }

    return "just now";
};

export const getCompanyProfileBySlug = (companySlug, setCompanyData, setError) => {
    axios.get(`${baseURL}/companies/${companySlug}`)
        .then((response) => {
            setCompanyData(response.data.data);
            setError(null);
        }).catch((error) => {
            if (error.response?.status === 404) {
                setError("Company not found");
            } else {
                setError("Error loading company");
            }
        });
};

export const formatSalary = (min, max) => {
    const formatNum = (num) => {
        if (num >= 1000) {
            return `$${(num / 1000).toFixed(0)}k`;
        }
        return `$${num}`;
    };
    return `${formatNum(min)} - ${formatNum(max)}`;
};


export const getJobApplicants = (filters, setApplicants) => {
    if (checkCompanyLoggedIn()) {
        axios.get(`${baseURL}/companies/applicants`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: filters
        }).then((response) => {
            setApplicants(response.data);
        }).catch((error) => {

        });
    }
};

export const updateApplicationStatus = (applicationId, status, setToast) => {
    if (checkCompanyLoggedIn()) {
        axios.patch(`${baseURL}/companies/applications/${applicationId}/status`, { status }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }).then((response) => {
            setToast({ message: "Status updated successfully", type: "success" });
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to update status", type: "error" });
        });
    }
};

export const getCompanyJobs = (filters, setJobs) => {
    if (checkCompanyLoggedIn()) {
        const params = { page: filters.page, sort: filters.sort };
        if (filters.search) params.search = filters.search;
        if (filters.status) params.status = filters.status;

        axios.get(`${baseURL}/companies/jobs`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            params
        }).then((response) => {
            setJobs(response.data);
        }).catch((error) => {

        });
    }
};

export const deleteCompanyJob = (jobId, setToast, onSuccess) => {
    if (checkCompanyLoggedIn()) {
        axios.delete(`${baseURL}/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then(() => {
            setToast({ message: "Job deleted successfully", type: "success" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
            if (onSuccess) onSuccess();
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to delete job", type: "error" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
        });
    }
};

export const createJob = (jobData, setToast, onSuccess) => {
    if (checkCompanyLoggedIn()) {
        axios.post(`${baseURL}/jobs`, jobData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setToast({ message: "Job created successfully", type: "success" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
            if (onSuccess) onSuccess(response.data.data);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to create job", type: "error" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
        });
    }
};

export const updateJob = (jobId, jobData, setToast, onSuccess) => {
    if (checkCompanyLoggedIn()) {
        axios.put(`${baseURL}/jobs/${jobId}`, jobData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setToast({ message: "Job updated successfully", type: "success" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
            if (onSuccess) onSuccess(response.data.data);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to update job", type: "error" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
        });
    }
};

export const getJobBySlug = (jobSlug, setJobData, setToast) => {
    if (checkCompanyLoggedIn()) {
        axios.get(`${baseURL}/jobs/${jobSlug}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setJobData(response.data.data);
        }).catch((error) => {
            if (error.response?.status === 404) {
                setToast({ message: "Job not exists", type: "error" });
                setTimeout(() => setToast({ message: "", type: "" }), 3000);
            }

        });
    }
};

export const getJobById = (jobId, setJobData) => {
    if (checkCompanyLoggedIn()) {
        axios.get(`${baseURL}/jobs/${jobId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setJobData(response.data.data);
        }).catch((error) => {

        });
    }
};

export const getCompanyProfile = (setCompanyProfile, setToast) => {
    if (checkCompanyLoggedIn()) {
        axios.get(`${baseURL}/companies/profile`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setCompanyProfile(response.data.data);
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to fetch profile", type: "error" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
        });
    }
};

export const updateCompanyProfile = (profileData, setUser, setToast, onSuccess) => {
    if (checkCompanyLoggedIn()) {
        axios.put(`${baseURL}/companies/profile`, profileData, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            setToast({ message: "Profile updated successfully", type: "success" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
            if (onSuccess) {
                onSuccess(response.data.data);
                setUser(response.data.data);
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }).catch((error) => {
            setToast({ message: error.response?.data?.message || "Failed to update profile", type: "error" });
            setTimeout(() => setToast({ message: "", type: "" }), 3000);
        });
    }
};

export const registerJobSeeker = (userData, setToast) => {
    axios.post(`${baseURL}/auth/register`, userData)
        .then((response) => {
            setToast({ message: "Registration successful! Redirecting to login...", type: "success" });
            setTimeout(() => {
                window.location.href = "/login/user";
            }, 2000);
        })
        .catch((error) => {
            setToast({ message: error.response?.data?.message || "Registration failed", type: "error" });
        });
};

export const registerCompany = (companyData, setToast) => {
    axios.post(`${baseURL}/auth/register`, companyData)
        .then((response) => {
            setToast({ message: "Registration successful! Redirecting to login...", type: "success" });
            setTimeout(() => {
                window.location.href = "/login/company";
            }, 2000);
        })
        .catch((error) => {
            setToast({ message: error.response?.data?.message || "Registration failed", type: "error" });
        });
};

export const uploadCompanyLogo = (file, setUser, setToast) => {
    if (!checkCompanyLoggedIn()) {
        return Promise.reject(new Error("Company not logged in"));
    }

    if (!file) {
        setToast({ message: "No file selected", type: "error" });
        return Promise.reject(new Error("No file selected"));
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
        setToast({ message: "Invalid file type. Only JPG, PNG, GIF allowed", type: "error" });
        return Promise.reject(new Error("Invalid file type"));
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
        setToast({ message: "File size exceeds 5MB limit", type: "error" });
        return Promise.reject(new Error("File too large"));
    }

    const formData = new FormData();
    formData.append('logo', file);

    return axios.post(`${baseURL}/companies/logo`, formData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        setUser(response.data.data);
        return response.data.data;
    }).catch((error) => {
        const errorMsg = error.response?.data?.message || "Failed to upload logo";
        setToast({ message: errorMsg, type: "error" });
        throw error;
    });
};

export const getUserProfileById = (userId, setUsersProfile, setError) => {
    axios.get(`${baseURL}/users/${userId}`)
        .then((response) => {
            setUsersProfile(response.data.data);
            setError(null);
        })
        .catch((error) => {
            if (error.response?.status === 404) {
                setError("404 not found");
            } else {
                setError("404 not found");
            }
        });
};

export const getLoggedInUserProfile = (setUser, setIsAuthenticated, setRole, currentLocation) => {

    axios.get(`${baseURL}/auth/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
        .then((response) => {
            setUser(response.data.data);
            setIsAuthenticated(true);
            setRole(response.data.data.role);

            if (response.data.data.role === 'USER') {

                const companyAllowedRoutes = [
                    "/company/dashboard",
                    "/company/applicants",
                    "/company/jobs",
                    "/company/post-job",
                    "/login/company",
                    "/register/company",
                    "/register/user",
                    "/login/user"
                ];

                let isAllowed = true;

                for (let i = 0; i < companyAllowedRoutes.length; i++) {
                    if (currentLocation.includes(companyAllowedRoutes[i])) {
                        isAllowed = false;
                        break;
                    }
                }

                if (!isAllowed) {
                    window.location.replace("/");
                }
            }


            if (response.data.data.role === 'COMPANY') {

                const userAllowedRoutes = [
                    "/user/dashboard",
                    "/user/applications",
                    "/user-profile",
                    "/user-profile/edit",
                    "/login/company",
                    "/register/company",
                    "/register/user",
                    "/login/user"
                ];

                let isAllowed = true;

                for (let i = 0; i < userAllowedRoutes.length; i++) {
                    if (currentLocation.includes(userAllowedRoutes[i])) {
                        isAllowed = false;
                        break;
                    }
                }

                if (!isAllowed) {
                    window.location.replace("/");
                }
            }

        })
        .catch((error) => {
            setIsAuthenticated(false);
            if ( currentLocation !== '/' ) {
                window.location.replace("/");
            }
        });
}
