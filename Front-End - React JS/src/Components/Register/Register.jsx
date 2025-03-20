import { FaUser, FaTrashAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import "./Register.css";
import api from "../services/api";

const Register = ({ toggleScreen }) => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para controlar a visibilidade da confirmação de senha


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

    async function createUser() {
        if (password !== confirmPass) {
            alert("[ERRO] As senhas não coincidem, tente novamente.");
            return;
        }

        if (!username || !email || !password || !confirmPass) {
            alert("[ERRO] Por favor, preencha todos os campos.");
            return;
        }

        try {
            await api.post("/users", {
                name: username,
                email: email,
                password: password,
            });
            alert("Usuário cadastrado com sucesso!");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPass("");
            getUsers(); // Atualiza a lista de usuários após o cadastro
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
        }
    }

    async function deleteUser(id) {
        await api.delete(`/users/${id}`)
        alert("Usuário deletado com sucesso!")
        getUsers()
    }

    useEffect(() => {
        getUsers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createUser();
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1>Cadastro de Usuários</h1>

                <div className="input-field">
                    <input 
                        type="text" 
                        placeholder='Nome de Usuário' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <FaUser className="icon"/>
                </div>

                <div className="input-field">
                    <input 
                        type="email" 
                        placeholder='E-mail' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FaUser className="icon"/>
                </div>
                
                <div className="input-field">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder='Senha' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="icon">
                        {showPassword ? <FaEye/> : <FaEyeSlash/>}
                    </span>
                </div>

                <div className="input-field">
                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='Confirme sua Senha' 
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="icon">
                        {showConfirmPassword ? <FaEye/> : <FaEyeSlash/>}
                    </span>
                </div>  

                <button type="submit">Cadastrar</button>

                <div className="signup-link">
                    <p>Já tem uma conta? 
                        <a href="#" onClick={() => toggleScreen('login')}> Voltar ao Login
                        </a> 
                    </p>
                </div>
            </form>

            {Array.isArray(users) && users.map((user) => (
                <div key={user.id} className="card">
                    <div>
                        <p>Nome de Usuário: <span>{user.name}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                    </div>
                    <button className="trash-button" onClick={() => deleteUser(user.id)}>
                        <FaTrashAlt className="icon"/>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Register;