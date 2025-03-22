import axios from 'axios';
import React, { useState } from 'react';

const JobFormPage = () => {
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [remote, setRemote] = useState(false);
  const [link, setLink] = useState("");
  const [salary, setSalary] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ role, company, location, remote, link, salary });

    if (!role || !company || !location || !link || !salary) {
        setError('Todos os campos são obrigatórios!');
        return;
    }

    const jobData = {
        role,
        company,
        location,
        remote,
        link,
        salary: Number(salary) || 0,
        };

        try{
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Você precisa estar logado para cadastrar uma vaga.');
                return;

            }
            const response = await axios.post('https://openingteste.mpac.mp.br/api/v1/opening', jobData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.message) {
                console.log('Vaga cadastrada com sucesso:', response.data);
                alert('Vaga cadastrada com sucesso!');
            }

            setRole("");
            setCompany("");
            setLocation("");
            setRemote(false);
            setLink("");
            setSalary("");
            setError(null);
        } catch (error) {
            console.error('Erro ao cadastrar vaga:', error);
            setError(error.response?.data?.message || 'Erro ao cadastrar vaga. Tente novamente mais tarde.');
        }
        finally {
            setLoading(false);
        }
  };

  return (
    <div>
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
        <button type="submit" disabled={loading}>{loading ? 'Cadastrando...' : 'Cadastrar Vaga'}</button>
      </form>
    </div>
  );
};

export default JobFormPage;
