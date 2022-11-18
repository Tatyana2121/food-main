window.addEventListener('DOMContentLoaded', ()=> {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader');
    
    function hideTabContent () {
        tabsContent.forEach (item => {
            item.style.display = 'none';
        });
        tabs.forEach (item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent (i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent ();
    showTabContent ();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent ();
                    showTabContent (i);
                }
            })
        }
    })

    //таймер
    const timeEnd = '2022-11-18';
    function getTimeRemaining (endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()),
            d = new Date(),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
            console.log(t);
            console.log(d);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    function setClock (selector, endTime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', timeEnd);

    //modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('[data-close]');

    modalTrigger.forEach (btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    })
    function addHide() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    modalClose.addEventListener('click', addHide);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            addHide();
        }
    })
    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape'  ) {
            addHide();
        }
    })
    // modalClose.addEventListener('click', () => {
    //     modal.classList.add('hide');
    //     modal.classList.remove('show');
    //     document.body.style.overflow = '';
    // })
    // modal.addEventListener('click', (e) => {
    //     if(e.target === modal) {
    //         modal.classList.add('hide');
    //         modal.classList.remove('show');
    //         document.body.style.overflow = '';
    //     }
    // })
    // document.addEventListener('keydown', (e) => {
    //     if (e.code === 'Escape') {
    //         modal.classList.add('hide');
    //         modal.classList.remove('show');
    //         document.body.style.overflow = '';
    //     }
    // })

    //SLIDER
    // const slides = document.querySelectorAll('.offer__slide'),
    // prev = document.querySelector('.offer__slider-prev'),
    // next = document.querySelector('.offer__slider-next'),
    // total = document.querySelector('#total'),
    // current = document.querySelector('#current');

    // let slideIndex = 1;

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    // if (n > slides.length) {
    //     slideIndex = 1;
    // } else if (n < 1) {
    //     slideIndex = slides.length;
    // }
    // slides.forEach(item => item.style.display = 'none');
    // slides[slideIndex - 1].style.display = 'block';
    // if (slides.length < 10) {
    //     current.textContent = `0${slideIndex}`;
    // } else {
    //     current.textContent = slideIndex;
    // }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }
    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // })
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // })


    let imgSlider = document.querySelectorAll('.offer__slide');
    const next = document.querySelector('.offer__slider-next');
    const prev = document.querySelector('.offer__slider-prev');
    total = document.querySelector('#total');
    current = document.querySelector('#current');
    let count = 0;
    next.onclick = nextFunction;
    prev.onclick = prevFunction;
    
    if (imgSlider.length < 10) {
        total.textContent = `0${imgSlider.length}`;
    } else {
        total.textContent = `${imgSlider.length}`
    }

    initialScreen();
    function nextFunction() {
        count++;
        if (count < imgSlider.length) {
            addActive();        
            addNoneMinus();
        } else if (count >= imgSlider.length) {
            addNoneMinus();
            count = 0;
            addActive();          
        }
        if (imgSlider.length < 10) {   
            total.textContent = `0${count + 1}`;
        } else {
            total.textContent = `${count + 1}`
        }
    }
    function prevFunction() { 
        count--; 
        if (count < 0) {
            addNonePlus();
            count = imgSlider.length - 1;
            addActive();  
        } else if (count < imgSlider.length) {
            addActive();        
            addNonePlus();
        }  
        if (imgSlider.length < 10) {
            current.textContent = `0${count + 1}`;
        } else {
            current.textContent = `${count + 1}`
        }
    }
    function initialScreen() {
        for (let i = 1; i < imgSlider.length; i++) {
            imgSlider[i].classList.add('none');
        }
    }
    function addActive() {
        imgSlider[count].classList.add('active');
        imgSlider[count].classList.remove('none'); 
    }
    function addNonePlus() {
        imgSlider[count + 1].classList.add('none');
        imgSlider[count + 1].classList.remove('active');
    }
    function addNoneMinus() {
        imgSlider[count - 1].classList.add('none');
        imgSlider[count - 1].classList.remove('active');
    }

    

})

