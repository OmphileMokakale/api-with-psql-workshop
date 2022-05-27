const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()


const API = require('./api');
const { default: axios } = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const DATABASE_URL = process.env.DATABASE_URL;
console.log(process.env.DATABASE_URL);
const pgp = PgPromise({});

const config = {
  connectionString: process.env.DATABASE_URL || 'postgres://gary:gar123@localhost:5432/garment_app',
  max: 30,
  ssl:{ rejectUnauthorized : false}
};

const db = pgp(config);;

API(app, db);

app.get('/',function(req,res) {
	res.render('index.html');
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`port started on port ${PORT}`);
})