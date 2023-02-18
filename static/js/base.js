// 기본 이벤트 제거
window.addEventListener("wheel", function(e){
	e.preventDefault();
},{passive : false});

// 페이지 선언
var $html = $("html");
var page = 1;
var lastPage = $("section").length;

$html.animate({scrollTop:0},10);

// 휠 굴렸을 때 이벤트 
$(window).on("wheel", function(e){
 
	if($html.is(":animated")) return;
 
	if(e.originalEvent.deltaY > 0){
		if(page== lastPage) return;
 
		page++;
	}else if(e.originalEvent.deltaY < 0){
		if(page == 1) return;
 
		page--;
	}
	var posTop = (page-1) * $(window).height();
 
	$html.animate({scrollTop : posTop});
 
});