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
			//url api-key doesn't last. why?
			url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=2014b01ace4c7abef0535438e3481862&tags='+flickrSearchTerm+'&per_page=500&format=json&nojsoncallback=1',
			success: function(data){
				console.log("success: you have entered the tag "+flickrSearchTerm);
			// https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
			
				console.log(data);
				var totalPhotos = data.photos.total;
				console.log("Total is "+totalPhotos);

				//500 ret per page, just get rando from that page
				var max = 0;
				if(totalPhotos>=500){max = 500;}else{max = totalPhotos;}
				console.log("max: "+max);
			
				var randoPhoto = Math.floor(Math.random() * (max));
				console.log("random photo index is  "+randoPhoto);
				console.log(data.photos.photo[randoPhoto]);
				var farmId = data.photos.photo[randoPhoto].farm;
				var serverId = data.photos.photo[randoPhoto].server;
				var userId = data.photos.photo[randoPhoto].id;
				var secret = data.photos.photo[randoPhoto].secret;
				console.log("farm: "+farmId+" server: "+serverId+" User id: "+userId+" secret: "+secret);
				
				$("#flickerPhoto").html('<img src="https://farm'+farmId+'.staticflickr.com/'+serverId+'/'+userId+'_'+secret+'.jpg">');
			
				// for how to get photo: https://www.flickr.com/services/api/misc.urls.html
				if(data.photos.photo[randoPhoto].title===""){
					$flickrInfo.html(`<span>No title given</span>`);
				} else {
					$flickrInfo.html(`<span>Title: ${data.photos.photo[randoPhoto].title}</span>`);
				}
				$('#flickrSearch').val("");
				// $('#flickerPhoto').html("");
			},
			error: function(error){
				// console.log(error);
				alert('Error loading.');
			},
			complete: function(){
				console.log('You have done something.')
			}
		});
	});
	/**************************************************/
	/*               SLIP ADVICE                      */
	/**************************************************/

	var $adviceSlip = $("#adviceSlip");
	var $adviceClear = $("#adviceClearBtn");
	$adviceClear.hide();
	function getAdvice(data){
			$adviceSlip.prepend(
				`<div class="receipt">
					<span class="advice">Advice: ${data.slip.advice}</span>
					<p>If you disagree with this advice and would like to make a complaint, please contact Jack Doodie and quote advice slip no. <span>${data.slip.slip_id}</span>. Thank you.</p>
				</div>`
			);
		}
	$adviceClear.click(function(){
		$adviceSlip.html("");
	});
	$('#btn-slip').click(function(){
		// alert("advise me button clicked");
		$adviceClear.show();
		$.ajax({
			dataType: 'JSON',
			type: 'GET',
			url: 'http://api.adviceslip.com/advice',
			success: function(data){
				console.log("you got advice: "+data.slip.advice);
				getAdvice(data)

			},
			error: function(error){
				alert('Error loading Advice Slip.');
			}
		});
	});

});



