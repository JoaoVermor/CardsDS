import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Cards() {
  const url = "http://localhost:8081/"

  const [Cards, setCards] = useState([]);

  useEffect(() => {
    fetch(url + "Cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, [url]);

  return(
    <div style={{
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
    }}>
      {Cards
        ? Cards.map((item) => {
            return (
              <div key={item.id}
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
              }}>               
                <div>
                  <h1 style={{textShadow: "2px 2px black"}}>{item.nome} </h1>
                  <img alt="" src={item.img} width={750} height={550}/> 
                 <br></br> <br></br>
                  <br></br>
                   <h3>{item.historia} </h3>
                   <br></br>
                </div>
              </div>
            );
          })
        : false}
    </div>
  )

}