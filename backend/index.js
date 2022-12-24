const express = require("express");
const { Client } = require('pg');
const cors = require("cors");
const bodyparser = require("body-parser");
const config = require("./config");

const app = express();
//middleware
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());
//************ */

var conString = config.urlConnection;
var client = new Client(conString);
client.connect(function (err) {
    if (err) {
        return console.error('Não foi possível conectar ao banco.', err);
    }
    client.query('SELECT NOW()', function (err, result) {
        if (err) {
            return console.error('Erro ao executar a query.', err);
        }
        console.log("ok");
    });
});

//ROTAS

app.get("/Cards", (req, res) => {
    try {
        client.query("SELECT * FROM Cards", function
            (err, result) {
            if (err) {
                return console.error("Erro ao executar a qry de SELECT", err);
            }
            res.send(result.rows);
            console.log("Chamou get Cards");
        });
    } catch (error) {
        console.log(error);
    }
});

app.get("/Cards/:id", (req, res) => {
    try {
        console.log("Chamou /:id " + req.params.id);
        client.query(
            "SELECT * FROM Cards WHERE id = $1",
            [req.params.id],
            function (err, result) {
                if (err) {
                    return console.error("Erro ao executar a qry de SELECT id", err);
                }
                res.send(result.rows);
                console.log(result);
            }
        );
    } catch (error) {
        console.log(error);
    }
});

app.delete("/Cards/:id", (req, res) => {
    try {
        console.log("Chamou delete /:id " + req.params.id);
        const id = req.params.id;
        client.query(
            "DELETE FROM Cards WHERE id = $1",
            [id],
            function (err, result) {
                if (err) {
                    return console.error("Erro ao executar a qry de DELETE", err);
                } else {
                    if (result.rowCount == 0) {
                        res.status(400).json({ info: "Registro não encontrado." });
                    } else {
                        res.status(200).json({ info: `Registro excluído. Código: ${id}` });
                    }
                }
                console.log(result);
            }
        );
    } catch (error) {
        console.log(error);
    }
});

app.post("/Createyourcard", (req, res) => {
    try {
        console.log("Chamou post", req.body);
        const { nome, historia, img } = req.body;
        client.query(
            "INSERT INTO Cards (nome, historia, img) VALUES ($1, $2, $3) RETURNING * ",
            [nome, historia, img],
            function (err, result) {
                if (err) {
                    return console.error("Erro ao executar a qry de INSERT", err);
                }
                const { id } = result.rows[0];
                res.setHeader("id", `${id}`);
                res.status(201).json(result.rows[0]);
                console.log(result);
            }
        );
    } catch (erro) {
        console.error(erro);
    }
});

app.put("/Createyourcard/:id", (req, res) => {
    try {
        console.log("Chamou update", req.body);
        const id = req.params.id;
        const { nome, historia, img } = req.body;
        client.query(
            "UPDATE Cards SET nome=$1, historia=$2, img=$3 WHERE id =$4 ",
            [nome, historia, img, id],
            function (err, result) {
                if (err) {
                    return console.error("Erro ao executar a qry de UPDATE", err);
                } else {
                    res.setHeader("id", id);
                    res.status(202).json({ id: id });
                    console.log(result);
                }
            }
        );
    } catch (erro) {
        console.error(erro);
    }
});



//******* */
app.listen(config.port, () =>
    console.log("Servidor funcionando na porta " + config.port)
);


module.exports = app; 

