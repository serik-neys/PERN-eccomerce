import React from 'react';
import { useContext } from 'react';
import { Context } from '..';
import {observer} from "mobx-react-lite"
import {Pagination} from "react-bootstrap"

const Page = observer(() => {
    const { device } = useContext(Context)
    const pageCount = device.Page === 1 ? 1 : Math.ceil(device.TotalCount / device.Limit)
    const pages = []

    for(let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page => (
                <Pagination.Item
                key={page}
                active={device.Page === page}
                onClick={() => device.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    )
})

export default Page