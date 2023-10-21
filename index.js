import express from 'express';
import mongoose from "mongoose";
import {registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from './utils/checkAuth.js';
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

const app = express();

app.use(express.json());
mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.5pp6cdj.mongodb.net/university')
    .then(() => console.log('database ok'))
    .catch((err) => console.log('DB error', err))


app.post('/login', loginValidation, UserController.login);
app.post('/register', registerValidation, UserController.register);


app.get('/posts', checkAuth, PostController.index)
app.post('/posts', checkAuth, PostController.create)
app.get('/posts/:id', checkAuth, PostController.show)
app.put('/posts/:id', checkAuth, PostController.update)
app.delete('/posts/:id', checkAuth, PostController.destroy);
app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('server ok');
});


