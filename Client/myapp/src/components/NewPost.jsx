import axios from 'axios'
import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function NewPost() {
    const [obj, setObj] = useState({})
    const navigate = useNavigate()

    const handlerChange = (value) => {
        setObj({ ...obj, content: value })
    }
    const handleSubmit = () => {
        axios.post("http://localhost:3000/posts", obj)
            .then(response => { navigate("/") })
    }
    return (
        <Container>
            <h1>New Post</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        onChange={e => setObj({ ...obj, category: e.target.value })}
                        type="text"
                        name="category"
                        placeholder=""
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        onChange={e => setObj({ ...obj, title: e.target.value })}
                        type="text"
                        name="title"
                        placeholder=""
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>content</Form.Label>
                    <ReactQuill onChange={handlerChange} value={obj.content} />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>cover</Form.Label>
                    <Form.Control type="file" onChange={e => setObj({ ...obj, cover: e.target.value })}
                        name="cover"
                        placeholder=""/>
                </Form.Group>
                <Button onClick={handleSubmit} variant="primary" type="button">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}



