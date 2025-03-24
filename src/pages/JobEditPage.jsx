import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getJobDetails, updateJob } from "../services/jobService";
import Navbar from "../components/Navbar";
import "../assets/styles/jobs.css";


const JobEditPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobData, setJobData] = useState({
        role: "",
        company: "",
        location: "",
        remote: false,
        link: "",
        salary: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/");
                    return;
                }
                const job = await getJobDetails(jobId, token);
                if (job) {
                    setJobData(job);
                } else {
                    toast.error("Vaga não encontrada!");
                    navigate("/jobs");
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        };
        fetchJob();
    }, [jobId, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setJobData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Você precisa estar logado para editar uma vaga.");
                return;
            }
            await updateJob(jobId, jobData, token);
            toast.success("Vaga atualizada com sucesso!");
            navigate(`/jobs/${jobId}`);
        } catch (error) {
            toast.error("Erro ao atualizar a vaga. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <Navbar />
            <h2>Editar Vaga</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="role" placeholder="Cargo" value={jobData.role} onChange={handleChange} />
                <input type="text" name="company" placeholder="Empresa" value={jobData.company} onChange={handleChange} />
                <input type="text" name="location" placeholder="Localização" value={jobData.location} onChange={handleChange} />
                <label>
                    <input type="checkbox" name="remote" checked={jobData.remote} onChange={handleChange} />
                    Remoto?
                </label>
                <input type="text" name="link" placeholder="Link" value={jobData.link} onChange={handleChange} />
                <input type="number" name="salary" placeholder="Salário" value={jobData.salary} onChange={handleChange} />
                <button type="submit" className="btn-add-job" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</button>
            </form>
        </div>
    );
};

export default JobEditPage;
