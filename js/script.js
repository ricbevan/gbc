$( document ).ready(function() {
  $('#gallery a').on('click', function (e) { // on gallery image click, set the gallery modal image
    var clickedImage = $(e.target).parent().parent().children('img').attr('src');
    $('#gallery-modal').find('img').attr('src', clickedImage);
  });

    $('#colours a').on('click', function (e) { // on gallery image click, set the gallery modal image
      var clickedColour = $(e.target).parent().css('backgroundColor');
      var clickedColourName = $(e.target).parent().find('span.name').text();
      var clickedColourCode = $(e.target).parent().find('span.code').text();

      $('#colour-modal').find('.uk-modal-body').css('backgroundColor', clickedColour);
      $('#colour-modal').find('.uk-modal-caption').text(clickedColourName + " (" + clickedColourCode + ")");
    });

    $('#colour-select li').on('click', function(e) {

      if ($(e.target).text() == 'All') { // if all colours are selected
        $('#colour-select').parent().siblings('button').text('Choose colour');
        $('#colours h3').text('Colours');
      } else { // or if a specific colour is selected
        $('#colour-select').parent().siblings('button').text('Change colour');
        $('#colours h3').text('Colours (' + $(e.target).text().replace(/\//g, "s/") + 's)');
      }

      $('#colour-select li').removeClass('uk-active'); // set all colours in the drop-down list as inactive
      $(e.target).parent().addClass('uk-active'); // set the selected colour in the drop-down list as active

      $('#colours .uk-grid-match').addClass('uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'); // fade colours out right

      setTimeout( function() { // wait 1/2 a second
        $('#colours .uk-grid-match div').removeClass('uk-hidden'); // set all colours as hidden

        $('#colours .uk-grid-match > div').each(function() {
          if ((!$(this).hasClass('gbc-' + $(e.target).text().toLowerCase())) && ($(e.target).text() != 'All')) {
            $(this).addClass('uk-hidden'); // hide all colours that shouldn't be shown
          }
        });

        setTimeout( function() { // wait a split second to remove the animation classes (so they can be re-added)
          $('#colours .uk-grid-match').removeClass('uk-animation-slide-right-small uk-animation-reverse uk-animation-fast');

          setTimeout( function() { // wait a split second to add re-animate colours back in
            $('#colours .uk-grid-match').addClass('uk-animation-slide-left-small uk-animation-fast');
          }, 50);
        }, 50);
      }, 100);
    });
});
