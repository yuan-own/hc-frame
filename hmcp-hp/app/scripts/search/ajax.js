/**
 * Created by ZHANGYUANYUAN031 on 2016-09-07.
 */

require("zepto");

require("../../../../resource/ajax-md5");
let dom=require("./dom");
module.exports={
  btnajax:function(){
      $.GET(URL,DATA,(data)=>{

          dom.opeBtn(needData);
      })
  }
};


