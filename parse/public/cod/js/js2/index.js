(function(d){var h=[];d.loadImages=function(a,e){"string"==typeof a&&(a=[a]);for(var f=a.length,g=0,b=0;b<f;b++){var c=document.createElement("img");c.onload=function(){g++;g==f&&d.isFunction(e)&&e()};c.src=a[b];h.push(c)}}})(window.jQuery||window.Zepto);
 $.fn.hasAttr = function(name) { var attr = $(this).attr(name); return typeof attr !== typeof undefined && attr !== false; };

$(document).ready(function() {
r = function() {
$('.img').attr('src', (window.devicePixelRatio > 1) ? ((window.devicePixelRatio > 2) ? 'images/1425968844_free-10-128-192.png' : 'images/1425968844_free-10-128-128.png') : 'images/1425968844_free-10-128-64.png');};
$(window).resize(r);
r();
if(location.protocol === 'file:')
{
$("head").append($("<link rel='stylesheet' type='text/css' href='http://fonts.googleapis.com/css?family=Jura&amp;subset=all'></link>"));
}

});