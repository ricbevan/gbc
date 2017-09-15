$( document ).ready(function() {
  $('#colour-filter li').on('click', function() {
    filterColour($(this).children('a').data('filter'));
  });

  $('#colour-grid > div > div').on('click', function() {
    displayColourModal($(this));
  })

  $('#colour-filter li').first().trigger('click'); // trigger red select
});

function filterColour(colour) {
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
