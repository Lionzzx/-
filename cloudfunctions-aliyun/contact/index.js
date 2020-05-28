'use strict';

const db = uniCloud.database();
const _ = db.command
var code = 200
var msg = 'ok';
var data
exports.main = async (event, context) => {
	const collection = db.collection('contact')
	switch (event.method) {
		case 'GET':
			var page = event.page ? event.page : 1,
				pageSize = event.pageSize ? event.pageSize : 99999,
				search = {
					city: event.city ? new RegExp(event.city) : _.exists(true)
				},
				total = (await collection.where(search).count()).total,
				res = await collection.where(search).skip((page - 1) * pageSize).limit(pageSize).get();

			data = {
				total,
				page,
				pageSize,
				data: res.data
			}
			return {
				code: 200,
				msg: 'ok',
				data
			}
			break;
		default:
			var code = '404',
				msg = '请求方式错误: Request mode error';
			break;
	}


	return {
		code,
		msg,
		data
	}
};
