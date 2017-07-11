$( document ).ready(function() {
  $('#gallery a').on('click', function (e) { // on gallery image click, set the gallery modal image
    var clickedImage = $(e.target).parent().parent().children('img').attr('src');
    $('#gallery-modal').find('img').attr('src', clickedImage);
  });
});
