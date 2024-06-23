// #region LOADING SCREEN
const loadBg = document.getElementById('load-bg');
const loadImg = document.getElementById('stopmixing');
const loadImgRect = loadImg.getBoundingClientRect();
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const loadImgWidth = loadImg.getBoundingClientRect().width;
const loadImgHeight = loadImg.getBoundingClientRect().height;
const distanceToRightEdge = windowWidth - (loadImgRect.left + loadImgWidth);
const distanceToBottomEdge = windowHeight - (loadImgRect.top + loadImgHeight);

let bounceAni = anime({
    targets: loadImg,
    loop: true,
    duration: 2000,
    easing: 'easeInQuart',
    autoplay: false,
    keyframes: [
        {translateY: 0, translateX: (distanceToRightEdge * 0.25), duration: 1000},
        {translateY: 0, translateX: 0, duration: 1000},
        {translateY: 0, translateX: (distanceToRightEdge * -0.25), duration: 1000},
        {translateY: 0, translateX: 0, duration: 1000},
    ],
});

let jamesBond = anime({
    targets: loadBg,
    maskSize: '200% 200%, 200% 200%',
    duration: 1000,
    easing: 'linear',
    autoplay: false,
});

const hiddenSections = document.querySelectorAll('.should-be-hidden');
document.addEventListener('DOMContentLoaded', function() {
    hiddenSections.forEach((section) => section.classList.add('hide'));
});

document.addEventListener('DOMContentLoaded', function() {

    bounceAni.play();

    // Hide sections with a delay after the page has fully loaded
    setTimeout(() => {
        // Pause the animation and update styles
        bounceAni.pause();
        if (loadBg) {
            loadBg.style.pointerEvents = 'none';
        }
        if (loadImg) {
            loadImg.style.userSelect = 'none';
        }

        // Show hidden sections
        hiddenSections.forEach(section => section.classList.remove('hide'));

        if (jamesBond) {
            jamesBond.play();
            setTimeout(() => {
                loadBg.style.opacity = '0';
            }, 1000)
        };

    }, 3000);
});

// #endregion



// #region CARDS
const ALL = document.querySelectorAll('*');

const cardsContentDiv = document.getElementById('cards-content-div');
const cardsMenu = document.getElementById('cards-menu');
const logoCardDiv = document.getElementById('logocard-div');
const logoCard = document.getElementById('logocard');
const logoCardChevron = document.getElementById('logocard-chevron-right');
const projectCardsDiv = document.getElementById('project-cards-div');

class HomePageCard {
    constructor(id, windowId, xId, audioId) {
        this.element = document.getElementById(id);
        this.rects = {};
        this.xDif = 0;
        this.window = document.getElementById(windowId);
        this.xClose = document.getElementById(xId);
        this.audio = document.getElementById(audioId);
        this.audCheck = audioId;
        this.scWidget = SC.Widget(document.getElementById(audioId))
    };
};

const bodiesHomeCard = new HomePageCard('bodiescard', 'beach-bodies-window', 'bb-x', 'bb-audio');
const bootyHomeCard = new HomePageCard('bootycard', 'booty-jams-window', 'bj-x', 'bj-audio');
const idolHomeCard = new HomePageCard('idolcard', 'e-idol-window', 'idol-x', 'idol-audio');
const homePageCards = [bodiesHomeCard, bootyHomeCard, idolHomeCard];

class ProjectPageCard extends HomePageCard {};
const bodiesProjectPageCard = new ProjectPageCard('projects-page-bodiescard', 'beach-bodies-window', 'bb-x', 'bb-audio');
const bootyProjectPageCard = new ProjectPageCard('projects-page-bootycard', 'booty-jams-window', 'bj-x', 'bj-audio');
const idolProjectPageCard = new ProjectPageCard('projects-page-idolcard', 'e-idol-window', 'idol-x', 'idol-audio');
const cards = [bodiesHomeCard, bootyHomeCard, idolHomeCard, bodiesProjectPageCard, bootyProjectPageCard, idolProjectPageCard];

// #endregion



// #region HOME PAGE

const homeSplideDiv = document.getElementById('homepage-splide');
const homeTrack = document.getElementById('homepage-track');
const homeSlides = document.querySelectorAll('.homeslide');

const projectCardsBgRect = document.getElementById('pc-bgrect1');

const footerDiv = document.getElementById('footer-div');
const aboutLink = document.getElementById('about-link');

document.addEventListener("DOMContentLoaded", function aboutClick() {
    aboutLink.addEventListener("click", function () {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    });
});

const hamburgerMenu = document.getElementById('hamburger-menu');
const menuAbout = document.getElementById('menu-about');
const menuProjects = document.getElementById('menu-projects');
let menuItems = [menuAbout, menuProjects];

let menuOpen = false;

menuItems.forEach((item) => {
    item.style.marginTop = '-5vh';       
});

hamburgerMenu.addEventListener('click', function () {
    if (menuOpen === false) {
        menuItems.forEach((item) => {
            item.style.marginTop = '0px';     
            item.style.opacity = '100%';
            item.style.transition = 'all 100ms ease-out';
            item.style.pointerEvents = 'all';        
        });
        menuOpen = true;
    } else {
        menuItems.forEach((item) => {
            item.style.marginTop = '-5vh';     
            item.style.opacity = '0%';
            item.style.transition = 'all 100ms ease-in';
            item.style.pointerEvents = 'none';
        });
        menuOpen = false;
    }
});

menuAbout.addEventListener('click', function() {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
});

const projectsSection = document.getElementById('projects')

menuProjects.addEventListener('click', function() {
    const projectsPageTop = projectsSection.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: projectsPageTop,
        behavior: 'smooth'
    });
});

// #endregion



// #region HOVER FUNCTIONS

function addLogoHover() {
    logoCardDiv.classList.add('cards-animation-transition');
    logoCardDiv.classList.toggle('projectcards-hover');
};
function addProjectCardHover(card) {
    card.element.classList.toggle('projectcards-hover');
    card.element.classList.add('cards-hover-transition');
};

let mouseOverEvent = "mouseover";
let mouseOutEvent = "mouseout";

function logoCardHoverListenerFunc(eventType) {
    isTouch = false;
    logoCardDiv.addEventListener('touchend', function() {
        isTouch = true;
      });
    logoCardDiv.addEventListener('click', function () {
        if (!isTouch) {
            addLogoHover();
        };
        isTouch = false; // Reset the flag after click event
    });
    logoCardDiv.addEventListener(eventType, function () {
        if (!isTouch) {
            addLogoHover();
        };
    });
};

function projectCardsHoverListenerFunc(eventType) {
    for (let card of cards) {
        card.element.addEventListener(eventType, function () {
            addProjectCardHover(card)
        });
    };
}

logoCardHoverListenerFunc(mouseOverEvent);
logoCardHoverListenerFunc(mouseOutEvent);
projectCardsHoverListenerFunc(mouseOverEvent);
projectCardsHoverListenerFunc(mouseOutEvent);

for (let card of homePageCards) {
    card.element.style.pointerEvents = 'none'
};

// #endregion



// #region CARD ANIMATION SETUP

let homeSplide = new Splide('#homepage-splide', {
    perPage: 3,
    breakpoints: {
        880: {
            perPage: 2,
        },
        580: {
            perPage: 1,
        },
    }
});

function enableSplideLayout() {
    homeSplideDiv.style.paddingLeft = '4vw';
    homeSplideDiv.classList.add('splide');
    homeTrack.classList.add('splide__track');
    projectCardsDiv.classList.add('splide__list');
    for (slide of homeSlides) {
        slide.classList.add('splide__slide')
    };
    bodiesHomeCard.element.classList.remove('bodies-initial-layout');
    bootyHomeCard.element.classList.remove('booty-initial-layout');
    idolHomeCard.element.classList.remove('idol-initial-layout');
    homeSplide.mount();
};

function disableSplideLayout() {
    homeSplideDiv.classList.remove('splide');
    homeTrack.classList.remove('splide__track');
    projectCardsDiv.classList.remove('splide__list');
    for (slide of homeSlides) {
        slide.classList.remove('splide__slide')
    };
    bodiesHomeCard.element.classList.add('bodies-initial-layout');
    bootyHomeCard.element.classList.add('booty-initial-layout');
    idolHomeCard.element.classList.add('idol-initial-layout');  
    homeSplide.destroy();
};

function getInitialAndFinalRects(element) {
    let destroyed = false;

    if (homeSplide.state.is(Splide.STATES.IDLE)) {
        disableSplideLayout();
        destroyed = true;
    }
    let firstRect = DOMRect.fromRect(element.getBoundingClientRect()); // First pos
    enableSplideLayout(); // to final layout
    let lastRect = DOMRect.fromRect(element.getBoundingClientRect()); // Last pos
    disableSplideLayout(); // back to initial layout
    if (destroyed === true) {
        enableSplideLayout();
    };
    
    return {
        firstRect,
        lastRect
    };
};

// #endregion



// #region CARD ANIMATION FUNCTION

function calculateRects() {
    for (let card of homePageCards) {
        card.rects = getInitialAndFinalRects(card.element);
        card.xDif = (card.rects.lastRect.left - card.rects.firstRect.left);
    };
};

let cardAniComplete = false;
let initialLayout = true;

document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener('load', function() {
        logoCardDiv.addEventListener('click', function cardAnimation() {
            calculateRects();

            if (initialLayout === true) {
                
                for (let card of homePageCards) { // translate to final positions
                    card.element.classList.add('cards-animation-transition');
                    card.element.style = `transform: translateX(${card.xDif}px)`;
                };
                for (let card of homePageCards) { // add hover
                    card.element.style.pointerEvents = 'all';
                };
                logoCardDiv.style.pointerEvents = 'none';

                if (window.innerWidth <= 880) {
                    logoCard.classList.add('cards-animation-transition');
                    logoCard.style.opacity = '0%';
                    logoCardDiv.classList.add('logocard-translate');
                } else {
                    logoCardDiv.classList.add('cards-animation-transition');
                    logoCardDiv.classList.add('logocard-translate');
                };
    
                initialLayout = false;
                cardAniComplete = true;

                if (cardAniComplete === true) {
                    projectCardsBgRect.classList.add('cards-animation-transition');
                    projectCardsBgRect.style.opacity = '10%';
                    projectCardsBgRect.style.pointerEvents = 'all';
                };

                setTimeout(() => {
                    homePageCards.forEach((card) => {card.element.classList.remove('cards-hover-transition')});
                    homePageCards.forEach((card) => {card.element.classList.remove('cards-animation-transition')});
                    
                    for (let card of homePageCards) { // TRANSLATE
                        card.element.style = `transform: translateX(0px)`;
                    };

                    enableSplideLayout();   

                    logoCardDiv.style.pointerEvents = 'all';

                    if (windOpen === true) {
                        for (let card of cards) {
                            card.element.style.pointerEvents = 'none'
                        };
                    };

                }, 2000);
    
            } else if (initialLayout === false) { // IF FINAL LAYOUT animate to initial                     
                homePageCards.forEach((card) => {
                    let originalTransition = card.element.style.transition;
                    card.element.style.transition = 'none';
                    card.element.style.transform = `translateX(${card.xDif}px)`;
                    // Force a reflow to apply the transform change instantly
                    void card.element.offsetWidth;
                    card.element.style.transition = originalTransition;
                });                
                homePageCards.forEach((card) => {
                    card.element.classList.add('cards-animation-transition');
                    card.element.style = `transform: translateX(0px)`;
                });

                logoCardDiv.style.pointerEvents = 'none';

                for (let card of homePageCards) { // remove hover
                    card.element.style.pointerEvents = 'none';
                };
    
                if (window.innerWidth <= 880) {
                    logoCardDiv.classList.remove('logocard-translate');
                    logoCard.style.opacity = '100%';
                } else {
                    logoCardDiv.classList.remove('logocard-translate');
                };

                initialLayout = true; // UPDATE FLAG
                cardAniComplete = false;
                if (cardAniComplete === false) {
                    projectCardsBgRect.classList.add('cards-animation-transition');
                    projectCardsBgRect.style.opacity = '0%';
                    projectCardsBgRect.style.pointerEvents = 'none';
                    projectCardsBgRect.style.transform = `translateX(0px)`;
                };
                logoCardDiv.style.pointerEvents = 'all';

                disableSplideLayout();   
            };
        });

        window.addEventListener('resize', function() {
            for (element of ALL) {
                let originalTransition = element.style.transition;
                element.style.transition = 'none';
                // Force a reflow to apply the transition change instantly
                void element.offsetWidth;
                element.style.transition = originalTransition;
            }
            if (window.innerWidth <= 880 && initialLayout === false) {
                logoCard.style.opacity = '0%';
            } else {
                logoCard.style.opacity = '100%';
            };
        });        
    });
});

// #endregion



// #region PROJECT WINDOWS

let windOpen = false;

const bootyEmbed = document.getElementById('bj-audio').contentWindow;

let scrollPosition = 0;

function windowsOpen(card) {
    card.window.style = 'opacity: 100%';
    card.window.classList.add('cards-animation-transition2');
    card.audio.style.pointerEvents = 'all';
    card.audio.style.userSelect = 'all';
    card.xClose.style.pointerEvents = 'all';
    card.xClose.style.userSelect = 'all';
    logoCardDiv.style.pointerEvents = 'none';
    aboutLink.style.pointerEvents = 'none';
    footerDiv.style.pointerEvents = 'none';
    for (let card of cards) {
        card.element.style.pointerEvents = 'none'
    };
    windOpen = true;
    card.scWidget.play();
    if (card.audCheck === 'bj-audio') {
        bootyEmbed.postMessage({ command: 'play' }, '*');
    }
    scrollPosition = window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    document.body.classList.add('no-scroll');
};
function windowsClose(card) {
    card.window.style = 'opacity: 0%';
    card.audio.style.pointerEvents = 'none';
    card.audio.style.userSelect = 'none';
    card.xClose.style.pointerEvents = 'none';
    card.xClose.style.userSelect = 'none';
    logoCardDiv.style.pointerEvents = 'all';
    aboutLink.style.pointerEvents = 'all';
    footerDiv.style.pointerEvents = 'all';
    for (let card of cards) {
        card.element.style.pointerEvents = 'all'
    };
    windOpen = false;
    card.scWidget.pause();
    if (card.audCheck === 'bj-audio') {
        bootyEmbed.postMessage({ command: 'pause' }, '*');
    }
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
    document.body.classList.remove('no-scroll');
};

let touchStartEvent = "touchstart";
let clickEvent = "click";
var userAgent = window.navigator.userAgent;
function windowListenerFunc(eventType) {
    for (let card of cards) {
        card.element.addEventListener(eventType, function () {
            windowsOpen(card);
        });
        card.xClose.addEventListener(eventType, function () {
            windowsClose(card);
        });
        card.element.addEventListener('touchmove', function (){
            windowsClose(card); /* keeps windows from opening when swiping */
        });
    };
};

if (/Mobi|Android/i.test(userAgent)) {
    windowListenerFunc(touchStartEvent);
} else {
    windowListenerFunc(clickEvent);
};

for (let card of cards) {
    card.scWidget.bind(SC.Widget.Events.PLAY, function() {
        card.scWidget.setVolume(60);
    });
};

// #endregion



// #region PROJECT PAGE

document.addEventListener('DOMContentLoaded', function projectPageSplide() {
    new Splide('#projects-page-cards-content-div', {
        perPage: 3,
        breakpoints: {
            880: {
                perPage: 2,
            },
            580: {
                perPage: 1,
            },
        }
    }).mount();
});

// #endregion



// #region CONTACT PAGE

document.addEventListener("DOMContentLoaded", function bgBlurEffect() {
    let vh = window.innerHeight;
    const projbg = document.getElementById('proj-bg');

    window.addEventListener('resize', () => {
        // Update vh on address bar appearing or disappearing 
        vh = window.innerHeight;
        // No blur animation during a resize event
        projbg.style.transition = "none";
    });

    let lastScrollPosition = window.scrollY;

    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;
        const isScrollingDown = scrollPosition >= lastScrollPosition;
        const isThirdPage = scrollPosition >= vh * 2;

        // Reapply the blur animation during a scroll event
        projbg.style.transition = "all 1s ease";

        if (isScrollingDown && isThirdPage) {
            projbg.style.filter = "blur(1rem)";
        } else {
            projbg.style.filter = "none";
        }

        lastScrollPosition = scrollPosition;
    });
});

// #endregion