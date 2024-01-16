import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Row } from 'react-bootstrap';
import { Context } from '..';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex mt-2">
            {device.isDevices.map(deviceItem => 
              <DeviceItem key={deviceItem.id} device={deviceItem}  />  
                )}
        </Row>
)
})

export default DeviceList;