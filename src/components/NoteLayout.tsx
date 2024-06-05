import { useMemo } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { localStorageKeys } from "../utils/constants";
import { RawNote } from "../types/Note";
import { Tag } from "../types/Tag";

const NoteLayout = () => {
  const { id } = useParams();
  const [notes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  const [availableTags] = useLocalStorage<Tag[]>(localStorageKeys.Tags, []);
  const note = notes.find((note) => note.id === id);

  const tagMap = useMemo(() => {
    return availableTags.reduce((map: Record<string, Tag>, tag) => {
      map[tag.id] = tag;
      return map;
    }, {});
  }, [availableTags]);

  if (!note) return <Navigate to="/" replace></Navigate>;
  const noteWithTag = {
    ...note,
    tags: note.tagIds?.map((id) => tagMap[id]),
  };
  return <Outlet context={noteWithTag}></Outlet>;
};

export default NoteLayout;
