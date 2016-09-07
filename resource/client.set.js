/**
 * Created by ZHANGYUANYUAN031 on 2016-08-15.
 */
var gWidth = document.body.clientWidth, gPicWidth = 750, gmax = gWidth / gPicWidth * 20;
if (gmax > 14) gmax = 14;
$("html,body").css("font-size", gmax);
module.exports={
    gmax:gmax,
    gPath : location.protocol + "//" + location.host + "/"
    // gPath : "http://103.28.214.2:80/"
};