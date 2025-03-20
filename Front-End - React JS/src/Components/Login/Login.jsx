import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Login.css";
import api from "../services/api"; 

const Login = ({ toggleScreen }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [users, setUsers] = useState([]);

    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha


    // Função para buscar os usuários da API
    async function getUsers() {
        try {
            const response = await api.get("/users");
            console.log("Resposta da API:", response.data); // Verifique a resposta
            setUsers(response.data || []); // Garanta que seja um array
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            setUsers([]); // Em caso de erro, defina users como array vazio
        }
    }

    // Função para fazer login
    const loginUser = () => {
        if (!email || !password) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Verifica se há um usuário com o e-mail e senha fornecidos
        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user) {
            alert("Usuário logado com sucesso!");
            setEmail("");
            setPassword("");
            
        } else {
            alert("Credenciais inválidas. Tente novamente.");
        }
    };

    // Busca os usuários ao carregar o componente
    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Acesse o sistema</h1>

                <div className="input-field">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className="icon" />
                </div>

                <div className="input-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="icon">
                        {showPassword ? <FaEye/> : <FaEyeSlash/>}
                    </span>
                </div>
                
                <button type="submit" onClick={loginUser}>Entrar</button>

                <div className="signup-link">
                    <p>
                        Não tem uma conta?
                        <a href="#" onClick={() => toggleScreen("register")}>
                            {" "}
                            Registre-se
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;