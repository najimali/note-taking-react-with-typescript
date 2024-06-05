import { Navigate, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import useNote from "../hooks/useNote";

function EditNote() {
  const { id } = useParams();
  const note = useNote(id);
  if (!note) return <Navigate to="/" replace></Navigate>;
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Edit Note</h1>
      <NoteForm existingNote={note}></NoteForm>
    </div>
  );
}

export default EditNote;
