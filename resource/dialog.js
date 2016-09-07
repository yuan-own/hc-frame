/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 */

require("zepto");

(function ($) {
    //提示弹出框
    $.tip = function (opts) {
        function Tip(opts) {
            this.options = {
                height: 50,
                width: 120,
                content: "",
                time: 2000
            };
            this.init(opts);
        }

        Tip.prototype = {
            constructor: Tip,
            init: function (opts) {
                this.options = $.extend(this.options, opts);
                this.show();
                var self = this;
                setTimeout(function () {
                    self.close();
                }, this.options.time);
            },
            show: function () {
                this.insertHtml();
                this.setSize();
                this.setPosition();
            },
            insertHtml: function () {
                var html =
                    '<div class="tipDialog" style="z-index: 10000; position: fixed; font-size: 1.5rem; background-color: rgba(0,0,0,0.85); color: white; text-align: center; border-radius: 5px;">\
                     ' + this.options.content + '\
                    </div>';
                $(document.body).append(html);
            },
            setPosition: function () {
                var top = ($(window).height() - this.options.height) / 2, left = ($(window).width() - this.options.width) / 2;
                this.ele().css({height: this.options.height, width: this.options.width, top: top, left: left});
            },
            setSize: function () {
                this.ele().height(this.options.height).width(this.options.width).css({"line-height": this.options.height + "px"})
            },
            close: function () {
                this.ele().remove();
            },
            ele: function () {
                return $("body .tipDialog");
            }
        };
        return new Tip(opts);
    };

    $.fn.Dialog = function (opts) {
        var $this = $(this).hide();

        function MyDialog(opts) {
            this.options = {
                height: 150,
                width: 260,
                isModuleClose: true,
                module: true
            };
            this.init(opts);
            $this.show();
        }

        MyDialog.prototype = {
            constructor: MyDialog,
            init: function (opts) {
                this.options = $.extend(this.options, opts);
                this.setOption();
                this.insertHtml();
                this.setSize();
                this.setPosition();
                this.reSetPosition();
            },
            setOption: function () {
                if (typeof this.options.height === 'string') {
                    if (this.options.height.indexOf("rem") > 0) {
                        this.options.height = parseFloat(this.options.height.substring(0, this.options.height.indexOf("rem"))) * gmax;
                    } else if (this.options.height.indexOf("px") > 0) {
                        this.options.height = parseFloat(this.options.height.substring(0, this.options.height.indexOf("px")));
                    }
                }
                if (typeof this.options.width === 'string') {
                    if (this.options.width.indexOf("rem") > 0) {
                        this.options.width = parseFloat(this.options.width.substring(0, this.options.width.indexOf("rem"))) * gmax;
                    } else if (this.options.width.indexOf("px") > 0) {
                        this.options.width = parseFloat(this.options.width.substring(0, this.options.width.indexOf("px")));
                    }
                }
            },
            insertHtml: function () {
                var self = this;
                var bodyHtml = '<div class="_module" style="position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; opacity: 0.6; z-index: 9999; background: #000000;">';
                var $bodyHtml = $(bodyHtml);
                if (this.options.module) $("body").append($bodyHtml);
                if (this.options.module && this.options.isModuleClose) {
                    $bodyHtml.on("click", function (ev) {
                        self.close();
                    });
                }
            },
            setSize: function () {
                $this.height(this.options.height).width(this.options.width);
            },
            setPosition: function () {
                var top = ($(window).height() - this.options.height) / 2, left = ($(window).width() - this.options.width) / 2;
                $this.css({
                    "z-index": 10000,
                    position: "fixed",
                    top: top + "px",
                    left: left + "px",
                    "border-radius": "5px"
                });
            },
            reSetPosition: function () {
                var self = this;
                $(window).on("resize", function () {
                    self.setPosition();
                });
            },
            close: function () {
                $this.hide();
                $("body div._module").remove();
            }
        };
        return new MyDialog(opts);
    }

})($);
