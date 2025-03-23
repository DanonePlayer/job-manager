import axios from 'axios';

const API_URL = 'https://openingteste.mpac.mp.br/api/v1/openings';

const getJobs = async (token) => {
    try {
        const response = await axios.get(API_URL, {
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
        const response = await axios.get(API_URL, {
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
        const response = await axios.post(API_URL, jobData, {
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

export { getJobs, getJobDetails, createJob };
