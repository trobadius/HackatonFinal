import React from "react";
import "./Style-Emo.css";
const Card = ({ title, alt, image, link }) => {
  return (
    
    <div className="card" style={{ width: "18rem" }}>
      <h1>Siento...</h1>
      <img src={image} className="card-img-top" alt={alt} />
      <div className="card-body">       
        <p className="card-text">{alt}</p>
        <a href={link} className="btn btn-primary">
          {title}
        </a>
      </div>
    </div>
  );
};

export default Card;