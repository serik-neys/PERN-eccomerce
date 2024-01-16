import { $autHost, $host } from "./index"
import jwt_decode from "jwt-decode"

//Type
export const createType = async (type) => {
    const {data} = await $autHost.post('api/type', type)
    return data
}

export const deleteType = async (id) => {
    const {data} = await $autHost.delete(`api/type/${id}`)
    return data
}


export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}


//Brand
export const createBrand = async (brand) => {
    const {data} = await $autHost.post('api/brand', brand)
    return data
}

export const deleteBrand = async (id) => {
    const {data} = await $autHost.delete(`api/brand/${id}`)
    return data
}


export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}


//Device
export const createDevice = async (device) => {
    const {data} = await $autHost.post('api/device', device)
    return data
}

export const fetchDevice = async (typeId, brandId, page, limit = 3) => {
    const {data} = await $host.get('api/device', {params: {
        typeId,
        brandId,
        page,
        limit
    }})
    return data
}

export const updateDevice = async (id, device) => {
    console.log(id, device)
    const {data} = await $autHost.patch(`api/device/${id}`, device)
    return data
}

export const deleteDevice = async (id) => {
    const {data} = await $autHost.delete(`api/device/${id}`)
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

