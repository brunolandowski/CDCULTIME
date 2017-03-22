(function () {
    var sponsors = ['Cap-digital', 'edFab', 'Caisse des dépôts', 'Maif'];
    var getLang = function () {
        var arr = $('.hd_right button[style*="text-decoration: underline"]');
        return arr.length === 0 ? "FR" : arr.text().toUpperCase();
    }
    var dataLayer = window.dataLayer || [];

    // ID = 1
    window.addEventListener('load', window.dataLayer.push({
        'criteriaFamilyName': '',
        'siteLanguage': getLang(),
        'searchType': ''
    }));

    // ID = 2
    $('aside').scroll(function () {
        if ($(this).scrollTop() >= 1262) {
            dataLayer.push({
                "siteLanguage": getLang(),
                "event": "aPropos"
            });
            $('aside').off('scroll');
        }
    });

    // ID = 3
    // Share and download button
    document.querySelectorAll('div#aside_header p a').forEach(function (el) {
        el.addEventListener('click', function () {
            var shareText = document.querySelector('div#aside_header p.sharethis').innerText;
            dataLayer.push({
                "event": "clicButtonMenu",
                "buttonName": shareText,
                "subButtonName": el.innerText
            });
        });
    });

    // Join and contact button
    document.querySelectorAll('div#aside_header ul li > a').forEach(function (el) {
        el.addEventListener('click', function () {
            dataLayer.push({
                "event": "clicButtonMenu",
                "buttonName": el.innerText,
                "subButtonName": ''
            });
        });
    });

    // ID = 4
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 950) {
            dataLayer.push({
                "siteLanguage": getLang(),
                "event": "listView"
            });
            $(window).off('scroll');
        }
    });

    // ID = 5
    $('#burger').click(function () {
        dataLayer.push({
            "siteLanguage": getLang(),
            "event": "clicMenu"
        });
    });

    // ID = 6
    // Look at './script.js' ^line 660 to line 673

    // ID = 7
    // Look at './script.js' ^line 609 to line 618

    // ID = 8
    // Look at './script.js' ^line 675 to line 684

    // ID = 9
    $('#hd_bd_top .inner a').each(function (index) {
        $(this).click(function () {
            dataLayer.push({
                "sponsorName": sponsors[index],
                "event": "sponsorClick"
            });
        });
    });

    // ID = 10
    // Look at './script.js' ^line 579 to line 600
})(window);