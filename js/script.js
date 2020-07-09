document.addEventListener("DOMContentLoaded", function(event) {

  // show colour modal
  gbc('.colour-grid > li > div').on('click', function(colourBox) {
    displayColourModal(colourBox.target);
  });

  // set copyright year
  var theYear = new Date().getFullYear(); // set copyright year in footer
  gbc('#year').text(' 1995 - ' + theYear + '.');

  // set mailto links
  gbc('a[data-mailto]').each(function(mailToLink) {
    mailToLink.setAttribute('href', 'mailto:' + mailToLink.getAttribute('data-mailto') + '@gbc.uk');
  });

  // set enquiries link text
  gbc('#enquiries-email-address').text('enquiries@gbc.uk');

  highlightOpeningTimes();

  if(window.location.hash) { // open colour modal if hash provided
    Array.from(
      document.querySelectorAll('.colour-grid li div')
    ).find(
      el =>
        removeColourType(el.textContent)
        ==
        window.location.hash.substring(1)
    ).dispatchEvent(new Event('click'));
  }
});

function displayColourModal(colour) {

  var colourName = colour.getAttribute('data-colour-name');
  var colourCode = colour.innerHTML;
  var colourHex = colour.style.backgroundColor;

  var colourTitle = colourName + " (" + colourCode + ")";
  var colourUrl = 'https://gbc.uk/#' + removeColourType(colourCode);

  gbc('#colour-modal .uk-modal-body').css('backgroundColor', colourHex);
  gbc('#colour-modal .uk-modal-title').text(colourTitle);
  gbc('#colour-modal-share').text(colourUrl).url(colourUrl);

  UIkit.modal('#colour-modal').show();

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

function removeColourType(colourName) {
  return colourName.replace('RAL ', '').replace('BS 381C ', '').replace('BS 4800', '');
}
