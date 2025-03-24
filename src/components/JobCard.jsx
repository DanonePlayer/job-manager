import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
    const navigate = useNavigate();

    return (
        <li className="job-item" onClick={() => navigate(`/jobs/${job.id}`)}>
            <h2>{job.role}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.remote ? "Remoto" : "Presencial"}</p>
            <p>{`R$ ${job.salary.toLocaleString('pt-BR')}`}</p>
        </li>
    );
};




export default JobCard;