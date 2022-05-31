require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const router = require("./routers/router");
require("./db/conn");

const app = express();
const port = process.env.PORT || 8000;

const static_path = path.join(__dirname,"../public/files");
const views_path = path.join(__dirname,"../public/templates/views");
const partials_path = path.join(__dirname,"../public/templates/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",views_path);
hbs.registerPartials(partials_path);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(router);

app.listen(port,()=>{
    console.log("Running on port",port+"...");
})