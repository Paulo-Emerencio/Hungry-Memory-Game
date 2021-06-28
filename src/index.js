document.addEventListener('DOMContentLoaded', () => {

    const arrCards = [
        {
            name: 'cheeseburger',
            img: 'src/images/cheeseburger.png',
        },
        {
            name: 'fries',
            img: 'src/images/fries.png',
        },
        {
            name: 'hotdog',
            img: 'src/images/hotdog.png',
        },
        {
            name: 'cookie',
            img: 'src/images/cookie.png',
        },
        {
            name: 'milkshake',
            img: 'src/images/milkshake.png',
        },
        {
            name: 'pizza',
            img: 'src/images/pizza.png',
        },
        {
            name: 'sushi',
            img: 'src/images/sushi.png',
        },
        {
            name: 'egg',
            img: 'src/images/egg.png',
        },
        {
            name: 'chicken',
            img: 'src/images/chicken.png',
        },
        {
            name: 'cheese',
            img: 'src/images/cheese.png',
        },
        {
            name: 'sunday',
            img: 'src/images/sunday.png',
        },
        {
            name: 'steak',
            img: 'src/images/steak.png',
        },
        {
            name: 'banana',
            img: 'src/images/banana.png',
        },
        {
            name: 'carrot',
            img: 'src/images/carrot.png',
        },
        {
            name: 'chocolate',
            img: 'src/images/chocolate.png',
        },
        {
            name: 'pancake',
            img: 'src/images/pancake.png',
        },
        {
            name: 'pudding',
            img: 'src/images/pudding.png',
        },
        {
            name: 'grape',
            img: 'src/images/grape.png',
        },
        {
            name: 'popcorn',
            img: 'src/images/popcorn.png',
        },
        {
            name: 'ice',
            img: 'src/images/ice.png',
        },
        {
            name: 'donut',
            img: 'src/images/donut.png',
        },
        {
            name: 'cake',
            img: 'src/images/cake.png',
        },
        {
            name: 'onigiri',
            img: 'src/images/onigiri.png',
        },
        {
            name: 'cutlet',
            img: 'src/images/cutlet.png',
        },
    ];

    const grid = document.querySelector('.grid');
    const level = document.querySelector('#level');
    const total = document.querySelector('#total');
    const result = document.querySelector('#result');
    const confirm = document.querySelector('#confirm');
    const difficulty = document.querySelector('#difficulty');

    const cardsSound = new Audio('src/audio/cards.mp3');
    const matchSound = new Audio('src/audio/match.mp3');
    const victorySound = new Audio('src/audio/victory.mp3');

    let currentDifficulty = difficulty.value;
    let cardChosenName = [];
    let cardChosenId = [];
    let cardsWon = [];
    let cards;
    
    confirm.addEventListener('click', function () {
        if (currentDifficulty != difficulty.value) {
            currentDifficulty = difficulty.value;
            startGame(true);
        }    
    });
    
    function startGame(cardSound) {
        arrCards.sort(() => 0.5 - Math.random());

        const arrCardsFiltered = arrCards.filter((elem,index) =>
            {if (index <= difficulty.value -1) return elem}
        );

        cards = arrCardsFiltered.concat(arrCardsFiltered);
        cards.sort(() => 0.5 - Math.random());
        
        const allCardsImg = document.querySelectorAll('img');
        allCardsImg.forEach(img => grid.removeChild(img));
        cardChosenName = [];
        cardChosenId = [];
        cardsWon = [];
        result.textContent = cardsWon.length;
        total.textContent = '/' + difficulty.value;

        if (difficulty.value == 6) {
            level.textContent = 'Easy:';
            grid.style.width = '436px';
        }
        if (difficulty.value == 12) {
            level.textContent = 'Normal:';
            grid.style.width = '654px';
        }
        if (difficulty.value == 24) {
            level.textContent = 'Hard:';
            grid.style.width = '872px';
        }

        if(cardSound)cardsSound.play();
        createBoard();
    }

    function createBoard() {
        for (let i = 0; i < cards.length; i++) {
            const back = document.createElement('img');
            flipCardAnimation(back, 'src/images/back.png')
            back.setAttribute('data-id', i);
            back.addEventListener('click', flipCard);
            grid.appendChild(back);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        let cardSrcValue = cards[cardId].img;
        
        cardChosenName.push(cards[cardId].name);
        cardChosenId.push(cardId);

        if (cardChosenId.length === 1) {
            flipCardAnimation(this, cardSrcValue);
        } else if (cardChosenId.length === 2) {
            if (cardChosenId[0] === cardChosenId[1]) {
                cardChosenName.pop();
                cardChosenId.pop();
            } else {
                flipCardAnimation(this, cardSrcValue);
                setTimeout(checkForMatch, 700);
            }
        }
    }

    function flipCardAnimation(thisCard, srcValue) {
        thisCard.classList.add('turn');
        setTimeout(() => {
            thisCard.setAttribute('src', srcValue);
            thisCard.classList.remove('turn');
        }, 200);
    }

    function checkForMatch() {
        const image = document.querySelectorAll('img');

        if (cardChosenName[0] === cardChosenName[1]) {
            image[cardChosenId[0]].removeEventListener('click', flipCard);
            image[cardChosenId[1]].removeEventListener('click', flipCard);
            cardsWon.push(cardChosenName);
            result.textContent = cardsWon.length;
            if (cardsWon.length < cards.length / 2) matchSound.play();
        } else {
            flipCardAnimation(image[cardChosenId[0]], 'src/images/back.png');
            flipCardAnimation(image[cardChosenId[1]], 'src/images/back.png');
        }

        cardChosenName = [];
        cardChosenId = [];

        if (cardsWon.length === cards.length / 2) {
            victorySound.play();
            total.textContent = '';
            result.textContent = 'Congratulations, you have won!';
            setTimeout(startGame, 5000, true);
        }
    }

    startGame();
});