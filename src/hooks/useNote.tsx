import { useOutletContext } from "react-router-dom";
import { Note } from "../types/Note";

export function useNote() {
  return useOutletContext<Note>();
}
