import express from "express";
import axios from "axios"

const app = express();
const port = 3000;
const url = "http://localhost:4000";
const masterKey = "1VGP2DN-6EWM4SJ-D6FGRHV-Z3PR3TT";

app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.send("Welcome to the movies API practical examples.");
});

app.get("/movies", async (req, res) => {
    try {
        const response = await axios.get(`${url}/movies`);
        const result = response.data;
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

app.get("/movies/:id", async (req, res) => {
    const getMoviesId = req.params.id;
    try {
        const response = await axios.get(`${url}/movies/${getMoviesId}`);
        const result = response.data;
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(404).send({ error: "Movie not found", message: error.message });
    }
});

app.get("/random", async (req, res) => {
    try {
        const response = await axios.get(`${url}/random`);
        console.log(response.data);
        res.send(response.data);
    } catch(error) {
        res.status(404).send({ error: "random movie not found", message: error.message})
    }
});

app.get("/post", async (req, res) => {
    const obj = {
        movie: "testMovie",
        description: "testDescription",
        date: "0000-00-00"
    }

    try {
        const response = await axios.post(`${url}/post`, obj);
        console.log(response.data);
        res.send(JSON.stringify(response.data) + " has been posted");
    } catch (error) {
        res.status(404).send({ error: "post has not been posted", message: error.message})
    }
});

app.get("/updatePost/:id", async (req, res) => {
    const getUpdatePostId = req.params.id;
    const obj = {
        movie: "testMovie2",
        description: "testDescription2",
        date: "2222-02-02"
    }

    try {
        const response = await axios.put(`${url}/updatePost/${getUpdatePostId}`, obj);
        console.log(response.data);
        res.send(JSON.stringify(response.data) + " has been updated");
    } catch (error) {
        res.status(404).send({ error: "post has not been updated", message: error.message})
    }
});

app.get("/alterPost/:id", async (req, res) => {
    const getAlterPostId = req.params.id;
    const obj = {
        movie: "testMovie3",
    }

    try {
        const response = await axios.patch(`${url}/alterPost/${getAlterPostId}`, obj);
        console.log(response.data);
        res.send(JSON.stringify(response.data) + " has been updated");
    } catch (error) {
        res.status(404).send({ error: "post has not been updated", message: error.message})
    }
});

app.get("/deletePost/:id", async (req, res) => {
    const deleteId = req.params.id;
    try {
        const response = await axios.delete(`${url}/deletePost/${deleteId}`);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        res.status(404).send({ error: "post has not deleted", message: error.message})
    }
});

app.get("/deleteAll", async (req, res) => {
    try {
        const response = await axios.delete(`${url}/deleteAll?key=${masterKey}`);
        console.log(response.data);
        res.send(response.data);
    } catch (error) {
        res.status(404).send({ error: "all posts have not been deleted", message: error.message})
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});