import { observer } from 'mobx-react-lite';
import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
    const {device} = useContext(Context)
return (
    <ListGroup>
        <ListGroup.Item
        onClick={() => device.setSelectedType({id: null})}
        active={device.selectedType.id === null}
        >
            По умолчанию</ListGroup.Item>
        {device.isType.map(type => (
            <ListGroup.Item 
            key={type.id}
            active={type.id === device.selectedType.id}
            onClick={() => device.setSelectedType(type)}
            >
                {type.name}
            </ListGroup.Item>
        ))}
      </ListGroup>
  
)
})

export default TypeBar;