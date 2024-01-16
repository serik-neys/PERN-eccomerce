import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { PATH_IMG } from '../utils/consts';

const DevicePage = () => {
   

    const {id} = useParams()
    const [device, setDevice] = useState(null)
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    },[])
   

     if(!device) {
        return <div>Loading...</div>
     }

    return (
        <Container className='mt-3 d-flex flex-wrap'>

            <Col md={4}>
                <Image width={300} height={300} src={PATH_IMG + device.img} />
            </Col>

            <Col md={4} style={{fontSize: 30}}>
                    <h2>{device.name}</h2>
                    <div className='align-items-center justify-content-center'>
                        Оценка: &#9733; {device.rating}
                    </div>
                </Col>

            <Col md={4}>
                <Card
                    className="d-flex p-3 flex-column align-items-cneter text-center justify-content-center"
                    style={{ width: 300, height: 300, fontSize: 32 }}
                >
                    <h3>{device.price}$</h3>
                    <Button variant={'outline-dark'} >Add Corzine</Button>
                </Card>
            </Col>

            <Col md={12} className="df-flex flex-column m-3">
                {device.info && device.info.map((info) =>
                    <Row key={info.id} style={{ background: "lightgray", marginTop: 10, padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Col>
        </Container>
    )
}

export default DevicePage;