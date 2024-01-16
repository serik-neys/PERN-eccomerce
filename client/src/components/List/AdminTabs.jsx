import React from 'react';
import {Tabs, Tab} from "react-bootstrap"
import BrandTable from './BrandTable';
import DeviceTable from './DeviceTable';
import TypeTable from './TypeTable';
import { observer } from 'mobx-react-lite';

const AdminTabs = observer(() => {
    
    return (
        <Tabs
            defaultActiveKey="type"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="type" title="Type">
                <TypeTable/>
            </Tab>
            <Tab eventKey="brand" title="Brand">
                <BrandTable/>
            </Tab>
            <Tab eventKey="device" title="Device">
                <DeviceTable/>
            </Tab>
        </Tabs>
    )
})

export default AdminTabs;