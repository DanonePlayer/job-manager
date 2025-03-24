import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobs } from "../services/jobService";
import { logout } from "../services/authService";
import JobCard from "../components/JobCard";
import Navbar from "../components/Navbar";
import "../assets/styles/jobs.css";

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
                setJobs(response);
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="job-list-page">
            <Navbar />
            <header>
                <h1 className="h1-joblist">Vagas Disponíveis</h1>
            </header>
            <ul className="job-list">
                { jobs && jobs.length > 0 ? (
                    jobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                    <p>Não há vagas disponíveis no momento.</p>
                )}
            </ul>
        </div>
    );
};

export default JobListPage;
