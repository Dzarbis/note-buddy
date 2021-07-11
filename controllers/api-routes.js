const fs = require('fs');
const router = require('express').Router();

let currentNotes = require('../db/db.json');

router.get('/notes', (req, res) => {
    console.log(currentNotes);
    res.json(currentNotes);
});

router.post('/notes', (req, res) => {

    let newId = currentNotes.length.toString();
    let newNote = req.body;
    newNote.id = newId;

    currentNotes.push(newNote);

    const jsonNote = JSON.stringify(currentNotes);

    fs.writeFile('../db/db.json', jsonNote, (err) => {
        if (err) {
            throw err;
        };
    });
    res.end();
});

router.delete('/notes/:id', (req, res) => {
    const target = req.params.id;

    let destroyer = currentNotes.filter(function (note) {
        return note.id != target;
    });

    refresh = JSON.stringify(destroyer);
    currentNotes = destroyer;

    fs.writeFileSync('../db/db.json', refresh, (err) => {
        if (err) {
            throw err;
        };
    });

    res.end();
});

module.exports = router;