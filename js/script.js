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

/* 
$(window).on("scroll", function(e) {
   
  if ($(window).scrollTop() > doc_height + 10) {
      $('nav').addClass('fixed');
       $('#option').addClass('fixed');
  } else {
      $('nav').removeClass('fixed');
       $('#option').removeClass('fixed');
  }
  
});
*/
// SCROLL TO BOTTOM 
$(".hd_title_cta").on("click", function() {
     $("html, body").animate({ scrollTop: doc_height + 10 }, 600);
    return false;
});


// ISOTOPE
