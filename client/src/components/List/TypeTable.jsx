import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext, useState } from 'react';
import { Table, Button } from "react-bootstrap"
import { Context } from '../..';
import { deleteType } from "../../http/deviceAPI"


const TypeTable = observer(() => {
    const { device } = useContext(Context)
    const [message, setMessage] = useState('')

    const deleteTypeId = (id) => {
        // parseInt(window.location.search.replace(/[^\d]/g, ''))
         device.deleteTypeStore(id)
        setMessage(' Тип удален!')
        deleteType(id)
    }


    return (
        <div>
            <Table striped bordered hover>

                <thead>
                    <tr>
                        <th>id</th>
                        <th colSpan={2}>Type</th>
                        <th colSpan={1} className='d-flex justify-content-center' >Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {device.isType.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td colSpan={2}>{item.name}</td>
                            <td colSpan={1} className='d-flex justify-content-around'>
                                <Button onClick={() => deleteTypeId(item.id)} variant="danger">Удалить</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
})

export default TypeTable;