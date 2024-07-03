import React from "react";
import styled from "styled-components";
import "./logos.css";
const LogoContainer = styled.div`
  display: grid;
  font-size: 27px;
  margin: 20px 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 0.6fr 0.4fr;
  text-align: center;
  @media (max-width: 580px) {
    display: none;
  }
`;
const LogoItem = styled.div`
  align-self: center;
  margin-bottom: 8px;
  &.pythonLogo {
    color: rgb(255, 232, 115);
    
  }
  &.javascriptLogo {
    color: rgb(50, 51, 48);
  }
  &.reactLogo {
    color: rgb(87, 200, 228);
  }
  
`;
const LogoText = styled.div`
  
  grid-area: "text";
  align-self: center;
  @media(max-width: 580px){
  &.pythonText{
      grid-area: 2/1;
    }
  &.javascriptText{
    grid-area: 2/2;
  }
  }
  
`;
const Logos = () => {
  return (
    <LogoContainer>
      <LogoItem className="pythonLogo">
        <i className="fab fa-python fa-2x" alt="Python"></i>
      </LogoItem>
      <LogoItem className="javascript">
        <i className="fab fa-js fa-2x" alt="Javascript"></i>{" "}
      </LogoItem>

      <LogoItem className="reactLogo">
        <i className="fab fa-react fa-2x" alt="React"></i>
      </LogoItem>
      <LogoItem className="powerbiLogo">
        <img
          className="logos-image"
          src="/images/power-bi.png"
          alt="Microsoft Power Bi"
        ></img>{" "}
      </LogoItem>
      <LogoText className="pythonText">Python</LogoText>
      <LogoText className="javascriptText">JavaScript</LogoText>
      <LogoText className="reactText">React</LogoText>

      <LogoText>PowerBi</LogoText>
    </LogoContainer>
  );
};
export default Logos;
