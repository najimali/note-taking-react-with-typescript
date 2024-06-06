import { useMemo } from "react";
import useLocalStorage from "./useLocalStorage";
import { RawNote } from "../types/Note";
import { localStorageKeys } from "../utils/constants";
import { Tag } from "../types/Tag";

const useNote = (id: string | undefined) => {
  const [notes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  const [availableTags] = useLocalStorage<Tag[]>(localStorageKeys.Tags, []);
  const note = notes.find((note) => note.id === id);

  const tagMap = useMemo(() => {
    return availableTags.reduce((map: Record<string, Tag>, tag) => {
      map[tag.id] = tag;
      return map;
    }, {});
  }, [availableTags]);
  const noteWithTag = useMemo(() => {
    if (!note) return { id: "", title: "", markdown: "", tags: [] };
    return {
      ...note,
      tags: note.tagIds.map((id) => tagMap[id]).filter(Boolean),
    };
  }, [tagMap, note]);
  return noteWithTag;
};

export default useNote;
