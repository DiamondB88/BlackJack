$(() => {

  const $openBtn = $('#about-modal');
  const $modal = $('#modal');
  const $closeBtn = $('#closeModal');

  const openModal = () => {
    $modal.css('display', 'block');
}

  const closeModal = () => {
    $modal.css('display', 'none');
}

  $openBtn.on('click', openModal);

  $closeBtn.on('click', closeModal);

  setTimeout(openModal, 2000)

  let money = 1000;
  let bet = 10;
  // let currentBet = $('#bet').html();


  const face = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  const suits = ['♦','♣','♥','♠'];

  class Card {
    constructor(name,face,suit,value,color) {
      this.name=name;
      this.face=face;
      this.suit=suit;
      this.value=value;
      this.color = color;
    }
  }

  let deck = [];
// Fisher Yates shuffle https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

  const shuffleDeck = () => {
    deck=[];

    for (var i = 0; i < face.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        let placeHolder;
        // set face card value
        if (i > 9) {
          if (i%2 == 0) {
            placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j],10, 'red')
          }else {
            placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j],10, 'black')
          }
        }
          // regular values
        else {
          if (i%2 == 0) {
            placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j], i + 1,'red')
          }
          else {
            placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j], i + 1,'black')
          }
        }
        deck.push(placeHolder)
      }
    }
    shuffle(deck);
  }
  shuffleDeck();


  class Gamehand {
    constructor(player,cards,value){
    this.player = 'none';
    this.cards = [];
    this.value = 0;
  }
}

  let playerHand = {};
  let dealerHand = {};

  const play = () => {
     playerHand = new Gamehand;
     dealerHand = new Gamehand;
    playerHand.player = 'player';
    dealerHand.player = 'Dealer';
    firstDeal();
    showPlayerValue();
    if (playerHand.value === 21) {
      win();
      alert('BlackJack!')
      $('#startover').on(click, reset)
      if (dealerHand.value === 21) {
        loose();
        alert('Dealer has BlackJack! Try again.')
      }
      if (deck.length < 10) {
        shuffleDeck();
      }
    }
  }

  const firstDeal = () => {
      hitMe(playerHand);
      hitMe(dealerHand);
      hitMe(playerHand);
      hitMe(dealerHand);
      showDealerValue()

  }

  const showPlayerValue = () => {

    $('.gameboard').append('<div>').addClass('playerValue').text(playerHand.value.toString());
    if (playerHand.value > 21) {
      alert('You bust!');
      lose();
    }
  }

  const showDealerValue = () => {

    $('.gameboard').append('<div>').addClass('dealerValue').text(dealerHand.value.toString());
    if (dealerHand.value > 21) {
      alert('Dealer Bust!');
      win();
    }
  }

  const getTotal = (addGamehand) => {
    let total;
    let nums =[];
    for (var i = 0; i < addGamehand.cards.length; i++) {
      if (addGamehand.cards[i].face != 'A') {
        nums.unshift(addGamehand.cards[i].value)
      }else {
        nums.push(addGamehand.cards[i].value);
      }
    }
    for (var i = 0; i < nums.length; i++) {
      if (nums[i].face != 'A') {
        total += nums[i].value;
      }
      else if (total < 11) {
        total += 11;
      }
      else {
        total += 1;
        }
      }

    return total;
  }

  const createCards = ( player,card) => {
    console.log(player);
    console.log(card);
    // console.log('in create cards');
    let str = $('<div>').addClass('card-pile')
    // console.log(str);
    str = str.addClass(card.color);
    // console.log(createFace);
    str = str.text(card.face + card.suit);
// console.log(createPlayer);
    if (player == 'player') {
      // console.log('heyheyhey');
      $('.player1-cards').append(str);
      if (card.length == 1) {
        $('.player1-cards > .card-pile').addClass('first')
      }
    }
    else {
      $('.dealer-cards').append(str);
      if (card.length == 1) {
        $('.dealer-cards > .card-pile').addClass('first')
      }
    }
  }
  const hitMe = (hitHand) => {
    const card = deck.pop();
    let placeHolder1 = card;
    hitHand.cards.push(placeHolder1)
    console.log(hitHand);
      if (hitHand.player == 'player') {
        console.log(playerHand);
        playerHand.cards.push(card);
        hitHand.value = getTotal(playerHand);
        createCards('player', card)
      }
      else {
        dealerHand.cards.push(card);
        hitHand.value = getTotal(dealerHand);
        createCards('dealer', card)
      }

  }

  const dealer = () => {
    if (playerHand.value<22) {
      if (dealerHand.value < 17) {
        hit(dealerHand);
        dealer();
      }
      checkTotal();
    }
  }
  const win = () => {
    $('.gameboard').append('<div>').addClass('result');
    money += currentBet;
    alert('You win $' + currentBet)
  }
  const lose = () => {
    $('.gameboard').append('<div>').addClass('result');
    money -= currentBet;
    alert('You loose $' + currentBet)
  }

  const checkTotal = () => {
    if (playerHand.value < 22) {
      if (playerHand.value > dealerHand.value) {
        win();
      }
      else if (dealerHand.value < 22) {
        if (playerHand.value < dealerHand.value) {
          lose();
        }
        else {
          alert('Draw')
        }
      }
    }
    if (dealerHand.value == 21) {
      loose();
    }
  if (cash < 0) {
    $('gameboard').append('<div>').addClass('hide').text('Game Over');
    $('startover').removeClass('hide');
  }
  if (deck.length < 10) {
    shuffleDeck();
    }
  }

  const reset = () => {
    money = 1000;
    bet = 10;
    shuffleDeck();
  }


  $('#hit').on('click', () => {
    hitMe(playerHand);
    showPlayerValue();
  })

  $('#stand').on('click', () => {
    hitMe(dealerHand);
    dealer();
  })

  $('#bet').on('click',()=>{
    let bet = 10;
    let currentBet =+ 10;
    if (money < bet) {
      alert('not enough money')
    }
  })

  $('#deal').on('click', () => {
    play();
  })


 })
