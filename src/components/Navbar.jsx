import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../assets/styles/jobs.css"; // Aqui você pode colocar o novo arquivo de estilos para o Navbar

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
    <ul className="navbar-menu">
        <li><Link to="/jobs" className="navbar-link">Vagas</Link></li>
        <li><Link to="/jobs/new" className="navbar-link">Cadastrar Vaga</Link></li>
    </ul>
    <li className='li-bnt-logout'><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
    </nav>
  );
};

export default Navbar;
