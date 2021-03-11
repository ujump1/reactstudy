import axios from 'axios'
import {Modal} from 'antd'
// 自定义头部（包含post的contentType)会有一个预请求
export default class Axios {

    static get(url,params){
        return new Promise((resolve,reject) => {
            axios.request({
                url: url,
                method: 'get',
                params:params,
                timeout: 18000,
            }).then((response) => {
                if(response.status === 200 && response.data.status === 200){
                    let res = response.data;
                    resolve(res);
                }else{
                    Modal.info({
                        title: "警告",
                        content: "请求异常"
                    })
                    reject(response.data);
                } },err =>{ // 这个和下面这个只需要一个就行了，优先这个
                Modal.info({
                    title: "警告",
                    content: "请求失败"
                })
                console.log(err);
                reject(err);
            }).catch(function (error) {
                Modal.info({
                    title: "警告",
                    content: "请求失败"
                })
                console.log(error);
                reject(error);
            })
        })
    }

    static post(url,params,data){
        return new Promise((resolve,reject) => {
            axios.request({
                url: url,
                method: 'post',
                params:params,
                data:data,
                timeout: 18000,
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((response) => {
                if(response.status === 200 && response.data.status === 200){
                    let res = response.data;
                    resolve(res);
                }else{
                    Modal.info({
                        title: "警告",
                        content: "请求异常"
                    })
                    reject(response.data);
                }
            },err =>{ // 这个和下面这个只需要一个就行了，优先这个
                Modal.info({
                    title: "警告",
                    content: "请求失败"
                })
                console.log(err);
                reject(err);
            }).catch(function (error) {
                Modal.info({
                    title: "警告",
                    content: "请求失败"
                })
                console.log(error);
                reject(error);
            })
        })
    }

}