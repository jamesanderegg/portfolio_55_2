import React from 'react';
import './Section.css';

const Section = ({ title, items }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Section;