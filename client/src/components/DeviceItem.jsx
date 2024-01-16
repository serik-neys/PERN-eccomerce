import React from 'react';
import { Col, Card, Image } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { DEVICE_ROUTE, PATH_IMG } from '../utils/consts';

const DeviceItem = ({ device }) => {
    const router = useNavigate()
    
    return (
        <Col className="mt-3" md={3} onClick={() => router(`${DEVICE_ROUTE}/${device.id}`)}>
            <Card style={{ width: 150 }} border={'light'}>
                <Image width={150} height={150} src={PATH_IMG + device.img} />
                <div className="d-flex mt-3 align-items-center">
                    <div>Samsung... </div>
                    <div>&#9733; {device.rating}</div>
                </div>
                <h6>{device.name}</h6>
            </Card>
        </Col>

    )
}

export default DeviceItem;