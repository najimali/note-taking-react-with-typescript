import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { Tag } from "../types/Tag";
import { Note, RawNote } from "../types/Note";
import {
  convertSelectOptionsToTags,
  convertTagsToSelectOptions,
} from "../transformer/convertTagsToOptions";
import { localStorageKeys } from "../utils/constants";
import useLocalStorage from "../hooks/useLocalStorage";

interface NoteFormProps {
  initialNote?: Note;
  onSubmit: (note: RawNote) => void;
  navigatePath?: string;
}
const NoteForm = ({
  initialNote,
  onSubmit,
  navigatePath = "..",
}: NoteFormProps) => {
  const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>(
    localStorageKeys.Tags,
    []
  );
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    initialNote?.tags ?? []
  );
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newRawNote: RawNote = {
      id: initialNote?.id || uuidV4(),
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tagIds: selectedTags.map(({ id }) => id),
    };
    onSubmit(newRawNote);
    setShouldNavigate(true);
  };
  const handleOnCreateOption = (label: string) => {
    const newTag = { id: uuidV4(), label };
    setAvailableTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, newTag]);
  };
  useEffect(() => {
    if (shouldNavigate) {
      navigate(navigatePath);
    }
  }, [shouldNavigate, navigate, navigatePath]);
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
                  defaultValue={initialNote?.title}
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
              defaultValue={initialNote?.markdown}
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
