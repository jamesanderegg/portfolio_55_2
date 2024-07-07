import React from "react";
import styled from "styled-components";
import Skills from "../Skills/Skills";
import Infographic from '../Infographic1/Infographic';

// import RandoBarChart from "../RandoBarChart";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  margin: 0 50px;
  @media (max-width: 580px) {
    display: block;
  }
`;
const Picture = styled.img`
  display: block;
  width: 200px;
  align-self: center;
  margin: 15px auto;
  border-radius: 100px;
  grid-area: 1 / 1 / span 2;
  @media (max-width: 580px) {
      grid-area: 2/1;
      margin: 0 auto;
  }
`;
const Text = styled.div`
  text-align: center;
  align-self: center;
  display: flex;
  margin: 0 30px;
  padding: 10px;
`;

const FooterText = styled.div`
  text-align: center;
  align-self: center;
  display: grid;
  grid-area: 3 / 1 / span 2 / span 3;
  margin: 0 150px;
  @media (max-width: 580px) {
    grid-area: 4 / 1;
    margin: 30px;
  }
`;
const Container = styled.div`
    text-align: center;
`
export default function AboutPage() {
  return (
    // <Container >
      
        
    //     <FooterText>
    //       <Skills />
          
    //       </FooterText>
    // </Container>
    // <>
    // <GLTFModelProvider>
    <Infographic />
    // </GLTFModelProvider>
    // </>
  );
}