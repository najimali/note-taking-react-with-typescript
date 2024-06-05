import { Navigate, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import NewNote from "./NewNote";
import NoteList from "./NoteList";
import EditNote from "./EditNote";
import ViewNote from "./ViewNote";

function App() {
  return (
    <Container className="m-6 p-6 bg-gray-200 rounded-lg">
      <Routes>
        <Route path="/" element={<NoteList></NoteList>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<ViewNote></ViewNote>} />
          <Route path="edit" element={<EditNote></EditNote>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
