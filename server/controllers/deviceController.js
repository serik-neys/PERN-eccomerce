const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            let { img } = req.files
            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({ name, price, brandId, typeId, img: img ? fileName : "" })

            if (info) {
                console.log(info)
                info = JSON.parse(info)

                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }


            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit
            let devices;
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({ limit, offset, include: { model: DeviceInfo, as: "info" } })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset })
            }
            res.json(devices)
        } catch (error) {
            console.log(error)
        }

    }

    async getOne(req, res) {
        const { id } = req.params
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: "info" }]
        })
        return res.json(device)
    }

    async upadte(req, res, next) {
        try {
            let { id } = req.params
            let { name, price, brandId, typeId, info } = req.body
            const img = req.files ? req.files.img : ""
            let fileName = ""
            if (img) {
                fileName = uuid.v4() + '.jpg'
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            
            const deviceInfo = await DeviceInfo.destroy({ where: { deviceId: id } })

            if (info) {
                console.log(info)
                info = JSON.parse(info)

                info.forEach((i) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: id
                    })
                })
            }

            const device = await Device.update({
                name,
                price, brandId, typeId, img: fileName
            }, { where: { id } })


            return res.json({ message: device ? "Дивайс обновлен" : "произощла ошибка" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res) {
        const { id } = req.params
        const deleteDevice = await Device.destroy({ where: { id: id } })
        const deviceInfo = await DeviceInfo.destroy({ where: { deviceId: id } })
        if (deleteDevice && deviceInfo) {
            res.json({ message: "Девайс удален!" })
        } else {
            res.json({ message: "Девайс не найден!" })
        }
    }

}

module.exports = new DeviceController()