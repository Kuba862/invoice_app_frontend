import React from 'react';
import styled from 'styled-components';
import { COLORS } from './components/Vars';
import logo from './images/logo.png';

export const Body = styled.div`
background: rgb(0,0,0);
background: linear-gradient(180deg, ${COLORS.bg_color} 59%, ${COLORS.bg_shadow} 100%);
height: 100vh;
width: 80vw;
position: relative;
left: 20vw;
`

const HomePage = styled.div`

`

const Logo = styled.span`
display: flex;
padding: 25px 0;
justify-content: center;
`;

const Sentence = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 15px;
h3 {
  color: ${COLORS.font_color_white};
  font-family: 'Young Serif', serif;
  text-transform: uppercase;
}
p {
  color: ${COLORS.font_color_dark};
  font-family: 'Roboto', sans-serif;
}
`

const App = () => {

  return (
   <>
    <Body>
      <HomePage>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <Sentence>
        <h3>wszystkie faktury w jednym miejscu</h3>
        <p>Dzięki Computer Vision wystarczy zrobić zdjęcie, a AI wyciągnie dane</p>
        </Sentence>
      </HomePage>
    </Body>     
   </>
  );
}

export default App;
