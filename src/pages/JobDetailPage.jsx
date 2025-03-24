import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobDetails } from "../services/jobService";
import { deleteJob } from "../services/jobService";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import "../assets/styles/jobs.css";

const JobDetailPage = () => {
    const [job, setJob] = useState(null);
    const jobId = window.location.pathname.split("/").pop();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }
                const foundJob = await getJobDetails(jobId, token);
                if (foundJob) {
                    setJob(foundJob);
                } else {
                    toast.error("Vaga não encontrada!");
                    navigate("/jobs");
                }
            } catch (error) {
                toast.error(error.message);
            }
        };

        fetchJobDetails();
    }, [jobId, navigate]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta vaga?");
        if (!confirmDelete) return;
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }
            const message = await deleteJob(jobId, token);
            toast.success(message || "Vaga excluída com sucesso!");
            navigate("/jobs");
        }
        catch (error) {
            toast.error(error.message);
        }
    }

    if (!job) return <div>Loading...</div>;

    return (
        <div className="container">
            <Navbar />
            <h1>{job.role}</h1>
            <p><strong>Nome da empresa:</strong> {job.company}</p>
            <p><strong>	Localização da vaga:</strong> {job.location}</p>
            <p><strong>A Vaga é remota ?:</strong> {job.remote ? "Sim" : "Não"}</p>
            <p><strong>Salário oferecido:</strong> {`R$ ${job.salary.toLocaleString('pt-BR')}`}</p>
            <a href={job.link} target="_blank" rel="noopener noreferrer">Link para candidatura ou mais informações</a>
            
            <button onClick={handleDelete} style={{backgroundColor: "red", color: "white", marginTop: "10px"}}>
                Excluir Vaga
            </button>

            <button onClick={() => navigate(`/jobs/edit/${jobId}`)} style={{backgroundColor: "blue", color: "white", marginRight: "10px"}}>
                Editar Vaga
            </button>

        </div>
        
    );
};

export default JobDetailPage;
