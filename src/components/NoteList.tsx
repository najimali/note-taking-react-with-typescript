import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import useLocalStorage from "../hooks/useLocalStorage";
import { Tag } from "../types/Tag";
import { localStorageKeys } from "../utils/constants";
import {
  convertSelectOptionsToTags,
  convertTagsToSelectOptions,
} from "../transformer/convertTagsToOptions";
import { Note, RawNote } from "../types/Note";
import NoteCard from "./NoteCard";
import EditTagsModel from "./EditTagsModel";

const NoteList = () => {
  const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>(
    localStorageKeys.Tags,
    []
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  const [notes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  const [shouldShowEditTagModal, setShouldEditTagModal] = useState(false);
  const tagMap = useMemo(() => {
    return availableTags.reduce((map: Record<string, Tag>, tag) => {
      map[tag.id] = tag;
      return map;
    }, {});
  }, [availableTags]);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: note.tagIds?.map((tagId) => tagMap[tagId]).filter(Boolean),
      };
    });
  }, [notes, tagMap]);
  const filteredNotes: Note[] = useMemo(() => {
    return notesWithTags.filter((note) => {
      const isTitleMatched =
        title === "" || note.title.toLowerCase().includes(title.toLowerCase());
      const isTagMatched =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          note.tagIds.some((tagId) => tagId === tag.id)
        );
      return isTitleMatched && isTagMatched;
    });
  }, [title, selectedTags, notesWithTags]);

  const onDeleteTag = (id: string) => {
    setAvailableTags((prev) => prev.filter((tag) => tag.id !== id));
  };
  const onUpdateTag = (tag: Tag) => {
    setAvailableTags((prev) => {
      const newTags = prev.filter((tempTag) => tag.id !== tempTag.id);
      return [...newTags, tag];
    });
  };
  return (
    <>
      <EditTagsModel
        show={shouldShowEditTagModal}
        availableTags={availableTags}
        onHide={() => setShouldEditTagModal(false)}
        onDeleteTag={onDeleteTag}
        onUpdateTag={onUpdateTag}
      ></EditTagsModel>
      <Row className="items-center mb-4">
        <Col>
          <h1 className="text-gray-800 font-medium text-2xl">Your Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setShouldEditTagModal(true)}
            >
              {" "}
              Edit Tag
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label> Tags</Form.Label>
              <ReactSelect
                isMulti
                options={convertTagsToSelectOptions(availableTags)}
                value={convertTagsToSelectOptions(selectedTags)}
                onChange={(changeSelectOptions) => {
                  setSelectedTags(
                    convertSelectOptionsToTags(changeSelectOptions)
                  );
                }}
              ></ReactSelect>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="gap-3">
        {filteredNotes.map(({ id, title, tags }) => (
          <Col key={id}>
            <NoteCard id={id} title={title} tags={tags}></NoteCard>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default NoteList;
