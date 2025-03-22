import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
            const response = await axios.post('https://openingteste.mpac.mp.br/api/v1/login', { email, password });
            if (response.data.message) {
                localStorage.setItem('token', response.data.message);
                toast.success("Login successful!");
                navigate("/jobs");
            } else {
                toast.error("Credenciais inválidas. Tente novamente.");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Erro ao fazer login. Tente novamente.");
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
                <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Login'}</button>
            </form>
        </div>
    );
}

export default LoginPage;