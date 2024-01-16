import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext, useState } from 'react';
import { Table, Button } from "react-bootstrap"
import { Context } from '../..';
import { deleteBrand } from "../../http/deviceAPI"


const BrandTable = observer(() => {
    const { device } = useContext(Context)
    const [message, setMessage] = useState('')

    const deleteBrandId = (id) => {
        // parseInt(window.location.search.replace(/[^\d]/g, ''))
        device.deleteBrandStore(id)
        setMessage('Брэнд удален!')
        deleteBrand(id)
    }


    return (
        <>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>id</th>
                        <th colSpan={2}>Brand</th>
                        <th colSpan={1} className='d-flex justify-content-center' >Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {device.isBrands.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td colSpan={2}>{item.name}</td>
                            <td colSpan={1} className='d-flex justify-content-around'>
                                <Button onClick={() => deleteBrandId(item.id)} variant="danger">Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>

    )
})

export default BrandTable;