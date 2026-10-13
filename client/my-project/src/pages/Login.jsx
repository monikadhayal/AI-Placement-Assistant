import { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
      async function handleSubmit(e) {
        e.preventDefault();
        await login(email, password);
      }
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
}