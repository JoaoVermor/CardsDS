import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import "./Homepage.css";



export default function Homepage() {
  const url = "http://localhost:8081/"

  const [Cards, setCards] = useState([]);

  useEffect(() => {
    fetch(url + "Cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, [url]);

  const carousel = useRef();
  const [width,setWidth] = useState(0);

  useEffect(()=>{
    setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth)
  })

  return (
    <div className="App">
      <motion.div ref={carousel} className="carousel" whileTap={{cursor: "grabbing"}}>
        <motion.div className="inner" drag="x" dragConstraints={{right: 0, left: -width}}>
          {Cards.map(item => 
            (
              <motion.div className="item" key={item.id}>
                <img alt="" src={item.img}/>
                <h1 style={{textAlign: "center", textShadow: "2px 2px black"}}>{item.nome}</h1>
              </motion.div>
            )
            )}
        </motion.div>
      </motion.div>
    </div>
  )
}
