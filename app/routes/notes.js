const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//ROUTE:1 Get all the notes using: Get "/api/notes/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});    
            
            res.json(notes);
        
    } catch (error) {
        console.log(error.message)       
        res.status(500).send("Internal some error occured")
    }
});

//ROUTE:2 Add a new notes using: Get "/api/notes/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 character').isLength({ min: 5 }),
], async (req, res)=>{

    try {
    const {title, description, tag} = req.body;
        //if there are error so return bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save()
        res.json(saveNote);
    } catch (error) {
        console.log(error.message)       
        res.status(500).send("Internal some error occured")
    }


    });

//ROUTE:3 update an existing notes using: PUT "/api/notes/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note to ne updated and aupdate it
    let note = await Note.findById(req.params.id);
    if (!note) {
       return res.send(404).send("Note Found");
    }    
        if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
       
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});

    res.json(note);

});    


//ROUTE:4 delete an existing notes using: delete "/api/notes/updatenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    const {title, description, tag} = req.body;


    //find the note to be deleted and deleted it
    let note = await Note.findById(req.params.id);
    if (!note) {
       return res.status(404).json("Note Found");

    }    

    //allow deletion if the user owns this
        if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
        
       
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({"success" : "Note has been deleted", note:note});

});    



module.exports = router;
