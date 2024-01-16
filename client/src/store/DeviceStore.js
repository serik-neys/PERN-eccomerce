import {makeAutoObservable} from "mobx"
export default class DeviceStore {
    constructor() {
        this._types = []
        this._brands = []
        this._devices = []
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        makeAutoObservable(this)
    }

    setIsType(types) {
        this._types = types
    }

    setBrands(brands) {
        this._brands = brands
    }

    setDevices(devices) {
        this._devices = devices
    }

    setSelectedType(type) {
        this._selectedType = type
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount
    }

    setLimit(limit) {
        this._limit = limit 
    }
    
    setSelectedBrand(brand) {
        this._selectedBrand = brand
    }

    deleteTypeStore(id) {
        this._types = this._types.filter((type) => type.id !== id)
    }

    deleteBrandStore(id) {
        this._brands = this._brands.filter((brand) => brand.id !== id)
    }

    deleteDeviceStore(id) {
        this._devices = this._devices.filter((device) => device.id !== id)
    }


    get isType() {
        return this._types
    }

    get isBrands() {
        return this._brands
    }

     get isDevices() {
        return this._devices
    }

    get selectedType() {
        return this._selectedType
    }

    get getSelectedBrand() {
        return this._selectedBrand
    }


    get Page() {
        return this._page
    }

    get TotalCount() {
        return this._totalCount
    }

    get Limit() {
        return this._limit
    }
}