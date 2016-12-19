$(document ).ready(function() {
	// alert("ajax is go");
	/**************************************************/
	/*                  ANIMALS                       */
	/**************************************************/

	var animalContainer = document.getElementById("animal-info");
	var btnAnimals = document.getElementById("btn-animals");
	var animalCounter = 1;//because the info is on 3 diff urls
	btnAnimals.addEventListener("click", function(){
		var animalRequest = new XMLHttpRequest();
		animalRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+animalCounter+'.json');

		animalRequest.onload = function(){
		// console.log(animalRequest.responseText);
		// save data to var
		// var animalData = ourRequest.responseText;
		// console.log(animalData[0]);will give only opening [ because it doesn' know it's json
		var animalData = JSON.parse(animalRequest.responseText);
		// console.log(animalData[0]);
		renderHTMLAnimals(animalData)
		}
		animalRequest.send();
		animalCounter ++; //after send is called, animal counter goes up one
		if(animalCounter>3){
			btnAnimals.classList.add("hideAnimalBtn");
		}
	});

	//add html to page
	function renderHTMLAnimals(dataAnimal){
		var htmlStringAnimal = "";
		for(var i = 0; i < dataAnimal.length; i++){
			htmlStringAnimal +="<p>" + dataAnimal[i].name + " is a " + dataAnimal[i].species+" that likes to eat ";
			for( var j = 0; j < dataAnimal[i].foods.likes.length; j++){
				if(j == 0){
					htmlStringAnimal+=dataAnimal[i].foods.likes[j];
				} else{
					htmlStringAnimal+=" and "+dataAnimal[i].foods.likes[j];
				}
			}
			htmlStringAnimal+=" but not "
			for( var j = 0; j < dataAnimal[i].foods.dislikes.length; j++){
				if(j == 0){
					htmlStringAnimal+=dataAnimal[i].foods.dislikes[j];
				} else{
					htmlStringAnimal+=" and "+dataAnimal[i].foods.dislikes[j];
				}
			}
			htmlStringAnimal+=".</p>"
		}
		animalContainer.insertAdjacentHTML("beforeend", htmlStringAnimal);
	}
//random photo
	// var random = require('lodash.random');
	var $flickrInfo = $('#flickr-info');
	$('#btn-flickr').click(function(){
		$flickrInfo.html(`<span></span>`);
		//get the value of the input field and set to lowercase:
		var flickrSearchField = $('#flickrSearch').val();
		var flickrSearchTerm = flickrSearchField.toLowerCase();
		
		//use the search term to make an ajax request;
		$.ajax({
			dataType: 'JSON',
			type: 'GET',
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=331483c19de3f58d1dc93765a41556ce&tags='+flickrSearchTerm+'&format=json&nojsoncallback=1',
			success: function(data){
				//gives me the number of photos
				console.log("success console.log: "+data.photos.total);
				//gives me a random number
				//only do 0-99 as that is how many per page. 
				//deal with getting the page number laster.
			
				var randoPhoto = Math.floor(Math.random() * (100));
				console.log("random number is "+ randoPhoto);
				if(data.photos.photo[randoPhoto].title===""){
					$flickrInfo.html(`<span>No title given</span>`);
				} else {
					$flickrInfo.html(`<span>Title: ${data.photos.photo[randoPhoto].title}</span>`);
				}
				$('#flickrSearch').val("");
			},
			error: function(error){
				// console.log(error);
				alert('Error loading.');
			},
			complete: function(){
				console.log('You have done something.')
			}
		});
		// function addFlickr(data){
		// 	$flickrInfo.prepend(`<span>Title: ${data.photos.photo[randoPhoto].title}</span>`)
		// }

	});

});



