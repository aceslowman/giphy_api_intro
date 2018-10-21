$('document').ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();
    $('form input[name = input]').each(function () {

      /*TODO figure out how to save searchWord as one string or an array of strings?
      when it submits now its returning the request one at a time and out of order*/

      const seachWords = $(this).val();
      $.ajax({
          type: 'GET',
          url: 'https://api.giphy.com/v1/stickers/translate',
          data: {
            'api_key': '6NDOVpYY6BhfydocWVe2UpRavBp6XUpU',
            's': seachWords
          },
          datatype: 'JSON'
        })
        .done(function (data) {
          console.log(data);
        })
      console.log(seachWords);
    })
  }); //end form submit function

}); //End Ready function
