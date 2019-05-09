var lastFilteredColour = 'gbc-popular';

document.addEventListener("DOMContentLoaded", function(event) {

  filterColours(lastFilteredColour);

  // filter colours
  gbc('#colour-filter li').on('click', function() {
    lastFilteredColour = this.children[0].getAttribute('data-filter');
    filterColourAnimation(lastFilteredColour);
  });

  // show colour modal
  gbc('#colour-grid > li > div').on('click', function(colourBox) {
    displayColourModal(colourBox.target);
  });

  // set copyright year
  var theYear = new Date().getFullYear(); // set copyright year in footer
  gbc('#year').text(' 1995 - ' + theYear + '.');

  // set mailto links
  gbc('a[data-mailto]').each(function(mailToLink) {
    mailToLink.setAttribute('href', 'mailto:' + mailToLink.getAttribute('data-mailto') + '@gariebevancoatings.co.uk');
  });

  // set enquiries link text
  gbc('#enquiries-email-address').text('enquiries@gariebevancoatings.co.uk');

  highlightOpeningTimes();

  // search for colours by word
  gbc('#colour-search').on('keyup', function(e) {
    e.preventDefault;

    var searchFor = e.target.value;

    gbc('#colour-filter li, #clear-colour-search').hide();

    if (searchFor.length == 0) {
      filterColourAnimation(lastFilteredColour);
      gbc('#colour-filter li:not(:last-child)').show();
      gbc('#clear-colour-search').hide();
    } else {
      filterColourAnimation(searchFor);
      gbc('#colour-filter-search, #clear-colour-search').show();
      gbc('#colour-filter-search').addClass('uk-active');
    }
  });

  // clear colour search button
  gbc('#clear-colour-search').on('click', function() {
    gbc('#colour-search').val('').trigger('keyup');
  });

  // trigger colour search
  gbc('#colour-search').trigger('keyup');

  if(window.location.hash) { // open colour modal if hash provided
    gbc('div[data-colour-code="' + window.location.hash.substring(1) + '"]').trigger('click');
  }

});

function displayColourModal(colour) {

  var colourGroup = colour.getAttribute('data-colour-group');
  var colourName = colour.getAttribute('data-colour-name');
  var colourCode = colour.getAttribute('data-colour-code');
  var colourHex = colour.style.backgroundColor;

  var colourTitle = colourName + " (" + colourGroup + " " + colourCode + ")";

  gbc('#colour-modal .uk-modal-body').css('backgroundColor', colourHex);
  gbc('#colour-modal .uk-modal-title').text(colourTitle);

  UIkit.modal('#colour-modal').show();

}

// handles the animation when colours are filtered
function filterColourAnimation(colour) {

  colour = colour.toLowerCase();
  var colourGrid = gbc('#colour-grid');

  colourGrid.removeClass('uk-animation-slide-left-small').addClass('uk-animation-slide-right-small')
    .addClass('uk-animation-reverse').addClass('uk-animation-fast');

  setTimeout(function() {
    filterColours(colour);

    colourGrid.removeClass('uk-animation-slide-right-small').removeClass('uk-animation-reverse')
      .addClass('uk-animation-slide-left-small');
  }, 100);

}

// filter colours to only show matching colours - can be keyword, colour, code, description
function filterColours(colour) {

  colourGrid = gbc('#colour-grid > li').each(function(colourPreview) {
    colourPreview.removeAttribute('hidden');
    var colourName = colourPreview.getAttribute('data-filter-colour').toString().toLowerCase();
    var colourCode = colourPreview.children[0].getAttribute('data-colour-code').toString().toLowerCase();
    var colourDescription = colourPreview.children[0].getAttribute('data-colour-name').toString().toLowerCase();

    if ((colourName.search(colour) < 0) && (colourCode.search(colour) < 0) && (colourDescription.search(colour) < 0)) {
      colourPreview.setAttribute('hidden', '');
    }
  });

}

// highlight the relevant opening time day
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

  if (bankHolidays.indexOf(today) >= 0)
    day = 0;

  if (day == 5)
    gbc('#fri-opening-times').addClass('uk-text-bold');
  else if ((day >= 1) && (day <= 5))
    gbc('#mon-thur-opening-times').addClass('uk-text-bold');
  else
    gbc('#sat-sun-opening-times').addClass('uk-text-bold');

}
