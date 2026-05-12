import React, { useState } from 'react';
import { Container, Box, TextField, Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../static/logo2.png";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }
    setError("");
    try {
      const response = await fetch('/app/insert_user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.status === 'success') {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className='register'>
      <div className="register__top">
        <div className='home__logo'>
          <Link to="/" className="home__logoLink">
            <img src={logo2} alt="" />
          </Link>
        </div>
        <div className="register__title">REGISTER.</div>
        <div className="register__forms">
          <Container>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  sx={{ m: 1 }}
                  fullWidth
                  label="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
                <TextField
                  sx={{ m: 1 }}
                  fullWidth
                  label="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <TextField
                  sx={{ m: 1 }}
                  fullWidth
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                {error && <p style={{ color: 'red', margin: '8px' }}>{error}</p>}
                <div className='register__buttons'>
                  <Button type="submit" variant='contained'>Register</Button>
                  <Button variant="outlined" component={Link} to="/login">Back to login</Button>
                </div>
              </Box>
            </Paper>
          </Container>
        </div>
      </div>
      <div className="register__bottom" />
    </div>
  );
}

export default Register;
