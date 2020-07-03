<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <span class="table-page-search-submitButtons">
        <a-button type="primary" @click="handleUserAdd">添加</a-button>
      </span>
    </div>

    <s-table row-key="id" size="default" :columns="columns" :data="loadData" ref="table">
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

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称" hasFeedback>
          <!-- 编辑 -->
          <a-input
            placeholder="请输入用户名"
            v-decorator="['roleName', , { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal title="添加" style="top: 20px;" :width="800" v-model="AddUser" @ok="handleAddSub">
      <a-form class="permission-form" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="角色名称" hasFeedback>
          <a-input
            placeholder="请输入角色名称"
            v-decorator="['roleName1', , { rules: [{ required: true, message: '请输入用户名!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { STable } from '@/components'
import { getRole, deleteRole, updateRole, addRole, getOptionsList } from '@/api/manage'
import { PERMISSION_ENUM } from '@/utils/helper/permission'

const STATUS = {
  0: '未激活',
  1: '启用',
  2: '禁用',
  3: '删除'
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
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
        return getRole(parameter).then(res => {
          console.log('getRole', res)
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
        let { id, roleName } = values
        data = { id, roleName: roleName }
      })
      updateRole(data).then(res => {
        this.$message.success('更新成功')
        this.$refs.table.refresh(true)
      })
    },

    handleDel(record) {
      deleteRole(record.id).then(res => {
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
      // var data1 = this.form.getFieldsValue();  获取表单的值
      this.form.validateFields((err, values) => {
        console.log(err, values)
        let { roleName1 } = values
        data = {
          roleName: roleName1
        }
      })
      addRole(data).then(res => {
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
