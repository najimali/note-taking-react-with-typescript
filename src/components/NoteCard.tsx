import React from "react";
import { Tag } from "../types/Tag";
import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../styles/Note.module.css";
import { NoteCardProps } from "../types/Note";

const NoteCard = ({ id, title, tags }: NoteCardProps) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-full text-inherit no-underline ${styles.card}`}
    >
      <Card.Body>
        <Stack gap={2} className="items-center justify-center h-full">
          <span className="text-xl font-semibold">{title}</span>
          {tags.length === 0 ? null : (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-center flex-wrap"
            >
              {tags.map(({ id, label }) => (
                <Badge key={id} className="truncate ">
                  {label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;
