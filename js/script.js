console.log('fifty-five');


// Count object 
 function countObjectProperties(obj)
            {
            var count = 0;
            for(var i in obj)
                if(obj.hasOwnProperty(i))
                    count++;

            return count;
}
//data
var circlearray = [];

var number_startup;

function jsonload(x) {
    $.getJSON('json/lang_' + x + '.json', function(data) {
        // END OF JSON FUNCTION

        // MAIN VAR 
        // Check number of startup listed
        number_startup = $('.grid-item').length;
        var number_fundraising = $('.fundraising1').length;
        var number_award = $('.award').length;

        // homepage
        $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
        $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);


        $('#main_logo').attr('src', "img/logo_et_" + x + ".svg").attr('alt', data.homepage.main_title);

       
        $('#hd_title .hd_title_ct p').html(data.homepage.headline);

        $('#hd_title .hd_title_cta p').html(data.homepage.liste);
        $('#hd_title .hd_title_cta h2').html(number_startup);


        $('#hd_bd_bottom p').html(data.homepage.bottom);

        $('nav h3').html(data.homepage.main_title);
        $('nav input').attr("placeholder", data.homepage.search);


        // aside
        $('#aside_header ul li:nth-child(1)').html(data.aside.header.submit);
        $('#aside_header ul li:nth-child(2)').html(data.aside.header.share);
        $('#aside_header ul li:nth-child(3)').html(data.aside.header.download);
        $('#aside_header ul li:nth-child(4)').html(data.aside.header.contact);

        $('aside #box_stats h3').html(data.aside.statistiques.title);
        $('aside #box_stats p:nth-child(2)').html("<span>" + number_fundraising + "</span>" + data.aside.statistiques.rise);
        $('aside #box_stats p:nth-child(3)').html("<span>" + number_award + "</span>" + data.aside.statistiques.award);
        $('aside #box_stats p:nth-child(4)').html("<span>" + number_startup + "</span>" + data.aside.statistiques.listed);


        // Item 
            // Services
            var dataservicelooplength = data.aside.services.loop,
                counting = countObjectProperties(dataservicelooplength),
                step;
            for (step = 0; step < counting; step++) {
                var stepgood = step+1;
                $('p[data-attr="filterservices'+stepgood+'"]').html(data.aside.services.loop['filterservices'+stepgood]);
            }
            $('.services .left p').html(data.aside.services.title);

            // Clients
            var dataclientslooplength = data.aside.clients.loop,
                counting = countObjectProperties(dataclientslooplength),
                step;
            for (step = 0; step < counting; step++) {
                var stepgood = step+1;
                $('p[data-attr="filterclients'+stepgood+'"]').html(data.aside.clients.loop['filterclients'+stepgood]);
            }
            $('.clients .left p').html(data.aside.clients.title);

            // Technologies
            var datatechlooplength = data.aside.technologies.loop,
                counting = countObjectProperties(datatechlooplength),
                step;
            for (step = 0; step < counting; step++) {
                var stepgood = step+1;
                $('p[data-attr="filtertech'+stepgood+'"]').html(data.aside.technologies.loop['filtertech'+stepgood]);
            }
            $('.technologies .left p').html(data.aside.technologies.title);

            // Users
            var datauserslooplength = data.aside.users.loop,
                counting = countObjectProperties(datauserslooplength),
                step;
            for (step = 0; step < counting; step++) {
                var stepgood = step+1;
                $('p[data-attr="users'+stepgood+'"]').html(data.aside.users.loop['users'+stepgood]);
            }
            $('.users .left p').html(data.aside.users.title);

            $('.description .left p').html(data.aside.description);
            $('.founders .left p').html(data.aside.founders);
            $('.creation .left p').html(data.aside.creation);
            $('.employees .left p').html(data.aside.employees);
            $('.based .left p').html(data.aside.based);
            


        // Clients LOOP


        var arraystats = ['services', 'clients', 'technologies'];
        
        $.each(arraystats, function(index, value) {
            console.log(data.aside[value].title);

            var clientvalue = value;
            $('#' + clientvalue + ' ul').empty();
            $('.' + clientvalue + ' ul').empty();

            var clientjson = data.aside[value].loop;
            var clientjsonh4 = data.aside[value].title;

            var clientsarray = [];
            var clientsmax;
            var clientsmin;
            // We create a loop to define max and min value
            $.each(clientjson, function(key, value) {
                var keyclean = key.replace(/\_/g, "");
                keycleanforclass = '.' + keyclean;
                clientslenght = $(keycleanforclass).length;
                clientsarray.push(clientslenght);

            });

            // here we get the min and max value 
            clientsmax = Math.max.apply(Math, clientsarray);
            clientsmin = Math.min.apply(Math, clientsarray);

            // we reloop
            $.each(clientjson, function(key, value) {

                var keycleanforclass = '.' + key;
                clientslenght = $('.grid-item'+keycleanforclass).length;
                clientslenght2 = $(keycleanforclass).length;

                var clientscalc = (((clientslenght2 - clientsmin) * 100) / (clientsmax - clientsmin));


                var calcgood = (5 + .45 * clientscalc);
                var calcgoodcircle = (20 + .80 * clientscalc);

                $('#' + clientvalue + ' h4').html(clientjsonh4);
                $('#' + clientvalue + ' ul').append('<li><p>' + value + '</p><span>' + clientslenght + '</span><div data-circle=' + calcgoodcircle + ' data-wd=' + calcgood + ' class="histo"></div></li>');

                $('.' + clientvalue + ' h4').html(clientjsonh4);
                $('.' + clientvalue + ' ul').append('<li class="filter_btn" data-filter=' + keycleanforclass + '><div class="pastille"></div><span>' + clientslenght + '</span><p>' + value + '</p></li>');

            });
        });


        $("#services ul li .histo").each(function() {
            var circlevalue = $(this).attr('data-circle');

            circlearray.push(circlevalue);
        });




        

       

        // Let's add color to filter elements depending on services

        $('.services .filter_btn[data-filter=".filterservices1"] .pastille, .grid-item .filterservices1').css('background', colors_chart[0]);
        $('.services .filter_btn[data-filter=".filterservices2"] .pastille, .grid-item .filterservices2').css('background', colors_chart[1]);
        $('.services .filter_btn[data-filter=".filterservices3"] .pastille, .grid-item .filterservices3').css('background', colors_chart[2]);
        $('.services .filter_btn[data-filter=".filterservices4"] .pastille, .grid-item .filterservices4').css('background', colors_chart[3]);
        $('.services .filter_btn[data-filter=".filterservices5"] .pastille, .grid-item .filterservices5').css('background', colors_chart[4]);
        $('.services .filter_btn[data-filter=".filterservices6"] .pastille, .grid-item .filterservices6').css('background', colors_chart[5]);
        $('.services .filter_btn[data-filter=".filterservices7"] .pastille, .grid-item .filterservices7').css('background', colors_chart[6]);
        $('.services .filter_btn[data-filter=".filterservices8"] .pastille, .grid-item .filterservices8').css('background', colors_chart[7]);


        filterheight();
        jsonloaded();
        if_zero();


    });
}







/**
 * @description polyfills
 * @returns {void}
 */
(function() {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function(searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
}());

/**
 * @description get data from spreadsheets
 * @returns {void}
 */
var getData = function() {
    return fetch('https://spreadsheets.google.com/feeds/list/1XvMK6WBhSNBKHQTXEqJT5L54_pyZFF1V6k5rjiD7UFU/default/public/values?alt=json')
        .then(function(response) {
            return response.json().then(function(json) {
                return json;
            });
        }, function(error) {
            return error;
        });
}

/**
 * @description template helper
 * @param  {} content original content
 * @param  {} params obj to iterate over
 * @returns {void}
 */
var template = function(content, params) {
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];
            while (content.indexOf('{{' + key + '}}') !== -1)
                content = content.replace('{{' + key + '}}', value);
        }
    }
    return content;
}

/**
 * @description render inner html
 * @param  {} item
 * @returns {void}
 */

var render = function(item) {
    var panel = '<div data-employees="{{employeesref}}" data-creation="{{creation}}" class="grid-item {{filters}}"><div class="vi_bd"></div><article><h4>{{name}}</h4><span>{{web}}</span><img src=""><div class="vi_cate">{{serviceslab}}</div></article><div class="whenopen"><span class="item_close"><img src="img/cross_black.svg"></span><div class="row description"><div class="left"><p>Description</p></div><div class="right"><p><div class="fr">{{description_fr}}</div><div class="en">{{description_en}}</div></p></div></div><div class="row services"><div class="left"><p>Services</p></div><div class="right">{{serviceslab}}</div></div><div class="row users"><div class="left"><p>Utilisateurs</p></div><div class="right">{{userslab}}</div></div><div class="row clients"><div class="left"><p>Clients</p></div><div class="right">{{clientslab}}</div></div><div class="row technologies"><div class="left"><p>Technologies</p></div><div class="right">{{techlab}}</div></div><div class="row founders"><div class="left"><p>Foundateurs</p></div><div class="right"><p>{{founders}}</p></div></div><div class="row creation"><div class="left"><p>Date de création</p></div><div class="right"><p>{{creation}}</p></div></div><div class="row employees"><div class="left"><p>Nombre de collaborateurs</p></div><div class="right"><p>{{employees}}</p></div></div><div class="row based"><div class="left"><p>Basée en</p></div><div class="right"><p>{{zip}}</p></div></div><span class="item_dropdown"><span class="cale"></span><span>Partager cette startup<img class="arrow" src="img/arrow_up.svg"><div class="item_dropdown_content"><p><a href="http://google.fr">Sur Twitter</a></p><p><a href="http://google.fr">Sur Facebook</a></p><p><a href="http://google.fr">Copier le lien</a></p></div></span></div></div>';
    return template(panel, item);
}


//get data and generate HTML output
getData().then(function(data) {
    //remove loader here
    var self = this;
    var els = data.feed.entry.map(function(item) {
        var filters = [],
            services = [],
            
            serviceslab = {},
            clientslab = {},
            techlab = {},
            userslab = {},
           

            tech = [],
            users = [],
            clients = [];



        for (var prop in item) {


            if (prop.startsWith('gsx$filter') && item[prop].$t.length) {
                filters.push(prop.substr(4));
            }
            if (prop === 'gsx$zip' && item[prop].$t.length) {
                filters.push(item[prop].$t);
            }

            if (prop === 'gsx$fundraising' && item[prop].$t.length) {
                filters.push('fundraising' + item[prop].$t);
            }

            if (prop === 'gsx$awards' && item[prop].$t.length) {
                filters.push('award');
            }

            // Services
            if (prop.startsWith('gsx$filterservices') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                serviceslab[propclean] = item[prop].$t;
            }
            
            // Clients
            if (prop.startsWith('gsx$filterclients') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                clientslab[propclean] = item[prop].$t;
            }
           
            // Tech
            if (prop.startsWith('gsx$filtertech') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                techlab[propclean] = item[prop].$t;
            }

            // Users
            if (prop.startsWith('gsx$users') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                userslab[propclean] = item[prop].$t;
            }

            if (prop.startsWith('gsx$users') && item[prop].$t.length) {
                users.push(item[prop].$t);
            }


        }


        // We create an array to store services values
        var tableservices = [],
            tableclients = [],
            tabletech = [],
            tableusers = [];

        // We loop through services, tech, users and tech
        for (var propertyName in serviceslab) {
            tableservices.push('<div><span class=' + propertyName + '></span><p data-attr="'+propertyName+'"></p></div>');
        }

        for (var propertyName in clientslab) {
            tableclients.push('<div><p data-attr="'+propertyName+'"></p></div>');
        }

        for (var propertyName in techlab) {
            tabletech.push('<div><p data-attr="'+propertyName+'"></p></div>');
        }

        for (var propertyName in userslab) {
            tableusers.push('<div><p data-attr="'+propertyName+'"></p></div>');
        }

       
       
        return {
            name: item.gsx$startupname.$t,
            web: item.gsx$web.$t,
            description_fr: item.gsx$descriptionfr.$t,
            description_en: item.gsx$descriptionen.$t,
            founders: item.gsx$people.$t,
            filters: filters.join(' '),
            creation: item.gsx$creation.$t,
            employees: item.gsx$employees.$t,
            employeesref: item.gsx$employeesref.$t,
            logo: item.gsx$logo.$t,
            zip: item.gsx$zip.$t,

            // Services
            serviceslab: tableservices.join(''),
            // Clients
            clientslab: tableclients.join(''),
            // Tech
            techlab: tabletech.join(''),

            // Tech
            userslab: tableusers.join(''),
            
            users: users.reduce(function(a, b) {
                return a.concat('<p>', b, '</p>')
            }, '')
        }

    }).reduce(function(a, b) {
        return a.concat(self.render(b))
    }, '');

    //inject into DOM
    $('#grid-container').html(els);

    

    // ISOTOPE
    var qsRegex;
    var filterValue;
    // init Isotope
   var $grid = $('#wrap').isotope({
        itemSelector: '.grid-item',
        masonry: {
            gutter:20
        },
       getSortData: {
            nameA: 'h4',
            employeesA: '[data-employees]',
            employeesD: '[data-employees]',
            creationA: '[data-creation]'
        },
        sortAscending: {
            nameA: true,
            employeesA: true,
            employeesD: false,
            creationA: false
        },
       
        filter: function() {
            var $this = $(this);
            var searchResult = qsRegex ? $this.find('h4').text().match( qsRegex ) : true;
            var buttonResult = filterValue ? $this.is( filterValue ) : true;
            return searchResult && buttonResult;
        },
        // sort top priority to lowest priority
        sortBy: ['resortType', 'country', 'state', 'city'],

    });


   $grid.isotope( 'on', 'layoutComplete', if_zero ); 
    // -------- Filter FUNCTION ----------//
    // store filters as an array
    var filtersisotope = [];
    var $filterRow = $('#option');
    $filterRow.on( 'click', '.filter_btn, .button', function( event ) {
        
      // get filter value
      var $col = $(this);
      var colFilter = $col.attr('data-filter');
      $col.toggleClass('is-checked');
      // add or remove col filter from filters
      var isSelected = $col.hasClass('is-checked');
      if ( isSelected ) {
        filtersisotope.push( colFilter );
      } else {
        removeFrom( filtersisotope, colFilter );
      }
      // combine filters
      filterValue = filtersisotope.join('');
      console.log( filterValue );
      $grid.isotope();
      if_zero();
    });

    // helper function, remove obj from ary
        function removeFrom( ary, obj ) {
          var index = ary.indexOf( obj );
          if ( index != -1 ) {
            ary.splice( index, 1 );
          }
        }


    // ----------- Search FUNCTION --------//
    // use value of search field to filter
    var $quicksearch = $('#myInput').keyup( debounce( function() {
        qsRegex = new RegExp( $quicksearch.val(), 'gi' );
        console.log("Search input",qsRegex);
        $grid.isotope();
    }) );

    // ------------- Sort FUNCTION -------------//
    // bind sort button click
    $('.sort').on( 'click', '.sort_btn', function() {
       
        var sortValue = $(this).attr('data-sort-by');
        $('.sort').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        // make an array of values
        sortValue = sortValue.split(',');
        console.log("Sorting button click",sortValue);
        $grid.isotope({ 
            sortBy : sortValue,
        });
       
    });


    // Add class sort 
    $('.sort').each(function(i, buttonGroup) {
      var $buttonGroup = $(buttonGroup);
      $buttonGroup.on('.sort_btn', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
      });
    });



    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        setTimeout( delayed, threshold || 100 );
      };
    }


    // OPEN ITEM
    $grid.on('click', '.grid-item', function() {
        $('.grid-item').not(this).removeClass('big');
        $(this).addClass('big');
        $grid.isotope('layout');
        var that = $(this);
        $grid.one('layoutComplete', function() {
            console.log('loaded');
            var scrolltopitem = that.offset().top;
            var calcdiff = scrolltopitem - 100;

            $('html, body').animate({
                scrollTop: calcdiff
            }, 300);
        });
    });

    // CLOSE ITEM 
    $(".item_close").click(function() {
        $(this).parent('.whenopen').parent().removeClass("big");
        $grid.isotope('layout');
        return false;

    });

    // CALL JSON FR WHEN LIST IS READY
    jsonload('fr');
    $('.whenopen .en').hide();
    $('.whenopen .fr').show();
    tooltip();
    
});




function jsonloaded() {
    console.log('loaded');

    $('body').css('overflow','auto');
    $('#loading').fadeOut();
   $( "header" ).animate({
    opacity: 1,
    
  }, 500, function() {
    $("#option").css('opacity','1');
  });
}

function tooltip() {
  // Display Tooltip on over color circles



$(".vi_cate div").hover(
  function () {
    $(this).children('p').addClass('show_me');
  }, 
  function () {
    $(this).children('p').removeClass('show_me');
  }
  );
}

// FUNCTION AIMING TO LOAD JSON LANG
// Create array for the circle stats






// CALL JSON LANG FR WHEN CLICK FR BTN
$("button#fr").click(function() {
    jsonload('fr');
    // We hide EN desc
    $('.whenopen .en').hide();
    $('.whenopen .fr').show();
    $(this).css('text-decoration', 'underline');
    $("button#en").css('text-decoration', 'none');
    tooltip();

});

// CALL JSON LANG EN WHEN CLICK EN BTN
$("button#en").click(function() {
    // We Hide FR descr
    $('.whenopen .fr').hide();
    $('.whenopen .en').show();
    jsonload('en');
    $(this).css('text-decoration', 'underline');
    $("button#fr").css('text-decoration', 'none');
    tooltip();

});



// PARALAXE HOMEPAGE
$(window).bind("load resize scroll", function(e) {
    var y = $(window).scrollTop();


    $("#hd_title").filter(function() {
        return $(this).offset().top < (y + 450) &&
            $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(25% - ' + parseInt(y / 2) + 'px');
});


// FIXED NAV SCROLLING 
var doc_height;

$(window).bind("load resize scroll", function(e) {
    doc_height = $(window).height();

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
    $("html, body").animate({
        scrollTop: doc_height
    }, 600);
    return false;
});

// STATISTIQUES OPEN/CLOSE
$("#burger").click(function() {
    $('body').css('overflow', 'hidden');
    $('#aside_placeholder').fadeIn(300);
    $("aside").animate({
        left: "0%",
    }, 300, function() {

        // Animate Clients histo
        $("#clients ul li .histo").each(function() {
            var data_wd = $(this).attr('data-wd');
            $(this).animate({
                width: data_wd + "%",
            }, 1000, "easeOutExpo", function() {
                // Animation complete.
            });
        });

        // Animate Technologies histo
        $("#technologies ul li .histo").each(function() {
            var data_wd = $(this).attr('data-wd');
            $(this).animate({
                width: data_wd + "%",
            }, 1000, "easeOutExpo", function() {
                // Animation complete.
            });
        });

    });

});

$("#aside_placeholder, .aside_close").click(function() {
    $('body').css('overflow', 'auto');

    $("#clients ul li .histo").each(function() {
        var data_wd = $(this).attr('data-wd');
        $(this).animate({
            width: "0%",
        }, 100, "easeOutExpo", function() {
            // Animation complete.
        });
    });

    $("#technologies ul li .histo").each(function() {
        var data_wd = $(this).attr('data-wd');
        $(this).animate({
            width: "0%",
        }, 100, "easeOutExpo", function() {
            // Animation complete.
        });
    });


    $('#aside_placeholder').fadeOut(300);
    $("aside").animate({
        left: "-100%",
    }, 300, function() {
        // Animation complete.
    });

});

// MENU OPEN/CLOSE BUTTON

function filterheight() {

var opt_height = $('#option').height();
        opt_height_calc = opt_height - 60;
        $('#option').css('margin-top', '-' + opt_height_calc + 'px');

 }


    
        $("nav button, #strip").on("click", function() {
            if ($("#option").css("marginTop") == "60px") {
                $('#option').removeClass('rotate');

                $("#option").animate({
                    marginTop: "-" + opt_height_calc + "px",
                }, 300, function() {
                    // Animation complete.
                });

            } else {

                $('#option').addClass('rotate');

                $("#option").animate({
                    marginTop: "60px",
                }, 300, function() {
                    // Animation complete.
                });
            }
        });
 
    // CHART ELIPSE STATS AND ANIMATE

// RESIZE EVENT 
$( window ).resize(function() {
  filterheight();
});


var colors_chart = ["#ff5c60", "#ffbb73", "#fcf582", "#c2fa92", "#6ec7fc", "#01e4c0", "#bb7ff3", "#fbc9df"];
var strokew_chart = ["10", "7.5", "6", "5", "4", "3.6", "3.3", "3"];

$(".circle").each(function(i) {
    var count = i + 1;
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


    $("#burger").click(function() {



        bar.animate(circlearray[fromzero] / 100);

    });

    $("#aside_placeholder,  .aside_close").click(function() {
        bar.animate(.0, {
            duration: 80
        });
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



// FUNCTION TO SET ALL FILTER/SORT ACTIVE
function if_zero() {
var zero = $('#option').find('.filter_btn.is-checked').length;
if (zero == 0) {
    
    $('#option').find('.filter_btn .pastille').addClass('opacity');
    
    $('.result p  span').html(number_startup);
} else {
    $('#option').find('.filter_btn .pastille').removeClass('opacity');
    var ifzerolenght = $('.grid-item:visible').length;
    console.log(ifzerolenght);
     $('.result p  span').html(ifzerolenght);
    
}
}