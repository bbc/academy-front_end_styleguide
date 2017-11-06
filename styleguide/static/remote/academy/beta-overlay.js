
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

    var overlay = $('<div id="academy-beta-overlay"><button class="beta__dismiss"><i class="dismiss__icon" aria-hidden="true"></i></button><div class="beta__layout"><div class="beta__layout-item beta__layout-item--info"><div class="beta__layout-item--info--container"><p class="beta__heading">You are using BBC Academy&#39;s new website.</p><p class="beta__info-link">This website will soon be replacing Academy Gateway.</p></div></div><div class="beta__layout-item beta__layout-item--controls"><a id="survey-button" class="beta__button beta__button--blue beta__button--icon" href="https://bbcacademy.typeform.com/to/c5u2Za" target="_blank"><i class="button__icon" aria-hidden="true"></i> Tell us what you think</a><a id="back-to-old-button" class="beta__button beta__button--border" href="http://academy.gateway.bbc.co.uk">Back to Academy Gateway</a></div></div></div>');

    if (isBeta()) {
        overlay.addClass('isbeta');
    }

    if(!Cookies.get('ckps_academy_overlay_closed')) {
        $('head').append('<link rel="stylesheet" href="/academy/static/css/beta-overlay.css">');

        var dismissIcon = $('.beta__dismiss', overlay);
        dismissIcon.click(function () {
            Cookies.set('ckps_academy_overlay_closed', true, { domain: '.bbc.co.uk', path: '/' });
            overlay.removeClass('show');
        });

        setTimeout(function() {
            $('body').append(overlay);
             overlay.addClass('show');
        }, 1000);
    }

});
