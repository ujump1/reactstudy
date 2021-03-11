import * as React from "react";
import {Table} from 'antd';

// 基本通用的table
class MyTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: this.props.columns
        };
    }

    rowClick = (e, record, index) => {
        const {onRow, rowKey="id" ,rowSelection} = this.props; // rowKey不传的话就是id
        if (rowSelection) { // 选择框事件
            console.log(rowSelection);
            const {selectedRowKeys,selectedRows, onChange,getCheckboxProps} = rowSelection;
            console.log(!getCheckboxProps(record).disabled);
            if (selectedRowKeys.includes(record[rowKey])) {
                 selectedRowKeys.splice(selectedRowKeys.indexOf(record[rowKey]), 1);
                 selectedRows.splice(selectedRows.indexOf(record), 1);
                 onChange([...selectedRowKeys], [...selectedRows]);  // 需要这样赋值才能更新页面，暂时不知道怎么回事
            } else {
                if(!getCheckboxProps(record).disabled) {  // 如果不允许选中的话
                    onChange([...selectedRowKeys, record[rowKey]], [...selectedRows, record]);
                }else{
                    onChange([...selectedRowKeys], [...selectedRows]);
                }
            }
        }
        if (onRow) {  // 点击行事件
            const events = onRow(record, index);
            Object.keys(events).forEach(event => {
                if (events[event] && events[event] instanceof Function) {
                    events[event](e);
                }
            });
        }
    };


    render() {
        const {
            rowSelection, rowKey="id", dataSource, pagination, fetchData,loading,onChangeSort,rowClassName,title,size,expandedRowRender}
         = this.props;

        console.log(pagination);
        /* 分页pageSize 变化的回调 */
        const onShowSizeChange = (current, size) => {
            let params = {
                pageSize: size,
                page: current
            };
            fetchData(params);
        };

        /* 页码跳转回调函数 */
        const onChange = (page, pageSize) => {
            let params = {
                pageSize: pageSize,
                page: page,
            };
            fetchData(params);
        };
        console.log(pagination.total);

        return (
            <Table
                loading={loading}
                rowKey={rowKey}
                bordered={true}
                rowSelection={rowSelection}
                columns={this.state.columns}
                dataSource={dataSource}
                pagination={{
                    showQuickJumper: false,
                    onShowSizeChange: onShowSizeChange,
                    onChange: onChange,
                    showSizeChanger: true,
                    showTotal: total => `总共${pagination.total}条`,
                    current: pagination.page,
                    ...pagination
                }}
                onRow={(record, index) => {
                    return {
                        onClick: (e) => {
                            this.rowClick(e, record, index)
                        }
                    };
                }}
                onChange={onChangeSort}
                rowClassName={rowClassName}
                title={title}
                size={size}
                expandedRowRender={expandedRowRender}
            >
            </Table>
        );
    }
}

export default MyTable;

