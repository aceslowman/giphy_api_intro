//make some api calls when things are pressed, but first I guess get the tabs working
$(document).ready(function() {
$("#tabs").tabs();
$('#range-value').html($('#weird-range').val());
$('#weird-range').change(function(){
    $('#range-value').html($('#weird-range').val());
});

//gonna try to make the AJAX calls easier
function NewAjax(url, search, limit, weirdness, success){
  $.ajax({
    type: 'GET',
    url: url,
    data: {
      'api_key': '4NvjpqHJOK9kKxGIrTHqQVtHfBtiJ53S',
      'q': search,
      's': search,
      'limit': limit,
      'weirdness': weirdness
    },
    dataType: 'json',
    success: success,
    fail: function() {
      console.log("AJAX Request Failed");
    }
  });
}
//search
$('#search form').submit(function(event) {
  //create new AJAX object with success callback that adds it to the page
NewAjax('http://api.giphy.com/v1/gifs/search',$('#search-input').val(), 3, null, function(data) {
    var match = '<h1>Here are the top ' + data.data.length +' gifs that match your search:</h1>';
    var images = '<ul class="gif-list">';
    for (var i = 0; i < data.data.length; i++){
      images += '<li><img class="loading" src="'+ data.data[i].images.fixed_height.url +'"></li>';
    }
    $('#search-output').empty().append(match + images);
  });
  //prevent submit button from reloading page
  event.preventDefault();
});
//top 5 trending gifs
$('#trending-link').click(function(){
  NewAjax('http://api.giphy.com/v1/gifs/trending', null, 5, null, function(data){
    var match = '<h1>Here are the top ' + data.data.length +' trending gifs:</h1>';
    var images = '<ul class="gif-list">';
    for (var i = 0; i < data.data.length; i++){
      images += '<li><img class="loading" src="'+ data.data[i].images.fixed_height.url +'"></li>';
    }
    $('#trending-output').empty().append(match + images);

  });//end ajax call w/ output
});//end trending click function

//translate
$('#translate form').submit(function(event) {
//ajax call for translate
NewAjax('http://api.giphy.com/v1/gifs/translate', $('#translate-input').val(), 5, $('#weird-range').val(), function(data){
        $('#translate-output').empty().append('<img class="loading" src="' + data.data.images.fixed_height.url + '" />');
      });
      event.preventDefault();
    });//end translate

//Random
function getRandom(){
  NewAjax('http://api.giphy.com/v1/gifs/random', null, 5, null, function(data) {
    var match = '<h1>Here is a random gif:</h1>';
    var image = '<img class="loading" src="'+ data.data.images.fixed_height.url +'">';
    $('#random-output').empty().append(image);
  });
}
$('#random-link, #random-refresh').click(function(){
  getRandom();
});

});//end of document ready function
