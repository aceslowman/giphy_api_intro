$('document').ready(function(){
	//Hides Buttons on load
	$('.next').hide();
	$('.back').hide();
	//On form submit send GET to giphy api
	$('form').submit(function(event){
			// Sends GET request to giphy search API end point
			$.ajax({
					type: 'GET',
					url: 'https://api.giphy.com/v1/gifs/search',
					data: {
							'api_key': '5IeU3tBpV8g4kTdDNruyqccK7YjFVQYA',
							'q': $('#search').val(),
							'limit': 13,
							'rating': 'PG-13'
					},
					datatype: 'json'   
			})
				
		//when data recieved display gif #0 on page and show navigation buttons
		//allow user to cycle through gifs 
		//Next step allowing button to click for link to share gif with friends.  
			.done(function(data){
					let gifImgUrl = [];
					let k = 0;
					showGif(0);
					console.log(data.data);
					for (var i = 0; i < data.data.length; i++){
							console.log(data.data[i]);
							const gifImageOptions = data.data[i].images.downsized_medium.url;
							gifImgUrl.push(gifImageOptions);
							console.log(gifImgUrl); 								     
					}
				$('.gifImg').attr("src", gifImgUrl[k])
					
						
							$('#nextBtn').on('click', function(e){
								//want to add listener and response for left or right arrow key
									k++;
									showGif(k);
									console.log("next");
									console.log(k);
								
							});
						
					$('#backBtn').on('click', function(e){
						k--;
						showGif(k);
						console.log('back');
					});
				
				function showGif(k){
					$('.gifImg').attr("src", gifImgUrl[k])
							
					if (k == 0) {
							$('#backBtn').hide();
						} else {
							$('#backBtn').fadeIn('slow');
						}
						if (k == gifImgUrl.length - 1) {
							$('#nextBtn').fadeOut('slow', function () {
							$('#nextBtn').hide();
							});
						} else {
							$('#nextBtn').show();
						}
					}		
			});
		event.preventDefault();
	});
});