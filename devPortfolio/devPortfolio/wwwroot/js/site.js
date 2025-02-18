﻿function generateStars(numStars, width, height, opacity) {
    return Array.from({ length: numStars }, () => {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        return `${x}px ${y}px rgba(255, 255, 255, ${opacity})`;
    }).join(", ");
}

function setupStarLayers() {
    const width = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--starFieldWidth'));
    const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--starFieldHeight'));

    document.documentElement.style.setProperty('--smallStars', generateStars(1700, width, height, 0.5));
    document.documentElement.style.setProperty('--mediumStars', generateStars(700, width, height, 0.8));
    document.documentElement.style.setProperty('--largeStars', generateStars(200, width, height, 1));
}

function createShootingStar() {
    const shootingStar = document.createElement("div");
    shootingStar.classList.add("shooting-star");

    shootingStar.style.top = `${Math.random() * window.innerHeight * 0.7}px`;
    shootingStar.style.left = `${Math.random() * window.innerWidth * 0.7}px`;

    document.querySelector(".shooting-stars").appendChild(shootingStar);

    shootingStar.addEventListener("animationend", () => {
        shootingStar.remove();
    });
}

function randomizeShootingStars() {
    setInterval(() => {
        if (Math.random() > 0.7) createShootingStar();
    }, Math.random() * 2000 + 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    setupStarLayers();
    randomizeShootingStars();
});
