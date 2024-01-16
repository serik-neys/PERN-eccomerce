import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Context } from '..';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import Page from '../components/Page';
import TypeBar from '../components/TypeBar';
import { fetchBrands, fetchDevice, fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
    const {device} = useContext(Context)
    useEffect(() => {
        fetchTypes().then(data => device.setIsType(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevice(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
    })
    }, [])

    useEffect(() => {
        fetchDevice(device.selectedType.id, device.getSelectedBrand.id, device.Page, device.limit).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
    })
    }, [device.Page, device.selectedType, device.getSelectedBrand])
   
    
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Page/>
                </Col>
            </Row>
        </Container>
    )
})

export default Shop;