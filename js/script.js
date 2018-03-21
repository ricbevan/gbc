var lastFilteredColour = 'gbc-red';

$( document ).ready(function() {
  $('#colour-filter li').on('click', function() {
    lastFilteredColour = $(this).children('a').data('filter'); // save this so when search is cleared we go back to last filtered colour
    filterColour(lastFilteredColour);
  });

  $('#colour-grid > div > div').on('click', function() {
    displayColourModal($(this));
  });

  hideColours(lastFilteredColour); // start by showing red

  var theYear = new Date().getFullYear(); // set copyright year in footer
  $('#year').html(' 1995 - ' + theYear);

  // lazy load images
  [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
    img.setAttribute('src', img.getAttribute('data-src'));
    img.onload = function() {
      img.removeAttribute('data-src');
    };
  });

  $('a[data-mailto]').each(function() { // set mailto links
    var contact = $(this);
    contact.attr('href', 'mailto:' + contact.data('mailto') + '@gariebevancoatings.co.uk');
  });

  $('#enquiries-email-address').text('enquiries@gariebevancoatings.co.uk')

  highlightOpeningTimes();

  $('#colour-search').on('keyup', function(e) {
    e.preventDefault;
    
    var searchFor = $(this).val();
    $('#colour-filter li, #clear-colour-search').removeAttr('hidden'); // show all filter tabs and clear search button (hide some later)

    if (searchFor.length == 0) {
      filterColour(lastFilteredColour);
      $('#colour-filter li:last-child, #clear-colour-search').attr('hidden', ''); // hide search filter tabs and clear search button
    } else {
      filterColour(searchFor);
      $('#colour-filter li:last-child').addClass('uk-active'); // set search filter tab as active
      $('#colour-filter li:not(:last-child)').attr('hidden', ''); // hide all filter tabs apart from search
    }
  });

  $('#clear-colour-search').on('click', function() {
    $('#colour-search').val('').trigger('keyup');
  });
});

function highlightOpeningTimes() {
  var today = new Date();
  var day = today.getDay();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;

  var bankHolidays = [
    // 2018
    '1/1/2018', // new year
    '30/3/2018', // good friday
    '2/4/2018', // easter monday
    '7/5/2018', // may day
    '28/5/2018', // late may
    '27/8/2018', // august
    '25/12/2018', // christmas
    '26/12/2018', // boxing day
    // 2019
    '1/1/2019', // new year
    '19/4/2019', // good friday
    '22/4/2019', // easter monday
    '6/5/2019', // may day
    '27/5/2019', // late may
    '26/8/2019', // august
    '25/12/2019', // christmas
    '26/12/2019' // boxing day
  ];

  if (bankHolidays.includes(today))
    day = 0;

  if (day == 5)
    $('#fri-opening-times').addClass('uk-text-bold');
  else if ((day >= 1) && (day <= 5))
    $('#mon-thur-opening-times').addClass('uk-text-bold');
  else
    $('#sat-sun-opening-times').addClass('uk-text-bold');
}

function filterColour(colour) {

  colour = colour.toLowerCase();
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
    var colourName = $(this).data('filter-colour').toString().toLowerCase();
    var colourCode = $(this).children('div').data('colour-code').toString().toLowerCase();
    var colourDescription = $(this).children('div').data('colour-name').toString().toLowerCase();

    if ((colourName.search(colour) < 0) && (colourCode.search(colour) < 0) && (colourDescription.search(colour) < 0)) {
      $(this).attr('hidden', '');
    }
  });
}

function displayColourModal(colour) {
  var colourModal = $('#colour-modal');

  var colourGroup = colour.data('colour-group');
  var colourName = colour.data('colour-name');
  var colourCode = colour.data('colour-code');
  var colourHex = colour.css('background-color');

  var colourTitle = colourName + " (" + colourGroup + " " + colourCode + ")";

  colourModal.find('.uk-modal-body').css('background-color', colourHex);
  colourModal.find('.uk-modal-title').text(colourTitle);

  UIkit.modal('#colour-modal').show();
}
