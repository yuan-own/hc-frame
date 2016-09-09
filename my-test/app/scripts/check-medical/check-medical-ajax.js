/**
 * Created by ZHANGPING702 on 2016-09-07.
 */
require("zepto");
require("../../../../resource/ajax-md5");
require("../../../../resource/dialog");
var DOM = require('./check-medical-DOM');
var event = require('./check-medical-event');

var client=require("../../../../resource/client.set"),
    url=require("../../../../resource/utils");
var gPath = client.gPath;
var check_medical_ajax = {
    //热词接口
    hot_word : function(){
        $.GET(
            client.gPath+"hmcp-hp/api/medical/v1/illnessnameHotWord",
            function(msg){
                if(!!msg){
                    if(msg.resultCode=="000000"){
                        for (var i = 0; i < msg.result.length; i++) {
                            DOM.check_medical_DOM.hot_word(msg.result[i]);
                        }
                        event.check_medical_event.hot_word();
                    }else{
                        $.tip({
                            width:300,
                            height:100,
                            content:"热搜疾病接口："+msg.resultCode
                        });
                    }
                }
            },
            function(){
                $.tip({
                    width:300,
                    content:"热搜疾病接口请求失败",
                    time:1000
                });
            }
        );
    },

    //模糊匹配搜素
    fMatchResult : function(a){
        var sText = {
            "text": $(".cm-search>input").val()
        };
        $.POST(
            client.gPath+"hmcp-hp/api/medical/v1/search/illness/advice",
            sText,
            function (msg) {
                //console.log(msg);
                if(!!msg){
                    if(a==0) {
                        if (msg.resultCode == "000000") {
                            if (msg.result != "") {
                                $(".search-list").show();
                                $(".search-list>li").remove();
                                for (var i = 0; i < msg.result.length; i++) {
                                    DOM.check_medical_DOM.fMatchResult(msg.result[i]);
                                }
                            }else{
                                $(".search-list").hide();
                            }
                            $(".search-list-whole").hide();
                        }
                    }else if(a==1){
                        if (msg.result == "") {
                            $(".hot-search,.result-null").show();
                            $(".search-list,.cm-search>img:nth-of-type(1)").hide()
                        } else {
                            $(".search-list-whole").show();
                            $(".cm-search>img:nth-of-type(1)").hide()
                        }
                    }
                    event.check_medical_event.fMatchResult();
                }
            },
            function () {
                $.tip({
                    width:300,
                    content:"模糊匹配接口请求失败",
                    time:1000
                });
            }
        )
    }
};
module.exports = check_medical_ajax;