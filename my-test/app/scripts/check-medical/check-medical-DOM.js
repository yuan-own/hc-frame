/**
 * Created by ZHANGPING702 on 2016-09-07.
 */
require('zepto');

var check_medical_DOM = {
    //热词
    hot_word : function (hot_word) {
        $(".hot-search>ul").append(
            "<li>" + hot_word + "</li>"
        )
    },
    //模糊搜索
    fMatchResult : function (fMatchResult) {
        $(".search-list>div").after(
            "<li>"
            + "<span class='search-list-content'>" + fMatchResult + "</span>" +
            "</li>"
        );
    }
    
}

module.exports = {
    check_medical_DOM:check_medical_DOM
};