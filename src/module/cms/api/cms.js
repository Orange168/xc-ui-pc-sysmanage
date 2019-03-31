import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

//页面查询
export const page_list = (page,size,params) =>{

  let queryStr = querystring.stringify(params);
  //请求服务端的页面查询接口
  console.log(queryStr);
  return http.requestQuickGet(apiUrl+'/cms/page/list/'+page+'/'+size +"?" +queryStr);
}

/*页面添加*/
export const page_add = params =>{
  return http.requestPost(apiUrl + '/cms/page/add',params)
}

/*页面查询*/
export const page_get = id =>{
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id)
}
/*页面查询*/
export const page_edit = (id,params) =>{
  return http.requestPut(apiUrl + '/cms/page/edit/'+id,params)
}

/*删除查询*/
export const page_del = id =>{
  return http.requestDelete(apiUrl + '/cms/page/del/' + id)
}


