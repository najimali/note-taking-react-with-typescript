import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { useNote } from "../hooks/useNote";
import { Link } from "react-router-dom";
import ReactMarkDown from "react-markdown";
const Note = () => {
  const { id, title, tags, markdown } = useNote();

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
            <Button variant="outline-danger">Delete</Button>
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

export default Note;
