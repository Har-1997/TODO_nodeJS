import express from "express";
import fs from "fs";
import path from "path";
// Uremn mer todo browser-uma ashxatum u infon chi pahem ete refresh enq anum browsere 
// dra hamar mez backenda petq vor et informacian inchvor tex pahenq. Uremn nax cucake 
// infoi nkarelu uxarkuma servere voch te popoxakanum script.js-i mej pahum enq

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.get("/", (req, res)=> {
    req.redirect("index.html")
});
app.get("/hello", (req, res)=> {
    res.send("Yay")
});
app.get("/bye", (req, res)=> {
    res.send({
        name: "Joe"
    })
});


// // stexcecinq naxnakan informacian vore vor get-ov uxarkum enq script.js
// let todoList = [
//     {"todo": "Do task 0", "id": "todo0"}, 
//     {"todo": "Do task 1", "id": "todo1"},
//     {"todo": "Do task 2", "id": "todo2"}
// ];

// app.get("/todos", (req, res) => {
//     res.send(todoList)
// })

// // Es funkciayovel tarmacnum enq todoList-i arjeqe aysinqn stanum enq script.js-ic post xndranqe u ira body arjeqe
// // vercnum enq.
// app.post("/todos", (req, res) => {
//     todoList = req.body;
//     res.send("Todos received");
// })
// // Uremn pordzecinq sax ashxatec refresh enq anum browsere popoxutyunnere mnum en bayc mihat xndir ka erb menq node cragire anjatenq
// // u noric miacnenq en skzbnakan vijakna eli galu uremn erb menq mer server-e anjatum enq ira sax informacian jnjvuma voncvor iran
// // veracnum enq u erb iran noric miacnum enq inqe noric mer index.js-e kardaluya de arjeqnernel stex sax skbznakanov tvaca
// // u noric skzbnakan ketin kganq. Ba inch anenq vor et informacian chkorchi?
// // 1-in varyante ena vor menq et infon pahenq fayli mej .
// // De 2 varyante u xelqin mote da pahelna db-um.

// Menq faylov es angam grenq stexcum enq mihat data.json fayl u ira mej dnum naxnakan iravijake
// Arden menq voch te popoxakanic en vercnum informacian ayl faylic data.json-ic isk faylic kardum enq fs-i mijocov

app.get("/todos", (req, res) => {
    // res.send(todoList) 
    // Stex kardum enq file-e utf8 formatov u da el verjum uxarkum u tenc get-ov gnuma script.js
    fs.promises.readFile(path.resolve("data.json"), "utf8").then((todos)=> {
        res.send(todos);
    })
})

app.post("/todos", (req, res) => {
    // todoList = req.body;
    // res.send("Todos received");
    // Stex uxxaki talis enq fail-i  hxum u en inch petqa grvi ira mej u asum enq ete sax lav exav res.send ara mihat text
    fs.promises
        .writeFile(path.resolve("data.json"), JSON.stringify(req.body, undefined, 2))
        .then(()=>{
            res.send("Todos received");
        })
})


app.listen(3001);
