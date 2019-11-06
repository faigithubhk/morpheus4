window.onload = () => {
	const 	resetButton = document.querySelector('.restart'),
	starOne = document.querySelector('#star1'),
	starTwo = document.querySelector('#star2'),
	starThree = document.querySelector('#star3'),
	starsNumber = document.querySelector('.stars-number'),
	moves = document.querySelector('.moves'),
	modal = document.querySelector('.modal'),
	modalClose = document.querySelector('.close-button'),
	playAgainBtn = document.querySelector('button');

	let cards = document.querySelectorAll('.card'),
		deck = document.querySelector('.deck'),
		everyCard = [...cards],
		shownCards = [],
		trackGuesses = [],
		count = 0,
		matchesTotal = 0,
		numMoves = 0,
		starsNum = 3,
		timer = 0;

	// Reset everything over button
	resetButton.addEventListener('click', resetGame);
	//Function that resets game
	function resetGame() {
		timer = 0;
		count = 0;
		starsNum = 3;
		clearTimeout(timeCount);
		shownCards = [];
		trackGuesses = [];
		document.querySelector('.timer').innerHTML = 0;
		numMoves = 0;
		matchesTotal = 0;
		moves.innerHTML = 0;
		starOne.style.display = "block";
		starTwo.style.display = "block";
		starThree.style.display = "block";
		startGame();
	}
	//Let the games begin!
	startGame();
	//Function that starts the game
	function startGame() {
		starsNum = 3;
		startTimer();
		closeModal();
		let shuffledCards = shuffle(everyCard);
		shuffledCards.forEach((shuffledCard) => {
			deck.appendChild(shuffledCard);
			shuffledCard.classList.remove('open', 'show', 'match');
			shuffledCard.addEventListener('click', flipCards);
		});
	}
	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array) {
		var currentIndex = array.length,
			temporaryValue, randomIndex;

		while (currentIndex !== 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	}
	// Flips card function
	function flipCards(event) {
		//Prevents double-clicking of the same card if it's been flipped
		if (event.target.classList.contains('open')) {
			return;
		}
		//Check card conditions
		checkCards();
	}
	//Function checks cards and pushes info into arrays, applies classes for matches and non-matches with timeouts
	let checkCards = () => {
		if (count < 2) {
			if (event.target.className === "card") {
				count++;
				event.target.classList.add('show', 'open');
				if (count === 2) {
					trackMoveCount();
				}
			}
			if (trackGuesses.length !== 2 && event.target.className === "card show open" && shownCards.length !== 2) {
				trackGuesses.push(event.target.innerHTML)
				shownCards.push(event.target);
			}
			// Checks to see if cards match if more than one card is flipped
			if (trackGuesses.length > 1) {
				if (trackGuesses[0] === trackGuesses[1]) {
					matchCards();
				} else if (trackGuesses[0] !== trackGuesses[1]) {
					turnOverCards();
				}
			}
		}
		// Game Over Modal upon matching all cards. Stops timer.
		if (matchesTotal === 8) {
			clearTimeout(timeCount);
			openModal();
		}
	}
	//Function that lets cards stay up if matched
	let matchCards = () => {
		trackScore();
		setTimeout(() => {
			shownCards[0].classList.add('match');
			shownCards[1].classList.add('match');
			resetGuesses();
		}, 200);
	}
	//Function that turns cards over if cards don't match
	let turnOverCards = () => {
		setTimeout(() => {
			shownCards[0].classList.remove('open');
			shownCards[0].classList.remove('show');
			shownCards[1].classList.remove('open');
			shownCards[1].classList.remove('show');
			resetGuesses();
		}, 700);
	}
	//Function that resets guesses after each guess
	let resetGuesses = () => {
		trackGuesses = [];
		shownCards = [];
		count = 0;
	}
	// Function that tracks moves and adds as game goes on
	function trackMoveCount() {
		numMoves++;
		moves.innerHTML = numMoves;
		if (numMoves === 15) {
			starOne.style.display = "none";
			starsNum--;
		} else if (numMoves === 30) {
			starTwo.style.display = "none";
			starsNum--;
		}
	}
	//Function that tracks matches until game is over
	let trackScore = () => {
		matchesTotal++;
	}
	playAgainBtn.addEventListener('click', playAgain);
	//Close Modal button
	modalClose.addEventListener('click', closeModal);
	//Function that opens modal
	let openModal = () => {
		if (starsNum === 1) {
			starsNumber.innerHTML = ` ${starsNum} star`;
		} else {
			starsNumber.innerHTML = ` ${starsNum} stars`;
		}
		document.querySelector('.modal-time').innerHTML = `${timer} seconds`;
		modal.style.display = "block";
	}
	//Function that resets game when the play again button is chosen
	function playAgain() {
		closeModal();
		resetGame();
	}
	//Function that closes modal
	function closeModal() {
		modal.style.display = "none";
	}
	// Function that starts timer
	function startTimer() {
		timer++;
		document.querySelector('.timer').innerHTML = timer;
		timeCount = setTimeout(startTimer, 1000);
	}
}