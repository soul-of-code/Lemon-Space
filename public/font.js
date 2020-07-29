var a_idx = 0;
jQuery(document).ready(function($) {
 $("body").click(function(e) {
 var a = new Array("转眼过去", "多年时间", "多少离合悲欢", "曾经", "志在四方", "少年", "羡慕" ,"南飞的燕", "各自", "奔前程的", "身影", "匆匆","渐行渐远","未来","在哪里","平凡","谁给我","答案");
 var $i = $("<span/>").text(a[a_idx]);
 a_idx = (a_idx + 1) % a.length;
 var x = e.pageX,
 y = e.pageY;
 $i.css({
 "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
 "top": y - 20,
 "left": x,
 "position": "absolute",
 "font-weight": "bold",
 "color": randColor
 });
 $("body").append($i);
 $i.animate({
 "top": y - 180,
 "opacity": 0
 },
 1500,
 function() {
 $i.remove();
 });
 });
});

var randColor = function(){
    var r = parseInt(Math.random()*255);
    var g = parseInt(Math.random()*255);
    var b = parseInt(Math.random()*255);
    return `rgb(${r},${g},1)`
}

var pupil = document.getElementsByClassName("pupil");
document.onmousemove = function () {
	var x = (8-(((event.clientX) * 8) / window.innerWidth)) + "%";
	var y = (event.clientY * 8) / window.innerHeight + "%";
 
	for (var i = 0; i < 2; i++) {
		pupil[i].style.left = x;
		pupil[i].style.top = y;
        pupil[i].style.transform = "translate(" + x + "," + y + ")";
	}
};