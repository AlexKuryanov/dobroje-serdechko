let pos = {left: 0, x: 0};

const cardsSwiper = document.querySelector(".cards-swiper");
const cards = document.querySelectorAll(".card");
const prevBtn = document.querySelector(".swiper-btn-prev");
const nextBtn = document.querySelector(".swiper-btn-next")

function mouseMoveHandler(e) {
    const dx = e.clientX - pos.x;

    cardsSwiper.scrollLeft = pos.left - dx;
}

function mouseUpHandler(e) {
    cards.forEach((card) => {
        card.classList.remove('grabbing');
    });
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}

cards.forEach((card) => {
    card.addEventListener('mousedown', (e) => {
        pos = {
           left: cardsSwiper.scrollLeft,
           x: e.clientX
        };
        cards.forEach((card) => {
            card.classList.add('grabbing');
        });
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});

function swiperButtonsHandler(e) {
    const maxScroll = cardsSwiper.scrollWidth - cardsSwiper.clientWidth;
    if (cardsSwiper.scrollLeft != 0 && cardsSwiper.scrollLeft < maxScroll) {
        prevBtn.classList.remove('btn-inactive');
        nextBtn.classList.remove('btn-inactive');
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    if (cardsSwiper.scrollLeft === 0) {
        prevBtn.classList.add('btn-inactive');
        prevBtn.disabled = true;
        nextBtn.disabled = false;
        nextBtn.classList.remove('btn-inactive');
    }
    
    if (cardsSwiper.scrollLeft >= maxScroll) {
        nextBtn.classList.add('btn-inactive');
        nextBtn.disabled = true;
        prevBtn.disabled = false;
        prevBtn.classList.remove('btn-inactive');
    }
}

if ('onscrollend' in window) {
    console.log('everything works fine');
    cardsSwiper.addEventListener('scrollend', swiperButtonsHandler);
} else {
    cardsSwiper.addEventListener('scroll', swiperButtonsHandler);
}


prevBtn.addEventListener('click', (e) => {
    cardsSwiper.classList.add('scroll-container');
    const gap = parseInt(window.getComputedStyle(cardsSwiper, null).columnGap);
    cardsSwiper.scrollLeft -= (parseInt(window.getComputedStyle(cards[0], null).width) + gap);
    cardsSwiper.classList.remove('scroll-container');
});

nextBtn.addEventListener('click', (e) => {
    cardsSwiper.classList.add('scroll-container');
    const gap = parseInt(window.getComputedStyle(cardsSwiper, null).columnGap);
    cardsSwiper.scrollLeft += (parseInt(window.getComputedStyle(cards[0], null).width) + gap);
    cardsSwiper.classList.remove('scroll-container');
});