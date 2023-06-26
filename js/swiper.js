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
    //cardsSwiper.classList.add('snap-container');
    cards.forEach((card) => {
        card.style.cursor = 'grab';
        //card.classList.add('snap-element');
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
        //cardsSwiper.classList.remove('snap-container');
        cards.forEach((card) => {
            card.style.cursor = 'grabbing';
            //card.classList.add('snap-element');
        });
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
});


prevBtn.addEventListener('click', (e) => {
    console.log('prev click');
    cardsSwiper.style.scrollBehavior = 'smooth';
    const gap = parseInt(window.getComputedStyle(cardsSwiper, null).columnGap);
    cardsSwiper.scrollLeft -= (parseInt(window.getComputedStyle(cards[0], null).width) + gap);
    cardsSwiper.style.scrollBehavior = '';
});

nextBtn.addEventListener('click', (e) => {
    cardsSwiper.style.scrollBehavior = 'smooth';
    const gap = parseInt(window.getComputedStyle(cardsSwiper, null).columnGap);
    cardsSwiper.scrollLeft += (parseInt(window.getComputedStyle(cards[0], null).width) + gap);
    cardsSwiper.style.scrollBehavior = '';
});