<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <span class="table-page-search-submitButtons">
        <a-button type="primary" @click="handlePermAdd">添加</a-button>
      </span>
    </div>

    <a-table
      :columns="columns"
      :data-source="data1"
      childrenColumnName=""
      class="components-table-demo-nested"
      row-key="id"
      @expand="expand"
      ref="table"
      :loading="loading"
    >
      <a-tag color="blue" slot="status" slot-scope="text">{{ text | statusFilter }}</a-tag>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record, 111)">编辑</a>
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
      <a-table
        slot="expandedRowRender"
        :columns="columns1"
        :data-source="innerData"
        :pagination="false"
        row-key="id"
        @expand="expand1"
        childrenColumnName=""
      >
        <a-tag color="blue" slot="status" slot-scope="text">{{ text | statusFilter }}</a-tag>
        <span slot="action1" slot-scope="text, record">
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

        <a-table
          slot="expandedRowRender"
          :columns="columns2"
          :data-source="innerData1"
          :pagination="false"
          row-key="id"
          childrenColumnName=""
        >
          <a-tag color="blue" slot="status" slot-scope="text">{{ text | statusFilter }}</a-tag>
          <span slot="action1" slot-scope="text, record">
            <a @click="handleEdit(record, true)">编辑</a>
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
        </a-table>
      </a-table>
    </a-table>

    <!-- 添加 -->
    <a-modal  title="添加" style="top: 20px;" :width="800" v-model="AddPerm" @ok="handleAddPerm">
      <a-form class="permission-form" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资源名称" hasFeedback>
          <a-input placeholder="请输入资源名称" v-decorator="['permName']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组件名称" hasFeedback>
          <a-input placeholder="请输入组件名称" v-decorator="['component']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单图标" hasFeedback>
          <a-input placeholder="请输入菜单图标" v-decorator="['icon']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限指令" hasFeedback>
          <a-input placeholder="请输入权限指令 _admin:system:user:get" v-decorator="['permExp']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="路由路径" hasFeedback>
          <a-input placeholder="请输入路由路径" v-decorator="['uri']" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态" hasFeedback>
          <a-select v-decorator="['type']" placeholder="请选择类型" :defaultActiveFirstOption="false">
            <a-select-option :value="0">菜单</a-select-option>
            <a-select-option :value="1">页面</a-select-option>
            <a-select-option :value="2">按钮</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="父级菜单" hasFeedback>
          <a-tree-select
            v-decorator="['pid']"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            tree-default-expand-all
          >
            <a-tree-select-node v-for="item in treeData" :key="item.key" :value="item.key" :title="item.title">
            </a-tree-select-node>
          </a-tree-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 编辑-->
    <a-modal title="编辑" style="top: 20px;" :width="800" v-model="visible" @ok="handleUpdPerm" :destroyOnClose="true">
      <a-form class="permission-form" :form="form">
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="id" hasFeedback>
          <a-input placeholder="id" v-decorator="['id']" disabled="disabled" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="资源名称" hasFeedback>
          <a-input placeholder="请输入资源名称" v-decorator="['permName']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="组件名称" hasFeedback v-if="pageInputState">
          <a-input placeholder="请输入组件名称" v-decorator="['component']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单图标" hasFeedback v-if="btnInputState">
          <a-input placeholder="请输入菜单图标" v-decorator="['icon']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限指令" hasFeedback>
          <a-input placeholder="请输入权限指令 _admin:system:user:get" v-decorator="['permExp']" />
        </a-form-item>
        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="路由路径" hasFeedback>
          <a-input placeholder="请输入路由路径" v-decorator="['uri']" />
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="状态" hasFeedback>
          <a-select
            v-decorator="['type', { initialValue: 'type' }]"
            placeholder="请选择类型"
            :defaultActiveFirstOption="false"
          >
            <a-select-option :value="0">菜单</a-select-option>
            <a-select-option :value="1">页面</a-select-option>
            <a-select-option :value="2">按钮</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="父级菜单" hasFeedback v-if="btnInputState">
          <a-tree-select
            v-decorator="['pid']"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="Please select"
            tree-default-expand-all
            :allowClear="true"
          >
            <a-tree-select-node v-for="item in treeData" :key="item.key" :value="item.key" :title="item.title">
            </a-tree-select-node>
          </a-tree-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-card>
</template>

<script>
import pick from 'lodash.pick'
import { getPermList, addPerm, updatePerm, deletePerm, getPermOptionsList } from '@/api/manage'

const columns = [
  { title: '资源名称', dataIndex: 'permName', key: 'permName' },
  { title: '组件名称', dataIndex: 'component', key: 'component' },
  { title: '菜单图标', dataIndex: 'icon', key: 'icon' },
  { title: '权限指令', dataIndex: 'permExp', key: 'permExp' },
  { title: '类型', dataIndex: 'type', key: 'type', scopedSlots: { customRender: 'status' } },
  { title: '路由路径', dataIndex: 'uri', key: 'uri' },
  {
    title: '操作',
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
const columns1 = [
  { title: '资源名称', dataIndex: 'permName', key: 'permName1' },
  { title: '菜单图标', dataIndex: 'icon', key: 'icon1' },
  { title: '权限指令', dataIndex: 'permExp', key: 'permExp1' },
  { title: '类型', dataIndex: 'type', key: 'type1', scopedSlots: { customRender: 'status' } },
  { title: '路由路径', dataIndex: 'uri', key: 'uri1' },
  {
    title: '操作',
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action1' }
  }
]
const columns2 = [
  { title: '权限名称', dataIndex: 'permName', key: 'permName1' },
  { title: '权限指令', dataIndex: 'permExp', key: 'permExp1' },
  { title: '类型', dataIndex: 'type', key: 'type1', scopedSlots: { customRender: 'status' } },
  { title: '请求路径', dataIndex: 'uri', key: 'uri1' },
  { title: '请求方法', dataIndex: 'method', key: 'method' },
  {
    title: '操作',
    width: '150px',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action1' }
  }
]

const STATUS = {
  0: '菜单',
  1: '页面',
  2: '按钮'
}

export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      treeData: [],
      AddPerm: false,
      data1: [],
      columns,
      columns1,
      columns2,
      innerData: [],
      innerData1: [],
      form: this.$form.createForm(this),
      btnInputState: true,
      pageInputState: false,
      loading: false
    }
  },
  filters: {
    statusFilter(key) {
      return STATUS[key]
    }
  },
  mounted() {
    this.loading = true
    getPermList().then(res => {
      this.loading = false
      this.data1 = res.data
    })
    getPermOptionsList().then(res => {
      let data = res.data
      this.treeData = res.data
    })
  },
  methods: {
    handleEdit(record, btnstate) {
      this.visible = true
      btnstate === 111 ? (this.pageInputState = true) : (this.pageInputState = false)
      btnstate === true ? (this.btnInputState = false) : (this.btnInputState = true)
      let pageArr = ['id', 'permName','component', 'icon', 'permExp', 'uri', 'type']
      let btnArr = ['id', 'permName', 'permExp', 'uri', 'type']
      this.$nextTick(() => {
        this.form.resetFields()
        btnstate == true
          ? this.form.setFieldsValue(pick(record, btnArr))
          : this.form.setFieldsValue(pick(record, pageArr))
      })
    },

    handleUpdPerm(e) {
      this.visible = false
      e.preventDefault()
      let data = {}
      this.form.validateFields((err, values) => {
        let { id, permName, component, icon, permExp, uri, type, pid } = values
        data = {
          id,
          permName,
          component,
          icon,
          permExp,
          uri,
          type,
          pid
        }
      })
      updatePerm(data).then(res => {
        this.$message.success('更新成功')
        location.reload()
      })
    },

    handlePermAdd(e) {
      this.AddPerm = true

      this.$nextTick(() => {
        this.form.resetFields()
      })
    },

    handleAddPerm(e) {
      this.AddPerm = false
      e.preventDefault()
      let data = {}
      this.form.validateFields((err, values) => {
        let { permName, component, icon, permExp, uri, type, pid } = values
        data = {
          permName,
          component,
          icon,
          permExp,
          uri,
          type,
          pid
        }
      })
      addPerm(data).then(res => {
        this.$message.success('添加成功')
        location.reload()
      })
    },

    handleDel(record) {
      deletePerm(record.id).then(res => {
        this.$message.success('删除成功')
        location.reload()
      })
    },

    expand(expanded, record) {
      this.innerData = record.children
    },

    expand1(expanded, record) {
      this.innerData1 = record.children
    }
  }
}
</script>

<style lang="less" scoped></style>
