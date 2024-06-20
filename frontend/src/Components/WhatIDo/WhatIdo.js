import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: 580px) {
      grid-template-columns:1fr;
      grid-template-rows: 1fr 1fr 1fr;
      max-width: 300px;
      margin: auto;
    }
  `;
  const Item = styled.div`
    margin: 14px;
    border: 3px solid #333;
    display: grid;
    text-align: center;
    grid-template-rows: .6fr .1fr 1fr;
  `;
  const ItemLogo = styled.div`
    font-size: 30px;
    align-self:center;
    color: #333;
  `;
  const ItemTitle = styled.div`
    font-size: 22px;
    
  `;
  const ItemSkills = styled.ul`
    text-align: start;
  `;
const WhatIDo = () => {
  
  return (
    <Wrapper>
      

      <Item>
        <ItemLogo >
          <i className="fas fa-chart-line fa-2x" id="dashboard"></i>
        </ItemLogo>
        <ItemTitle >
          
            Dashboards
          
        </ItemTitle>
        <ItemSkills >
          <li className="what-li">Power Bi</li>
          <li className="what-li">Tableau</li>

          <li className="what-li">MatPlotLib</li>
          <li className="what-li">D3</li>
          <li className="what-li">Excel/VBA</li>
        </ItemSkills>
      </Item>
      <Item>
        <ItemLogo >
          <i className="fas fa-table fa-2x" id="wrangle"></i>
        </ItemLogo>
        <ItemTitle >
          
            Data Wrangling
          
        </ItemTitle>
        <ItemSkills >
          <li className="what-li">Pandas / Numpy</li>
          <li className="what-li">BeautifulSoup</li>
          <li className="what-li">Selenium</li>

          <li className="what-li">SQL/noSQL</li>
          <li className="what-li">API connections</li>
        </ItemSkills>
      </Item>
      <Item>
        <ItemLogo >
          <i className="fas fa-database fa-2x" id="fullStack"></i>
        </ItemLogo>
        <ItemTitle >
          
            Full Stack Development
         
        </ItemTitle>
        <ItemSkills >
          <li className="what-li">Python Flask / Node</li>
          <li className="what-li">SQL / noSQL / AWS </li>
          <li className="what-li">HTML / CSS / JS</li>
          <li className="what-li">React / Sanity / Apollo</li>
          <li className="what-li">Graphql / Gatsby / Netlify</li>
        </ItemSkills>
      </Item>
    </Wrapper>
  );
};

export default WhatIDo;
