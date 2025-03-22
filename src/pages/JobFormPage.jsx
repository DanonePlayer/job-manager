import React, { useState } from 'react';

const JobFormPage = () => {
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [link, setLink] = useState('');
  const [salary, setSalary] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ role, company, location, remote, link, salary });
  };

  return (
    <div>
      <h2>Cadastrar Nova Vaga</h2>
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
        <button type="submit">Cadastrar Vaga</button>
      </form>
    </div>
  );
};

export default JobFormPage;
