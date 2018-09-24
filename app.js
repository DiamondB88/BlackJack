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

  setTimeout(openModal, 3000)

})
