//SHOW MORE TEXT
/*
if (matchMedia) {
    const mq = window.matchMedia("(min-width: 992px)");
    mq.addListener(WidthChange);
    WidthChange(mq);
}

function WidthChange(mq) {
    if (mq.matches) {
// window width is at least 500px
    } else {
        // if (window.matchMedia("(max-width: 992px)").matches) {
        $readMoreJS.init({
            target: '.dummy p',           // Selector of the element the plugin applies to (any CSS selector, eg: '#', '.'). Default: ''
            numOfWords: 60,               // Number of words to initially display (any number). Default: 50
            toggle: true,                 // If true, user can toggle between 'read more' and 'read less'. Default: true
            moreLink: '+',    // The text of 'Read more' link. Default: 'read more ...'
            lessLink: '-',         // The text of 'Read less' link. Default: 'read less'
        });
        // }
    }

}
*/

/******
 // The function actually applying the offset
 function offsetAnchor() {
    if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 100);
    }
}
 // This will capture hash changes while on the page
 window.addEventListener("hashchange", offsetAnchor);
 // This is here so that when you enter the page with a hash,
 // it can provide the offset in that case too. Having a timeout
 // seems necessary to allow the browser to jump to the anchor first.
 window.setTimeout(offsetAnchor, 1); // The delay of 1 is arbitrary and may not always work right (although it did in my testing).
 ******/


// hlavní menu, funkce pro sticky a scroll
/*
var h = document.getElementById("header");
var readout = document.getElementById("readout");
var stuck = false;
var stickPoint = getDistance();

function getDistance() {
var topDist = h.offsetTop;
return topDist;
}

window.onscroll = function () {
stickyScrollMenu()
};

function stickyScrollMenu() {
var distance = getDistance() - window.pageYOffset;
var offset = window.pageYOffset;
readout.innerHTML = stickPoint + '   ' + distance + '   ' + offset + '   ' + stuck;
if ((distance <= 0) && !stuck) {
    h.style.position = 'fixed';
    h.style.top = '0px';
    stuck = true;
    h.classList.add("SCROLL");
    document.body.classList.add("SPACING");
    // document.querySelector("html").setAttribute("style", "--top-spacing: 88px;");
} else if (stuck && (offset <= stickPoint)) {
    h.style.position = 'static';
    stuck = false;
    h.classList.remove("SCROLL");
    document.body.classList.remove("SPACING");
    // document.querySelector("html").setAttribute("style", "--top-spacing: 0;");
}
}
*/

var sliderTnsClick = function () {};
let count = document.querySelectorAll(".product-sliders-hp .tns-slide-active").length;
let lastElement = document.getElementsByClassName("tns-slide-active")[count - 1];
lastElement.classList.add("opacity-Low");



//LANGUAGE SELECTOR
var fetchCountries = function () {
    // let url = "https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json";
    let url = "scripts/countries_czech_slovak.json";

    return new Promise(function(resolve, reject) {
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (object) {
            resolve(object)
        })
            .catch(function (err) {
                reject(err)
            })
    });
};

var countryCodeToEmoji = function(countryCode){
    return countryCode.toUpperCase().replace(/./g, function (char){ return String.fromCodePoint(char.charCodeAt(0)+127397)});
};


var updateSelect = function(){
    return new Promise( function(resolve,reject)  {
        let select = document.querySelector('.lang-select')
        select.innerHTML = "";

        fetchCountries().then(function (countries) {
            for(let i = 0; i < countries.length; i++){
                let country = countries[i];
                let string = countryCodeToEmoji(country.cca2)+" "+country.name.common;
                let option = new Option(string,country.name.common);
                select.add(option);
            }
            resolve(true);
        })
            .catch (function(err) { reject(err) })
    })
};

var findAncestor = function (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls)) ;
    return el;
};

var langSelectUpdate = function () {
    let langSelect = document.querySelector('.lang-select');
    let newSelect = document.createElement('div')
    newSelect.classList.add('lang-select--active')

    let list = document.createElement('ul')
    list.classList.add('lang-select__list')

    for (let i = 0; i < langSelect.options.length; i++) {
        let country = langSelect.options[i];
        let countryElement = document.createElement('li')
        countryElement.innerHTML = twemoji.parse(country.text, {
            folder: 'svg',
            ext: '.svg'
        });
        countryElement.classList.add('lang-select__country');
        countryElement.dataset.id = i;
        countryElement.addEventListener('click', flagClick);

        if (country.selected) countryElement.classList.add('lang-select__country--selected');

        list.append(countryElement);
    }

    newSelect.append(list)
    langSelect.parentNode.insertBefore(newSelect, langSelect);
};

updateSelect().then(function () {
    langSelectUpdate();
    let container = document.querySelector('.lang-select--active');
    container.addEventListener('click', langSelectClick);
});

//handle onCLick

var langSelectClick = function (event) {
    let langSelect = document.querySelector('.lang-select');
    if (event.target.classList.contains('lang-select__list')) {
        event.target.classList.add('lang-select__list--active');
        event.target.childNodes[langSelect.selectedIndex].scrollIntoView();
        event.target.scroll({
            top: event.target.scrollTop - 175,
            behavior: "instant"
        })
    }
};

var flagClick = function (event) {
    let langSelect = document.querySelector('.lang-select');
    let container = event.target.closest('.lang-select__list--active');
    container.childNodes[langSelect.selectedIndex].classList.remove('lang-select__country--selected');
    langSelect.selectedIndex = event.target.dataset.id;
    event.target.classList.add('lang-select__country--selected');
    container.classList.remove('lang-select__list--active'),
    container.classList.add('lang-select__list--scaledDown')
};

//*** KARTA PRODUKTU *** *** PRODUKT MODAL ***
//událost pro plus minus
var protCardCTAneco = Array.prototype.slice.call(document.querySelectorAll(".product-card"), 0);
protCardCTAneco.forEach(function (userItem) {
    var ctaMinus = userItem.querySelector('.btn-minus');
    if (ctaMinus != undefined) {
        ctaMinus.addEventListener('click', minus);
    }
    var ctaPlus = userItem.querySelector('.btn-plus');
    if (ctaPlus != undefined) {
        ctaPlus.addEventListener('click', plus);
    }
});

var countEl = document.getElementsByClassName('count');
var countQuantity = document.getElementsByClassName('count-quantity');


//vložení čísla do inputu
var inputOnBlur = Array.prototype.slice.call(document.querySelectorAll("input.quantity.count"), 0);
inputOnBlur.forEach(function (blurItem) {


    blurItem.addEventListener("blur", inputBlurValue);
});


function inputBlurValue(e) {
    var input = this;
    var count = this.value;
    var countAsInt = parseInt(count);
    if (Number.isInteger(+countAsInt) && countAsInt !== 'NaN') {
        // input.innerHTML = count.toString();
        input.value = count;
        input.setAttribute('value', count);
        var inSC = this.parentElement.parentElement.parentElement.querySelector(".count-quantity")
        inSC.innerHTML = count.toString();
    } else {
        input.style.color = "#D7172F!important";
    }
}

function plus() {
    var plusButton = this.parentElement.querySelector(".count");
    var count = plusButton.getAttribute("value");
    count++;
    // plusButton.innerHTML = count.toString();
    plusButton.value = count;
    plusButton.dispatchEvent(new Event("change"));
    plusButton.setAttribute('value', count);
    var inSC = this.parentElement.parentElement.parentElement.querySelector(".count-quantity")
    inSC.innerHTML = count.toString();
}

function minus() {
    var minusButton = this.parentElement.querySelector(".count");
    var count = minusButton.getAttribute("value");
    if (count > 0) {
        count--;
        // minusButton.innerHTML = count.toString();
        minusButton.value = count;
        minusButton.setAttribute('value', count);
        minusButton.dispatchEvent(new Event("change"));
        var inSC = this.parentElement.parentElement.parentElement.querySelector(".count-quantity")
        inSC.innerHTML = count.toString();
        if (count === 0) {
            ctaRemoveClass(this)
        }
    }
}

//změna cta btn (do košíku / plus-minus)
var productCardCTA = Array.prototype.slice.call(document.querySelectorAll(".product-card"), 0);
productCardCTA.forEach(function (userItem) {
    var intoBasket = userItem.querySelector('.js-cta-change');
    if (intoBasket != undefined) {
        intoBasket.addEventListener('click', function () {
            var plus = intoBasket.parentElement.getElementsByClassName("btn-plus");
            plus[0].click();
            ctaAddClass(intoBasket);
        });
    }
});

function ctaAddClass(e) {
    e.parentElement.parentElement.classList.add('active');
}

function ctaRemoveClass(e) {
    e.parentElement.parentElement.parentElement.classList.remove('active');
}

//Smooth scrolling when clicking an anchor link
// var hrefAnchor = Array.prototype.slice.call(document.querySelectorAll(('a[href^="#"]') && (".anchor")),0);
// hrefAnchor.forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();
//
//         document.querySelector(this.getAttribute('href')).scrollIntoView({
//             behavior: 'smooth'
//         });
//     });
// });

//STICKY
var sticky = new Sticky('[data-sticky]');

//MAP
function initMap() {
    var uluru = {lat: 49.7538612, lng: 16.4535598};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        //icon: 'cesta'
    });
}

//SCROLL TO TOP
document.getElementsByClassName('go-to-top')[0].onclick = function () {
    scrollTo(0, 1000);
};

// Element to move, time in ms to animate
function scrollTo(element, duration) {
    var e = document.documentElement;
    if (e.scrollTop === 0) {
        var t = e.scrollTop;
        ++e.scrollTop;
        e = t + 1 === e.scrollTop-- ? e : document.body;
    }
    scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
    if (duration <= 0) return;
    if (typeof from === "object") from = from.offsetTop;
    if (typeof to === "object") to = to.offsetTop;

    scrollToX(element, from, to, 0, 1 / duration, 20, easeOutCuaic);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
    if (t01 < 0 || t01 > 1 || speed <= 0) {
        element.scrollTop = xTo;
        return;
    }
    element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
    t01 += speed * step;

    setTimeout(function () {
        scrollToX(element, xFrom, xTo, t01, speed, step, motion);
    }, step);
}


function linearTween(t) {
    return t;
}

function easeInQuad(t) {
    return t * t;
}

function easeOutQuad(t) {
    return -t * (t - 2);
}

function easeInOutQuad(t) {
    t /= 0.5;
    if (t < 1) return t * t / 2;
    t--;
    return (t * (t - 2) - 1) / 2;
}

function easeInCuaic(t) {
    return t * t * t;
}

function easeOutCuaic(t) {
    t--;
    return t * t * t + 1;
}

function easeInOutCuaic(t) {
    t /= 0.5;
    if (t < 1) return t * t * t / 2;
    t -= 2;
    return (t * t * t + 2) / 2;
}

function easeInQuart(t) {
    return t * t * t * t;
}

function easeOutQuart(t) {
    t--;
    return -(t * t * t * t - 1);
}

function easeInOutQuart(t) {
    t /= 0.5;
    if (t < 1) return 0.5 * t * t * t * t;
    t -= 2;
    return -(t * t * t * t - 2) / 2;
}

function easeInQuint(t) {
    return t * t * t * t * t;
}

function easeOutQuint(t) {
    t--;
    return t * t * t * t * t + 1;
}

function easeInOutQuint(t) {
    t /= 0.5;
    if (t < 1) return t * t * t * t * t / 2;
    t -= 2;
    return (t * t * t * t * t + 2) / 2;
}

function easeInSine(t) {
    return -Mathf.Cos(t / (Mathf.PI / 2)) + 1;
}

function easeOutSine(t) {
    return Mathf.Sin(t / (Mathf.PI / 2));
}

function easeInOutSine(t) {
    return -(Mathf.Cos(Mathf.PI * t) - 1) / 2;
}

function easeInExpo(t) {
    return Mathf.Pow(2, 10 * (t - 1));
}

function easeOutExpo(t) {
    return -Mathf.Pow(2, -10 * t) + 1;
}

function easeInOutExpo(t) {
    t /= 0.5;
    if (t < 1) return Mathf.Pow(2, 10 * (t - 1)) / 2;
    t--;
    return (-Mathf.Pow(2, -10 * t) + 2) / 2;
}

function easeInCirc(t) {
    return -Mathf.Sqrt(1 - t * t) - 1;
}

function easeOutCirc(t) {
    t--;
    return Mathf.Sqrt(1 - t * t);
}

function easeInOutCirc(t) {
    t /= 0.5;
    if (t < 1) return -(Mathf.Sqrt(1 - t * t) - 1) / 2;
    t -= 2;
    return (Mathf.Sqrt(1 - t * t) + 1) / 2;
}



