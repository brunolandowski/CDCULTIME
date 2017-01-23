 console.log('fifty-five');




 $.getJSON('json/lang_fr.json', function (data) {

   $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);
  
 	  $('#hd_title .hd_title_ct h1').html(data.homepage.main_title);
    $('#hd_title .hd_title_ct p').html(data.homepage.headline);

    $('#hd_title .hd_title_cta p').html(data.homepage.liste);
  
  });


$("button#fr").click(function(){
    $.getJSON("json/lang_fr.json", function(result_fr){
      $('#hd_bd_top p:first-of-type').html(result_fr.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(result_fr.homepage.top_middle);

      $('#hd_title .hd_title_ct h1').html(result_fr.homepage.main_title);
      $('#hd_title .hd_title_ct p').html(result_fr.homepage.headline);

      $('#hd_title .hd_title_cta p').html(result_fr.homepage.liste);
    });
});


$("button#en").click(function(){
    $.getJSON("json/lang_en.json", function(result_en){
       $('#hd_bd_top p:first-of-type').html(result_en.homepage.top_left);
    $('#hd_bd_top p:last-of-type').html(result_en.homepage.top_middle);

      $('#hd_title .hd_title_ct h1').html(result_en.homepage.main_title);
      $('#hd_title .hd_title_ct p').html(result_en.homepage.headline);

      $('#hd_title .hd_title_cta p').html(result_en.homepage.liste); 
    });
});




$('.grid').isotope({
  // options
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});