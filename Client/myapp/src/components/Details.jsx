import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'




export default function Details() {
    let { id } = useParams()
    const [obj, setObj] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:3000/products/" + id)
            .then(response => setObj(response.data))
            .catch(err => console.log(err))
    }, [id])

    return (
        <>
            <div>Details</div>

            {obj ? <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>{obj.name}</Card.Title>
                    <Card.Text>
                        {obj.price}
                    </Card.Text>
                    <Card.Text>
                        {obj.description}
                    </Card.Text>
                    <Button variant="primary"></Button>
                </Card.Body>
            </Card> : ""}


        </>


    )
}
