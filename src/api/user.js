import request from '../utils/request';

export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data,
    });
}

export function getInfo(data) {
    return request({
        url: 'http://192.168.22.32:7001/list',
        method: 'get',
        params: data,
    });
}


export function getJson() {
    console.log(`${process.env.BASE_URL}/package`)
    return request({
        url: `${process.env.BASE_URL}/package`,
        method: 'get',
    });
}
