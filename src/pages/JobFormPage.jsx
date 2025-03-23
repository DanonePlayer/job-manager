import React, { useState } from 'react';
import { createJob } from '../services/jobService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JobFormPage = () => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [link, setLink] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role || !company || !location || !link || !salary) {
        setError('Todos os campos são obrigatórios!');
        return;
    }

    setLoading(true);
    setError(null);

        try{
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Você precisa estar logado para cadastrar uma vaga.');
                return;
            }
            await createJob({ role, company, location, remote, link, salary: Number(salary) }, token);
            toast.success('Vaga cadastrada com sucesso!');
            navigate('/jobs');
        } catch (error) {
          toast.error(error.message)
          setError(error.message)
        }
        finally {
            setLoading(false);
        }
  };

  return (
    <div className="container">
      <h2>Cadastrar Nova Vaga</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Cargo" value={role} onChange={(e) => setRole(e.target.value)} />
        <input type="text" placeholder="Empresa" value={company} onChange={(e) => setCompany(e.target.value)} />
        <input type="text" placeholder="Localização" value={location} onChange={(e) => setLocation(e.target.value)} />
        <label>
          <input type="checkbox" checked={remote} onChange={(e) => setRemote(e.target.checked)} />
          Remoto?
        </label>
        <input type="text" placeholder="Link" value={link} onChange={(e) => setLink(e.target.value)} />
        <input type="number" placeholder="Salário" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <button type="submit" className="btn-add-job" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar Vaga'}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default JobFormPage;
