import { useState, useContext } from "react";
import { usseNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = ()=> {
        if (email === "admin@gmail.com" && password === "admin1234") {
            login({ role: "admin", email });
            navigate("/admin/dashboard");
        } else if (
            email === "customer@gmail.com" &&
            password ==="customer1234"
        ) {
            login({ role: "customer", email});
            navigate("/customers/dashboard");
        } else {
            alert("Invalid email or password");
        }
    };
    return (
        <div style={{ padding: 40}}>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <br /><br />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <button onClick={{handleLogin}}>Login</button>
        </div>
    );
};
export default Login;