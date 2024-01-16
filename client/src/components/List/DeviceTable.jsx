import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Table } from "react-bootstrap"
import { Image, Button } from "react-bootstrap"
import { Context } from '../..';
import CreateDevice from '../modals/CreateDevice';
import { deleteDevice } from "../../http/deviceAPI"

const DeviceTable = observer(() => {
  const { device } = useContext(Context)
  const [deviceEditModal, setDeviceEditModal] = useState()

  const deleteDeviceTable = (id) => {
    device.deleteDeviceStore(id)
    deleteDevice(id)
  }

  return (

    <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>Device</th>
          <th>Rating</th>
          <th className='d-flex justify-content-center' >Update Delete</th>
        </tr>
      </thead>
      <tbody>

        {device.isDevices.map(item =>
          
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.rating}</td>
              <td className='d-flex justify-content-around'>
                <Button onClick={() => setDeviceEditModal(item.id)} variant="success">Редактировать</Button>
                <Button onClick={() => deleteDeviceTable(item.id)} variant="danger">Удалить</Button>
              </td>
            </tr>  
          
        )}

      </tbody>
    </Table>
    {device.isDevices.map(item => 
       <CreateDevice key={item.id} idDevice={item.id} show={deviceEditModal === item.id} onHide={() => setDeviceEditModal(null)} />
      )}
   
    </div>
  
  )
})

export default DeviceTable;