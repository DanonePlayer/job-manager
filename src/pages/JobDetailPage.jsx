import React from "react";
import { useState, useEffect } from "react";

const JobDetailPage = () => {
    const [job, setJob] = useState(null);
    const jobId = window.location.pathname.split("/").pop();
    
    useEffect(() => {
        const fetchJobDetails = async () => {
        try {
            const response = await fetch(`/api/jobs/${jobId}`);
            const data = await response.json();
            setJob(data.job);
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
        };
    
        fetchJobDetails();
    }, [jobId]);
    
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
    }