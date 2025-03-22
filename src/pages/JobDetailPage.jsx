import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const JobDetailPage = () => {
    const [job, setJob] = useState(null);
    const jobId = window.location.pathname.split("/").pop();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axios.get('https://openingteste.mpac.mp.br/api/v1/openings', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const foundJob = response.data.message.find((job) => job.id === Number(jobId));
                console.log("Vaga encontrada:", foundJob);
                if (foundJob) {
                    setJob(foundJob);
                } else {
                    console.error("Erro: Vaga não encontrada.", response.data);
                    navigate("/jobs");
                }
            } catch (error) {
                console.error("Erro ao carregar os detalhes da vaga:", error);
            }
        };

        fetchJobDetails();
    }, [jobId, navigate]);

    if (!job) return <div>Loading...</div>;

    return (
        <div className="job-detail-page">
            <h1>{job.role}</h1>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Remote:</strong> {job.remote ? "Yes" : "No"}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <a href={job.link} target="_blank" rel="noopener noreferrer">Apply Now</a>
        </div>
    );
};

export default JobDetailPage;
