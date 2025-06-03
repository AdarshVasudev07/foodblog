import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!token);
  }, []);

  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ?"/myRecipe" : "/"}>My Recipe</NavLink></li>
          <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ?"/favRecipe" : "/"}>Favourites</NavLink></li>
          <li onClick={checkLogin}>
            <p className='login'>{isLogin ? "Login" : "Logout"}</p>
          </li>
        </ul>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
