import { Tag } from "./Tag";
export interface RawNote extends RawNoteData {
  id: string;
}
export interface RawNoteData {
  title: string;
  markdown: string;
  tagsIds: string[];
}
export interface Note extends NoteData {
  id: string;
}

export interface NoteData {
  title: string;
  markdown: string;
  tags: Tag[];
}
