const express = require('express');
const router = express.Router();
let {getPerson,
    createPerson,
    createPersonPostman,
    removePerson,
    updatePerson} = require('../controllers/people');

router.post('/', createPerson);
router.post('/postman', createPersonPostman)
router.get('/:id', getPerson)
router.put('/:id', updatePerson)
router.delete('/:id', removePerson)

module.exports = router;
