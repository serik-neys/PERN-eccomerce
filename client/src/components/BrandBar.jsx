import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Card, Row } from 'react-bootstrap';
import { Context } from '..';


const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <div style={{display: "flex"}}>

            <Card
             onClick={() => device.setSelectedBrand({id: null})}
             border={null === device.getSelectedBrand.id ? "danger" : "lihgt"}
             className="p-3"
            >По умолчанию</Card>
            {device.isBrands.map(brand => (
                <Card
                    className="p-3"
                    key={brand.id}
                    border={brand.id === device.getSelectedBrand.id ? "danger" : "lihgt"}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            ))}
        </div>
    )
})

export default BrandBar;