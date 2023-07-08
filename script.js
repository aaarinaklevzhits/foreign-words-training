'use strict';

const words = [{
        english: 'apple',
        russian: 'яблоко',
        example: 'The people believed that the last eaten apple has the ability to fulfill the most cherished desire.',
    },
    {
        english: 'orange',
        russian: 'апельсин',
        example: 'The orange colour of the oranges is a very effective criterion to judge the maturity.',
    },
    {
        english: 'watermelon',
        russian: 'арбуз',
        example: 'You know, I have made the grilled watermelon with the charred beef and fennel.',
    },
    {
        english: 'pear',
        russian: 'груша',
        example: 'Due to its antioxidant properties, the pear is able to "heal" the digestive system.',
    },
    {
        english: 'banana',
        russian: 'банан',
        example: 'If you do not like fish, eat ice cream or banana.',
    }
];

const flipCard = document.querySelector('.flip-card');
const buttonBack = document.querySelector('#back');
const buttonNext = document.querySelector('#next');
let currentWord = document.querySelector('#current-word');
let totalWord = document.querySelector('#total-word');
let frontWord = document.querySelector('.flip-card-front h1');
let backWord = document.querySelector('.flip-card-back h1');
let backExample = document.querySelector('.flip-card-back span');
const buttonShuffle = document.querySelector('#shuffle-words');

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

flipCard.addEventListener('click', function() {
    flipCard.classList.toggle('active');
});

let i = 1;

function addWords() {
    frontWord.textContent = (words[i - 1]['english']);
    backWord.textContent = (words[i - 1]['russian']);
    backExample.textContent = (words[i - 1]['example']);
}
addWords();

currentWord.value = 1;
totalWord = words.length;

buttonNext.addEventListener('click', function() {
    currentWord.textContent = ++i;
    if (i === totalWord) {
        buttonNext.disabled = true;
    }
    flipCard.classList.remove('active');
    buttonBack.disabled = false;
    addWords();
});

buttonBack.addEventListener('click', function() {
    currentWord.textContent = --i;
    if (i === totalWord) {
        buttonBack.disabled = false;
    } else if (i === 1) {
        buttonBack.disabled = true;
    }
    buttonNext.disabled = false;
    flipCard.classList.remove('active');
    addWords();
});

function shuffleWords(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = getRandom(currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

buttonShuffle.addEventListener('click', function() {
    shuffleWords(words)
    addWords();
});

const buttonExam = document.querySelector('#exam');
const examCards = document.querySelector("#exam-cards");
const examTimer = document.querySelector("#time");
let timer;

function addExamCard() {
    const fragment = new DocumentFragment();
    for (let i = 0; i < words.length; i++) {
        const englishElement = document.createElement('div');
        englishElement.classList.add('card');
        englishElement.textContent = words[i].english;
        examCards.append(englishElement);

        const russianElement = document.createElement('div');
        russianElement.classList.add('card');
        russianElement.textContent = words[i].russian;
        examCards.append(russianElement);
    }
    document.body.append(fragment);
};

buttonExam.addEventListener("click", () => {
    flipCard.hidden = true;
    document.querySelector("#exam-mode").classList.remove("hidden");
    document.querySelector("#study-mode").hidden = true;
    document.querySelector(".slider-controls").hidden = true;
    addExamCard();

    const cards = document.querySelectorAll("#exam-cards div");

    cards.forEach(card => {
        card.style.order = getRandom(cards.length);
    });

    timer = setInterval(() => {
        let minutes = examTimer.textContent.split(":")[0];
        let seconds = examTimer.textContent.split(":")[1];
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (seconds < 10) {
            examTimer.textContent = minutes + `:0` + seconds;
        } else {
            examTimer.textContent = minutes + `:` + seconds;
        }
    }, 1000)
})

const possibleWords = {
    apple: 'яблоко',
    orange: 'апельсин',
    watermelon: 'арбуз',
    pear: 'груша',
    banana: 'банан',
};

const objectLength = Object.keys(possibleWords).length;

let firstWord;
let secondWord;
let click = true;
let counter = 0;

examCards.addEventListener('click', function(event) {
    const target = event.target;
    if (click) {
        click = false;
        firstWord = target;
        firstWord.classList.add('correct');
    } else {
        secondWord = target;
        if (possibleWords[firstWord.textContent] === secondWord.textContent || possibleWords[secondWord.textContent] === firstWord.textContent) {
            secondWord.classList.add('correct');
            firstWord.classList.add('fade-out');
            secondWord.classList.add('fade-out');
            counter++;
            countExamProgress(counter);
            examProgress.innerHTML = examProgress.value + '%';
            correctPercent.innerHTML = Math.round(examProgress.value) + '%';
            setTimeout(() => {
                if (counter === objectLength) {
                    clearInterval(timer);
                    alert('У тебя получилось!');
                }
            }, 100);
        } else {
            secondWord.classList.add('wrong');
            setTimeout(() => {
                firstWord.classList.remove('correct');
                secondWord.classList.remove('wrong');
            }, 500)
        }
        click = true;
    }
});


let correctPercent = document.querySelector('#correct-percent');
let examProgress = document.querySelector('#exam-progress');


function countExamProgress(procent) {

    examProgress.value = 0;

    switch (counter) {
        case 1:
            return (examProgress.value += 20);
        case 2:
            return (examProgress.value += 40);
        case 3:
            return (examProgress.value += 60);
        case 4:
            return (examProgress.value += 80);
        case 5:
            return (examProgress.value += 100);
        default:
            break;
    }

    return examProgress.value;
};