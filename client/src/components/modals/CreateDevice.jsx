import { observer } from 'mobx-react-lite';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Form, Modal, Button, Dropdown, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, updateDevice } from '../../http/deviceAPI';

const CreateDevice = observer(({ idDevice = 0, show, onHide }) => {
    const { device } = useContext(Context)
    const [info, setInfo] = useState([{ title: '', description: '', id: Date.now() }])
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [img, setImg] = useState(null)

    const addInfo = () => {
        setInfo(prev => [{ title: '', description: '', id: Date.now() }, ...prev])
    }

    const removeInfo = (id) => {
        setInfo(prev => prev.filter(item => item.id !== id))
    }

    const changeInfo = (key, value, id) => {
        setInfo(info.map(i => i.id === id ? { ...i, [key]: value } : i))
    }

    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', img)
        formData.append('brandId', device.getSelectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        console.log(formData)
        console.log(idDevice)
        idDevice ? updateDevice(idDevice, formData).then(data => onHide()) : createDevice(formData).then(data => onHide())
    }

    useEffect(() => {
        if (idDevice && device.isDevices) {
            const deviceOld = device.isDevices.find(item => item.id === idDevice)
            const brandOld = device.isBrands.find(item => item.id === deviceOld.brandId)
            const typeOld = device.isType.find(item => item.id === deviceOld.typeId)
            console.log(deviceOld)
            device.setSelectedBrand(brandOld)
            device.setSelectedType(typeOld)

            setName(deviceOld.name)
            setPrice(deviceOld.price)

            if (deviceOld.info) {
                setInfo(deviceOld.info)
            }
        }

    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {idDevice ? "Update Device" : "Add Device"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedType?.name || "Выберите Тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.isType.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id} >{type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2">
                        <Dropdown.Toggle>{device.getSelectedBrand?.name || "Выберите Брэнд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.isBrands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id} >{brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите называние устройства"
                    ></Form.Control>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите цену устройства"
                    ></Form.Control>
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите файл устройства"
                        type="file"
                        onChange={e => setImg(e.target.files[0])}
                    ></Form.Control>
                    <Button className="mt-2" onClick={addInfo} variant='outline-success'>Add Info</Button>
                    {info.map((item) =>
                        <Row key={item.id} className='d-flex mt-2'>
                            <Col md={4}>
                                <Form.Control
                                    placeholder='Название'
                                    onChange={(e) => changeInfo("title", e.target.value, item.id)}
                                    value={item.title}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    onChange={(e) => changeInfo("description", e.target.value, item.id)}
                                    value={item.description}
                                    placeholder='Описание'
                                />
                            </Col>
                            <Col md={4}>
                                <Button variant="outline-danger" onClick={() => removeInfo(item.id)}>Remove</Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateDevice;