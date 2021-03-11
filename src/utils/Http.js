/**
 * 数据请求封装
 */
import axios from 'axios';

// const headers = {
//     'Authorization': accessToken
// };

function header(headers = {}) {
    let header = {'Authorization': sessionStorage.getItem('front_end_token') || ''};

    return Object.assign(header, headers);
}

const handleSuccess = (res) => {
    if (res instanceof Array) {
        return res;
    } else {
        let body = res['data'];
        if (body) { // 有数据返回
            return {
                data: body.data || body || {}, // 返回内容
                message: body.message || '', // 返回信息
                code: body.status || 200
            };
        } else { // 无数据返回
            return {
                data: body.data || {}, // 返回内容
                message: body.message || '', // 返回信息
                code: body.status
            };
        }
    }

};

const handleError = (error) => {
    let msg = '错误:';
    if (error.response) {
        switch (error.response.status) {
            case 400:
                msg += '请求参数正确!';
                break;
            case 403:
                msg += '登录已过期!';
                //this.router.navigate(["pages"]);
                break;
            case 404:
                msg += '请检查路径是否正确!';
                break;
            case 500:
                msg += '请求的服务器错误!';
                break;
            case 0:
                msg += '网络连接失败!';
                break;
            default:
                msg += '';
                break;
        }
        return {'code': false, 'message': msg};
    } else {
        return {'code': false, 'message': '错误:服务器连接失败！'};
    }

};

export default {
    get(url = '', config = {}) {
        config['headers'] = header();
        return axios.get(url, config).then(handleSuccess).catch(handleError);
    },
    getWithCustomCallback(url = '', config = {}, successCallback = () => {
    }, errCalllback = () => {
    }) {
        config['headers'] = header();
        return axios.get(url, config).then(successCallback).catch(errCalllback);
    },
    getToken(url = '', config = {}) {
        return axios.get(url, config).then(handleSuccess).catch(handleError);
    },
    post(url = '', data = {}, config = {}) {
        config['headers'] = header();
        return axios.post(url, data, config).then(handleSuccess).catch(handleError);
    },
    postWithCustomCallback(url = '', data = {}, config = {}, successCallback = () => {
    }, errCalllback = () => {
    }) {
        config['headers'] = header();
        return axios.post(url, data, config).then(successCallback).catch(errCalllback);
    },
    postWithJson(url = '', data = '', config = {}) {
        config['headers'] = header({'Content-Type': 'application/json'});
        return axios.post(url, data, config).then(handleSuccess).catch(handleError);
    },
    put(url = '', data = {}, config = {}) {
        config['headers'] = header();
        console.log('header=', header());
        console.log('config=', config);
        return axios.put(url, data, config).then(handleSuccess).catch(handleError);
    },
    delete(url = '', config = {}) {
        config['headers'] = header();
        return axios.delete(url, config).then(handleSuccess).catch(handleError);
    },
    request(options = {}) {
        options['headers'] = header();
        return axios(options).then(handleSuccess).catch(handleError);
    },
    all(requestList = []) {
        return axios.all(requestList).then(handleSuccess).catch(handleError);
    }
};


