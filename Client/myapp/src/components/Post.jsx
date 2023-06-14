import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



export default function Post() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios.get("http://localhost:3000/posts")
            .then(response => setPosts(response.data))
            .catch(err => console.log(err))
    }, [])

    const elimina = (id) => {
        // alert("Elimina" + id)
        axios.delete("http://localhost:3000/posts/" + id)
            .then(response => {
                let postsFiltered = posts.filter(p => p._id !== id)
                setPosts(postsFiltered)
            })
            .catch(err => console.log(err))

    }
    

    const dettaglio = (id) => {
        navigate('/details/'+id)
    }


    return (
        <Container>
            <h1>Products</h1>
            <ListGroup>
                {posts.map(p => (
                    <ListGroup.Item key={p._id}>
                        Prodotto: {p.category} 
                        Prezzo: {p.title} 
                        Descrizione: {p.content} 
                        <Button className='float-end mx-1' onClick={() => elimina(p._id)} variant="danger">Elimina</Button>
                        <Button className='float-end mx-1' onClick={() => dettaglio(p._id)} variant="success">Dettaglio</Button>
                </ListGroup.Item>) )}
            </ListGroup>
        </Container>
    )
}
