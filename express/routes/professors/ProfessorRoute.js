var express = require('express')
var router = express.Router()
var professorService = require('../../services/professors/professorServer')

router.post('/create', function (req, res) {
    const professor = professorService.create(req.body)
    return res.json(professor)
});

router.get('/retrieve/:id', function (req, res) {
    const professor = professorService.retrieve(req.params.id)
    return res.json(professor)
});

router.put('/update/:id', function (req, res) {
    const professor = professorService.update(req.params.id, req.body)
    return res.json(professor)
});

router.delete('/delete/:id', function (req, res) {
    const ok = professorService.delete(req.params.id)
    if (ok) return res.json({ "sucess": true })
    else return res.json({ "sucess": false })
});

router.get('/list', function (req, res) {
    return res.json(professorService.list())
})

module.exports = router