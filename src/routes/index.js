const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('index');
});
router.get('/preguntas', async(req, res) => {
    res.render('preguntas');
});
router.get('/preguntas1', async(req, res) => {
    res.render('preguntas1');
});
router.get('/preguntas2', async(req, res) => {
    res.render('preguntas2');
});
router.get('/preguntas3', async(req, res) => {
    res.render('preguntas3');
});
router.get('/preguntas4', async(req, res) => {
    res.render('preguntas4');
});
module.exports = router;