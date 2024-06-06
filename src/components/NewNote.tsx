import NoteForm from "./NoteForm";
import useLocalStorage from "../hooks/useLocalStorage";
import { localStorageKeys } from "../utils/constants";
import { RawNote } from "../types/Note";

function NewNote() {
  const [, setNotes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  const handleCreateNote = (note: RawNote) => {
    setNotes((prev) => [...prev, note]);
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Edit Note</h1>
      <NoteForm onSubmit={handleCreateNote}></NoteForm>
    </div>
  );
}

export default NewNote;
