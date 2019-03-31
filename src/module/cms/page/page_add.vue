<template>
  <div>
    <el-form :model="pageForm" :rules="pageFormRules" label-width="80px" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker type="datetime" align="center" placeholder="创建时间" v-model="pageForm.pageCreateTime"
                        format="yyyy/MM/dd HH:mm" id="data-picker">
        </el-date-picker>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button type="primary" @click="go_back">返回</el-button>

      <el-button type="primary" @click="addSubmit">提交</el-button>
    </div>
  </div>
</template>
<script>
  /*导入cmsApi的所有方法，编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        //站点列表
        siteList: [],
        //模版列表
        templateList: [],
        //新增界面数据
        pageForm: {
          siteId: '',
          templateId: '',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pageParameter: '',
          pagePhysicalPath: '',
          pageType: '',
          page:1,
          pageCreateTime: new Date()
        },pageFormRules: {
          siteId:[
            {required: true, message: '请选择站点', trigger: 'blur'}
          ],
          templateId:[
            {required: true, message: '请选择模版', trigger: 'blur'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      addSubmit() {
        // alert("提交")
        this.$refs.pageForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？',"提示",{}).then(()=>{
              cmsApi.page_add(this.pageForm).then((res)=>{
                console.log(res)
                if (res.success) {
                  this.$message({
                    message: "提交成功",
                    type: 'success'
                  });
                  this.$refs['pageForm'].resetFields();
                }else {
                  this.$message.error('提交失败');
                }
              });
            })
          }
        });
      },
      go_back(){
        this.$router.push({
          path: '/cms/page/list',
          query: {
            // 表示取出路由上的参数列表,/router1?page=123
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        })
      }
    },
    created: function () {
      // this.pageCreateTime = (new Date()).Format("yyyy-MM-dd hh:mm");
      // console.log(this.pageCreateTime);
      // this.params.page = Number.parseInt(this.$route.query.page||1);
      // this.params.siteId = this.$route.query.siteId||'';
      // //从路由上获取参数
      // console.log(this.params.page)
      // console.log(this.params.siteId)
      //初始化站点列表
      this.siteList = [
        {
          siteId: '5a751fab6abb5044e0d19ea1',
          siteName: '门户主站'
        },
        {
          siteId: '102',
          siteName: '测试站'
        }
      ]
      //模板列表
      this.templateList = [
        {
          templateId: '5a962b52b00ffc514038faf7',
          templateName: '首页'
        },
        {
          templateId: '5a962bf8b00ffc514038fafa',
          templateName: '轮播图'
        }
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
  #data-picker {
    width: 60vm;
  }
</style>
