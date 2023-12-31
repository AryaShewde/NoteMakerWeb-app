import React, { useContext, useState ,useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }
        else{
            history("/login");
        }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)


    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
    }
    
    const handleClick = (e)=>{
        editNote(note.id, note.etitle, note.edescription, note.etag);
        console.log("Updating the note.....", note);
        refclose.current.click();
        props.showalert("Updated Successfully", "success");
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <AddNote showalert={props.showalert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <textarea className="form-control" id="etitle" name="etitle" rows="1" value={note.etitle} onChange={onChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChange} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}required></input>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 1 || note.edescription.length < 1} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h1>Your Notes</h1>
                <div className="container mx-2">
                {notes.lenght===0 && "No notes to display"}
                </div>
                {notes.map((note) => {
                    return <Noteitem showalert={props.showalert} key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </div>
    )
}

export default Notes
