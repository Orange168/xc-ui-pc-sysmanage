import Home from '@/module/home/page/home.vue';
import page_list from '@/module/test/page/page_list.vue';
import table_fixed from '@/module/test/page/table_fixed_header.vue'
export default [{
    path: '/',
    component: Home,
    name: '测试菜单',//菜单名称
    hidden: false
  ,
    children:[
      {path:'/test/page/list',name:'测试列表',component: page_list,hidden:false},
      {path:'/test/page/fixed',name:'固定表头',component: table_fixed,hidden:false}
    ]
  }
]
