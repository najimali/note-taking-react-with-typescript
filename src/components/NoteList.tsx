import React, { useState } from "react";
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

const NoteList = () => {
  const [availableTags, setAvailableTags] = useLocalStorage<Tag[]>(
    localStorageKeys.Tags,
    []
  );
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState<string>("");
  return (
    <>
      <Row className="items-center mb-4">
        <Col>
          <h1 className="text-gray-800 font-medium text-2xl">Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button variant="outline-secondary"> Edit Tag</Button>
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
    </>
  );
};

export default NoteList;
