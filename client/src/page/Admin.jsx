import { observer } from 'mobx-react-lite';
import { useState, useEffect, useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Context } from '..';
import AdminTabs from '../components/List/AdminTabs';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { fetchTypes, fetchBrands, fetchDevice } from "../http/deviceAPI"

const Admin = observer(() => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    const { device } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDevice().then(data => device.setDevices(data.rows))
        .then(() => fetchTypes()).then((data) => device.setIsType(data))
        .then(() => fetchBrands()).then((data) => {
            device.setBrands(data)
            setLoading(false)
        })
        
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Container className="d-flex flex-column">
            <Button onClick={() => setTypeVisible(true)} variant={'outline-dark'} className="mt-2 p3">
                Добавить Тип
            </Button>
            <Button onClick={() => setBrandVisible(true)} variant={'outline-dark'} className="mt-2 p3">
                Добавить Брэнд
            </Button>
            <Button onClick={() => setDeviceVisible(true)} variant={'outline-dark'} className="mt-2 p3">
                Добавить устройства
            </Button>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <AdminTabs />

        </Container>
    )
})

export default Admin;