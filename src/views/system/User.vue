<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <span class="table-page-search-submitButtons">
        <a-button type="primary" @click="handleUserAdd">添加</a-button>
      </span>
    </div>

    <s-table row-key="id" size="default" :columns="columns" :data="loadData" ref="table">
      <a-tag color="blue" slot="status" slot-scope="text">{{ text | statusFilter }}</a-tag>
      <span slot="createTime" slot-scope="text">{{ text | moment }}</span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="handleDel(record)">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>

    <a-modal title="编辑" style="top: 20px;" :width="800" v-model="visible" @ok="handleOk">
      <a-form class="permission-form" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="id" hasFeedback validateStatus="success">
          <a-input placeholder="id" v-decorator="['id']" disabled="disabled" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名" hasFeedback>
          <a-input
            placeholder="用户名"
            v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="密码" hasFeedback>
          <a-input
            placeholder="请输入密码"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '请输入密码!' },
                  { required: true, min: 5, message: '最小长度5' },
                  { required: true, max: 11, message: '最大长度11' }
                ]
              }
            ]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称" hasFeedback>
          <!-- 编辑 -->
          <a-select v-decorator="['roleName', { initialValue: 'roleName' }]">
            <a-select-option v-for="item in OptionsList" :key="item.id" :value="item.id">{{
              item.roleName
            }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态" hasFeedback>
          <!-- 编辑 -->
          <a-select v-decorator="['status', { initialValue: 'status' }]">
            <a-select-option :value="0">未激活</a-select-option>
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal title="添加" style="top: 20px;" :width="800" v-model="AddUser" @ok="handleAddSub">
      <a-form class="permission-form" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="用户名" hasFeedback>
          <a-input
            placeholder="请输入用户名"
            v-decorator="['username1', { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="密码" hasFeedback>
          <a-input
            placeholder="请输入密码"
            v-decorator="[
              'password1',
              {
                rules: [
                  { required: true, message: '请输入密码!' },
                  { required: true, min: 5, message: '最小长度5' },
                  { required: true, max: 11, message: '最大长度11' }
                ]
              }
            ]"
          />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称" hasFeedback>
          <a-select
            v-decorator="['roleName1', { rules: [{ required: true, message: '请选择角色名称!' }] }]"
            placeholder="请选择角色名称"
            :defaultActiveFirstOption="false"
          >
            <a-select-option v-for="item in OptionsList" :key="item.id" :value="item.id">{{
              item.roleName
            }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态" hasFeedback>
          <a-select
            v-decorator="['status1', { rules: [{ required: true, message: '请选择用户状态!' }] }]"
            placeholder="请选择用户状态"
            :defaultActiveFirstOption="false"
          >
            <a-select-option :value="1">启用</a-select-option>
            <a-select-option :value="2">禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import { getUserList, deleteUser, getOptionsList, updateUser, addUser } from '@/api/manage'
import { PERMISSION_ENUM } from '@/utils/helper/permission'

const STATUS = {
  0: '未激活',
  1: '启用',
  2: '禁用',
  3: '删除'
}

const columns = [
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '登出时间',
    dataIndex: 'lastTime',
    scopedSlots: { customRender: 'createTime' },
    sorter: true
  },
  {
    title: '操作',
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'TableList',
  components: {
    STable
  },
  data() {
    return {
      AddUser: false,
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      // 表头
      columns,
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(parameter).then(res => {
          console.log('getUserList', res)
          return res
        })
      },
      OptionsList: []
    }
  },
  filters: {
    statusFilter(key) {
      return STATUS[key]
    },
    permissionFilter(key) {
      const permission = PERMISSION_ENUM[key]
      return permission && permission.label
    }
  },

  mounted() {
    //获取用户角色列表
    getOptionsList().then(res => {
      this.OptionsList = res.data
    })
  },

  methods: {
    handleEdit(record) {
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(record, ['id', 'username', 'roleName', 'status']))
      })
    },

    handleOk(e) {
      e.preventDefault()
      this.visible = false
      let data = {}
      this.form.validateFields((err, values) => {
        let { id, status, username, roleName, password } = values
        data = {
          id,
          roleId: roleName,
          status,
          username,
          password
        }
      })
      updateUser(data).then(res => {
        this.$message.success('更新成功')
        this.$refs.table.refresh(true)
      })
    },

    handleDel(record) {
      let data = { ids: record.id }
      deleteUser(data).then(res => {
        this.$message.success('删除成功')
        this.$refs.table.refresh(true)
      })
    },

    handleUserAdd() {
      this.AddUser = true
      this.$nextTick(() => {
        // this.form.setFieldsValue(pick(['username1', 'roleName1', 'status1']))
      })
    },

    handleAddSub(e) {
      this.AddUser = false
      e.preventDefault()
      let data = {}
      //   var data1 = this.form.getFieldsValue();  获取表单的值
      this.form.validateFields((err, values) => {
        let { status1, username1, roleName1, password1 } = values
        data = {
          roleId: roleName1,
          status: status1,
          username: username1,
          password: password1
        }
      })
      addUser(data).then(res => {
        this.$message.success('添加成功')
        this.$refs.table.refresh(true)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.permission-form {
  /deep/ .permission-group {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
