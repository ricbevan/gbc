document.addEventListener("DOMContentLoaded", function(event) {

  // show colour modal
  gbc('.colour-grid > li > div').on('click', function(colourBox) {
    displayColourModal(colourBox.target);
  });

  // copy colour link to clipboard on button click
  gbc('#copy-colour-link').on('click', function() {
    copyToClipboard(gbc('#colour-modal-share').val());
    UIkit.tooltip('#copy-colour-link').hide();
    UIkit.tooltip('#copied-message').show();
    setTimeout(function () { UIkit.tooltip('#copied-message').hide(); }, 1000);
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
  var colourUrl = 'https://gbc.uk#' + removeColourType(colourCode);

  gbc('#colour-modal .uk-modal-body').css('backgroundColor', colourHex);
  gbc('#colour-modal .uk-modal-title').text(colourTitle);
  gbc('#colour-modal-share').val(colourUrl);

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
    // 2020
    '1/1/2020', // new year
    '10/4/2020', // good friday
    '13/4/2020', // easter monday
    '8/5/2020', // may day
    '25/5/2020', // late may
    '31/8/2020', // august
    '25/12/2020', // christmas
    '28/12/2020', // boxing day
    // 2021
    '1/1/2021', // new year
    '2/4/2021', // good friday
    '5/4/2021', // easter monday
    '3/5/2021', // may day
    '31/5/2021', // late may
    '30/8/2021', // august
    '27/12/2021', // christmas
    '28/12/2021' // boxing day
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

function copyToClipboard(copyValue) {
  const tb = document.createElement('textarea');
  tb.value = copyValue;
  document.body.appendChild(tb);
  tb.select();
  document.execCommand('copy');
  document.body.removeChild(tb);
}
