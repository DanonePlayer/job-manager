import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../services/authService";
import "../assets/styles/login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('token') !== null;
        if (isAuthenticated) {
            navigate("/jobs");
        }
    }
    , [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({ email, password });
            if (response.message) {
                localStorage.setItem('token', response.message);
                toast.success("Login successful!");
                navigate("/jobs");
            } else {
                toast.error("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Erro de credenciais. Verifique seu email ou senha.");
            } else {
                toast.error("Ocorreu um erro. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="button-login" disabled={loading}> {loading && <div className="spinner"></div>}{loading ? 'Entrando...' : 'Login'}</button>
            </form>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;