import axios from 'axios';

const API_URL = 'https://openingteste.mpac.mp.br/api/v1/';

const getJobs = async (token) => {
    try {
        const response = await axios.get(API_URL+"openings", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
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
        throw error;
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
        return response.data;
    } catch (error) {
        throw error;
    }
};

const deleteJob = async (jobId, token) => {
    try {
        const response = await axios.delete(`${API_URL+"opening"}?id=${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.message;
    } catch (error) {
        throw error.response?.data?.message || "Erro ao excluir a vaga";
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
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Erro ao atualizar a vaga";
    }
}

export { getJobs, getJobDetails, createJob, deleteJob, updateJob };
