import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { Context } from '../..';
import { createType, fetchTypes } from '../../http/deviceAPI';

const CreateType = ({ show, onHide }) => {
    const {device} = useContext(Context)
    const [type, setType] = useState('')
    const addType = () => {
        createType({ name: type }).then((data) => {
            setType('')
            fetchTypes().then((data) => device.setIsType(data))
        })
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
                    Add Type
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите Тип"
                        onChange={e => setType(e.target.value)}
                        value={type}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addType}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType;