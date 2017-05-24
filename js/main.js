$(document).ready(function() {

	var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'img/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);

	if ($(window).scrollTop()===0){
		$('#main-nav').removeClass('scrolled');
	}
	else{
		$('#main-nav').addClass('scrolled');    
	}

	$(window).scroll(function(){
		if ($(window).scrollTop()===0){
			$('#main-nav').removeClass('scrolled');
		}
		else{
			$('#main-nav').addClass('scrolled');    
		}
	});

	$('a.scrollto').click(function(e){
		$('html,body').scrollTo(this.hash, this.hash, {gap:{y:-80}});
		e.preventDefault();

		if ($('.navbar-collapse').hasClass('in')){
			$('.navbar-collapse').removeClass('in').addClass('collapse');
		}
	});

	$('.jumbotron').height($(window).height()+50);
	$('.message-box').css({'marginTop':$(window).height()*0.4});

	$('.home-slider').flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		direction: "vertical",
		slideshowSpeed: 2500,
		animationSpeed: 500,
		smoothHeight: false
	});

	var aboutColor = $('#about').css('backgroundColor');

	$('#skills').waypoint(function(){
		$('.chart').each(function(){
		$(this).easyPieChart({
				size:170,
				animate: 2000,
				lineCap:'butt',
				scaleColor: false,
				barColor: aboutColor,
				lineWidth: 10
			});
		});
	},{offset:'80%'});
	
	$(window).load(function(){

		scrollSpyRefresh();
		waypointsRefresh();
	});

	$(window).resize(function(){
		$('.jumbotron').height($(window).height());
		$('.message-box').css({'marginTop':$(window).height()*0.4});
		scrollSpyRefresh();
		waypointsRefresh();
	});
	
	$.backstretch('img/header-bg.jpg');

	$('body').append('<img class="preload-image" src="img/contact-bg.jpg" style="display:none;"/>');

	$('#about').waypoint(function(direction){
	
		if($('.preload-image').length){$('.preload-image').remove();}
		
		$('.backstretch').remove();
	
		if (direction=='down'){
			$.backstretch('img/contact-bg.jpg');
		}else{
			$.backstretch('img/header-bg.jpg');
		}
	});
	
	$('.no-csstransitions .hover-mask').hover(
		function() {
			$( this ).stop(true,true).animate({opacity: 1});
		}, function() {
			$( this ).stop(true,true).animate({opacity: 0});
		}
	);

	$('.scrollimation').waypoint(function(){
		$(this).toggleClass('in');
	},{offset:'90%'});

	function scrollSpyRefresh(){
		setTimeout(function(){
			$('body').scrollspy('refresh');
		},1000);
	}

	function waypointsRefresh(){
		setTimeout(function(){
			$.waypoints('refresh');
		},1000);
	}

});	