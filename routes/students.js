const router = require('express').Router();
//const db = require('../db');

const Student = require('../db/models/student');

router.get('/', async(req, res, next) => {
    try {
        const students = await Student.findAll();
        res.send(students);
    } catch (err) {
        next(err);
    }

});

router.get('/:id', async (req, res, next) => {
    //console.log(req.params.id);
    try {
        const student = await Student.findById(req.params.id);
        if (student) {
            res.send(student);
        } else {
            res.status(404).send('Not found');
        }
    }
    catch (err) {
        next(err);
    }

});

router.post('/', async (req, res, next) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).send(newStudent);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {

    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await Student.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(204).send('Deleted');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
