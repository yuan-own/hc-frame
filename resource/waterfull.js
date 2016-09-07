/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 */

/**
 * 瀑布流
 * @param oContent jquery元素
 */
 function waterfull(oContent){
    var nSpaceTop=0;
    var nCell = 0, arrT = [], arrL = [], nWidth = 200, nSpace = 10, nOutWidth = nWidth + nSpace, bFetch = true, iCount = 0;
    function setCell() {
        nCell = Math.floor($(window).width() / nOutWidth);
        if (nCell > 6) {
            nCell = 6;
        } else if (nCell < 3) {
            nCell = 3;
        }
        oContent.width(nCell * nOutWidth - nSpace);
    }

    setCell();

    for (var i = 0; i < nCell; i++) {
        arrT[i] = 0;
        arrL[i] = nOutWidth * i;
    }

    function getData() {
        if (bFetch) {
            iCount++;
            bFetch = false;
            $.getJSON(sUrl, {page: iCount}, function (data) {
                if (data.length > 0) {
                    $.each(data, function (i, item) {
                        var oImg = $("<img />");
                        oContent.append(oImg);
                        var img = new Image();
                        img.src = item.preview;
                        img.onload = function () {
                            oImg.attr("src", this.src);
                            var iHeight = oImg.height(), iWidth = oImg.width(), nSelfHeight = iHeight / iWidth * nWidth;
                            oImg.height(nSelfHeight).width(nWidth);
                            var minIndex = fMinTop();
                            oImg.css({
                                left: arrL[minIndex],
                                top: arrT[minIndex]
                            });
                            arrT[minIndex] += nSelfHeight + nSpace;
                        };
                        $(img).error(function () {
                            $(this).remove();
                            oImg.remove();
                        });
                    });
                }
                bFetch = true;
            });
        }
    }

    function fMinTop() {
        var m = arrT[0], _index = 0;
        for (var i = 0, len = arrT.length; i < len; i++) {
            if (m > arrT[i]) {
                m = arrT[i];
                _index = i;
            }
        }
        return _index;
    }

    getData();


    $(window).on("scroll", function (ev) {
        var mIndex = fMinTop();
        var nH = $(window).scrollTop() + $(window).height();
        var nMinDiv = arrT[mIndex] + nSpaceTop;
        if (nH > nMinDiv) {
            getData();
        }
    });

    /**
     * 当窗口发生变化时
     */
    $(window).on("resize", resize);

    function resize() {
        var iCells = nCell;
        setCell();
        if (iCells === nCell) {
            return;
        }
        arrL = [];
        arrT = [];
        for (var i = 0; i < nCell; i++) {
            arrL[i] = nOutWidth * i;
            arrT[i] = 0;
        }

        oContent.find("img").each(function (i, item) {
            var nMinIndex = fMinTop();
            $(this).css({
                left: arrL[nMinIndex],
                top: arrT[nMinIndex]
            });
            arrT[nMinIndex] = $(this).height() + nSpace;
        });

    }
};

exports = {
    waterfull:waterfull
}