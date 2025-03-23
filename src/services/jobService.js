import axios from 'axios';

const API_URL = 'https://openingteste.mpac.mp.br/api/v1/';

const handleError = (error) => {
    return error.response?.data?.message || "Ocorreu um erro inesperado. Tente novamente.";
};

const getJobs = async (token) => {
    try {
        const response = await axios.get(API_URL+"openings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.message || [];
    } catch (error) {
        throw new Error (handleError(error));
    }
};

const getJobDetails = async (jobId, token) => {
    try {
        const response = await axios.get(API_URL+"openings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.message.find(job => job.id === Number(jobId));
    } catch (error) {
        throw new Error (handleError(error));
    }
};

const createJob = async (jobData, token) => {
    try {
        const response = await axios.post(API_URL+"opening", jobData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.message;
    } catch (error) {
        throw new Error (handleError(error));
    }
};

const updateJob = async (jobId, jobData, token) => {
    try {
        const response = await axios.put(`${API_URL+"opening"}?id=${jobId}`, jobData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data.message;
    } catch (error) {
        throw new Error (handleError(error));
    }
}

const deleteJob = async (jobId, token) => {
    try {
        const response = await axios.delete(`${API_URL+"opening"}?id=${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.message;
    } catch (error) {
        throw new Error (handleError(error));
    }
};

export { getJobs, getJobDetails, createJob, deleteJob, updateJob };
