/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 */

/**
 * 格式化时间方法
 * @param date 时间对象
 * @param fmt MM DD HH MM ss QQ SS
 * @returns {*}
 */
var dateFormat = function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};


/**
 * 该方法是由url 的 key 得到 value 用的。 domain.com?val=123 要得到 123  getUrlParam("val")即可
 * @param name
 * @returns {null}
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
/**
 *函数描述：获取input type=file的图像全路径
 * @obj input type=file的对象
 **/
function getFullPath(obj) {
    if (obj) {
        //ie
        if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
            obj.select();
            return document.selection.createRange().text;
        }
        //firefox
        else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
            if (obj.files) {
                return obj.files.item(0).getAsDataURL();
            }
            return obj.value;
        }
        return obj.value;
    }
}
function encodeParam(param) {
    return encodeURI(param).replace(/%/g, "Z");
}

function decodeParam(param) {
    if (getUrlParam(param) == null) {
        return "";
    }
    else {
        return decodeURI(getUrlParam(param).replace(/Z/g, "%"));
    }
}

function testBook() {
    javascript:(function (e) {
        e.setAttribute("src", "http://" + location.hostname + ":9090/target/target-script-min.js#browsersync");
        document.getElementsByTagName("body")[0].appendChild(e);
    })(document.createElement("script"));
    void(0);
};

//百度地图
var baiduMap = (id, x, y, size = 14,imgUrl="../images/baidumap.png")=> {
    var map = new BMap.Map(id);
    var point = new BMap.Point(x, y);
    map.centerAndZoom(point, size);
     var myIcon = new BMap.Icon(imgUrl, new BMap.Size(300,157));
     var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
     map.addOverlay(marker2);
    var local = new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: true}});
    local.searchNearby('医院', point, 1000);
};


module.exports = {
    dateFormat,
    getUrlParam,
    getFullPath,
    encodeParam,
    decodeParam,
    testBook,
    baiduMap
};

