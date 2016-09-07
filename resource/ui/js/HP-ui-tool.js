/**
 * Created by zhangping702 on 16/8/10.
 */
require("zepto")
require("../selector")
require("../touch")


(function ($) {
    'use strict'
    //tip提示框
    $.HP_ui_tip = function (opts) {
        var input = $("input[type=text], input[type=tel], input[type=password], input[type=number], input[type=email]")
        function HP_ui_tip(opts) {
            this.options ={
                height:50,
                width:80,
                content:"",
            };
            this.init(opts);
        }
        HP_ui_tip.prototype = {
            init: function(opts){
                this.options = $.extend(this.options, opts);
                this.show();
            },
            show: function(){
                this.insertHtml();//tip的内容
                this.setSize();//宽和高
                this.setPosition();//自动定位
            },
            insertHtml: function () {
                var html =
                    '<div class="HP-ui-tip">\
                    <div class="HP-ui-tip-triangle">\
                    <span></span></div>\
                     <div class="HP-ui-tip-content">\
                     ' + this.options.content + '</div></div>';
                input.parent().append(html);
            },
            setPosition: function(){
                var height = this.options.height;
                var width =this.options.width;
                input.each(function(i){
                    var distance = $(this).offset();;
                    if(distance.top<height){
                        input[i].nextElementSibling.classList.add('ui-Tip-top'+i);
                        //绑定事件
                        $(this).focus(function () {
                            $(".ui-Tip-top"+i).css('display','block');
                        });
                        $(this).blur(function () {
                            $(".ui-Tip-top"+i).css('display','none');
                        });
                        //定位
                        $('.ui-Tip-top'+i+'>.HP-ui-tip-triangle').removeClass('HP-ui-tip-triangle-bottom').addClass('HP-ui-tip-triangle-top');
                        $('.ui-Tip-top'+i).css("margin-top",input.height()/2+"px");
                    }
                    else{
                        input[i].nextElementSibling.classList.add('ui-Tip-top-bottom'+i);
                        $(this).focus(function () {
                            $('.ui-Tip-top-bottom'+i).css('display','block');
                        });
                        $(this).blur(function () {
                            $('.ui-Tip-top-bottom'+i).css('display','none');
                        });
                        //默认在input框上方显示
                        $('.ui-Tip-top-bottom'+i+'>.HP-ui-tip-triangle').removeClass('HP-ui-tip-triangle-top').addClass('HP-ui-tip-triangle-bottom');
                        $('.ui-Tip-top-bottom'+i).css("margin-top",(height+$(this).height()+20)*(-1)+"px");
                    }
                });
            },
            setSize: function () {
                this.ele().height(this.options.height).width(this.options.width).css({"line-height": this.options.height + "px"})
            },
            ele: function () {
                return $(".HP-ui-tip");
            },
        };
        return new HP_ui_tip(opts);

    };

    //设备侦测
    var device = {};
    var ua = navigator.userAgent;//用户代理

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    //初始化
    device.ios = device.android = device.iphone = device.ipad =  false;

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
        if (device.osVersion.split('.')[0] === '10') {
            device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
        }
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // keng..
    device.isWeixin = /MicroMessenger/i.test(ua);

    $.device = device;

    //常用的功能
    //Button
    var Button = function () {}

    //倒计时按钮
    var initTime = $('.js-loading-button').data('time');//获得初始时间
    var time = $('.js-loading-button').data('time');
    Button.prototype.countdown = function (){
        var loadingButton = $('.js-loading-button');
        if (time == 0) {
            loadingButton.attr("disabled",null);
            loadingButton.val("获取验证码");
            clearTimeout(timeout);
            time = initTime;
            return;
        } else {
            loadingButton.attr("disabled", true);
            loadingButton.val("重新发送(" + time + ")");
            time--;
        }
        var timeout = setTimeout(function() {
            Button.prototype.countdown()
        },1000)
    }

    //DROPDOWN

    var Dropdown = function(){}
    Dropdown.prototype.toggle = function (e) {
        var DropdownButton = $('.HP-ui-dropdown-toggle');
        var DropdownMenu = DropdownButton.next();
        DropdownMenu.toggleClass('open');
    }

    //事件绑定在document文档对象
    $(document)
    //倒计时按钮
    .on('click','.js-loading-button', Button.prototype.countdown)//不用tap而用click，原因是tap会导致disabled属性无效
    //下拉列表
    .on('tap', '.HP-ui-dropdown-toggle', Dropdown.prototype.toggle)

    console.log($.device)

})(Zepto);