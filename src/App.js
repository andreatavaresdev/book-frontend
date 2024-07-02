import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import EditGenre from "./components/genre/edit";
import GenreList from "./components/genre/list";
import CreateGenre from "./components/genre/create";
import AuthorList from './components/author/list';
import AuthorEdit from './components/author/edit';
import AuthorCreate from './components/author/create';
import BookList from './components/book/list';
import BookEdit from './components/book/edit';
import BookCreate from './components/book/create';

function App() {
  return (<Router>
    <Navbar bg="primary">
      <Container>
        <Link to={"/"} className="navbar-brand text-white">
          Basic Crud App
        </Link>
        <Link to={"/author/list"} className="navbar-brand text-white">
          Author
        </Link>
        <Link to={"/genre/list"} className="navbar-brand text-white">
          Genre
        </Link>
        <Link to={"/book/list"} className="navbar-brand text-white">
          Book
        </Link>
      </Container>
    </Navbar>

    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/genre/list" element={<GenreList />} />
            <Route path="/genre/create" element={<CreateGenre />} />
            <Route path="/genre/edit/:id" element={<EditGenre />} />
            <Route path="/author/create" element={<AuthorCreate />} />
            <Route path="/author/edit/:id" element={<AuthorEdit />} />
            <Route path="/author/list" element={<AuthorList />} />
            <Route path="/book/create" element={<BookCreate />} />
            <Route path="/book/edit/:id" element={<BookEdit />} />
            <Route path="/book/list" element={<BookList />} />
            <Route exact path='/' element={<BookList />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;