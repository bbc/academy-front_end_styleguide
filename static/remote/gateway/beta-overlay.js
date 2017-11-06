
/* https://github.com/js-cookie/js-cookie */!function(a){var b=window.Cookies,c=window.Cookies=a();c.noConflict=function(){return window.Cookies=b,c}}(function(){function a(){for(var a=0,b={};a<arguments.length;a++){var c=arguments[a];for(var d in c)b[d]=c[d]}return b}function b(c){function d(b,e,f){var g;if("undefined"!=typeof document){if(arguments.length>1){if(f=a({path:"/"},d.defaults,f),"number"==typeof f.expires){var h=new Date;h.setMilliseconds(h.getMilliseconds()+864e5*f.expires),f.expires=h}try{g=JSON.stringify(e),/^[\{\[]/.test(g)&&(e=g)}catch(a){}return e=c.write?c.write(e,b):encodeURIComponent(String(e)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),b=encodeURIComponent(String(b)),b=b.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),b=b.replace(/[\(\)]/g,escape),document.cookie=[b,"=",e,f.expires&&"; expires="+f.expires.toUTCString(),f.path&&"; path="+f.path,f.domain&&"; domain="+f.domain,f.secure?"; secure":""].join("")}b||(g={});for(var i=document.cookie?document.cookie.split("; "):[],j=/(%[0-9A-Z]{2})+/g,k=0;k<i.length;k++){var l=i[k].split("="),m=l.slice(1).join("=");'"'===m.charAt(0)&&(m=m.slice(1,-1));try{var n=l[0].replace(j,decodeURIComponent);if(m=c.read?c.read(m,n):c(m,n)||m.replace(j,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(a){}if(b===n){g=m;break}b||(g[n]=m)}catch(a){}}return g}}return d.set=d,d.get=function(a){return d(a)},d.getJSON=function(){return d.apply({json:!0},[].slice.call(arguments))},d.defaults={},d.remove=function(b,c){d(b,"",a(c,{expires:-1}))},d.withConverter=b,d}return b(function(){})});

require(['jquery-1.9'], function ($) {
    /*
     * Check if this script is on the beta site or not
     * @return boolean
     */
    function isBeta() {
        var scriptURL = $("script[src*='overlay.js']").attr('src');
        var index = scriptURL.indexOf('?');

        if (index === -1) {
            return false;
        } else {
            var queryString = scriptURL.substr(index + 1);
            var querySplit = queryString.split('=');

            if (querySplit[0] == 'isbeta' && querySplit[1] == 'true') {
                return true;
            } else {
                return false;
            }
        }
    }

    var overlay = $('<div id="academy-beta-overlay"><button class="beta__dismiss"> <i class="dismiss__icon" aria-hidden="true"></i> </button><div class="beta__layout"><div class="beta__layout-item beta__layout-item--info"><div class="beta__layout-item--info--container"><p class="beta__heading">These pages have now been archived. <a id="take-me-there-button" class="beta__button beta__button--purple" href="http://www.bbc.co.uk/academy" >Take me to the live version of this page</a></p></div></div></div></div>');

    if (isBeta()) {
        overlay.addClass('isbeta');

        if(!Cookies.get('ckps_academy_overlay_closed')) {
            overlay.addClass('show');
        }

        var dismissIcon = $('.beta__dismiss', overlay);
        dismissIcon.click(function () {
            Cookies.set('ckps_academy_overlay_closed', true, { domain: '.bbc.co.uk', path: '/' });
            overlay.hide();
        });
    } else {
        if(!Cookies.get('ckps_academy_overlay_beta_reject')) {
            overlay.addClass('show');
        }
        var notNowButton = $('#not-now-button', overlay);
        notNowButton.click(function () {
            Cookies.set('ckps_academy_overlay_beta_reject', true, { domain: '.bbc.co.uk', path: '/' });
            overlay.hide();
        });

        Cookies.set('ckps_academy_overlay_beta_accept', true, { domain: '.bbc.co.uk', path: '/' });
        window.name = 'ckps_academy_overlay_beta_accept';
    }

    $('head').append('<link rel="stylesheet" href="/Assets/Css/beta-overlay.css">');

    setTimeout(function() {
        $('body').append(overlay);
        // change the url if you are on a course page on gateway.
        if(! isBeta()){
          if(window.location.href.indexOf('/courses/') > -1) {
            $('body a#take-me-there-button').attr('href', smartURL());
            $('body p.beta__heading').text('Why not explore '+ $('.banner_wrap .overlay h1').text() +' on the new Academy website?');
          }
        }
    }, 1000);

    function smartURL() {
        var url = window.location.href;
        var slug = url.split('/');
        slug = slug[slug.length - 1];
        return '//www.bbc.co.uk/academy/courses/COU-'+slug;
    }
});
