import React, { useState, useContext } from 'react' 
import noteContext from '../context/notes/noteContext';




export const AdNote = () => {
    const context = useContext(noteContext);
    const {adNote} = context;
    const [note, setNote] = useState({title:"", description:"", tag:""})
    const handleClick = ()=>{

    }
    const onChange = ()=>{

    }
  return (
    <>
        <div className="container my-3">
                <h2>Add a Note</h2>
                <form>
                    <div className="form-group my-3">
                        <label htmlFor="title">Name</label>
                        <input type="text" className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" name='description' id="description" onChange={onChange}/>~
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
                </form>
            </div>
    </>
  )
}

export default AdNote
 