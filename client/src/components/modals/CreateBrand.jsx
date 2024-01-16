import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../..';
import { createBrand, fetchBrands } from '../../http/deviceAPI';

const CreateBrand = ({ show, onHide }) => {
    const {device} = useContext(Context)
    const [brand, setBrand] = useState('')
    const addBrand = () => {
        createBrand({ name: brand }).then(() => setBrand(''))
        fetchBrands().then(data => device.setBrands(data))
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить Брэнд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите Брэнд"
                        onChange={e => setBrand(e.target.value)}
                        value={brand}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addBrand}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand;