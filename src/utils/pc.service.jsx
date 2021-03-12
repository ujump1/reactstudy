/**
 * 公用方法类
 */
import http from './Http';
import {message} from 'antd';

class PcService {

    constructor() {
    }

    /* 枚举映射 * id=>name */
    numberToText(id, array) {
        let select;
        //如果是多选状态值
        if (Array.isArray(id)) {
            select = array.filter(totalVal => id.some(val => val === totalVal.Id)).map(val => val.Name).join('，');
            return select;
        }
        select = array.filter(v => v.Id === id);
        if (select.length) {
            return select[0].Name;
        }
    }

    //根据身份证号码获取性别
    getSexByIDNo(IDno) {
        if (IDno.length === 18 || IDno.length === 15) {
            let sexNum = parseInt(IDno.substr(IDno.length - 2, 1));
            return sexNum % 2 === 0 ? '女' : '男';
        } else {
            return '未知';
        }
    }

    //根据性别数字转换为文字
    getSex(sex, IDno) {
        return sex === 1 ? '男' : (sex === 2 ? '女' : this.getSexbyIDNo(IDno.toString()));
    }

    //根据数字获取文本
    getNameById(num, array) {
        let text = '';
        array.map(v => {
            if (v.Id === num) {
                text = v.Name;
            }
        });
        return text;
    }

    //根据身份证号码计算年龄
    getAge(IDno) {
        let nowYear = new Date();
        let age = '';
        let eightNum = '';
        switch (IDno.length) {
            case 18:
                eightNum = (IDno.substr(6, 8));
                break;
            case 18:
                eightNum = '19' + (IDno.substr(6, 6));
                break;
            default:
                break;
        }
        eightNum = eightNum.replace(/(.{4})(.{2})/, '$1-$2-');
        let birthYear = new Date(eightNum);
        age = (nowYear - birthYear) / (365 * 24 * 3600000);
        if (isNaN(age) || age > 150 || age < 0) {
            age = '无';
        } else if (age < 1 && age > 0) {
            age = 0 + '岁';
        } else {
            age = Math.floor(age) + '岁';
        }
        return age;
    }

    //正则表达式；判断车牌号是否正确
    isPlateNumber(vehicleNumber) {
        let result = false;
        if (vehicleNumber.length === 7) {
            let express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
            result = express.test(vehicleNumber);
        }
        return result;
    }

    //正则表达式；判断身份证号码是否正确
    isIDNumber(idNo) {
        let result = false;
        let IDNOString = new RegExp(/^\d{17}(\d|X|x)$/);
        if (IDNOString.test(idNo.toString())) {
            result = true;
        }
        return result;
    }

    //正则表达式；判断是否为手机号码
    isPhoneNumber(phoneNo) {
        let result = false;
        let PhoneString = new RegExp(/^(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})|((\d{3,4}-?|\s)?\d{7,14})$/);
        if (PhoneString.test(phoneNo.toString())) {
            result = true;
        }
        return result;
    }

    //正则表达式；判断是否为电子邮箱
    isEmail(phoneNo) {
        let result = false;
        let PhoneString = new RegExp(/^[a-zA-Z0-9_-]+(\.*[a-zA-Z0-9_-]+)+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
        if (PhoneString.test(phoneNo.toString())) {
            result = true;
        }
        return result;
    }

    //获取列表数据分页
    fetchData(component, url = '', params = {}, headers = null, listName = 'dataSource') {
        let pagination = {
            page: params.page ? params.page : 1,
            rows: params.pageSize ? params.pageSize : 10
        };
        if (params.pageSize) delete params.pageSize;
        let _params = this.extend(params, pagination);
        component.setState({
            loading: true
        });
        http.request({
            url: url,
            method: 'get',
            params: _params,
            headers: headers
        }).then(res => {
            if (res.code === 200) {
                let lists = res.data.rows ? res.data.rows : [];
                lists.length && lists.map(v => {
                    v.key = v.id;
                });
                component.setState({
                    loading: false,
                    [listName]: lists,
                    // selectedRowKeys: [],
                    'pagination': {
                        page: pagination.page,
                        pageSize: pagination.rows,
                        total: parseInt(res.data.records) || 0,
                        pageSizeOptions: ['20', '30', '40', '60', '80', '100'],
                        position: [
                                        'bottomCenter']
                    }
                });
            } else {
                component.setState({
                    loading: false
                });
                // Modal.info({
                //     title: "警告",
                //     content: "请求异常:"+res.message
                // })
               message.error(res.message);
            }
        }).catch(function (err) {
            component.setState({
                loading: false
            });
            // Modal.info({
            //     title: "警告",
            //     content: "请求失败:"+err
            // })
            message.error(err);

        });
    };

    //刪除列表项（单个删除和多个删除）
    deleteItem(component, url = '', item = new Object()) {
        let that = component;
        that.setState({loading: true});
        http.delete(url).then(res => {
            if (res.code === 'SUCCESS') {
                message.success(res.message);
                that.setState({selectedRowKeys: []});
                that.fetchData();
            } else {
                message.error(res.message);
                that.setState({loading: false});
            }
        }).catch(err => {
            message.error(err.message);
            that.setState({loading: false});
        });
    };
    //
    // //新增，修改表单提交
    // formSubmit(component, url = '', create = true, fieldsValue = {}, successCallback = null, freshCallback = null) {
    //     let that = component;
    //     let successMsg = create ? '新增' : '更改';
    //     let method = create ? 'post' : 'put';
    //     http[method](url, fieldsValue).then(res => {
    //         if (res.code === 'SUCCESS') {
    //             message.success(successMsg + '操作成功！');
    //             that.setState({modalLoading: false, visible: false});
    //             successCallback && successCallback();
    //             freshCallback ? freshCallback() : that.fetchData();
    //         } else {
    //             message.error(res.message);
    //             that.setState({modalLoading: false});
    //         }
    //     }).catch(err => {
    //         message.error(err.message);
    //         that.setState({modalLoading: false});
    //     });
    // }

    //jQuery中extend方法
    extend(a, b, c) {
        let src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            size = arguments.length,
            deep = false, isPlainObject = obj => typeof obj === 'object' && obj instanceof Object;


        // Handle a deep copy situation
        if (typeof target === 'boolean') {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== 'object' && !(target instanceof Function)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === size) {
            target = this;
            i--;
        }

        for (; i < size; i++) {
            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {
                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (isPlainObject(copy) || (copyIsArray = copy instanceof Array))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && src instanceof Array ? src : [];

                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };


}

export default PcService;
