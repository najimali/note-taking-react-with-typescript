import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../types/Tag";
interface EditTagsModelProps {
  availableTags: Tag[];
  show: boolean;
  onHide: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (tag: Tag) => void;
}
const EditTagsModel = ({
  availableTags,
  show,
  onHide,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModelProps) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={(event) =>
                        onUpdateTag({ id: tag.id, label: event.target.value })
                      }
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={() => onDeleteTag(tag.id)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTagsModel;
