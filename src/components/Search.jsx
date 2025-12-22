
import { useRef, useContext, useState, useEffect } from "react";

function Search({ jobTypeRefs, experienceRefs, salaryRefs, skillsRef, toggleDropdown, setJobsFilter, setJobs }) {

	const [search, setSearch] = useState('');
	const inputRef = useRef(null);

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

	const jobTypes = [
		{ labels: "Full-time", value: "full_time" },
		{ labels: "Part-time", value: "Part-time" },
		{ labels: "Contract", value: "contract" },
		{ labels: "Internship", value: "internship" }
	];

	const experienceLevels = [
		{ label: "Entry Level", value: "Entry" },
		{ label: "Mid Level", value: "Mid" },
		{ label: "Senior Level", value: "Senior" },
		{ label: "Lead/Principal", value: "Lead" }
	];

	const salaryRanges = [
		{ label: "$0 - $50k", value: "0-50" },
		{ label: "$50k - $100k", value: "50-100" },
		{ label: "$100k - $150k", value: "100-150" },
		{ label: "$150k+", value: "150-plus" }
	];

	const skills = [
		"React",
		"Node.js",
		"Python",
		"Java",
		"SQL",
		"AWS"
	];

	const clearAllFilter = () => {

		setSearch("");
		if (inputRef.current) {
			inputRef.current.value = "";
		}

		jobTypeRefs.current.forEach((checkbox, i) => {
			checkbox.checked = false;
		});

		experienceRefs.current.forEach((checkbox, i) => {
			checkbox.checked = false;
		});

		salaryRefs.current.forEach((checkbox, i) => {
			checkbox.checked = false;
		});

		skillsRef.current.forEach((checkbox, i) => {
			checkbox.checked = false;
		});

		setJobsFilter(prev => ({
			...prev,
			minSalary: '',
			maxSalary: '',
			type: '',
			experienceLevel: '',
			skills: '',
			search: '',
			sort: "recent"
		}));

		setJobs(prev => ({
			count: "",
			page: 1,
			data: [],
		}));
	}

	const clickSearchButton = () => {
		setJobs(prev => ({
			count: "",
			page: 1,
			data: [],
		}));

		setJobsFilter(prev => ({
			...prev,
			search: search
		}));
	}

	const handleCheck = (clickedIndex, value) => {

		let anyItemChecked = false;
		let valueArray = [];
		let type = '';

		jobTypeRefs.current.forEach((checkbox, i) => {

			if (checkbox.checked == true) {
				anyItemChecked = true;
				valueArray.push(checkbox.value)
			}
		});

		if (!anyItemChecked) {

			type = '';
		} else {
			type = valueArray.join(",");
		}


		let skills = '';
		valueArray = [];

		skillsRef.current.forEach((checkbox, i) => {

			if (checkbox.checked == true) {
				anyItemChecked = true;
				valueArray.push(checkbox.value)
			}
		});

		if (!anyItemChecked) {

			skills = '';
		} else {
			skills = valueArray.join(",");
		}

		setJobs(prev => ({
			count: "",
			page: 1,
			data: [],
		}));

		// update filter value
		setJobsFilter(prev => ({
			...prev,
			type: type,
			skills: skills,
			search: search

		}));
	};

	const experienceCheck = (clickedIndex, value) => {

		let experienceLevel = '';
		let valueArray = [];
		let anyItemChecked = false;

		experienceRefs.current.forEach((checkbox, i) => {

			if (checkbox.checked == true) {
				anyItemChecked = true;
				valueArray.push(checkbox.value)
			}
		});

		if (!anyItemChecked) {

			experienceLevel = '';
		} else {
			experienceLevel = valueArray.join(",");
		}

		setJobs(prev => ({
			count: "",
			page: 1,
			data: [],
		}));

		// update filter value
		setJobsFilter(prev => ({
			...prev,
			experienceLevel: experienceLevel,
			search: search
		}));
	}


	const salaryChecked = (clickedIndex, value) => {

		let salaryChecked = false;
		let minSalary = '';
		let maxSalary = '';

		salaryRefs.current.forEach((box, i) => {
			if (box && i !== clickedIndex) {
				box.checked = false;
			}

			if (box.checked == true) {
				salaryChecked = true;
			}
		});

		let salaryFilter = {};

		if (salaryChecked == false) {

			salaryFilter = { minSalary: '', maxSalary: '' };
		} else {
			if (value == '0-50') {
				salaryFilter = { minSalary: '0', maxSalary: '50000' };
			} else if (value == '50-100') {
				salaryFilter = { minSalary: '49999', maxSalary: '100000' };
			} else if (value == '100-150') {
				salaryFilter = { minSalary: '99999', maxSalary: '150000' };
			} else if (value == '150-plus') {
				salaryFilter = { minSalary: '149000' };
			}
		}

		setJobs(prev => ({
			count: "",
			page: 1,
			data: [],
		}));

		// update filter value
		setJobsFilter(prev => ({
			...prev,
			...salaryFilter,
			search: search
		}));
	}

	return (
		<div className="card p-6">
			<div className="space-y-4">
				{/* Search Bar */}
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1 ring ring-transparent focus-within:ring-primary rounded-md place-content-center transition-all">
						<div className="relative">
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
								data-lucide="search"
								className="lucide lucide-search absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
							>
								<path d="m21 21-4.34-4.34" />
								<circle cx={11} cy={11} r={8} />
							</svg>

							<input
								type="text"
								onChange={(e) => setSearch(e.target.value)}
								ref={inputRef}
								placeholder="Search jobs by title, skill..."
								className="input pl-10 w-full outline-none border-none"
							/>
						</div>
					</div>
					<button onClick={clickSearchButton} className="btn btn-primary flex gap-2">
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
							data-lucide="search"
							className="lucide lucide-search h-4 w-4 mr-2"
						>
							<path d="m21 21-4.34-4.34" />
							<circle cx={11} cy={11} r={8} />
						</svg>


						Search Jobs
					</button>
				</div>
				{/* Filters */}
				<div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
					<span className="text-sm font-medium text-muted-foreground mr-2">
						Filters:
					</span>
					{/* Job Type Dropdown */}
					<div className="dropdown">
						<button
							className="btn btn-outline text-xs h-8 px-3 flex items-center"
							onClick={() => toggleDropdown('jobTypeDropdown')}
						>
							Job Type
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
						<div id="jobTypeDropdown" className="dropdown-content card p-2">
							<div className="space-y-1">
								{jobTypes.map(({ labels, value }, index) => (
									<label key={value} className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer">
										<input
											ref={(el) => (jobTypeRefs.current[index] = el)}
											type="checkbox"
											value={labels}
											className="rounded border-input"
											name="job_type"
											onChange={() => handleCheck(index, value)}
										/>
										<span className="text-sm">{labels}</span>
									</label>
								))}
							</div>
						</div>
					</div>
					{/* Experience Level Dropdown */}
					<div className="dropdown">
						<button
							className="btn btn-outline text-xs h-8 px-3 flex items-center"
							onClick={() => toggleDropdown('experienceDropdown')}
						>
							Experience Level
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
						<div
							id="experienceDropdown"
							className="dropdown-content card p-2"
						>
							<div className="space-y-1">
								{experienceLevels.map(({ label, value }, index) => (
									<label
										key={value}
										className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
									>
										<input
											type="checkbox"
											ref={(el) => (experienceRefs.current[index] = el)}
											value={value}
											className="rounded border-input"
											onChange={() => experienceCheck(label, value)}
										/>
										<span className="text-sm">{label}</span>
									</label>
								))}
							</div>
						</div>
					</div>
					{/* Salary Range Dropdown */}
					<div className="dropdown">
						<button
							className="btn btn-outline text-xs h-8 px-3 flex items-center"
							onClick={() => toggleDropdown('salaryDropdown')}
						>
							Salary Range
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
						<div id="salaryDropdown" className="dropdown-content card p-2">
							<div className="space-y-1">
								{salaryRanges.map(({ label, value }, index) => (
									<label
										key={value}
										className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
									>
										<input
											type="checkbox"
											ref={(el) => (salaryRefs.current[index] = el)}
											value={value}
											className="rounded border-input"
											onChange={() => salaryChecked(index, value)}
										/>
										<span className="text-sm">{label}</span>
									</label>
								))}
							</div>
						</div>
					</div>
					{/* Skills Dropdown */}
					<div className="dropdown">
						<button
							className="btn btn-outline text-xs h-8 px-3 flex items-center"
							onClick={() => toggleDropdown('skillsDropdown')}
						>
							Skills
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
						<div id="skillsDropdown" className="dropdown-content card p-2">
							<div className="space-y-1">
								{skills.map((skill, index) => (
									<label
										key={skill}
										className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
									>
										<input
											type="checkbox"
											ref={(el) => (skillsRef.current[index] = el)}
											value={skill}
											className="rounded border-input"
											onChange={() => handleCheck(index, skill)}
										/>
										<span className="text-sm">{skill}</span>
									</label>
								))}
							</div>
						</div>
					</div>
					<button onClick={() => clearAllFilter()} className="btn btn-ghost text-xs h-8 px-3 text-muted-foreground hover:text-foreground">
						Clear All
					</button>
				</div>

				<div className="flex flex-wrap items-center gap-2 pt-2 search-items border-border">
					{jobTypeRefs.current.map((checkbox, i) => checkbox?.checked && (
						<span key={`job-${i}`} className="badge badge-primary">{checkbox.value}</span>
					))}
					{experienceRefs.current.map((checkbox, i) => checkbox?.checked && (
						<span key={`exp-${i}`} className="badge badge-primary">{checkbox.value}</span>
					))}
					{salaryRefs.current.map((checkbox, i) => checkbox?.checked && (
						<span key={`sal-${i}`} className="badge badge-primary">{salaryRanges[i]?.label}</span>
					))}
					{skillsRef.current.map((checkbox, i) => checkbox?.checked && (
						<span key={`skill-${i}`} className="badge badge-primary">{checkbox.value}</span>
					))}
				</div>
			</div>
		</div>
	)
}

export default Search
