const fs = require('fs');

module.exports = (app) => {
    let currentNotes = require(__dirname + '/../db/db.json');

    app.get('/api/notes', (req, res) => {
        res.json(currentNotes);
    });

    app.post('/api/notes', (req, res) => {

        let newId = currentNotes.length.toString();
        let newNote = req.body;
        newNote.id = newId;

        currentNotes.push(newNote);

        const jsonNote = JSON.stringify(currentNotes);

        fs.writeFile(__dirname + '/../db/db.json', jsonNote, (err) => {
            if (err) {
                throw err;
            };
        });
        res.end();
    });

    app.delete('api/notes/:id', (req, res) => {
        const target = req.params.id;

        let destroyer = currentNotes.filter(function (note) {
            return note.id != target;
        });

        refresh = JSON.stringify(destroyer);
        currentNotes = destroyer;

        fs.writeFileSync(__dirname + '/../db/db.json', refresh, (err) => {
            if (err) {
                throw err;
            };
        });

        res.end();
    });
};