/**
 * Created by ZHANGPING702 on 2016-09-07.
 */

require('zepto');

var Ajax = require('./ajax/check-medical-ajax');



var check_medical = {
    init: function () {
        Ajax.check_medical_ajax.hot_word();
    }
};

check_medical.init();