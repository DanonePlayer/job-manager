import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobs } from "../services/jobService";

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("Token não encontrado. Faça login novamente.");
                    navigate("/");
                    return;
                }
                const response = await getJobs(token);
                if(Array.isArray(response.message)) {
                    setJobs(response.message);
                }
                else {
                    toast.error("Erro ao carregar as vagas. Tente novamente mais tarde.");
                }
            } catch (error) {
                toast.error("Erro ao carregar as vagas");
            }
        };

        fetchJobs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/");
        toast.success("Logout successful!");
    };

    return (
        <div className="job-list-page">
            <h1>Vagas Disponíveis</h1>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => navigate("/jobs/new")}>Add New Job</button>
            <ul>
                {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job.id} onClick={() => navigate(`/jobs/${job.id}`)}>
                            <h2>{job.role}</h2>
                            <p>{job.company}</p>
                            <p>{job.location}</p>
                            <p>{job.remote ? "Remote" : "On-site"}</p>
                            <p>{job.salary}</p>
                        </li>
                    ))
                ) : (
                    <p>Não há vagas disponíveis no momento.</p>
                )}
            </ul>
        </div>
    );
};

export default JobListPage;
