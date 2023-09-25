import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerHandler = async () => {
    try {
      const res = await axios.post('http://localhost:3002/register', {
        params: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        },
      });
      if (res.status === 201) {
        console.log('Rejestracja przebiegła pomyślnie!');
      } else {
        console.log('Rejestracja nie powiodła się!');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <input
        type="text"
        name="firstName"
        placeholder="imię"
        onChange={(e) => handleUserData(e)}
      />
      <input
        type="text"
        name="lastName"
        placeholder="nazwisko"
        onChange={(e) => handleUserData(e)}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => handleUserData(e)}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => handleUserData(e)}
      />
      <button onClick={registerHandler}>utwórz uzytkownika</button>
    </>
  );
};

export default Register;
