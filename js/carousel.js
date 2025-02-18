"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement, // Это <html>
          btnPrev = document.querySelector("button.prev"),
          btnNext = document.querySelector("button.next"),
          currentValueSelector = document.querySelector(".current-slide-count"),
          totalValueSelector = document.querySelector(".total-slide-count"),
          navigationBar = document.querySelector(".navigation"),
          dots = document.querySelectorAll(".navigation li");
    let currentSlide = +getComputedStyle(root).getPropertyValue("--current_slide"),
        carouselLength = +getComputedStyle(root).getPropertyValue("--carousel_length");

    setCounterTotalValue(carouselLength, totalValueSelector);

    function setCounterCurrentValue(value, currentValueSelector) {
        if (value < 10){
            value = `0${value}`;
        }
        currentValueSelector.textContent = String(value);
    }
    function setCounterTotalValue(value, totalValueSelector) {
        if (value < 10){
            value = `0${value}`;
        }
        totalValueSelector.textContent = String(value);
    }
    function setCurrentSlide(currentSlide, root, currentValueSelector) {
        root.style.setProperty("--current_slide", currentSlide);
        setCounterCurrentValue(currentSlide, currentValueSelector);
    }
    function setCurrentDot(dots, currentSlide){
        for (let dot of dots) {
            if (dot.classList.contains("active")) {
                dot.classList.remove("active");
                break;
            }
        }

        dots[currentSlide - 1].classList.add("active");
    }

    btnNext.addEventListener("click", () => {
        if (currentSlide >= carouselLength) {
            currentSlide = 1;
        } else{
            currentSlide += 1;
        }
        setCurrentSlide(currentSlide, root, currentValueSelector);
        setCurrentDot(dots, currentSlide);
    });
    btnPrev.addEventListener("click", () => {
        if (currentSlide <= 1) {
            currentSlide = carouselLength;
        } else{
            currentSlide -= 1;
        }
        setCurrentSlide(currentSlide, root, currentValueSelector);
        setCurrentDot(dots, currentSlide);
    });

    // Навигация, делегирование
    navigationBar.addEventListener("click", (e) => {
        const slide = e.target.getAttribute("data-slide");
        if (slide != null){
            dots[currentSlide - 1].classList.toggle("active");
            currentSlide = slide;
            dots[currentSlide - 1].classList.toggle("active");
            setCurrentSlide(currentSlide, root, currentValueSelector);
        }
    });
});