import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { localStorageKeys } from "../utils/constants";
import { Tag } from "../types/Tag";
import { Note, RawNote } from "../types/Note";
import {
  convertSelectOptionsToTags,
  convertTagsToSelectOptions,
} from "../transformer/convertTagsToOptions";

interface NoteFormProps {
  existingNote?: Note;
}
const NoteForm = ({ existingNote }: NoteFormProps) => {
  const navigate = useNavigate();
  const [shouldNavigateBack, setShouldNavigateBack] = useState(false);
  const [shouldNavigateToViewNote, setShouldNavigateToViewNote] =
    useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    existingNote?.tags ?? []
  );
  const [_, setNotes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>(
    localStorageKeys.Tags,
    []
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!existingNote) {
      const newRawNote: RawNote = {
        id: uuidV4(),
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tagIds: selectedTags.map(({ id }) => id),
      };
      setNotes((prev) => [...prev, newRawNote]);
      setShouldNavigateBack(true);
    } else {
      const updatedNote: RawNote = {
        id: existingNote.id,
        title: titleRef.current!.value,
        markdown: markdownRef.current!.value,
        tagIds: selectedTags.map(({ id }) => id),
      };

      setNotes((prevNotes) => {
        const newNotes = prevNotes.filter(
          (note) => note.id !== existingNote.id
        );
        return [...newNotes, updatedNote];
      });
      setShouldNavigateToViewNote(true);
    }
  };

  const handleOnCreateOption = (label: string) => {
    const newTag = { id: uuidV4(), label };
    setAvailableTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, newTag]);
  };
  useEffect(() => {
    if (shouldNavigateBack) {
      navigate("..");
    }
  }, [shouldNavigateBack, navigate]);

  useEffect(() => {
    if (shouldNavigateToViewNote && existingNote) {
      navigate(`/${existingNote.id}`);
    }
  }, [shouldNavigateToViewNote, navigate, existingNote]);

  useEffect;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack className="gap-4">
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  ref={titleRef}
                  defaultValue={existingNote?.title}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelectCreatable
                  isMulti
                  onCreateOption={handleOnCreateOption}
                  options={convertTagsToSelectOptions(availableTags)}
                  value={convertTagsToSelectOptions(selectedTags)}
                  onChange={(changeSelectOptions) => {
                    setSelectedTags(
                      convertSelectOptionsToTags(changeSelectOptions)
                    );
                  }}
                ></ReactSelectCreatable>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="markdown">
            <Form.Label>Body</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={10}
              ref={markdownRef}
              defaultValue={existingNote?.markdown}
            ></Form.Control>
          </Form.Group>
          <Stack direction="horizontal" className="justify-end gap-2">
            <Button type="submit" variant="primary">
              Submit
            </Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">
                Cancel
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Form>
    </div>
  );
};

export default NoteForm;
