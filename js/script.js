console.log('fifty-five');


//data

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
        var panel = '<div class="grid-item {{filters}}"><div class="vi_bd"></div><article><h4>{{name}}</h4><span>{{web}}</span><div class="vi_cate"></div></article><div class="whenopen"><span class="item_close"><img src="img/cross_black.svg"></span><div class="row"><div class="left"><p>Description</p></div><div class="right"><p>{{description_fr}}</p></div></div><div class="row"><div class="left"><p>Services</p><div class="vi_serv"></div></div><div class="right">{{services}}</div></div><div class="row"><div class="left"><p>Utilisateurs</p></div><div class="right">{{users}}</div></div><div class="row"><div class="left"><p>Clients</p></div><div class="right">{{clients}}</div></div><div class="row"><div class="left"><p>Technologies</p></div><div class="right">{{tech}}</div></div><div class="row"><div class="left"><p>Foundateurs</p></div><div class="right"><p>{{founders}}</p></div></div><div class="row"><div class="left"><p>Date de création</p></div><div class="right"><p>{{creation}}</p></div></div><div class="row"><div class="left"><p>Nombre de collaborateurs</p></div><div class="right"><p>{{employees}}</p></div></div><div class="row"><div class="left"><p>Basée en</p></div><div class="right"><p>{{zip}}</p></div></div><span class="item_dropdown"> <span class="cale"></span> <span>Partager cette startup<img class="arrow" src="img/arrow_up.svg"> <div class="item_dropdown_content"> <p><a href="http://google.fr">Sur Twitter</a></p> <p><a href="http://google.fr">Sur Facebook</a></p> <p><a href="http://google.fr">Copier le lien</a></p> </div> </span></div></div>';
        return template(panel, item);
    }
    //get data and generate HTML output
getData().then(function(data) {
    //remove loader here
    var self = this;
    var els = data.feed.entry.map(function(item) {
        var filters = [],
            services = [],
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
            if (prop.startsWith('gsx$filterservices') && item[prop].$t.length) {
                services.push(item[prop].$t);
            }
            if (prop.startsWith('gsx$filtertech') && item[prop].$t.length) {
                tech.push(item[prop].$t);
            }
            if (prop.startsWith('gsx$filterclients') && item[prop].$t.length) {
                clients.push(item[prop].$t);
            }
            if (prop.startsWith('gsx$users') && item[prop].$t.length) {
                users.push(item[prop].$t);
            }
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
            zip: item.gsx$zip.$t,
            services: services.reduce(function(a, b) {
                return a.concat('<p>', b, '</p>')
            }, ''),
            tech: tech.reduce(function(a, b) {
                return a.concat('<p>', b, '</p>')
            }, ''),
            clients: clients.reduce(function(a, b) {
                return a.concat('<p>', b, '</p>')
            }, ''),
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
    jsonloaded();

    var $grid = $('#wrap').isotope({
        masonry: {
      gutter: 20
        },
        itemSelector: '.grid-item',
    });



    var $grid = $('#wrap');
    $grid.isotope({
        masonry: {
            gutter: 20
        },
        itemSelector: '.grid-item'
    });

    var filters = []; 
    $('#myInput').on('keyup', function() {
        filters[0] = this.value;
        runFilter();
    });

  // The filter itself
    var runFilter = function() {
        $grid.isotope({
            filter: function() {
                if (filters[0]) {
                    var qsRegex = new RegExp(filters[0], 'gi');
                    if (!$(this).find('h4').text().match(qsRegex)) {
                        return false;
                    }
                }
                return true;
            }
        });
    }

  $grid.on('click', '.grid-item', function() {
        $('.grid-item').not(this).removeClass('big');
        $(this).addClass('big');
    $grid.isotope('layout');
    var that = $(this);
        $grid.one('layoutComplete', function() {
            console.log('loaded');
      var scrolltopitem = that.offset().top;
            var calcdiff = scrolltopitem - 100;
      console.log(scrolltopitem);
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

    // END OF JSON FUNCTION

});

function jsonloaded() {
    console.log('loaded');

}

// FUNCTION AIMING TO LOAD JSON LANG
function jsonload(x) {

    $.getJSON('json/lang_' + x + '.json', function(data) {

        // homepage
        $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
        $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);


        $('#main_logo').attr('src', "img/logo_et_" + x + ".svg").attr('alt', data.homepage.main_title);

        // $('#hd_title .hd_title_ct h1').html(data.homepage.main_title);
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

        // Clients LOOP
      

        var arraystats = ['services','clients','technologies'];
        



        $.each(arraystats, function(index, value) {

            var clientvalue = value;
            $('#'+clientvalue+' ul').empty();

            var clientjson = data.aside[value].loop;
            console.log(clientvalue);
           
            var clientsarray = [];
            var clientsmax;
            var clientsmin;
            // We create a loop to define max and min value
            $.each(clientjson, function(key, value) {
              var keyclean = key.replace(/\_/g,"");
                  keycleanforclass = '.'+keyclean;
                  clientslenght = $(keycleanforclass).length;      
                  clientsarray.push(clientslenght);
               
             });

            // here we get the min and max value 
            clientsmax = Math.max.apply(Math,clientsarray);
            clientsmin = Math.min.apply(Math,clientsarray); 
            
            // we reloop
             $.each(clientjson, function(key, value) {
                var keyclean = key.replace(/\_/g,"");
                  keycleanforclass = '.'+keyclean;
                  clientslenght = $(keycleanforclass).length; 

                var clientscalc = (((clientslenght - clientsmin ) * 100) / (clientsmax - clientsmin)); 
                 
                console.log("client calc"+clientscalc+"key"+value+"clientslenght"+clientslenght);
                var calcgood = (5+.45*clientscalc);

                console.log(calcgood);
                $('#'+clientvalue+' ul').append('<li><p>'+value+'</p><span>'+clientslenght+'</span><div data-wd='+calcgood+' class="histo"></div></li>');

             });
        });

    
        


       

    });
}



// CALL JSON LANG FR WHEN CLICK FR BTN
$("button#fr").click(function() {
    jsonload('fr');
    $(this).css('text-decoration', 'underline');
    $("button#en").css('text-decoration', 'none');

});

// CALL JSON LANG EN WHEN CLICK EN BTN
$("button#en").click(function() {
    jsonload('en');
    $(this).css('text-decoration', 'underline');
    $("button#fr").css('text-decoration', 'none');
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
        $( "#clients ul li .histo" ).each(function() {
          var data_wd = $(this).attr('data-wd');
          $(this).animate({
            width: data_wd+"%",
            }, 1000, "easeOutExpo", function() {
            // Animation complete.
          });
        });

        // Animate Technologies histo
        $( "#technologies ul li .histo" ).each(function() {
          var data_wd = $(this).attr('data-wd');
          $(this).animate({
            width: data_wd+"%",
            }, 1000, "easeOutExpo", function() {
            // Animation complete.
          });
        }); 

    });

});

$("#aside_placeholder, .aside_close").click(function() {
    $('body').css('overflow', 'auto');
    
    $( "#clients ul li .histo" ).each(function() {
          var data_wd = $(this).attr('data-wd');
          $(this).animate({
            width: "0%",
            }, 100, "easeOutExpo", function() {
            // Animation complete.
          });
    });

    $( "#technologies ul li .histo" ).each(function() {
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
var opt_height = $('#option').height();
opt_height_calc = opt_height - 60;
$('#option').css('margin-top', '-' + opt_height_calc + 'px');


$("nav button, #strip").on("click", function() {
    if ($("#option").css("marginTop") == "60px") {
        $('#option').removeClass('rotate');

        $("#option").animate({
            marginTop: "-" + opt_height_calc + "px",
        }, 300, "easeInExpo", function() {
            // Animation complete.
        });

    } else {

        $('#option').addClass('rotate');

        $("#option").animate({
            marginTop: "60px",
        }, 300, "easeOutExpo", function() {
            // Animation complete.
        });
    }
});

// CHART ELIPSE STATS AND ANIMATE
var colors_chart = ["#ff5c60", "#ffbb73", "#fcf582", "#c2fa92", "#6ec7fc", "#01e4c0", "#bb7ff3", "#fbc9df"];
var perc_chart = ["1.0", ".4", ".3", ".05", ".60", ".50", ".40", ".30"];
var strokew_chart = ["10", "7.5", "6", "5", "4", "3.6", "3.3", "3"];

// STAT OPEN
$("#burger").click(function() {
      

});


// STATS CLOSE
    $("#aside_placeholder,  .aside_close").click(function() {
      
});



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
        bar.animate(perc_chart[fromzero]);

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

// OPTION CLICK ON ITEMS
$('#option ul li').on('click', function(e) {
    $(this).toggleClass("selected"); //you can list several class names 

});

// SEARCH BAR