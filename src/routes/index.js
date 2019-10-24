const express = require('express');
const router = express.Router();

const pool = require('../database');

//const { isLoggedIn } = require('../lib/auth');

router.get('/', async(req, res) => {
    res.render('index');
});
router.get('/preguntas', async(req, res) => {
    res.render('preguntasenelindex/preguntas');
});
router.get('/preguntas1', async(req, res) => {
    res.render('preguntasenelindex/preguntas1');
});
router.get('/preguntas2', async(req, res) => {
    res.render('preguntasenelindex/preguntas2');
});
router.get('/preguntas3', async(req, res) => {
    res.render('preguntasenelindex/preguntas3');
});
router.get('/preguntas4', async(req, res) => {
    res.render('preguntasenelindex/preguntas4');
});


module.exports = router;