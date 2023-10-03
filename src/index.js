import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import Add from './components/Invoices/Add';
import List from './components/Invoices/List';
import Invoice from './components/Invoices/Invoice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add_invoice" element={<Add />} />
        <Route path="/list_invoices" element={<List />} />
        <Route path="/list_invoices/:id" element={<Invoice />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
