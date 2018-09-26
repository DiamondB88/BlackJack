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

  const suits = ['Diamonds','Clubs','Hearts','Spades'];

  class Card {
    constructor(name,face,suit,value) {
      this.name=name;
      this.face=face;
      this.suit=suit;
      this.value=value;
    }
  }

  let deck = [];

  const shuffleDeck = () => {
    deck=[];

    for (var i = 0; i < face.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        let placeHolder;
        if (i > 9) {
          placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j],10 )
        }else {
          placeHolder = new Card(face[i] + ' of' + suits[j],face[i],suits[j], i + 1)
        }
        deck.push(placeHolder)
      }
    }
  }
  shuffleDeck();

  class Gamehand {
    constructor(player,cards,value){
    this.player = 'none';
    this.cards = [];
    this.value = 0;
  }
}

  let playerHand = null;
  let dealerHand = null;

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
    for (var i = 0; i < 2; i++) {
      hitMe(playerHand);
      hitMe(dealerHand);
      showDealerValue()
    }
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
        nums.unshift(addGamehand.cards[i])
      }else {
        nums.push(addGamehand.cards[i]);
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

  const createCards = ( createPlayer, createColor, createFace, createSuit, createHand) => {
    console.log('in create cards');
    let str = $('<div>').addClass('card-pile')
    console.log(str);
    str = str.addClass(createColor);
    console.log(createFace);
    str = str.text(createFace + createSuit);
console.log(createPlayer);
    if (createPlayer == 'player') {
      console.log('heyheyhey');
      $('.player1-cards').append(str);
      if (createHand.cards.length == 1) {
        $('.player1-cards > .card-pile').addClass('first')
      }
    }
    else {
      $('.dealer-cards').append(str);
      if (createHand.cards.length == 1) {
        $('.dealer-cards > .card-pile').addClass('first')
      }
    }
  }
  const hitMe = (hitHand) => {
    const card = Math.floor((Math.random() * (deck.length - 1)));
    let placeHolder1 = deck[card];
    hitHand.cards.push(placeHolder1);
    hitHand.value = getTotal(hitHand);
    console.log(hitHand);
    if (deck[card].suit == 'Diamonds') {
      if (hitHand.player == 'player') {
        createCards('player', 'red', deck[card].face, '♦',hitHand)
      }
      else {
        createCards('dealer', 'red', deck[card].face, '♦',hitHand)
      }
    }
    if (deck[card].suite == 'Clubs') {
      if (hitHand.player == 'player') {
        createCards('player', 'black', deck[card].face, '♣',hitHand)
      }
      else {
        createCards('dealer', 'black', deck[card].face, '♣',hitHand)
      }
    }
    if (deck[card].suite == 'Spades') {
      if (hitHand.player == 'player') {
        createCards('player', 'black', deck[card].face, '♠',hitHand)
      }
      else {
        createCards('dealer', 'black', deck[card].face, '♠',hitHand)
      }
    }
    if (deck[card].suite == 'Hearts') {
      if (hitHand.player == 'player') {
        createCards('player', 'red', deck[card].face, '♥',hitHand)
      }
      else {
        createCards('dealer', 'red', deck[card].face, '♥',hitHand)
      }
    }
    deck.splice(card,1);
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
