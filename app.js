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

  const money = 1000;


  const face = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

  const suits = ['Diamonds','Clubs','Hearts','Spades'];

  const card = (name,face,suit,value) => {
    this.name=name;
    this.face=face;
    this.suit=suit;
    this.value=value;
  }

  const deck = [];

  const shuffleDeck = () => {
    deck=[];

    for (var i = 0; i < face.length; i++) {
      for (var j = 0; j < suits.length; j++) {
        let placeHolder;
        if (i > 9) {
          placeHolder = new card(face[i] + 'of' + suits[j],face[i],suits[j],10 )
        }else {
          placeHolder = new card(face[i] + 'of' + suits[j],face[i],suits[j], i + 1)
        }
        deck.push(placeHolder)
      }
    }
  }
  shuffleDeck();

  
})
