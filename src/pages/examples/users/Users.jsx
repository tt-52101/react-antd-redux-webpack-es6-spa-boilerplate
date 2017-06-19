import React, {Component} from 'react';
import {Operator} from 'zk-tookit/antd';
import {ajax} from 'zk-tookit/react';
import ListPage from './ListPage';

export const PAGE_ROUTE = '/example/users';

@ajax()
export default class extends Component {
    state = {
        total: 0,
        dataSource: [],
    };

    queryItems = [
        [
            {
                type: 'input',
                field: 'loginName',
                label: '登录名',
                labelSpaceCount: 3,
                width: '25%',
                placeholder: '请输入登录名',
                decorator: {
                    rules: [
                        {required: false, message: '请输入用户名'},
                    ],
                },
            },
            {
                type: 'input',
                field: 'name',
                label: '可以为空',
                labelSpaceCount: 4,
                // label: '',
                // labelWidth: 0,
                // colon: false,
                width: 200,
                placeholder: '请输入用户名',
                decorator: {},
            },
            {
                type: 'input',
                field: 'name1',
                label: '用户名1',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入用户名',
                decorator: {},
            },
            {
                type: 'input',
                field: 'name3',
                label: '用户名3',
                labelSpaceCount: 3,
                width: 200,
                placeholder: '请输入用户名',
                decorator: {},
            },
        ],
        {
            type: 'input',
            field: 'name2',
            label: '用户名2',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '请输入用户名',
            decorator: {},
        },
        {
            type: 'number',
            field: 'number',
            label: 'number',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '请输入数字',
            decorator: {},
            elementProps: {
                min: 0,
                max: 100,
                step: 10,
                precision: 2, // 精度
                disabled: false,
                size: 'large',
                formatter: value => value,
                parser: value => value,
            },
        },
        {
            type: 'textarea',
            field: 'textarea',
            label: 'textarea',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '一个文本框',
            decorator: {},
        },
        {
            type: 'password',
            field: 'password',
            label: 'password',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '一个密码框',
            decorator: {},
        },
        {
            type: 'mobile',
            field: 'mobile',
            label: 'mobile',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '一个电话',
            decorator: {},
        },
        {
            type: 'email',
            field: 'email',
            label: 'email',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '一个邮件',
            decorator: {},
        },
        {
            type: 'select',
            field: 'select',
            label: 'select',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '一个select',
            decorator: {},
            elementProps: {
                options: [
                    {value: '0', title: '测试1'},
                    {value: '1', title: '测试2'},
                ],
            },
        },
        {
            type: 'checkbox',
            field: 'checkbox',
            // label: '复选',
            labelSpaceCount: 3,
            width: 200,
            placeholder: '复选框',
            decorator: {},
            elementProps: {
                title: '复选啊',
            },
        },
        {
            type: 'checkbox-group',
            field: 'checkboxGroup',
            label: '复选组',
            labelSpaceCount: 3,
            width: 400,
            elementProps: {
                options: [
                    {label: '苹果', value: 'Apple'},
                    {label: '梨', value: 'Pear'},
                    {label: '橘子', value: 'Orange'},
                ],
            },
        },
    ];

    toolItems = [
        {
            type: 'primary',
            text: '添加',
            icon: 'plus-circle-o',
            onClick: () => {
                this.props.router.push('/example/users/+add/:userId?tabName=添加用户');
            },
        },
        // {
        //     type: 'danger',
        //     text: '删除选中',
        //     icon: 'minus-circle-o',
        //     onClick: () => {
        //         console.log('删除选中');
        //     },
        // },
    ];

    columns = [
        {title: '登陆名称', dataIndex: 'loginName', key: 'loginName', width: '20%'},
        {title: '用户名', dataIndex: 'name', key: 'name'},
        {title: '备注', dataIndex: 'remark', key: 'remark'},
        {
            title: '操作',
            key: 'operator',
            render: (text, record) => {
                const items = [
                    {
                        label: '修改',
                        permission: 'CODE-MODIFY',
                        onClick: () => this.props.router.push(`/example/users/+add/${record.id}?tabName=修改用户`),
                    },
                    {
                        label: '删除',
                        permission: '',
                        confirm: {
                            title: `您确定要删除“${record.loginName}”？`,
                            onConfirm: () => {
                                console.log('删除', record);
                                const dataSource = this.state.dataSource.filter(item => item.id !== record.id);
                                this.setState({
                                    dataSource,
                                });
                            },
                        },
                    },
                ];

                return (<Operator items={items} hasPermission={() => true}/>);
            },
        },
    ];

    handleSearch = (params) => {
        console.log(params);
        return this.props.$ajax.get('/mock/users', params)
            .then(data => {
                this.setState({
                    total: data.total,
                    dataSource: data.list,
                });
            });
    };

    render() {
        const {total, dataSource} = this.state;
        return (
            <ListPage
                dataFilter={data => data}
                queryItems={this.queryItems}
                showSearchButton
                showResetButton={false}
                toolItems={this.toolItems}
                columns={this.columns}
                onSearch={this.handleSearch}
                total={total}
                dataSource={dataSource}
                showPagination
            />
        );
    }
}
