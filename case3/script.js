(function () {
  var images = [
    'https://picsum.photos/seed/s1/800/600',
    'https://picsum.photos/seed/s2/800/600',
    'https://picsum.photos/seed/s3/800/600',
    'https://picsum.photos/seed/s4/800/600',
    'https://picsum.photos/seed/s5/800/600'
  ];

  var total = images.length;
  var current = 0;

  var imgEl = document.getElementById('sliderImage');
  var counterEl = document.getElementById('sliderCounter');
  var btnPrev = document.getElementById('btnPrev');
  var btnNext = document.getElementById('btnNext');

  function showSlide(index) {
    current = index;
    imgEl.src = images[current];
    imgEl.alt = 'Слайд ' + (current + 1);
    counterEl.textContent = 'Изображение ' + (current + 1) + ' из ' + total;
  }

  function goPrev() {
    var prev = current - 1;
    if (prev < 0) prev = total - 1;
    showSlide(prev);
  }

  function goNext() {
    var next = current + 1;
    if (next >= total) next = 0;
    showSlide(next);
  }

  btnPrev.addEventListener('click', goPrev);
  btnNext.addEventListener('click', goNext);

  showSlide(0);
})();
