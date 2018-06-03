$(function() {
	var carusel = $(".carousel-button-left").parents('.carousel');
	var block_width = carusel.find('.carousel-block').outerWidth();
	var date = new Date();	
	var correct, today, i;

	// For to delete the message about wrong data
	function defaultFormat() {
		$("#text").removeClass("notvalid");
		$("#title").removeClass("notvalid");
		$("#html").removeClass("notvalid");
		$("#image").removeClass("notvalid");
		$("#datepicker").removeClass("notvalid");
	};

	//Check the correctness of the entered data
	function checkValidation() {
		if ( ( 90 + 75 * (Number($(".tab").last().index())) ) > Number($(window).width())-700 ) {
			alert("Maximum width of the screen!")
			correct = false;
		}
		if ($('#text').val() === "" || $('#text').val().search(/\d/) < 0) {
			$("#text").addClass("notvalid");
			$("#text").val('Please write the correct index');
			$('#text').on('click', function() { 
				$('#text').val("");	
				$(".input-group #text").removeClass("notvalid");
			});
			correct = false;
		}
		if ($('#title').val() === "" || $('#title').val().search(/\D/) < 0 || $('#title').val() === "Please write the correct title") {
			$("#title").addClass("notvalid");
			$("#title").val('Please write the correct title');
			$('#title').on('click', function() { 
				$('#title').val("");
				$(".input-group #title").removeClass("notvalid");	
			});
			correct = false;
		} 
		if ($('#html').val() === "" || $('#html').val().search(/\D/) < 0 || $('#html').val() === "Please write the correct html content") { 
			$("#html").addClass("notvalid");
			$("#html").val('Please write the correct html content');
			$('#html').on('click', function() { 
				$('#html').val("");	
				$(".input-group #html").removeClass("notvalid");
			});
			correct = false;
		} 
		if ($("#datepicker").val() === "" || $("#datepicker").val() < today) {
			$("#datepicker").addClass("notvalid");
			$("#datepicker").val('Please choose the correct date');
			$('#datepicker').on('click', function() { 
				$('#datepicker').val("");	
				$(".input-group #datepicker").removeClass("notvalid");
			});
			correct = false;
		} 
		if ($('#image').val() === "" || $('#image').val().search(/^[img]{3}[/]\w+.[befjgimnpBEFJGIMNP]{3,4}$/) < 0) {
			$("#image").addClass("notvalid");
			$("#image").val('Please write the correct adress to image');
			$('#image').on('click', function() { 
				$('#image').val("");	
				$(".input-group #image").removeClass("notvalid");
			});
			correct = false;
		}
	};

	//By click on the add button and edit button resets all values
	function resetValue() {
		$('#text').val("");
		$('#title').val(""); 
		$('#html').val("");
		$("#datepicker").val("");
		$('#image').val(""); 
	}

	$('ul.tabs').on('click', 'li:not(.active)', function() {
		// For to display the active tab
		$(this)
		.addClass('active').siblings().removeClass('active')
		.parents('main').find('.content').removeClass('active').eq($(this).index()).addClass('active')
		.parents('main').find('.date').removeClass('active').eq($(this).index()).addClass('active')
		.parents('main').find('.carousel-block').removeClass('active').eq($(this).index()).addClass('active');

		// For to display of data the active tab in the left column
		$('#text').val($('li.active').index());
		$('#title').val($('li.active').text());
		$('#html').val($('.content.active').html());
		$('#datepicker').val($('.date.active').text());
		$('#image').val( $(".carousel-block.active > img").attr("src") );
		defaultFormat();
	});

	//Button of close the left column
	$('.collapse').on('click', function() {
		$('aside').hide();
		$('.extend').show();
		$('main').css({ 'width': 'calc(100% - 80px)'});
		$(".carousel-block").css("width", "calc(100vw - 170px)");
	});

	//Button of open the left column
	$('.extend').on('click', function() {
		$('aside').show();
		$('.extend').hide();
		$('main').css({'position': 'absolute', 'right': '0%', 'width': 'calc(100% - 600px)'});
		$(".carousel-block").css("width", "calc(100vw - 690px)");
	});

	//Button of add tabs
	$('.add').click(function() {
		add();
	});

	//Button of edit tabs
	$('.edit').click(function() {
		add(true);
	});

	//Function for addition and removal 
	function add(edit) {
		correct = true;
		today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
		checkValidation();

		if (correct) {
			if (edit) { $(".active").remove(); }	

			//For check for the existence of the same tab
			if ( $(".tab:nth-child(" + (Number($('#text').val())+1) + ")").val() !== undefined ) {
				$(".tab:nth-child(" + (Number($('#text').val())+1) + ")").before(`<li class='tab'>${$('#title').val()}</li>`);
				$(".content:nth-child(" + (Number($('#text').val())+1) + ")").before(`<div class='content'>${$('#html').val()}</div>`);
				$(".date:nth-child(" + (Number($('#text').val())+1) + ")").before(`<div class='date'>${$('#datepicker').val()}</div>`);
				$(".carousel-block:nth-child(" + (Number($('#text').val())+1) + ")").before(`<div class='carousel-block'><img src=${$('#image').val()} alt="" /></div>`);
				$(".carousel-block").css("width", "calc(100vw - 690px)");
			}	else {  
				$(".tab").last().after(`<li class='tab'>${$('#title').val()}</li>`);
				$(".content").last().after(`<div class='content'>${$('#html').val()}</div>`);
				$(".date").last().after(`<div class='date'>${$('#datepicker').val()}</div>`);
				$('#text').val($(".tab").last().index());
				$(".carousel-block").last().after(`<div class='carousel-block'><img src=${$('#image').val()} alt="" /></div>`);
			}
			$(".tab").removeClass("active");
			$(".tab:nth-child(" + (Number($('#text').val())+1) + ")").addClass("active");
			$(".content").removeClass('active');
			$(".content:nth-child(" + (Number($('#text').val())+1) + ")").addClass("active");
			$(".date").removeClass('active');
			$(".date:nth-child(" + (Number($('#text').val())+1) + ")").addClass("active");
			$(".carousel-block").removeClass('active');
			$(".carousel-block:nth-child(" + (Number($('#text').val())+1) + ")").addClass("active");
			resetValue();
		}	
	}

	//Button of type reset
	$('.reset').click(function() {
		$(".input-group input").val('');
		$(".input-group textarea").val('');
	});

	//Datepicker
	$("#datepicker").datepicker({ minDate: 0 });
	$('#datepicker').datepicker();
	$('#datepicker').datepicker("option", "dateFormat", "yy-mm-dd");
	$('#datepicker').val(date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2));
	$('#text').focus();


	//Slidre of type carousel
	$(document).on('click',".carousel-button-left", function(){
		i = $(".tab.active").index();
		i = --i % $('.carousel-block').length;
		$('.tab').removeClass('active').eq(i).addClass('active');
		$('.carousel-block').removeClass('active').eq(i).addClass('active');
		left_carusel();
	});
	$(document).on('click', ".carousel-button-right", function(){
		i = $(".tab.active").index();
		i = ++i % $('.carousel-block').length;
		$('.tab').removeClass('active').eq(i).addClass('active');
		$('.carousel-block').removeClass('active').eq(i).addClass('active');
		right_carusel();
	});
	function left_carusel(){
		carusel.find(".carousel-items .carousel-block").eq(0).clone().prependTo($(carusel).find(".carousel-items")); 
		carusel.find(".carousel-items").css({"left":"-"+block_width+"px"});
		carusel.find(".carousel-items .carousel-block").eq(0).remove();    
		carusel.find(".carousel-items").animate({left: "0px"}, 200); 
	}
	function right_carusel(){
		carusel.find(".carousel-items").animate({left: "-"+ block_width +"px"}, 200, function(){
			carusel.find(".carousel-items .carousel-block").eq(-1).clone().appendTo($(carusel).find(".carousel-items")); 
			carusel.find(".carousel-items .carousel-block").eq(-1).remove(); 
			carusel.find(".carousel-items").css({"left":"0px"}); 
		});
	}
});
$(window).resize( function() {
		if (window.innerHeight < 550) { $(".switchButton").hide() } else { $(".switchButton").show() }
	});
$(document).ready(function(){
	$(window).resize();
})