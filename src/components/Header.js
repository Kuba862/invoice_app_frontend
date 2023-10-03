import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from './Vars';
import logo from '../images/logo_img.png';

const HeaderSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 20%;
  background-color: ${COLORS.bg_color};
  border-right: 1px solid ${COLORS.border_color};
  div {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 50px;
    a {
      align-self: center;
      font-size: 1.2rem;
      color: ${COLORS.font_color_dark};
      font-family: 'Young Serif', serif;
      text-decoration: none;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        color: ${COLORS.link_color_blue};
      }
    }
  }
`;

const Logo = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

const Header = () => {
  return (
    <>
      <HeaderSection>
        <Logo>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </Logo>
        <div>
          <Link to="add_invoice">dodaj fakturę</Link>
          <Link to="list_invoices">lista faktur</Link>
          <Link to="login">zaloguj</Link>
        </div>
      </HeaderSection>
    </>
  );
};

export default Header;