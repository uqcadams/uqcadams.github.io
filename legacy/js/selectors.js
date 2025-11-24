// DOM SELECTORS
let currentSection;

let currentSectionIndex;

const menu = document.querySelector('.menu');

const sectionTitles = document.querySelectorAll('.section-title');

const pageIndex = [];

for (i = 0; i < sectionTitles.length; i++){
    pageIndex.push(sectionTitles[i].textContent);
}

const navIndicators = document.querySelectorAll('.nav');

const hamburger = document.querySelector('.hamburger-container');
const hamburgerTop = document.querySelector('#top');
const hamburgerMid = document.querySelector('#mid');
const hamburgerBot = document.querySelector('#bottom');

const learnMore = document.querySelectorAll('.text .text-btn');
const closeLearnMore = document.querySelectorAll('.text-full .text-btn');

const footer = document.querySelector('.footer');
