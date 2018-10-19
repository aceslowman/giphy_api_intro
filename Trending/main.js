$( 'document' ).ready( function() {
  function randomSpan( max ) {
    return Math.floor( Math.random() * Math.floor( max ) );
  };
  $( '.gridWrapper' ).hide();
  $.ajax( {
      type: "GET",
      url: "https://api.giphy.com/v1/gifs/trending",
      data: {
        'api_key': 'FNTZm09RnGgt3cOTyMh3e4hF6bZgfHuq',
        'limit': 51,
        'rating': 'pg',
      },
      dataType: "JSON",

    } ) //end ajax get

    .done( function( data ) {
      console.log( data );
      for ( let i = 0; i < data.data.length; i++ ) {
        const gifImgUrl = data.data[ i ].images.fixed_height_downsampled.url;
        $( '.gridWrapper' ).append( `<div class="gif${randomSpan(3)}"><img class="gifImg" src="${gifImgUrl}"></div>` );

      }

    } );

  $( '.reveal' ).on( 'click', function( e ) {
    $( '.gridWrapper' ).fadeIn();
    $( '.reveal' ).hide();
  } )

} ); //End Document ready function