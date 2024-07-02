import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function BookEdit() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genreId, setGenreId] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [validationError,setValidationError] = useState({})

  const fetchBook = async () => {
    console.log(`http://localhost:8000/api/books/${id}`);
    await axios.get(`http://localhost:8000/api/books/${id}`).then(({data})=>{
      setTitle(data.book.title);
      setIsbn(data.book.isbn);
      setGenreId(data.book.genre_id);
      setAuthorId(data.book.author_id);

    }).catch(({response:{data}})=>{
      console.log('opa');
      Swal.fire({
        text:data.message,
        icon:"error"
      })
    })
  }


  useEffect(()=>{
    fetchBook();
    fetchGenre();
    fetchAuthors();
  },[]);


  const fetchGenre = async () => {
    await axios.get(`http://localhost:8000/api/genres`).then(({data})=>{
      setGenres(data)
    })
  }

  const fetchAuthors= async () => {
    await axios.get(`http://localhost:8000/api/authors`).then(({data})=>{
      setAuthors(data)
    })
  }

  const updateBook = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('_method', 'PATCH');
    formData.append('title', title);
    formData.append('isbn', isbn);
    formData.append('genre_id', genreId);
    formData.append('author_id', authorId);

    await axios.post(`http://localhost:8000/api/books/${id}`, formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/book/list")
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Book</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={updateBook}>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(event)=>{
                              setTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="name">
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control type="text" value={isbn} onChange={(event)=>{
                              setIsbn(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="name">
                            <Form.Label>Genre</Form.Label>
                            <Form.Select aria-label="select-genre" onChange={(event)=>{
                                  setGenreId(event.target.value)
                                }}>
                              <option value="">--</option>    
                            {genres.map((genre) => <option value={genre.id} selected={genre.id==genreId?"selected":""}>{genre.description}</option>)}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="isbn">
                        <Form.Label>Author</Form.Label>
                        <Form.Select aria-label="select-author" onChange={(event)=>{
                                setAuthorId(event.target.value)
                              }}>
                          <option value="">--</option>
                          {authors.map((author) => <option value={author.id} selected={author.id==authorId?"selected":""}>{author.name}</option>)}
                        </Form.Select>
                      </Form.Group>  
                    </Col>
                  </Row>
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}