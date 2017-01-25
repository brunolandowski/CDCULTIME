 console.log('fifty-five');




 $.getJSON('json/lang_fr.json', function (data) {

   $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);
  
 	  $('#hd_title .hd_title_ct h1').html(data.homepage.main_title);
    $('#hd_title .hd_title_ct p').html(data.homepage.headline);

    $('#hd_title .hd_title_cta p').html(data.homepage.liste);


    $('#hd_bd_bottom p').html(data.homepage.bottom);

    $('nav h3').html(data.homepage.main_title);
  
  });


$("button#fr").click(function(){
    $.getJSON("json/lang_fr.json", function(result_fr){
      $('#hd_bd_top p:first-of-type').html(result_fr.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(result_fr.homepage.top_middle);

      $('#hd_title .hd_title_ct h1').html(result_fr.homepage.main_title);
      $('#hd_title .hd_title_ct p').html(result_fr.homepage.headline);

      $('#hd_title .hd_title_cta p').html(result_fr.homepage.liste);

      $('#hd_bd_bottom p').html(result_fr.homepage.bottom);

      $('nav h3').html(result_fr.homepage.main_title);
    });
});


$("button#en").click(function(){
    $.getJSON("json/lang_en.json", function(result_en){
       $('#hd_bd_top p:first-of-type').html(result_en.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(result_en.homepage.top_middle);

      $('#hd_title .hd_title_ct h1').html(result_en.homepage.main_title);
      $('#hd_title .hd_title_ct p').html(result_en.homepage.headline);

      $('#hd_title .hd_title_cta p').html(result_en.homepage.liste); 

       $('#hd_bd_bottom p').html(result_en.homepage.bottom); 

        $('nav h3').html(result_en.homepage.main_title);     
    });
});



// PARALAXE HOMEPAGE

  
$(window).bind("load resize scroll",function(e) {
    var y = $(window).scrollTop();
    

    $("#hd_title").filter(function() {
        return $(this).offset().top < (y + 450) &&
               $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(25% - ' + parseInt(y / 2) + 'px');
});


// FIXED NAV SCROLLING 
var doc_height;

$(window).bind("load resize scroll",function(e) {
  doc_height = $(window).height();
  console.log(doc_height);
});

 
$(window).on("scroll", function(e) {
   
  if ($(window).scrollTop() > doc_height) {
      $('nav').addClass('fixed');
       $('#option').addClass('fixed');
  } else {
      $('nav').removeClass('fixed');
       $('#option').removeClass('fixed');
  }
  
});

// SCROLL TO BOTTOM 
$(".hd_title_cta").on("click", function() {
     $("html, body").animate({ scrollTop: doc_height}, 600);
    return false;
});

// STATISTIQUES OPEN/CLOSE
$( "#burger" ).click(function() {
  $('body').css('overflow','hidden');
  $('#aside_placeholder').fadeIn(300);
  $( "aside" ).animate({
    left: "0%",
   }, 300, function() {
    // Animation complete.
  });

});

$( "#aside_placeholder" ).click(function() {
   $('body').css('overflow','auto');
  $('#aside_placeholder').fadeOut(300);
  $( "aside" ).animate({
    left: "-100%",
   }, 300, function() {
    // Animation complete.
  });

});


// MENU OPEN/CLOSE BUTTON
$( "nav button" ).click(function() {
  $( '#option' ).toggleClass( "option_show" );
});


// ISOTOPE


var $grid = $('#wrap').isotope({
  masonry: {
   
    gutter:20
  },
  itemSelector: '.grid-item',
});


$grid.on( 'click', '.grid-item', function() {
  $('.grid-item').not(this).removeClass('big');
    $(this).toggleClass('big');
  
    $grid.isotope('layout');

      var scrolltopitem =  $(this).offset().top;
      var calcdiff = scrolltopitem - 100;
      
     $('html, body').animate({
        scrollTop: calcdiff
    }, 500);
}); 


// CHART ELIPSE STATS AND ANIMATE
var colors_chart = ["#ff5c60", "#ffbb73", "#fcf582", "#c2fa92", "#6ec7fc", "#01e4c0", "#bb7ff3", "#fbc9df"];
var perc_chart = ["1.0", ".90", ".80", ".70", ".60", ".50", ".40", ".30"];
var strokew_chart = ["10", "7.5", "6", "5", "4", "3.6", "3.3", "3"];



$( ".circle" ).each(function(i) {
  var count = i+1;
  
  var idcircle = "#circle_" + count;
  var fromzero = count - 1;
  
  var numberposition = 60 + (count * 40);




  var bar = new ProgressBar.SemiCircle(idcircle, {
    strokeWidth: strokew_chart[fromzero],
    easing: 'easeInOut',
    duration: 1000,
    svgStyle: null,
    color: colors_chart[fromzero],
  });

  $( "#burger" ).click(function() {
    bar.animate(perc_chart[fromzero]);  
    

  });
  
  $( "#aside_placeholder" ).click(function() {
    bar.animate(.0, {duration: 80});  
  });

  $(this).css({
    "width": numberposition, 
    "height": numberposition / 2,
    


  })
});

// HISTO HORIZONTAL CHART ANIMATED

