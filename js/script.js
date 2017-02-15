// -------- Filter FUNCTION ----------//
function countObjectProperties(obj) {
    var count = 0;
    for (var i in obj)
        if (obj.hasOwnProperty(i))
            count++;
    return count;
}

// -------- Var and Array need to be declared before exectuting Statistics ----------//
var circlearray = [];
var number_startup;
var colors_chart = ["#ff5c60", "#ffbb73", "#fcf582", "#c2fa92", "#6ec7fc", "#01e4c0", "#bb7ff3", "#fbc9df"];

// -------- Function needed to load EN & FR json ----------//
function jsonload(x) {
    $.getJSON('json/lang_' + x + '.json', function (data) {
        // For statistic page
        number_startup = $('.grid-item').length;
        var number_fundraising = $('.fundraising1').length;
        var number_award = $('.award').length;

        // Homepage json call
        $('#hd_bd_top p:first-of-type').html(data.homepage.top_left);
        $('#hd_bd_top p:last-of-type').html(data.homepage.top_middle);
        $('#main_logo').attr('src', "img/logo_et_" + x + ".svg").attr('alt', data.homepage.main_title);
        $('#hd_title .hd_title_ct p').html(data.homepage.headline);
        $('#hd_title .hd_title_cta p').html(data.homepage.liste);
        $('#hd_title .hd_title_cta h2').html(number_startup);
        $('#hd_bd_bottom p').html(data.homepage.bottom);
        $('nav h3').html(data.homepage.main_title);
        $('nav input').attr("placeholder", data.homepage.search);

        // Statistic page json call
        $('#aside_header ul li:nth-child(1)').html(data.aside.header.submit);
        $('#aside_header ul li:nth-child(2)').html(data.aside.header.share);
        $('#aside_header ul li:nth-child(3)').html(data.aside.header.download);
        $('#aside_header ul li:nth-child(4)').html(data.aside.header.contact);
        $('aside #box_stats h3').html(data.aside.statistiques.title);
        $('aside #box_stats p:nth-child(2)').html("<span>" + number_fundraising + "</span>" + data.aside.statistiques.rise);
        $('aside #box_stats p:nth-child(3)').html("<span>" + number_award + "</span>" + data.aside.statistiques.award);
        $('aside #box_stats p:nth-child(4)').html("<span>" + number_startup + "</span>" + data.aside.statistiques.listed);
        $('aside #box_about h3').html(data.about.title);
        $('aside #box_about p').html(data.about.content);
        $('.wrapperpart p').html(data.about.produced);


        // Startup page calls
        // Services
        var dataservicelooplength = data.aside.services.loop,
            counting = countObjectProperties(dataservicelooplength),
            step;
        for (step = 0; step < counting; step++) {
            var stepgood = step + 1;
            $('p[data-attr="filterservices' + stepgood + '"]').html(data.aside.services.loop['filterservices' + stepgood]);
        }
        $('.services .left p').html(data.aside.services.title);

        // Clients
        var dataclientslooplength = data.aside.clients.loop,
            counting = countObjectProperties(dataclientslooplength),
            step;
        for (step = 0; step < counting; step++) {
            var stepgood = step + 1;
            $('p[data-attr="filterclients' + stepgood + '"]').html(data.aside.clients.loop['filterclients' + stepgood]);
        }
        $('.clients .left p').html(data.aside.clients.title);

        // Technologies
        var datatechlooplength = data.aside.technologies.loop,
            counting = countObjectProperties(datatechlooplength),
            step;
        for (step = 0; step < counting; step++) {
            var stepgood = step + 1;
            $('p[data-attr="filtertech' + stepgood + '"]').html(data.aside.technologies.loop['filtertech' + stepgood]);
        }
        $('.technologies .left p').html(data.aside.technologies.title);

        // Users
        var datauserslooplength = data.aside.users.loop,
            counting = countObjectProperties(datauserslooplength),
            step;
        for (step = 0; step < counting; step++) {
            var stepgood = step + 1;
            $('p[data-attr="users' + stepgood + '"]').html(data.aside.users.loop['users' + stepgood]);
        }
        $('.users .left p').html(data.aside.users.title);

        // Regions
        $.each(data.aside.regions.loop, function (index, element) {
            $('p.' + index).html(element);
        });

        // Fitler Sort 
        $('.sort h4').html(data.option.sortby);
        $('.sort ul li:nth-child(1) p').html(data.option.random);
        $('.sort ul li:nth-child(2) p').html(data.option.alpha);
        $('.sort ul li:nth-child(3) p').html(data.option.asc);
        $('.sort ul li:nth-child(4) p').html(data.option.desc);
        $('.sort ul li:nth-child(5) p').html(data.option.creation);

        // Result
        $('.result .resultnumber').html(data.option.selected);
        $('.opt_footer .item_dropdown span:last-of-type').html(data.option.validate);

        // Asided
        $('.users .left p').html(data.aside.users.title);
        $('.founders .left p').html(data.aside.founders);
        $('.creation .left p').html(data.aside.creation);
        $('.employees .left p').html(data.aside.employees);
        $('.based .left p').html(data.aside.based);

        $('.whenopen .sharethis').html(data.aside.sharethis);
         
        $('.whenopen .item_dropdown_content p:nth-child(1) a').html(data.aside.twitter);
        $('.whenopen .item_dropdown_content p:nth-child(2) a').html(data.aside.facebook);
        $('.whenopen .item_dropdown_content p:nth-child(3) a').html(data.aside.copylink);


        // Statistiques page call
        var arraystats = ['services', 'clients', 'technologies', 'regions'];
        $.each(arraystats, function (index, value) {

            var clientvalue = value,
                clientjson = data.aside[value].loop,
                clientjsonh4 = data.aside[value].title,
                clientsarray = [],
                clientsmax,
                clientsmin;
            // We empty the ul before to avoid multiadding    
            $('#' + clientvalue + ' ul').empty();
            $('.' + clientvalue + ' ul').empty();
            // We create a loop to define max and min value for histograms and circles
            $.each(clientjson, function (key, value) {
                var keyclean = key.replace(/\_/g, "");
                keycleanforclass = '.' + keyclean;
                clientslenght = $(keycleanforclass).length;
                clientsarray.push(clientslenght);
            });

            // We get the two variables for max and min
            clientsmax = Math.max.apply(Math, clientsarray);
            clientsmin = Math.min.apply(Math, clientsarray);

            // We reloop
            $.each(clientjson, function (key, value) {
                var keycleanforclass = '.' + key;
                clientslenght = $('.grid-item' + keycleanforclass).length;
                clientslenght2 = $(keycleanforclass).length,
                    clientscalc = (((clientslenght2 - clientsmin) * 100) / (clientsmax - clientsmin)),
                    calcgood = (5 + .45 * clientscalc),
                    calcgoodcircle = (20 + .80 * clientscalc);
                $('#' + clientvalue + ' h4').html(clientjsonh4);
                $('#' + clientvalue + ' ul').append('<li><p>' + value + '</p><span>' + clientslenght + '</span><div data-circle=' + calcgoodcircle + ' data-wd=' + calcgood + ' class="histo"></div></li>');
                $('.' + clientvalue + ' h4').html(clientjsonh4);
                $('.' + clientvalue + ' ul').append('<li class="filter_btn" data-filter=' + keycleanforclass + '><div class="pastille"></div><span>' + clientslenght + '</span><p>' + value + '</p></li>');
            });
        });


        // We push the data attr previously added to circlearray
        $("#services ul li .histo").each(function () {
            var circlevalue = $(this).attr('data-circle');
            circlearray.push(circlevalue);
        });

        // Let's add color to filter elements depending on services
        // The array for the color is below
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
(function () {
    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
}());

/**
 * @description get data from spreadsheets
 * @returns {void}
 */
var getData = function () {
    return fetch('https://spreadsheets.google.com/feeds/list/1XvMK6WBhSNBKHQTXEqJT5L54_pyZFF1V6k5rjiD7UFU/default/public/values?alt=json')
        .then(function (response) {
            return response.json().then(function (json) {
                return json;
            });
        }, function (error) {
            return error;
        });
}

/**
 * @description template helper
 * @param  {} content original content
 * @param  {} params obj to iterate over
 * @returns {void}
 */
var template = function (content, params) {
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
    var panel = '<div data-employees="{{employeesref}}" data-creation="{{creation}}" class="grid-item {{filters}}"><div class="vi_bd"></div><article><h4>{{name}}</h4><span><a target="_blank" href="http://{{web}}">{{web}}</a></span><div class="vi_cate">{{serviceslab}}</div></article><div class="whenopen"><span class="item_close"><img src="img/cross_black.svg"></span>{{logo}}<div class="row description"><div class="left"><p></p></div><div class="right"><p><div class="fr">{{description_fr}}</div><div class="en">{{description_en}}</div></p></div></div><div class="row services"><div class="left"><p></p></div><div class="right">{{serviceslab}}</div></div><div class="row users"><div class="left"><p>Utilisateurs</p></div><div class="right">{{userslab}}</div></div><div class="row clients"><div class="left"><p>Clients</p></div><div class="right">{{clientslab}}</div></div><div class="row technologies"><div class="left"><p>Technologies</p></div><div class="right">{{techlab}}</div></div><div class="row founders"><div class="left"><p>Foundateurs</p></div><div class="right"><p>{{founders}}</p></div></div><div class="row creation"><div class="left"><p>Date de création</p></div><div class="right"><p>{{creation}}</p></div></div><div class="row employees"><div class="left"><p>Nombre de collaborateurs</p></div><div class="right"><p>{{employees}}</p></div></div><div class="row based"><div class="left"><p>Basée en</p></div><div class="right"><p class="{{region}}">{{region}}</p></div></div><span class="item_dropdown"><span class="cale"></span><span><p class="sharethis">Partager cette startup</p><img class="arrow" src="img/arrow_up.svg"><div class="item_dropdown_content"><p><a href="http://google.fr">Sur Twitter</a></p><p><a href="http://google.fr">Sur Facebook</a></p><p><a href="http://google.fr">Copier le lien</a></p></div></span></div></div>';
    return template(panel, item);
}


// -------- Get data and generate HTML output ----------//
getData().then(function (data) {
    var self = this;
    var els = data.feed.entry.map(function (item) {
        // Tables
        var filters = [],
            services = [],
            tech = [],
            users = [],
            clients = [],
            // Objects
            serviceslab = {},
            clientslab = {},
            techlab = {},
            userslab = {};
        for (var prop in item) {
            if (prop.startsWith('gsx$filter') && item[prop].$t.length) {
                filters.push(prop.substr(4));
            }
            if (prop === 'gsx$region' && item[prop].$t.length) {
                filters.push(item[prop].$t);
            }
            if (prop === 'gsx$fundraising' && item[prop].$t.length) {
                filters.push('fundraising' + item[prop].$t);
            }
            if (prop === 'gsx$awards' && item[prop].$t.length) {
                filters.push('award');
            }
            if (prop.startsWith('gsx$filterservices') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                serviceslab[propclean] = item[prop].$t;
            }
            if (prop.startsWith('gsx$filterclients') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                clientslab[propclean] = item[prop].$t;
            }
            if (prop.startsWith('gsx$filtertech') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                techlab[propclean] = item[prop].$t;
            }
            if (prop.startsWith('gsx$users') && item[prop].$t.length) {
                var propclean = prop.substr(4);
                userslab[propclean] = item[prop].$t;
            }
            if (prop.startsWith('gsx$users') && item[prop].$t.length) {
                users.push(item[prop].$t);
            }
        }

        // Arrays needed to store values
        var tableservices = [],
            tableclients = [],
            tabletech = [],
            tableusers = [];

        // We loop through services, tech, users and tech and push values into their tables
        for (var propertyName in serviceslab) {
            tableservices.push('<div><span class=' + propertyName + '></span><p data-attr="' + propertyName + '"></p></div>');
        }
        for (var propertyName in clientslab) {
            tableclients.push('<div><p data-attr="' + propertyName + '"></p></div>');
        }
        for (var propertyName in techlab) {
            tabletech.push('<div><p data-attr="' + propertyName + '"></p></div>');
        }
        for (var propertyName in userslab) {
            tableusers.push('<div><p data-attr="' + propertyName + '"></p></div>');
        }

        if (item.gsx$logorenamed.$t) {
            var logos = '<img class="logostartup" src="img/logos/' + item.gsx$logorenamed.$t + '.jpg">';
        } else {
            var logos = "";
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
            logo: logos,
            region: item.gsx$region.$t,
            serviceslab: tableservices.join(''),
            clientslab: tableclients.join(''),
            techlab: tabletech.join(''),
            userslab: tableusers.join(''),
            users: users.reduce(function (a, b) {
                return a.concat('<p>', b, '</p>')
            }, '')
        }

    }).reduce(function (a, b) {
        return a.concat(self.render(b))
    }, '');

    //Inject into DOM
    $('#grid-container').html(els);

    // Isotope plugin
    var qsRegex;
    var filterValue;
    var filterValueR;

    Isotope.prototype._positionItem = function (item, x, y) {
        item.goTo(x, y);
    };

    // init Isotope
    var $grid = $('#wrap').isotope({
        transitionDuration: 0,
        itemSelector: '.grid-item',
        masonry: {
            gutter: 20
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
        filter: function () {
            var $this = $(this),
                searchResult = qsRegex ? $this.find('h4').text().match(qsRegex) : true,
                buttonResult = filterValue ? $this.is(filterValue) : true,
                buttonResultR = filterValueR ? $this.is(filterValueR) : true;
            return searchResult && buttonResult && buttonResultR;
        },
    });

    // Execute function when istope is done
    $grid.isotope('on', 'layoutComplete', if_zero);

    // -------- Filter FUNCTION (services, clients, technologies) ----------//
    // Store filters as an array
    var filtersisotope = [],
        $filterRow = $('#option .services, #option .clients, #option .technologies');
    $filterRow.on('click', '.filter_btn, .button', function (event) {
        // Display loader 
        $('#internalloader').css('display', 'inline-block');
        // Get attr value
        var $col = $(this),
            colFilter = $col.attr('data-filter');
        $col.toggleClass('is-checked');
        var isSelected = $col.hasClass('is-checked');
        if (isSelected) {
            filtersisotope.push(colFilter);
        } else {
            removeFrom(filtersisotope, colFilter);
        }
        // Combine filters
        filterValue = filtersisotope.join('');
        $grid.isotope();
    });

    // Remove Obj from an array (helper function)
    function removeFrom(ary, obj) {
        var index = ary.indexOf(obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    }

    // -------- Filter FUNCTION (regions) ----------//
    // Store filters as an array
    /*
    var filtersisotopeR = [],
        $filterRow = $('#option .regions');
    $filterRow.on('click', '.filter_btn', function (event) {
        // Display loader
        $('#internalloader').css('display', 'inline-block');
        var $col = $(this);
        var colFilter = $col.attr('data-filter');
        filterValueR = colFilter;
        console.log(filterValueR);
        $grid.isotope();
    });
    */

    $filters = $('#option .regions').on( 'click', '.filter_btn', function() {
    var $this = $( this );
    var filterValue;
    if ( $this.is('.is-checked') ) {
    // uncheck
    filterValue = '*';
    } else {
    filterValue = $this.attr('data-filter');
    $filters.find('.is-checked').removeClass('is-checked');
    }
    $this.toggleClass('is-checked');

    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
    });

    // ----------- Search FUNCTION --------//
    // Use value of search field to filter
    var $quicksearch = $('#myInput').keyup(debounce(function () {
        $('#internalloader').css('display', 'inline-block');
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        console.log("Search input", qsRegex);
        $grid.isotope();
    }));

    // ------------- Sort FUNCTION -------------//
    // Bind sort button click
    $('.sort').on('click', '.sort_btn', function () {
        $('#internalloader').css('display', 'inline-block');
        var sortValue = $(this).attr('data-sort-by');
        $('.sort').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        // make an array of values
        sortValue = sortValue.split(',');
        console.log("Sorting button click", sortValue);
        $grid.isotope({
            sortBy: sortValue,
        });
    });

    // Debounce so filtering doesn't happen every millisecond
    function debounce(fn, threshold) {
        var timeout;
        return function debounced() {
            if (timeout) {
                clearTimeout(timeout);
            }
            function delayed() {
                fn();
                timeout = null;
            }
            setTimeout(delayed, threshold || 100);
        };
    }

    // ------------- Toggle startup -------------//
    // Open startup page
    $grid.on('click', '.grid-item', function () {
        //update hash url
        var hash = '#'.concat(encodeURIComponent($('article h4', this).text()));
        if (window.history.pushState)
            window.history.pushState(null, null, hash);
        else window.location.hash = hash;

        $('.grid-item').not(this).removeClass('big');
        $(this).addClass('big');
        $grid.isotope('layout'),
            that = $(this);
            
            var scrolltopitem = that.offset().top,
                calcdiff = scrolltopitem - 100;
            $('html, body').delay(10).animate({
                scrollTop: calcdiff
            }, 300);
        
    });

    // Close startup page 
    $(".item_close").click(function () {
        //update url
        if (window.history.pushState)
            window.history.pushState('', '/', window.location.pathname)
        else window.location.hash = '';
        $(this).parent('.whenopen').parent().removeClass("big");
        $grid.isotope('layout');
        return false;
    });

    // Call json FR when json spreadsheet is ready
    jsonload('fr');
    $('.whenopen .en').hide();
    $('.whenopen .fr').show();
    tooltip();
});

function jsonloaded() {
    console.log('chargé');
    $('body').css('overflow', 'auto');
    $('#loading').hide();
    $("header").css('opacity', '1');
    $("#option").css('opacity', '1');

    //if url hash, trigger click detail
    if (window.location.hash.length) {
        var el = null;
        $('#grid-container article h4').each(function (item) {
            if ($(this).text() === decodeURIComponent(window.location.hash).substr(1))
                $(this).closest('div').trigger('click');
        });
    }
}

// ------------- Display Tooltip hover -------------//
function tooltip() {
    $(".vi_cate div").hover(
        function () {
            $(this).children('p').addClass('show_me');
        },
        function () {
            $(this).children('p').removeClass('show_me');
        }
    );
}

// Call FR json when click button
$("button#fr").click(function () {
    jsonload('fr');
    // We hide EN desc
    $('.whenopen .en').hide();
    $('.whenopen .fr').show();
    $(this).css('text-decoration', 'underline');
    $("button#en").css('text-decoration', 'none');
    // We restart Tooltip
    tooltip();
});

// Call EN json when click button
$("button#en").click(function () {
    jsonload('en');
    // We hide FR descr
    $('.whenopen .fr').hide();
    $('.whenopen .en').show();
    $(this).css('text-decoration', 'underline');
    $("button#fr").css('text-decoration', 'none');
    // We restart Tooltip
    tooltip();
});


// ------------- Paralaxing Hero Image -------------//
/*
$(window).bind("load resize scroll", function(e) {
    var y = $(window).scrollTop();
    $("#hd_title").filter(function() {
        return $(this).offset().top < (y + 450) &&
            $(this).offset().top + $(this).height() > y;
    }).css('background-position', '50% calc(25% - ' + parseInt(y / 2) + 'px');
});
*/

// ------------- Fixed Nav while scrolling -------------//
var doc_height;
$(window).bind("load resize scroll", function (e) {
    doc_height = $(window).height();
});

$(window).on("scroll", function (e) {
    if ($(window).scrollTop() > doc_height) {
        $('nav').addClass('fixed');
        $('#option').addClass('fixed');
    } else {
        $('nav').removeClass('fixed');
        $('#option').removeClass('fixed');
    }
});

// ------------- Scroll to Next (CTA Home Page) -------------//
$(".hd_title_cta").on("click", function () {
    $("html, body").animate({
        scrollTop: doc_height
    }, 600);
    return false;
});

// ------------- Open/Close statistics page -------------//
// Open button
$("#burger").click(function () {
    $('body').css('overflow', 'hidden');
    $('#aside_placeholder').fadeIn(300);
    // Statistic page slide from left
    $("aside").animate({
        left: "0%",
    }, 300, function () {
        // Animate Clients histo
        $("#clients ul li .histo").each(function () {
            var data_wd = $(this).attr('data-wd');
            $(this).animate({
                width: data_wd + "%",
            }, 1000, "easeOutExpo");
        });

        // Animate Regions histo
        $("#regions ul li .histo").each(function () {
            var data_wd = $(this).attr('data-wd');
            $(this).animate({
                width: data_wd + "%",
            }, 1000, "easeOutExpo");
        });

        // Animate Technologies histo
        $("#technologies ul li .histo").each(function () {
            var data_wd = $(this).attr('data-wd');
            $(this).animate({
                width: data_wd + "%",
            }, 1000, "easeOutExpo");
        });
    });
});
// Close button
$("#aside_placeholder, .aside_close").click(function () {
    $('body').css('overflow', 'auto');
    $("#clients ul li .histo").each(function () {
        var data_wd = $(this).attr('data-wd');
        $(this).animate({
            width: "0%",
        }, 100, "easeOutExpo");
    });
    $("#regions ul li .histo").each(function () {
        var data_wd = $(this).attr('data-wd');
        $(this).animate({
            width: "0%",
        }, 100, "easeOutExpo");
    });
    $("#technologies ul li .histo").each(function () {
        var data_wd = $(this).attr('data-wd');
        $(this).animate({
            width: "0%",
        }, 100, "easeOutExpo");
    });
    $('#aside_placeholder').fadeOut(300);
    // Satistic page unslide from left
    $("aside").animate({
        left: "-100%",
    }, 300);
});

// ------------- Open/Close Settings Menu -------------//
// Function to set the height of the 
function filterheight() {
    var opt_height = $('#option').height();
    // Make sure ption will be above window, even on mobile
    opt_height_calc = opt_height + 60;
    $('#option').css('margin-top', '-' + opt_height_calc + 'px');
}
// Open/Close settings menu
$("nav button, #strip, .opt_footer .item_dropdown").on("click", function () {
    if ($("#option").css("marginTop") == "60px") {
        $('#option').removeClass('rotate');
        $("#option").animate({
            marginTop: "-" + opt_height_calc + "px",
        }, 300);
    } else {
        $('#option').addClass('rotate');
        $("#option").animate({
            marginTop: "60px",
        }, 300);
    }
});

// Reset seetings menu height on resize window
$(window).resize(function () {
    filterheight();
});
// ------------- Chart Circle Function -------------//
// As the canvas is zoomed by the progress plugin, we try to have a homogeneous stroke with for each element
var strokew_chart = ["10", "7.5", "6", "5", "4", "3.6", "3.3", "3"];

$(".circle").each(function (i) {
    var count = i + 1,
        idcircle = "#circle_" + count,
        fromzero = count - 1,
        numberposition = 60 + (count * 40),
        bar = new ProgressBar.SemiCircle(idcircle, {
            strokeWidth: strokew_chart[fromzero],
            easing: 'easeInOut',
            duration: 1000,
            svgStyle: null,
            color: colors_chart[fromzero],
        });

    $("#burger").click(function () {
        bar.animate(circlearray[fromzero] / 100);
    });

    $("#aside_placeholder,  .aside_close").click(function () {
        bar.animate(.0, {
            duration: 80
        });
    });

    $(this).css({
        "width": numberposition,
        "height": numberposition / 2,
    })
});

// ------------- Function to sort all filter/sort active when unselect all -------------//
function if_zero() {
    $('#internalloader').css('display', 'none');
    var zero = $('#option').find('.filter_btn.is-checked').length;
    if (zero == 0) {
        $('#option').find('.filter_btn .pastille').addClass('opacity');
        $('.result p span').html(number_startup);
    } else {
        $('#option').find('.filter_btn .pastille').removeClass('opacity');
        var ifzerolenght = $('.grid-item:visible').length;
        $('#internalloader').css('display', 'none');
        $('.result p span').html(ifzerolenght);
    }
}