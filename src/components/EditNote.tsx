import { Navigate, useParams } from "react-router-dom";
import NoteForm from "./NoteForm";
import useNote from "../hooks/useNote";
import useLocalStorage from "../hooks/useLocalStorage";
import { RawNote } from "../types/Note";
import { localStorageKeys } from "../utils/constants";

function EditNote() {
  const { id } = useParams();
  const note = useNote(id);

  const [, setNotes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  if (!note) return <Navigate to="/" replace></Navigate>;

  const handleUpdateNote = (note: RawNote) => {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((tempNote) => tempNote.id !== note.id);
      return [...newNotes, note];
    });
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Edit Note</h1>
      <NoteForm
        initialNote={note}
        onSubmit={handleUpdateNote}
        navigatePath={`/${note.id}`}
      />
    </div>
  );
}

export default EditNote;
