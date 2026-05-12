import React, { useState } from 'react';
import { Container, Box, TextField, Button, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../static/logo2.png";
import auth from "../auth";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }
    setError("");
    try {
      const response = await fetch('/app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.status === 'success') {
        auth.isLoggedIn = true;
        auth.username = data.user?.username ?? username;
        navigate('/');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className='login'>
      <div className="login__top">
        <div className='home__logo'>
          <Link to="/" className="home__logoLink">
            <img src={logo2} alt="" />
          </Link>
        </div>
        <div className="login__title">LOGIN.</div>
        <div className="login__forms">
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
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                {error && <p style={{ color: 'red', margin: '8px' }}>{error}</p>}
                <div className='login__buttons'>
                  <Button type="submit" variant='contained'>Sign in</Button>
                  <Button variant="outlined" component={Link} to="/register">Create account</Button>
                </div>
              </Box>
            </Paper>
          </Container>
        </div>
      </div>
      <div className="login__bottom" />
    </div>
  );
}

export default Login;
