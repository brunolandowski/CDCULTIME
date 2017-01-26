console.log('fifty-five');


// FUNCTION AIMING TO LOAD JSON LANG
function jsonload(x){
  
  $.getJSON('json/lang_'+ x +'.json', function (data) {
    
    // homepage
    $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);
  
    $('#hd_title .hd_title_ct h1').html(data.homepage.main_title);
    $('#hd_title .hd_title_ct p').html(data.homepage.headline);

    $('#hd_title .hd_title_cta p').html(data.homepage.liste);


    $('#hd_bd_bottom p').html(data.homepage.bottom);

    $('nav h3').html(data.homepage.main_title);

    
    // aside
    $('#aside_header ul li:nth-child(1)').html(data.aside.header.submit);
    $('#aside_header ul li:nth-child(2)').html(data.aside.header.share);
    $('#aside_header ul li:nth-child(3)').html(data.aside.header.download);
    $('#aside_header ul li:nth-child(4)').html(data.aside.header.contact);

    $('aside #box_stats h3').html(data.aside.statistiques.title);    
    $('aside #box_stats p:nth-child(2)').html(data.aside.statistiques.rise);    
    $('aside #box_stats p:nth-child(3)').html(data.aside.statistiques.award); 
    $('aside #box_stats p:nth-child(4)').html(data.aside.statistiques.listed); 
  
  });
} 

// CALL JSON LANG FR BY DEFAULT
$( document ).ready(function() {
    jsonload('fr');
});

// CALL JSON LANG FR WHEN CLICK FR BTN
$("button#fr").click(function(){
   jsonload('fr');
});

// CALL JSON LANG EN WHEN CLICK EN BTN
$("button#en").click(function(){
   jsonload('en');
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

$( "#aside_placeholder, .aside_close" ).click(function() {
   $('body').css('overflow','auto');
  $('#aside_placeholder').fadeOut(300);
  $( "aside" ).animate({
    left: "-100%",
   }, 300, function() {
    // Animation complete.
  });

});


// MENU OPEN/CLOSE BUTTON
var opt_height = $('#option').height();
opt_height_calc = opt_height - 60;
$('#option').css('margin-top','-'+opt_height_calc+'px');


$("nav button").on("click", function (){
      if ($("#option").css("marginTop") == "60px") {
           console.log('nice');
          
          $( "#option" ).animate({
            marginTop: "-"+opt_height_calc+"px",
          }, 300, "easeInExpo", function() {
          // Animation complete.
          });

      }
        
      else {
          
           console.log('cool');

          $( "#option" ).animate({
            marginTop: "60px",
          }, 300, "easeOutExpo", function() {
          // Animation complete.
          });
      }
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
    $(this).addClass('big');
  
    $grid.isotope('layout');

      var scrolltopitem =  $(this).offset().top;
      var calcdiff = scrolltopitem - 100;
      
     $('html, body').animate({
        scrollTop: calcdiff
    }, 500);
}); 

// CLOSE ITEM 
$( ".item_close" ).click(function() {
  $(this).parent('.whenopen').parent().removeClass( "big" );
  $grid.isotope('layout');
  return false;

});


// CHART ELIPSE STATS AND ANIMATE
var colors_chart = ["#ff5c60", "#ffbb73", "#fcf582", "#c2fa92", "#6ec7fc", "#01e4c0", "#bb7ff3", "#fbc9df"];
var perc_chart = ["1.0", ".4", ".3", ".05", ".60", ".50", ".40", ".30"];
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
  
  $( "#aside_placeholder,  .aside_close" ).click(function() {
    bar.animate(.0, {duration: 80});  
  });

  $(this).css({
    "width": numberposition, 
    "height": numberposition / 2,
    


  })
});

// SCROLLING EFFECT PARAL
var $animation_elements = $('.grid-item');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
 
  $.each($animation_elements, function() {
    var $element = $(this);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
 
    //check to see if this current container is within viewport
    if ((element_bottom_position >= window_top_position) &&
        (element_top_position <= window_bottom_position)) {
      $element.addClass('in-view');
    } else {
      $element.removeClass('in-view');
    }
  });
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

// HISTO HORIZONTAL CHART ANIMATED
// OPTION CLICK ON ITEMS
 $('#option ul li').on('click', function(e) {
      $(this).toggleClass("selected"); //you can list several class names 
      e.preventDefault();
    });

// SEARCH BAR WITH LISTJS
function searching() {
    var input, filter, ul, li, a, i;
    
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("wrap");
    li = ul.getElementsByClassName("grid-item");
    
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }
}
