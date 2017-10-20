$( document ).ready(function() {
  $('#colour-filter li').on('click', function() {
    filterColour($(this).children('a').data('filter'));
  });

  $('#colour-grid > div > div').on('click', function() {
    displayColourModal($(this));
  });

  hideColours('gbc-red'); // start by showing red

  var theYear = new Date().getFullYear(); // set copyright year in footer
  $('#year').html(' 1995 - ' + theYear);

  // lazy load images
  [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
      img.removeAttribute('data-src');
    };
  });
});

function filterColour(colour) {
  var colourGrid = $('#colour-grid');

  colourGrid.removeClass('uk-animation-slide-left-small')
    .addClass('uk-animation-slide-right-small uk-animation-reverse uk-animation-fast');

  setTimeout(function() {
    hideColours(colour);

    colourGrid.removeClass('uk-animation-slide-right-small uk-animation-reverse')
      .addClass('uk-animation-slide-left-small');
  }, 100);
}

function hideColours(colour) {
  $('#colour-grid').children('div').removeAttr('hidden').each(function() {
    if ($(this).data('filter-colour').search(colour)) {
      $(this).attr('hidden', '');
    }
  });
}

function displayColourModal(colour) {
  var colourModal = $('#colour-modal');

  var colourGroup = colour.parent().data('filter-colour-group').slice(4).toUpperCase(); // remove gbc-
  var colourName = colour.data('colour-name');
  var colourCode = colour.data('colour-code');
  var colourHex = colour.css('background-color');

  var colourTitle = colourName + " (" + colourGroup + " " + colourCode + ")";

  colourModal.find('.uk-modal-body').css('background-color', colourHex);
  colourModal.find('.uk-modal-title').text(colourTitle);

  UIkit.modal('#colour-modal').show();
}
