const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');
router.get('/', async (req, res, next) => {
   try {
       const tests = await Test.findAll();
       res.send(tests);
   } catch (err) {
       next(err);
   }
});

router.get('/:id', async (req, res, next) => {
    try {
        const test = await Test.findById(req.params.id);
        if (test) {
            res.send(test);
        }
    } catch (err) {
        next(err);
    }
});

router.post('./student/:studentId', async (req, res, next) => {
    try {
        let student = await Student.findById(req.params.studentId);
        let newTest = await Test.create(req.body);
        let studentTest = await newTest.setStudent(student);
        res.status(201).send(studentTest);
    } catch (err) {
        next(err);
    }

});


router.delete('/:id', async (req, res, next) => {
    try {
        await Test.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
