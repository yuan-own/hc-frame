/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 */


/**
 *该方法得到样式属性值
 */
function getStyle(obj, attr) {
    if(!obj) return;
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, null)[attr];
    }
}

/**
 *  封装一个运动方法
 * @param obj dom 元素对象
 * @param json 一个josn对象里面即为样式
 * @param cb 执行完动画后执行的方法
 * @param witchMove 有两个种 一个linear 即直线运动,swing 为曲线运动 ,默认是 直线运动 即 linear
 */

function animate(obj, json, cb, witchMove) {
    if (typeof cb == 'string') {
        witchMove = cb;
        cb = undefined;
    }
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var bBtn = true;
        for (var attr in json) {
            var itemAttr = json[attr];
            if (typeof itemAttr == 'string') {
                if (itemAttr.search(/px/) != -1) {
                    itemAttr = parseInt(itemAttr.match(/(-)*\d+/)[0]);
                } else if (itemAttr.search(/rem/) != -1) { //把rem单位换算成px
                    itemAttr = parseInt(itemAttr.match(/(-)*\d+(\.\d+)?/)[0] * gmax);
                } else {
                    itemAttr = parseFloat(itemAttr);
                }
                if (attr == 'opacity') itemAttr = parseInt(parseFloat(itemAttr) * 100);
            } else {
                if (attr == 'opacity') itemAttr = itemAttr * 100;
            }
            var nCur = 0;
            if (attr == 'opacity') {
                if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                    nCur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                }
                else {
                    nCur = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                }
            } else {
                nCur = parseInt(getStyle(obj, attr)) || 0;
            }
            var iSpeed = 0;
            if (typeof witchMove === 'undefined' || !witchMove || witchMove == 'linear') { //直线运动
                if (itemAttr == nCur) continue;
                iSpeed = (itemAttr - nCur) > 0 ? 10 : -10;
                if (Math.abs(nCur - itemAttr) < Math.abs(iSpeed)) {
                    if (attr == 'opacity') {
                        obj.style.filter = 'alpha(opacity=' + itemAttr + ')';
                        obj.style.opacity = itemAttr / 100;
                    }
                    else {
                        obj.style[attr] = itemAttr + 'px';
                    }
                    continue;
                } else {
                    bBtn = false;
                }
            } else if (witchMove === 'swing') { //变速运动
                iSpeed = (itemAttr - nCur) / 8;
                iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                if (iSpeed == 0 || iSpeed == -1) {
                    iSpeed = 0;
                    if (attr == 'opacity') {
                        obj.style.filter = 'alpha(opacity=' + itemAttr + ')';
                        obj.style.opacity = itemAttr / 100;
                    }
                    else {
                        obj.style[attr] = itemAttr + 'px';
                    }
                    continue;
                }
                if (nCur != itemAttr) {
                    bBtn = false;
                }
            }
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (nCur + iSpeed) + ')';
                obj.style.opacity = (nCur + iSpeed) / 100;
            }
            else {
                obj.style[attr] = nCur + iSpeed + 'px';
            }
        }
//            清除定时器
        if (bBtn) {
            clearInterval(obj.timer);
            if (!!cb && typeof cb === 'function') {
                cb.call(obj);
            }
        }
    }, 30);
}

/**
 * 停止运动方法
 * @param obj  dom 对象
 */
function stop(obj) {
    clearInterval(obj.timer);
}

module.exports={
    animate,stop,getStyle
};


