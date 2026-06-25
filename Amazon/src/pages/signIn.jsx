import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../context/accountContext";
import "./signIn.css";

export default function SignIn() {
  const { signIn } = useAccount();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    signIn({ name: name.trim(), email: email.trim() });
    navigate("/");
  };

  return (
    <main className="signin-page">
      <div className="signin-card">
        <h1>Sign in</h1>
        <p>Enter your name and email to sign in to your account.</p>

        <form onSubmit={handleSubmit} className="signin-form">
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <button type="submit" className="signin-btn">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
