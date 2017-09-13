$( document ).ready(function() {
  $('#colour-filter li').on('click', function() {
    filterColour($(this).children('a').data('filter'));
  });

  $('#colour-grid > div').on('click', function() {
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

  var colourGroup = colour.data('filter-colour-group').slice(4).toUpperCase(); // remove gbc-
  var colourName = colour.children('div').data('colour-name');
  var colourCode = colour.children('div').data('colour-code');
  var colourHex = colour.children('div').css('background-color');

  var colourTitle = colourName + " (" + colourGroup + " " + colourCode + ")";

  colourModal.find('.uk-modal-body').css('background-color', colourHex);
  colourModal.find('.uk-modal-title').text(colourTitle);

  UIkit.modal('#colour-modal').show();
}
