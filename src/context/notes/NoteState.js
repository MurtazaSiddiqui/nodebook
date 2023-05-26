import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial =[
        {
          "_id": "646768ba7eb4bbc313da21bd",
          "user": "64523771c5a6cb77de7f3c25",
          "title": "my catt",
          "description": "did not wake up early22",
          "tag": "personal",
          "date": "1684498618242",
          "__v": 0
        },
        {
          "_id": "646e1427f075a48176c39f8b",
          "user": "64523771c5a6cb77de7f3c25",
          "title": "my kiten",
          "description": "did not wake up early22",
          "tag": "personal",
          "date": "1684935719132",
          "__v": 0
        }
      ]
      const [notes, setNotes] = useState(notesInitial)


      // addNote
      const adNote = (title, description, tag)=>{
        //TODO: API Call
       const note ={
          "_id": "646e1427f075a48176c39f8b",
          "user": "64523771c5a6cb77de7f3c25",
          "title": "my kiten added by me",
          "description": "did not wake up early22  added by me",
          "tag": "personal",
          "date": "1684935719132",
          "__v": 0
        }
        setNotes(notes.push(note))

      };


      // deleteNote
      const deleteNote = ()=>{
        
      };


      // editNote
      const editNote = ()=>{
        
      };


    return (
        <NoteContext.Provider value={{notes, adNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;




