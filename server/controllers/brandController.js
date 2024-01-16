const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')

class BrandController {
    async create(req, res) {
        const {name} = req.body
        const brand = await Brand.create({name: name})
        return res.json(brand)
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    
    async delete(req, res) {
        const {id} = req.params
        const deleteBrand = await Brand.destroy({where: {id: id}})
        if(deleteBrand) {
            res.json({message: "Брэнд удален!"})
        } else {
            res.json({message: "Брэнд не найден!"})
        }
      
    }

    async update(req, res) {
        const {id} = req.params
        const {name} = req.body
        const updateBrand = await Brand.update({name}, {where: {id}})
        
        if(id && updateBrand) {
            res.json({message: "Брэнд обновлен!"})
        } else {
            res.json({message: "Брэнд не найден!"})
        }
    }
}

module.exports = new BrandController()