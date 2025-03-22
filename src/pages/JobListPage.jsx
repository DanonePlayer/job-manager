import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobListPage = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // Verifique se response.data.jobs é um array
                if (Array.isArray(response.data.jobs)) {
                    setJobs(response.data.jobs);
                } else {
                    toast.error("Erro: Estrutura de dados inválida");
                }
            } catch (error) {
                toast.error("Erro ao carregar as vagas");
            }
        };

        fetchJobs();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
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
