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
    ];
    
    const grid = document.querySelector('.grid');
    const cards = arrCards.concat(arrCards);
    const result = document.querySelector('#result');
    const matchSound = new Audio('src/audio/popup.mp3');
    const victorySound = new Audio('src/audio/victory.mp3');
    let cardChosenName = [];
    let cardChosenId = [];
    let cardsWon = [];

    function createBoard() {
        cards.sort(() => 0.5 - Math.random());

        for (let i = 0; i < cards.length; i++) {
            const blank = document.createElement('img');
            blank.setAttribute('src', 'src/images/blank.png');
            blank.setAttribute('data-id', i);
            blank.addEventListener('click', flipCard);
            grid.appendChild(blank);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        cardChosenName.push(cards[cardId].name);
        cardChosenId.push(cardId);

        if (cardChosenId.length === 1) {
            flipCardAnimation(this, cards[cardId].img);
        } else if (cardChosenId.length === 2) {
            if (cardChosenId[0] === cardChosenId[1]) {
                cardChosenName.pop();
                cardChosenId.pop();
            } else {
                flipCardAnimation(this, cards[cardId].img);
                setTimeout(checkForMatch, 700);
            }
        }
    }

    function flipCardAnimation(thisCard, srcValue) {
        thisCard.classList.add('turn');
        setTimeout(() => {
            thisCard.setAttribute('src', srcValue);
            thisCard.classList.remove('turn');
        },200);
    }

    function checkForMatch() {
        const cardImg = document.querySelectorAll('img');

        if (cardChosenName[0] === cardChosenName[1]) {
            cardImg[cardChosenId[0]].removeEventListener('click', flipCard);
            cardImg[cardChosenId[1]].removeEventListener('click', flipCard);
            cardsWon.push(cardChosenName);
            result.textContent = cardsWon.length;
            if (cardsWon.length < cards.length / 2) matchSound.play();
        } else {
            flipCardAnimation(cardImg[cardChosenId[0]], 'src/images/blank.png');
            flipCardAnimation(cardImg[cardChosenId[1]], 'src/images/blank.png');
        }
        cardChosenName = [];
        cardChosenId = [];

        if (cardsWon.length === cards.length / 2) {
            victorySound.play();
            result.textContent = 'Congratulations, you have won!';
            setTimeout(resetGame, 5000, cardImg)
        }
    }

    function resetGame(image) {
        for (let i = 0; i < cards.length; i++) {
            grid.removeChild(image[i]);
        }
        cardsWon = [];
        result.textContent = cardsWon.length;

        createBoard();
    }

    createBoard();
});