import Search from './Search'
import JobCard from './jobs/JobCard'
import { data, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { loadAllJobs } from "./../api/ApiCalls";

const Home = () => {

    const [jobs, setJobs] = useState({ count: "", page: 1, data: [] });
    const [jobsFilter, setJobsFilter] = useState({ search: "", sort: "recent", type: "", experienceLevel: "", minSalary: "", maxSalary: "", skills: "" });
    const jobTypeRefs = useRef([]);
    const experienceRefs = useRef([]);
    const salaryRefs = useRef([]);
    const skillsRef = useRef([]);

    useEffect(() => {
        function handleClickOutside(event) {
            const isDropdownContent = event.target.closest(".dropdown-content");
            const isDropdownButton = event.target.closest(".dropdown button");
            
            if (!isDropdownContent && !isDropdownButton) {
                const allDropdowns = document.querySelectorAll(".dropdown-content");
                allDropdowns.forEach((dd) => {
                    dd.classList.remove("show");
                });
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        loadAllJobs({ page: 1, ...jobsFilter }, setJobs);
    }, [jobsFilter]);

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

    const filterBySort = (sort, text) => {

        document.querySelector(".sort-options span").innerHTML = text;
        document.getElementById("sortDropdown").classList.remove("show");

        setJobs(prev => ({
            count: "",
            page: 1,
            data: [],
        }));

        setJobsFilter(prev => ({
            ...prev,
            sort: sort
        }));
    }


    return (
        <>
            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="mb-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            Find Your Dream Job
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            Discover thousands of job opportunities from top companies. Your next
                            career move starts here.
                        </p>
                    </div>
                </section>
                {/* Search and Filters */}
                <section className="mb-8">
                    <Search
                        jobTypeRefs={jobTypeRefs}
                        experienceRefs={experienceRefs}
                        salaryRefs={salaryRefs}
                        skillsRef={skillsRef}
                        toggleDropdown={toggleDropdown}
                        setJobsFilter={setJobsFilter}
                        setJobs={setJobs}
                    />
                </section>
                {/* Results Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold">Available Jobs</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Showing {jobs.count} results
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort by:</span>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline text-sm h-9 sort-options"
                                onClick={() => toggleDropdown('sortDropdown')}
                            >
                                <span >Most Recent</span>
                               							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={24}
								height={24}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								data-lucide="chevron-down"
								className="lucide lucide-chevron-down ml-2 h-3 w-3"
							>
								<path d="m6 9 6 6 6-6" />
							</svg>
                            </button>
                            <div id="sortDropdown" className="dropdown-content card p-2">
                                <button onClick={() => filterBySort('recent', 'Most Recent')} className="w-full text-left text-sm p-2 hover:bg-accent rounded">
                                    Most Recent
                                </button>
                                <button onClick={() => filterBySort('salary_high', 'Salary (High to Low)')} className="w-full text-left text-sm p-2 hover:bg-accent rounded">
                                    Salary (High to Low)
                                </button>
                                <button onClick={() => filterBySort('salary_low', 'Salary (Low to High)')} className="w-full text-left text-sm p-2 hover:bg-accent rounded">
                                    Salary (Low to High)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 md:gap-6">
                    <JobCard jobs={jobs.data} />

                    <article className="card p-6 hidden" id="loading-skeleton">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0">
                                <div className="h-16 w-16 skeleton" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="space-y-2">
                                    <div className="h-6 skeleton w-2/3" />
                                    <div className="h-4 skeleton w-1/2" />
                                </div>
                                <div className="h-4 skeleton w-full" />
                                <div className="flex gap-2">
                                    <div className="h-6 skeleton w-20" />
                                    <div className="h-6 skeleton w-20" />
                                    <div className="h-6 skeleton w-20" />
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <div className="h-4 skeleton w-32" />
                                    <div className="flex gap-2">
                                        <div className="h-10 skeleton w-28" />
                                        <div className="h-10 skeleton w-28" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                {/* Load More / Pagination */}
                <div className="mt-12 flex flex-col items-center gap-4">
                    {jobs.count > jobs.page * 10 ? (
                        <button onClick={() => loadAllJobs({ page: jobs.page + 1, ...jobsFilter }, setJobs)} className="btn btn-outline">
                            Load More Jobs
                            <svg
                                className="ml-2 h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                    ) : (

                        <button className="btn btn-outline" disabled>
                            No More Jobs
                        </button>
                    )}
                    {jobs.count > jobs.page * 10 ? (
                        <p className="text-sm text-muted-foreground">Showing {jobs.page * 10} of {jobs.count} jobs</p>
                    ) : (

                        <p className="text-sm text-muted-foreground">Showing {jobs.count} of {jobs.count} jobs</p>
                    )}

                </div>
                {/* Error State Example (Hidden by default, shown on error) */}
                <div className="card p-12 text-center hidden" id="error-state">
                    <svg
                        className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        We couldn't load the jobs. Please try again.
                    </p>
                    <button className="btn btn-primary">Retry</button>
                </div>
                {/* Empty State Example (Hidden by default, shown when no results) */}
                <div className="card p-12 text-center hidden" id="empty-state">
                    <svg
                        className="mx-auto h-12 w-12 text-muted-foreground mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Try adjusting your filters or search terms to find more opportunities.
                    </p>
                    <button className="btn btn-outline">Clear Filters</button>
                </div>
            </main>
            {/* Apply Job Dialog */}

        </>
    )
}

export default Home
