'use strict';
const uniAccount = require('uni-account')
const db = uniCloud.database();
const _ = db.command
var code = 200
var msg = 'ok';
var data
exports.main = async (event, context) => {
	const collection = db.collection('user')
	switch (event.method) {
		case 'GET':
			var page = event.page ? event.page : 1,
				pageSize = event.pageSize ? event.pageSize : 99999,
				search = {
					username: event.username ? new RegExp(event.username) : _.exists(true)
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
		case 'GETCODE':
			const uniAccountIns = uniAccount.initWeixin({
				appId: 'wx4106af6359c0559e',
				secret: '6bfcb10c18927166209767894339b13f',
			})
			const resp = await uniAccountIns.code2Session(data.code)
			return {
				code: 200,
				msg: 'ok',
				data: result
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
