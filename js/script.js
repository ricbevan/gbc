document.addEventListener("DOMContentLoaded", function(event) {

  // show colour modal
  gbc('#colours .colour-expand li:not(.tag-not-colour) div').on('click', function(colourBox) {
    displayColourModal(colourBox.target);
  });

  // copy colour link to clipboard on button click
  gbc('#copy-colour-link').on('click', function() {
    navigator.clipboard.writeText(gbc('#colour-modal-share').val());
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
    let colourBox = Array.from(
      document.querySelectorAll('#colours .colour-expand li:not(.tag-not-colour) div')
    ).find(
      el =>
        removeColourType(el.textContent)
        ==
        window.location.hash.substring(1)
    )
    
    if (colourBox != undefined) {
      colourBox.dispatchEvent(new Event('click'));
    }
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
    // 2023
    '2/1/2023', // new year
    '7/4/2023', // good friday
    '10/4/2023', // easter monday
    '1/5/2023', // early may
    '8/5/2023', // coronation
    '29/5/2023', // spring
    '28/8/2023', // summer
    '25/12/2023', // boxing day
    '26/12/2023', // christmas
    // 2024
    '1/1/2024', // new year
    '29/3/2024', // good friday
    '1/4/2024', // easter monday
    '6/5/2024', // early may
    '27/5/2024', // spring
    '26/8/2024', // summer
    '25/12/2024', // boxing day
    '26/12/2024', // christmas
    // 2025
    '1/1/2025', // new year
    '18/4/2025', // good friday
    '21/4/2025', // easter monday
    '5/5/2025', // early may
    '26/5/2025', // spring
    '25/8/2025', // summer
    '25/12/2025', // boxing day
    '26/12/2025' // christmas
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
  return colourName.replace('RAL ', '').replace('BS 381C ', '').replace('BS 4800 ', '');
}
