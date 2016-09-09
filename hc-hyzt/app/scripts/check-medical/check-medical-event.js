/**
 * Created by ZHANGPING702 on 2016-09-07.
 */
require("zepto");
var check_medical_ajax = require('./check-medical-ajax');


var check_medical_event = {
    //点击热词
    hot_word : function () {
        $('.hot-search>ul>li').click(function(){
            $(".cm-search>input").val($(this).html());
            fSearchDisease();
        });
    },

    //点击模糊搜索的建议
    fMatchResult : function () {
        $(".search-list>li").click(function () {
            $(".cm-search>input").val($(this).find('span.search-list-content').text());
            fSearchDisease()
        });
    },


    //点击搜索图片
    search_img : function(){
        $(".search-img").click(function () {
            check_medical_ajax.fMatchResult(1)
        });
    }
}

module.exports = {
    check_medical_event:check_medical_event
};
