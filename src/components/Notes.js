import React, { useContext } from 'react' 
import noteContext from '../context/notes/noteContext';
import Notecard from './Notecard';
import { fetch, AdNote } from "./AdNote"




const Notes = () => {
    const context = useContext(noteContext);
    const {notes, AdNote} = context;
  return ( 
    <>
    <AdNote/>

      <h3>Your Notes</h3>
    <div className="row my-3">
    {notes.map((note)=>{
      return <Notecard note={note} key={note._id} />
    })}
    </div>
    </>
  )
}

export default Notes
