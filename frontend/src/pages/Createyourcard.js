import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import imgDelete from "../images/lixeira.png";
import imgUpdate from "../images/lapis.png";

export default function Createyourcards() {
  const url = "http://localhost:8081/"

  const [Cards, setCards] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [historia, setHistoria] = useState("");
  const [img, setImg] = useState("");
  const [tipo, setTipo] = useState("");

  useEffect(() => {
    fetch(url + "Cards")
      .then((response) => response.json())
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, [url]);

  function novosDados() {
    setTipo("novo");
  }

  function limparDados() {
    setId("");
    setNome("");
    setHistoria("");
    setImg("");
    setTipo("");
  }

  function editarDados(cod) {
    let card = Cards.find((item) => item.id === cod);
    const { id, nome, historia, img } = card;
    setTipo("editar");
    setId(id);
    setNome(nome);
    setHistoria(historia);
    setImg(img);
  }

  function apagarDados(cod) {
    axios.delete(url + "Cards/" + cod).then(() => {
      //atualizar a lista
      setCards(Cards.filter((item) => item.id !== cod));
    });
  }

  function atualizaListaComNovoCard(response) {
    let { id, nome, historia, img } = response.data;
    let obj = { id: id, nome: nome, historia: historia, img: img };
    let cards = Cards;
    cards.push(obj);
    setCards(cards);
    limparDados("");
  }

  function atualizaListaCardEditado(response) {
    let { id } = response.data;
    const index = Cards.findIndex((item) => item.id === id);
    let cards = Cards;
    cards[index].nome = nome;
    cards[index].historia = historia;
    cards[index].img = img;
    setCards(cards);
    limparDados("");
  }

  function gravaDados() {
    if (nome !== "" && historia !== "" && img !== "") {
      if (tipo === "novo") {
        axios.post(url + "Createyourcard/", {
          nome: nome,
          historia: historia,
          img: img,
        })
          .then((response) => atualizaListaComNovoCard(response))
          .catch((err) => console.log(err));
      } else if (tipo === "editar") {
        axios
          .put(url + "Createyourcard/" + id, {
            id: id,
            nome: nome,
            historia: historia,
            img: img,
          })
          .then((response) => atualizaListaCardEditado(response))
          .catch((err) => console.log(err));
      }
    } else {
      console.log("Preencha os campos");
    }
  }


  return (
    <div style={{
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
    }}>
      <button type="button" onClick={novosDados}>
        Criar novo Card
      </button>
      {tipo ? (
        <>
          <input
            type="text"
            placeholder="Nome"
            name="txtNome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Historia"
            name="txthistoria"
            value={historia}
            onChange={(e) => {
              setHistoria(e.target.value);
            }}
          />
          <input
            type="text"
            name="txtimg"
            placeholder="Url da imagem"
            value={img}
            onChange={(e) => {
              setImg(e.target.value);
            }}
          />
          <button type="button" onClick={limparDados}>
            Cancelar
          </button>
          <button type="button" onClick={gravaDados}>
            Gravar
          </button>
        </>
      ) : (
        false
      )}
      {Cards
        ? Cards.map((item) => {
          return (
            <div key={item.id}
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
              }}>
              {" "}
              <div>
                {" "}
                <h1>{item.nome} </h1>
                <img alt="" src={item.img} width={750} height={550} />
                <br></br> <br></br>
                <br></br>
                <p style={{fontSize: "25px", textShadow: "2px 2px black"}}>{item.historia} {"  "}</p>                  
                <br></br>
                <img
                  alt="Editar"
                  src={imgUpdate}
                  id={item.id}
                  height={40}
                  width={40}
                  onClick={(e) => editarDados(item.id)}
                  style={{backgroundColor: "white"}}
                />
                <img
                  alt="Apagar"
                  src={imgDelete}
                  id={item.id}
                  height={40}
                  width={40}
                  onClick={(e) => apagarDados(item.id)}
                  style={{backgroundColor: "white"}}
                />
              </div>
            </div>
          );
        })
        : false}

    </div>
  )
}