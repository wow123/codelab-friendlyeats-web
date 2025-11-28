"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "@/src/lib/firebase/auth.js";

export default function SignInModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await signInWithEmailAndPassword(email, password);
      setMessage("Signed in successfully");
      onClose();
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={fieldStyle}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={fieldStyle}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div style={errorStyle}>{error}</div>}
          {message && <div style={messageStyle}>{message}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
            <div>
              <button type="submit" style={buttonStyle}>
                Sign In
              </button>
              <button type="button" onClick={onClose} style={cancelButtonStyle}>
                Cancel
              </button>
            </div>
            <div style={{ alignSelf: "center" }}>
              <a href="#" onClick={handleReset} style={linkStyle}>
                Forget password
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: 24,
  borderRadius: 8,
  width: 360,
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
};

const fieldStyle = { marginBottom: 12, display: "flex", flexDirection: "column" };
const buttonStyle = { padding: "8px 12px", marginRight: 8 };
const cancelButtonStyle = { padding: "8px 12px", background: "transparent", border: "1px solid #ccc" };
const linkStyle = { color: "#06c", textDecoration: "underline", cursor: "pointer" };
const errorStyle = { color: "#b00020", marginTop: 8 };
const messageStyle = { color: "#006400", marginTop: 8 };
