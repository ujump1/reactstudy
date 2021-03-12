import { Card,Button } from 'antd';
import React from 'react'
import MyTable from "../../component/Table/MyTable";
import PcService from "../../utils/pc.service";
const pcService = new PcService();


export default class AjaxDemo extends React.Component  {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            dataSource: [],
            selectedRowKeys:[],
            selectedRows:[],
            pagination: {
                page: 1,
                pageSize: 2,
                total: 2,
                pageSizeOptions: ['20', '30', '40', '60', '80', '100'],
                defaultCurrent: 1,
                position: [
                    'bottomCenter']
            },
        }
    }

    componentDidMount(){
        this.request();
    }

    request = (params) => {
        // let pagination;
        // if(params === undefined){
        //      pagination ={
        //          page: this.state.pagination.page,
        //          rows: this.state.pagination.pageSize
        //     }
        // }else {
        //     pagination = {
        //         page: params.page ? params.page : 1,
        //         rows: params.pageSize ? params.pageSize : 2
        //     };
        // }
        // console.log(pagination)
        // this.setState({
        //     loading: true
        // });
        // AxiosUtils.get(
        //     process.env.REACT_APP_BASE_URL+'/userForReact/findAll',{},{
        //         userName:"1"
        //     }
        // ).then((res)=>{
        //     let userList = res.data;
        //     const total = userList.length;
        //     this.setState({
        //         datasource: userList,
        //         loading: false,
        //         pagination: {
        //             page: pagination.page,
        //             pageSize: pagination.rows,
        //             total: total,
        //             pageSizeOptions: ['20', '30', '40', '60', '80', '100'],
        //             position: [
        //                 'bottomCenter']
        //         },
        //     });
        // },err =>{
        //    // console.log(err);  这里可以做失败处理
        // })
        pcService.fetchData(this, process.env.REACT_APP_BASE_URL+'/userForReact/findByPage', params);
    }



    render(){
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '籍贯',
                dataIndex: 'city',
            },
            {
                title: '电子邮件',
                dataIndex: 'email',
            },
            {
                title: '入职时间',
                dataIndex: 'date',
            },
        ]

       // console.log(this.state.pagination);
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            selectedRows: this.state.selectedRows,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                this.setState({
                    selectedRowKeys:selectedRowKeys,
                    selectedRows:selectedRows
                })
            },
            getCheckboxProps: record => ({
                disabled: record.name === '余大江1号', // 不能被选中的列，name = ‘余大江1号’;
                name: record.name,
            }),
        };

        return(
            <div>
                <Card>
                    <Button type='primary' size="small">编辑</Button>
                </Card>
                <Card>
                    <MyTable bordered columns={columns}
                             dataSource={this.state.dataSource}
                             pagination={this.state.pagination}
                             loading={this.state.loading}
                             rowSelection={rowSelection}
                             fetchData = {this.request}/>
                </Card>
            </div>
        )
    }
}