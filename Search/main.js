$('document').ready(function(){
    var holder = [];
    $('form').submit(function(event){
        
        // Sends GET request to giphy search API end point
        $.ajax({
            type: 'GET',
            url: 'https://api.giphy.com/v1/gifs/search',
            data: {
                'api_key': '5IeU3tBpV8g4kTdDNruyqccK7YjFVQYA',
                'q': $('#search').val(),
                'limit': 5,
                'rating': 'PG-13'
            },
            datatype: 'json'   
        })
          
        //when done statement to loop through returned values?  
        .done(function(data){
            data.data.forEach(element => {
                holder.push(element);
                
                console.log(holder);
            });
            $('.gifcontainer').empty().append(`
                <div class="gif">
                    <img src='${data.data[0].images.downsized_medium.url}' />
                        <pre>
                            ${JSON.stringify(data,undefined,2)}
                        </pre>
                </div>
            `);
            console.log(data.data[0].images.downsized_medium.url);
        });
        event.preventDefault();
    
    });
});