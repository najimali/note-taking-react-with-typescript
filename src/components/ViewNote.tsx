import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import useNote from "../hooks/useNote";
import useLocalStorage from "../hooks/useLocalStorage";
import { RawNote } from "../types/Note";
import { localStorageKeys } from "../utils/constants";
import { useEffect, useState } from "react";
const ViewNote = () => {
  const { id } = useParams();
  const note = useNote(id);
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [, setNotes] = useLocalStorage<RawNote[]>(localStorageKeys.Notes, []);
  useEffect(() => {
    if (shouldNavigate) {
      navigate("/");
    }
  }, [shouldNavigate, navigate]);
  if (!note) return <Navigate to="/" replace></Navigate>;

  const onDelete = (id: string | undefined) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    setShouldNavigate(true);
  };

  const { title, markdown, tags } = note;

  return (
    <>
      <Row className="items-center mb-4">
        <Col>
          <h1 className="mb-2">{title}</h1>
          {tags.length === 0 ? null : (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {tags.map(({ id, label }) => (
                <Badge key={id} className="truncate ">
                  {label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to={`/${id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button variant="outline-danger" onClick={() => onDelete(id)}>
              Delete
            </Button>
            <Link to="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>

      <ReactMarkDown className="bg-white">{markdown}</ReactMarkDown>
    </>
  );
};

export default ViewNote;
