/**
 * Created by ZHANGPING702 on 2016-09-07.
 */

require('zepto');

var Ajax = require('../check-medical/check-medical-ajax');

var check_medical = {
    init: function () {
        Ajax.hot_word();
        alert("hello owrd");

    }
};

$(function(){
    check_medical.init();
})

