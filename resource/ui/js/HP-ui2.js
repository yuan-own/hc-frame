/**
 * Created by ZHANGCHAO246 on 2016-08-09.
 */
    //事件绑定在document文档对象


$(".HP-ui-nav-title>span").on('tap', function () {
    if($(this).hasClass("HP-ui-nav-title-span1")){
        $(this).removeClass("HP-ui-nav-title-span1").addClass("HP-ui-nav-title-span2").parent().next().removeClass("hide");
    }
    else{
        $(this).removeClass("HP-ui-nav-title-span2").addClass("HP-ui-nav-title-span1").parent().next().addClass("hide");
    }
});




$.progress = function (opts) {
    function Progress(opts){
        this.options = {
            'width': 20,
            'height': 1.5,
            'background': '#e9e9e9',
            'percent': '50%',
            'color':'#18B0CC'
        };
        this.init(opts);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function (opts){
            this.options = $.extend(this.options, opts);
            this.show();
        },
        show: function () {
            this.insertHtml();
            this.setCss();
        },
        insertHtml: function () {
            var sHtml = '<div class="HP-ui-progress">\
                            <div class="HP-ui-progress-bar"></div>\
                            <span>'+this.options.percent+'</span>\
                        </div>';
            $(document.body).append(sHtml);
        },
        setCss: function () {
            $(".HP-ui-progress").width(this.options.width+"rem").height(this.options.height+"rem").css("background",this.options.background);
            $(".HP-ui-progress-bar").width(this.options.percent).css("background",this.options.color);
        },
        changePercent: function (width) {
            $(".HP-ui-progress-bar").width(width);
            var nowWidth = parseInt($(".HP-ui-progress>span").html());
            var space = 500/(parseInt(width)-nowWidth);
            this.changeNum(nowWidth,parseInt(width),space);
        },
        changeNum: function (nowWidth,width,space) {
            var self = this;
            $(".HP-ui-progress>span").html(nowWidth+"%");
            if(nowWidth<width){
                return setTimeout(function(){
                    self.changeNum(nowWidth+1,width);
                },space);
            }
            else if(nowWidth>width){
                return setTimeout(function(){
                    self.changeNum(nowWidth-1,width);
                },space);
            }
            return 0;
        }
    };
    return new Progress(opts);
};
$.carousel = function (opts){
    function Carousel(opts){
        this.options = {
            'width':'90%',
            'height':'20rem',
            'autoPlay':'y',
            'points':'y',
            'button':'y',
            'time':'3000',
            'slide':'y'
        };
        this.init(opts);
    }
    Carousel.prototype = {
        constructor: Carousel,
        $div:$(".HP-ui-carousel"),
        $ul:$(".HP-ui-carousel-images"),
        $li:$(".HP-ui-carousel-image"),
        $left:$(".HP-ui-carousel-left"),
        $right:$(".HP-ui-carousel-right"),
        $points:$(".HP-ui-carousel-point"),
        $point:$(".HP-ui-carousel-point>li"),
        init: function (opts) {
            this.options = $.extend(this.options, opts);
            this.insertHtml(this.options);
            this.setCss(this.options);
            var self = this;
            var myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
            self.$div.on('tap','.HP-ui-carousel-left', function () {
                clearInterval(myInterval);
                self.goLeft();
                myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
            }).on('tap','.HP-ui-carousel-right', function () {
                clearInterval(myInterval);
                self.goRight();
                myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
            }).on('tap','.HP-ui-carousel-point>li', function () {
                clearInterval(myInterval);
                self.goTarget(this);
                myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
            });
            if(this.options.slide == "y"){
                self.$div.on('swipeLeft','.HP-ui-carousel-image', function () {
                    clearInterval(myInterval);
                    self.goRight();
                    myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
                }).on('swipeRight','.HP-ui-carousel-image', function () {
                    clearInterval(myInterval);
                    self.goLeft();
                    myInterval = self.options.autoPlay == "y" ? setInterval(self.goRight,self.options.time):0;
                });
            }
        },
        goRight: function () {
            var x = $(".active").index();
            var $li = $(".HP-ui-carousel-image");
            var $point = $(".HP-ui-carousel-point>li");
            if(x==$li.length-1){
                $point.removeClass("current").eq(0).addClass("current");
                $li.eq(x).removeClass("active next").addClass("prev");
                $li.eq(0).removeClass("next prev").addClass("active");
                $li.eq(1).addClass("next").removeClass("active prev");
            }
            else if(x==$li.length-2){
                $point.removeClass("current").eq(x+1).addClass("current");
                $li.eq(x).removeClass("active next").addClass("prev");
                $li.eq(x+1).removeClass("next prev").addClass("active");
                $li.eq(0).addClass("next").removeClass("active prev");
            }
            else{
                $point.removeClass("current").eq(x+1).addClass("current");
                $li.eq(x).removeClass("active next").addClass("prev");
                $li.eq(x+1).removeClass("next prev").addClass("active");
                $li.eq(x+2).addClass("next").removeClass("active prev");
            }
        },
        goLeft: function () {
            var x = $(".active").index();
            var $li = $(".HP-ui-carousel-image");
            var $point = $(".HP-ui-carousel-point>li");
            if(x==0){
                $point.removeClass("current").eq($li.length-1).addClass("current");
                $li.eq($li.length-1).addClass("active").removeClass("prev next");
                $li.eq(x).addClass("next").removeClass("active prev");
                $li.eq($li.length-2).addClass("prev").removeClass("active next");
            }
            else if(x==1){
                $point.removeClass("current").eq(x-1).addClass("current");
                $li.eq(x-1).addClass("active").removeClass("prev next");
                $li.eq(x).addClass("next").removeClass("active prev");
                $li.eq($li.length-1).addClass("prev").removeClass("active next");
            }
            else{
                $point.removeClass("current").eq(x-1).addClass("current");
                $li.eq(x-1).addClass("active").removeClass("prev next");
                $li.eq(x).addClass("next").removeClass("active prev");
                $li.eq(x-2).addClass("prev").removeClass("active next");
            }
        },
        goTarget: function (self) {
            var x = $(self).index();
            var $li = $(".HP-ui-carousel-image");
            var $point = $(".HP-ui-carousel-point>li");
            if(x==0){
                $point.removeClass("current").eq(x).addClass("current");
                $li.eq(x).addClass("active").removeClass("prev next");
                $li.eq(x+1).addClass("next").removeClass("active prev");
                $li.eq($li.length-1).addClass("prev").removeClass("active next");
            }
            else if(x==$li.length-1){
                $point.removeClass("current").eq(x).addClass("current");
                $li.eq(x).addClass("active").removeClass("prev next");
                $li.eq(0).addClass("next").removeClass("active prev");
                $li.eq(x-1).addClass("prev").removeClass("active next");
            }
            else{
                $point.removeClass("current").eq(x).addClass("current");
                $li.eq(x).addClass("active").removeClass("prev next");
                $li.eq(x+1).addClass("next").removeClass("active prev");
                $li.eq(x-1).addClass("prev").removeClass("active next");
            }
        },
        setCss: function (options) {
            this.$ul.css({'width':options.width,'height':options.height});
            var $point = $(".HP-ui-carousel-point>li");
            $point.eq(0).addClass('current');
        },
        insertHtml: function (options) {
            var ahtml = [],sHtml = '',sHtml2 = '';
            if(options.points == 'y'){
                for(var i=0;i<this.$li.length;i++){
                    sHtml = '<li></li>';
                    ahtml.push(sHtml);
                }
                this.$div.append('<ol class="HP-ui-carousel-point">'+ahtml.join("")+'</ol>')
            }
            if(options.button == 'y'){
                sHtml2 = '<a href="javascript:;" class="HP-ui-carousel-left"></a><a href="javascript:;" class="HP-ui-carousel-right"></a>';
                this.$div.append(sHtml2);
            }
        }
    };
    return new Carousel(opts);
};


$.carousel2 = function (opts) {
    function Carousel2(opts){
        this.options = {
            width: '300',
            height: '140px',
            autoPlay: 'y',
            time: '2000',
            id: 'inp'
        };
        this.init(opts);
    }
    var offset = 0,start,end,myInterval,self;
    Carousel2.prototype = {
        constructor: Carousel2,
        $ul: $(".HP-ui-carousel2-images"),
        $li: $(".HP-ui-carousel2-image"),
        init: function (opts) {
            this.options = $.extend(this.options,opts);
            self = this;
            self.setCss(this.options);
            myInterval = self.options.autoPlay == "y" ? setInterval(this.autoPlay,self.options.time):0;
            self.$ul.get(0).addEventListener("touchstart",this.touchStart);
            self.$ul.get(0).addEventListener("touchmove",this.touchMove);
            self.$ul.get(0).addEventListener("touchend",this.touchEnd);
            self.$ul.css({"-webkit-transform":"translate3d(0,0,0)","transform":"translate3d(0,0,0)"});
        },
        touchStart: function () {
            clearInterval(myInterval);
            start = parseInt(event.touches[0].pageX);
            self.$ul.css({"transition":"all 0s"});
        },
        touchMove: function () {
            event.preventDefault();
            end = parseInt(event.touches[0].pageX);
            var aaa = end-start+parseInt(offset);
            self.$ul.css({"-webkit-transform":"translate3d("+aaa+"px,0,0)","transform":"translate3d("+aaa+"px,0,0)"});
        },
        touchEnd: function () {
            var x = self.$ul.css("transform")||self.$ul.css("-webkit-transform");
            var oldOffset = parseInt(offset);
            var y = x.split(",");
            var z = y[0].split("(");
            offset = z[1];
            if(parseInt(offset)>0){
                offset = 0;
                self.$ul.css({"-webkit-transform":"translate3d("+offset+",0,0)","transition":"all 0.5s","transform":"translate3d("+offset+",0,0)"});
            }
            else if(parseInt(offset)<self.options.width*(self.$li.length-1)*-1){
                offset = self.options.width*(self.$li.length-1)*-1+"px";
                self.$ul.css({"-webkit-transform":"translate3d("+offset+",0,0)","transition":"all 0.5s","transform":"translate3d("+offset+",0,0)"});
            }
            else{
                if(parseInt(oldOffset)>parseInt(offset)){
                    offset = Math.floor(parseInt(offset)/self.options.width)*self.options.width+"px";
                    self.$ul.css({"-webkit-transform":"translate3d("+offset+",0,0)","transition":"all 0.5s","transform":"translate3d("+offset+",0,0)"});
                }
                else{
                    offset = Math.floor(parseInt(offset)/self.options.width+1)*self.options.width+"px";
                    self.$ul.css({"-webkit-transform":"translate3d("+offset+",0,0)","transition":"all 0.5s","transform":"translate3d("+offset+",0,0)"});
                }
            }
            myInterval = self.options.autoPlay == "y" ? setInterval(self.autoPlay,self.options.time):0;
        },
        autoPlay: function () {
            var x = self.$ul.css("transform")||self.$ul.css("-webkit-transform");
            var y = x.split(",");
            var z = y[0].split("(");
            offset = z[1];
            if(parseInt(offset) == self.options.width*(self.$li.length-1)*-1){
                offset = 0;
            }
            else{
                offset = parseInt(offset)-self.options.width+"px";
            }
            self.$ul.css({"-webkit-transform":"translate3d("+offset+",0,0)","transition":"all 0.5s","transform":"translate3d("+offset+",0,0)"});
        },
        setCss: function (options) {
            self.$li.css({"width":options.width+"px","height":options.height});
            self.$ul.css({"width":self.$li.length*parseInt(options.width)+"px"});
        }
    };
    return new Carousel2(opts);
};



$(".change-width").on('tap', function () {
    myProgress.changePercent($("input").val()+"%");
});

var myProgress = $.progress({percent:'30%',width:30,height:2,background:'#d1d1d1',color:'#18b0cc'});
var myCarousel = $.carousel({'time':4000,'autoPlay':'y','slide':'n'});
var myCarouse2 = $.carousel2({'time':2000,'autoPlay':'y','id':'inp'});
