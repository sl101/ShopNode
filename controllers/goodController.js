const uuid = require('uuid');
const path = require('path');
const { Good, GoodInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class GoodController {
	async create(req, res, next) {
		try {
			let { name, price, brandId, typeId, info } = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + ".jpg";
			img.mv(path.resolve(__dirname, '..', 'static', fileName));
			const good = await Good.create({ name, price, brandId, typeId, img: fileName });

			if (info) {
				info = JSON.parse(info);
				info.forEach(i =>
					GoodInfo.create({
						title: i.title,
						description: i.description,
						goodId: good.id
					})
				);
			}

			return res.json(good);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}

	}

	async getAll(req, res) {
		let { brandId, typeId, limit, page } = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;
		let goods;
		if (!brandId && !typeId) {
			goods = await Good.findAndCountAll({ limit, offset });
		}
		if (brandId && !typeId) {
			goods = await Good.findAndCountAll({ where: { brandId }, limit, offset });
		}
		if (!brandId && typeId) {
			goods = await Good.findAndCountAll({ where: { typeId }, limit, offset });
		}
		if (brandId && typeId) {
			goods = await Good.findAndCountAll({ where: { typeId, brandId }, limit, offset });
		}
		return res.json(goods);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const good = await Good.findOne(
			{
				where: { id },
				include: [{ model: GoodInfo, as: 'info' }]
			},
		);
		return res.json(good);
	}
}

module.exports = new GoodController();