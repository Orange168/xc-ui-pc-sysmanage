<template>
  <div>
    <!--<!‐‐查询表单‐‐>-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="params.pageAliase" @keyup.enter="query" style="width: 100px"></el-input>
      <el-button type="primary" v-on:click="query" icon="el-icon-search">查询</el-button>
      <!--router-link是vue提供的路由功能，用于在页面生成路由链接，最终在html渲染后就是<a标签
         to：目标路由地址
      -->
      <router-link class="mui-tab-item" :to="{path: '/cms/page/add/'}">
        <el-button type="primary">新增页面</el-button>
      </router-link>
    </el-form>


    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" width="220">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="页面类型" width="80">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" width="250">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" width="250">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" width="180">
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="page">
          <el-button
            type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button type="text" @click="del(page.row.pageId)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--v-on:current-change 等于 @current-change-->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="params.size"
      :current-page="params.page"
      v-on:current-change="changePage"
      style="float:right">
    </el-pagination>
  </div>
</template>
<script>
  /*导入cmsApi的所有方法，编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        list: [],
        total: 0,
        params: { // UI 表单上面的数据要和此对应
          page: 1,
          size: 10,
          siteId: "",
          siteName: ""
        },
        siteList: []
      }
    },
    methods: {
      query: function () {
        // alert('查询')
        //调用服务端的接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          //将res结果数据赋值给数据模型对象
          console.log(res);
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      changePage: function (page) {//形参就是当前页码
        //调用query方法
        // alert(page)
        this.params.page = page;
        this.query()
      },
      edit: function (pageId) {
        this.$router.push({
          path: '/cms/page/edit/' + pageId,
          query: {
            page: this.params.page,
            siteId: this.params.siteId
          }
        })
      },
      del: function (pageId) {
        this.$confirm('确认删除此页面吗？','提示',{}).then(()=>{
          cmsApi.page_del(pageId).then((res)=>{
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.query();
            }else {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            }
          });
        });
      }
    },
    mounted() {
      //当DOM元素渲染完成后调用query
      this.query();
      this.siteList = [
        {
          siteId: "5a751fab6abb5044e0d19ea1",
          siteName: "门户主站"
        },
        {
          siteId: "102",
          siteName: "测试2"
        }
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
