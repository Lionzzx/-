import request from '@/libs/request'


export const getContactList = (data) => {
	return request({
		url: "contact",
		method: 'GET',
		data
	})
}
