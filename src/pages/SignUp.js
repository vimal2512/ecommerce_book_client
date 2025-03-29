import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/users/register',
        { name, email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(' Registered Successfully:', data);
      localStorage.setItem('userInfo', JSON.stringify(data)); // Save user info in local storage
      setSuccess(true);
    } catch (err) {
      console.error('Registration Failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Registration successful!</p>}

      <form className='auth-form' onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
