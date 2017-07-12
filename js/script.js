$( document ).ready(function() {
  $('#gallery a').on('click', function (e) { // on gallery image click, set the gallery modal image
    var clickedImage = $(e.target).parent().parent().children('img').attr('src');
    $('#gallery-modal').find('img').attr('src', clickedImage);
  });

  $('#colours a').on('click', function (e) { // on gallery image click, set the gallery modal image
    var colour = $(e.target).parent();
    var colourModal = $('#colour-modal');

    var clickedColour = colour.css('backgroundColor');
    var clickedColourName = colour.find('span.name').text();
    var clickedColourCode = colour.find('span.code').text();

    colourModal.find('.uk-modal-body').css('backgroundColor', clickedColour);
    colourModal.find('.uk-modal-caption').text(clickedColourName + " (" + clickedColourCode + ")");
  });

  $('#colour-select li').on('click', function(e) {
    var colourOption = $(e.target);
    var colourSelectList = $('#colour-select');
    var colourSectionHeader = $('#colours h3');
    var colourList = $('#colours .uk-grid-match');

    if (colourOption.text() == 'All') { // if all colours are selected
      colourSelectList.parent().siblings('button').text('Choose colour');
      colourSectionHeader.text('Colours');
    } else { // or if a specific colour is selected
      colourSelectList.parent().siblings('button').text('Change colour');
      colourSectionHeader.text('Colours (' + $(e.target).text().replace(/\//g, "s/") + 's)'); // add s to all colours e.g. red = reds
    }

    colourSelectList.children('li').removeClass('uk-active'); // set all colours in the drop-down list as inactive
    colourOption.parent().addClass('uk-active'); // set the selected colour in the drop-down list as active

    colourList.addClass('uk-animation-slide-right-small uk-animation-reverse uk-animation-fast'); // fade colours out right

    setTimeout( function() { // wait 1/2 a second
      colourList.children('div').removeClass('uk-hidden'); // set all colours as hidden

      colourList.children('div').each(function() {
        var colourOptionFixedText = colourOption.text().replace(/\//g, "-").toLowerCase();

        if ((!$(this).hasClass('gbc-' + colourOptionFixedText)) && (colourOption.text() != 'All')) {
          $(this).addClass('uk-hidden'); // hide all colours that shouldn't be shown
        }
      });

      setTimeout( function() { // wait a split second to remove the animation classes (so they can be re-added)
        colourList.removeClass('uk-animation-slide-right-small uk-animation-reverse uk-animation-fast');

        setTimeout( function() { // wait a split second to add re-animate colours back in
          colourList.addClass('uk-animation-slide-left-small uk-animation-fast');
        }, 50);
      }, 50);
    }, 100);

    $('#colours button').last().trigger('click'); // show all colours
  });

  $('#colours button').last().on('click', function() { // show all colours
    $('#colours .uk-grid-match').addClass('more-colours');
    $('#colours button').last().addClass('uk-hidden');
  });

  $('#wheels-quote select, #wheels-quote input').on('change', function() { // wheel quote calculation
    var quantity = $('#wheels-quote select');
    var colour = $('input[name="colour"]:checked');
    var lacquer = $('input[name="lacquer"]:checked');

    if (colour.val() !== undefined) {
      if (colour.parent().text() == ' Chrome & Candy Lacquer') {
        $('.gbc-finish > div').addClass('uk-hidden').last().removeClass('uk-hidden');
        $('input[name="lacquer"]').prop('checked', false);
      } else {
        $('.gbc-finish > div').removeClass('uk-hidden').last().addClass('uk-hidden');
      }
    }

    var quantityAmount = parseInt(quantity.val());
    var colourAmount = ((colour.val() === undefined) ? 0 : parseInt(colour.val()));
    var lacquerAmount = ((lacquer.val() === undefined) ? 0 : parseInt(lacquer.val()));

    $('#quote-price').html('&pound;' + (quantityAmount * (colourAmount + lacquerAmount)) + '.00');
  });
});
