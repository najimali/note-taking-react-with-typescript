import React, { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelectCreatable from "react-select/creatable";
import { RawNote } from "./types/Note";
import { Tag } from "./types/Tag";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "./hooks/useLocalStorage";
import { localStorageKeys } from "./utils/constants";

const NoteForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [notes, setNotes] = useLocalStorage<RawNote[]>(
    localStorageKeys.Notes,
    []
  );
  const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>(
    localStorageKeys.Tags,
    []
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const newRawNote: RawNote = {
      id: uuidV4(),
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tagsIds: selectedTags.map(({ id }) => id),
    };
    setNotes((prev) => [...prev, newRawNote]);
  };

  const handleOnCreateOption = (label: string) => {
    const newTag = { id: uuidV4(), label };
    setAvailableTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, newTag]);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Stack className="gap-4">
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control required ref={titleRef}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelectCreatable
                  isMulti
                  value={selectedTags.map((tag) => {
                    return {
                      label: tag.label,
                      value: tag.id,
                    };
                  })}
                  options={availableTags.map((tag) => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onCreateOption={handleOnCreateOption}
                  onChange={(tags) => {
                    const transformedTags = tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    });
                    setSelectedTags(transformedTags);
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
