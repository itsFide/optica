document.addEventListener('DOMContentLoaded', ()=>{
    const heroSwiper = new Swiper('.hero-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 4000,
        },
        on: {
            slideChange: function () {
            const index_currentSlide = this.realIndex;
            let blueShape = document.querySelector('.blue-shape-person-2')
            if(index_currentSlide == 2){
            blueShape.classList.add('active')
        } else{
                blueShape.classList.remove('active')
            }
        },
        },
    });
    const specialistsSlider = new Swiper('.specialists__slider', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.specialists-next',
            prevEl: '.specialists-prev',
        },
    });
    const productsSwiper = new Swiper('.products-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.products-next',
            prevEl: '.products-prev',
        },
    });
    const productsSwiper2 = new Swiper('.products-swiper2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.products-next2',
            prevEl: '.products-prev2',
        },
    });
    const accessoriesSwiper = new Swiper('.accessories-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.accessories-next',
            prevEl: '.accessories-prev',
        },
    });
    const accessoriesSwiper2 = new Swiper('.accessories-swiper2', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.accessories-next2',
            prevEl: '.accessories-prev2',
        },
    });
    const accessoriesSwiper3 = new Swiper('.accessories-swiper3', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        navigation: {
            nextEl: '.accessories-next3',
            prevEl: '.accessories-prev3',
        },
    });

    const defectsNavItems = document.querySelectorAll(".defects-nav__item");
    const defectsContent = document.querySelector(".defects-content");
    const defectsInner = document.querySelector(".defects__inner");
    defectsContent ? defectsContent.style.transform = "translateY(0)" : "";

    defectsNavItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            item.classList.remove('active')
            e.preventDefault();
            defectsNavItems.forEach(function (event) {
                event.classList.remove('active')
            })
            item.classList.add('active')
            const targetId = this.getAttribute("data-target");
            const targetElement = document.getElementById(targetId);
            // Получаем все следующие элементы
            let nextElements = [];
            let nextElement = targetElement.nextSibling;
            let height = 0;
            while (nextElement) {
                // Проверяем, является ли элемент узлом (не текстовым узлом)
                if (nextElement.nodeType === 1) {
                    nextElements.push(nextElement);
                }

                // Переходим к следующему соседнему элементу
                nextElement = nextElement.nextSibling;
            }
            let elementStyle = window.getComputedStyle(targetElement);
            let defectsContentStyle = window.getComputedStyle(defectsContent);
            let elementMargin = parseInt(elementStyle.marginBottom);
            let elementPadding = parseInt(defectsContentStyle.padding);
            nextElements.forEach(e=>{
                
                height += e.scrollHeight + elementMargin + elementPadding;
            })
            height = height != 0 ? height : elementPadding;
            defectsInner.style.height = `${height + targetElement.scrollHeight}px`
            if (targetElement) {
                const targetPosition = targetElement.offsetTop;

                defectsContent.style.transform = `translateY(-${targetPosition - elementPadding}px)`;
            }
        });
    });

    // Аккордеон
    function accordion(trigger, itemClass, activeClass, description ) {
        const items = document.querySelectorAll(trigger);
        items.forEach((item) => {
            
            item.addEventListener("click", () => {
                const parent = item.parentNode;
                const descr = parent.querySelector(description)
                if (!parent.classList.contains(activeClass)) {
                    document
                        .querySelectorAll(itemClass)
                        .forEach((child) => child.classList.remove(activeClass));
                    document
                        .querySelectorAll(description)
                        .forEach((child) => child.style.maxHeight = `0px`);
                    parent.classList.add(activeClass);
                    descr.style.maxHeight = `${descr.scrollHeight}px`
                }
            });
        });
    }
    accordion(".faq-item__trigger", ".faq-item", "active", ".faq-item__descr")

    // Эффект линзы старый
    // let lensesItem = document.querySelector('.lenses-item')
    // let lensesSection = document.querySelector('.lenses-banner')
    // let body = document.querySelector('body')
    // lensesSection.addEventListener('mousemove',(e)=>{
    //     lensesItem.style.left = `${e.clientX}px`
    //     lensesItem.style.top = `${e.clientY}px`
        
    // })

    // Эффект линзы

    $(document).ready(function() {
	
        $(".lenses-banner").mousemove(function(event) {
            var top =$(window).scrollTop() - $(this).offset().top + event.clientY
            var left =$(window).scrollLeft() - $(this).offset().left + event.clientX
            $('.lenses-item').css({"left":left - 150,"top":top - 150});
            
        });
        
    });
    $('.way').waypoint({
        handler: function() {
            $(this.element).addClass("way--active");
  
        },
        offset: '88%'
    });

    function tabs(
        tabsWrapper,
        headerSelector,
        tabSelector,
        contentSelector,
        activeClass,
        display = "flex"
    ) {
        const tabsWrapperBlock = document.querySelectorAll(tabsWrapper)
        tabsWrapperBlock.forEach(tabWrapper =>{
            
            const header = tabWrapper.querySelector(headerSelector),
            tab = tabWrapper.querySelectorAll(tabSelector),
            content = tabWrapper.querySelectorAll(contentSelector);
            console.log(header);
            if(header){
                function hideTabContent() {
                    content.forEach((item) => {
                        item.style.display = "none";
                    });
                    tab.forEach((item) => {
                        item.classList.remove(activeClass);
                    });
                }
                function showTabContent(i = 0) {
                    content[i].style.display = display;
                    tab[i].classList.add(activeClass);
                }
                hideTabContent();
                showTabContent();
                header.addEventListener("click", (e) => {
                    const target = e.target;
                    if (
                        target.classList.contains(tabSelector.replace(/\./, "")) ||
                        target.parentNode.classList.contains(tabSelector.replace(/\./, ""))
                    ) {
                        tab.forEach((item, i) => {
                            if (target == item || target.parentNode == item) {
                                hideTabContent();
                                showTabContent(i);
                            }
                        });
                    }
                });
            }
        })
        
        
    }
    tabs(
        ".tabs",
        ".tabs__header",
        ".tabs__header-item",
        ".tabs__content-item",
        "active"
    ); 
    // tabs(
    //     ".products-tabs__header",
    //     ".products-tabs__header-item",
    //     ".products-tabs__content-item",
    //     "active"
    // );  
    // tabs(
    //     ".accessories-tabs__header",
    //     ".accessories-tabs__header-item",
    //     ".accessories-tabs__content-item",
    //     "active"
    // );
    tabs(
        ".recomendation-tabs",
        ".recomendation-tabs__header",
        ".recomendation-tabs__header-item",
        ".recomendation-tabs__content-item",
        "active"
    );
    // tabs(
    //     ".recomendation-tabs__header",
    //     ".recomendation-tabs__header-item",
    //     ".recomendation-tabs__content-item",
    //     "active"
    // );   
    // AOS.init();
    
    //Mobile dropdown
    // let dropdownTriggers = document.querySelectorAll('.header__nav__mobile li.has-child')
    // dropdownTriggers.forEach(e=>{
    //     let subMenu = e.querySelector('.submenu')
    //     let link = e.querySelector('a');
    //     link.addEventListener('click', e=>{
    //         e.preventDefault()
    //     })
    //     e.addEventListener('click', ()=>{
    //         e.classList.toggle('active')
    //         subMenu.style.height = subMenu.style.height ? null : `${subMenu.scrollHeight}px`;
    //     })
    // })
    // Burger menu
    const burger = document.querySelector('.header-burger');
    const menu = document.querySelector('.header__nav');
    const tagBody = document.querySelector('body')
    burger.addEventListener('click', () => {
        tagBody.classList.toggle('body-hidden')
        burger.classList.toggle('active')
        menu.classList.toggle('active')
    })

    // function hideMenuResize() {
    //     const vw = window.innerWidth;
    //     if(vw > 991){
    //         menu.classList.remove('active')
    //         tagBody.classList.remove('body-hidden')
    //         burger.classList.remove('active')
    //     }
    //     // document.documentElement.style.setProperty("--vh", `${vh}px`);
    // }  
    // window.addEventListener("resize", hideMenuResize);
    // const header = document.querySelector('header'); 

    // if (!header) {
    //     return; 
    // }

    // Модальное окно
    // function bindModal(trigger, modal, close) {
    //     trigger = document.querySelectorAll(trigger),
    //     modal = document.querySelector(modal),
    //     close = document.querySelector(close)
    //     trigger.forEach(element => {
    //         element.addEventListener('click', e => {
    //             e.preventDefault()
    //             modal.style.display = 'flex'
    //         });
    //     });
    //     close.addEventListener('click', () => {
    //     modal.style.display = 'none'
    //     });
    //     modal.addEventListener('click', e => {
    //     if (e.target === modal) {
    //         modal.style.display = 'none'
    //     }
    //     })
    // }
    $('input[type="tel"]').mask("+7 (999) 999 99 99");
    // ПЕРВЫЙ аргумент - класс кнопки, при клике на которую будет открываться модальное окно.
    // ВТОРОЙ аргумент - класс самого модального окна.
    // ТРЕТИЙ аргумент - класс кнопки, при клике на которую будет закрываться модальное окно.
    // bindModal('.modal__btn', '.modal__wrapper', '.modal__close')

})