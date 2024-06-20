import React from "react";
import Logos from "../Logos/Logos";
import WhatIDo from "../WhatIDo/WhatIdo";
import styled from "styled-components";

const Wrapper = styled.div`
    
`;

export default function Skills() {
  return (
    <Wrapper>
      <h2>Tools & Skills</h2>
      <Logos />
      <WhatIDo />
    </Wrapper>
  );
}