var animalContainer = document.getElementById("animal-info");
var btnAnimals = document.getElementById("btn-animals");
var animalCounter = 1;//because the info is on 3 diff urls
btnAnimals.addEventListener("click", function(){
	var animalRequest = new XMLHttpRequest();
	animalRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-'+animalCounter+'.json');

	animalRequest.onload = function(){
	// console.log(ourRequest.responseText);
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
	var htmlString = "";
	for(var i = 0; i < dataAnimal.length; i++){
		htmlString +="<p>" + dataAnimal[i].name + " is a " + dataAnimal[i].species+" that likes to eat ";
		for( var j = 0; j < dataAnimal[i].foods.likes.length; j++){
			if(j == 0){
				htmlString+=dataAnimal[i].foods.likes[j];
			} else{
				htmlString+=" and "+dataAnimal[i].foods.likes[j];
			}
		}
		htmlString+=" but not "
		for( var j = 0; j < dataAnimal[i].foods.dislikes.length; j++){
			if(j == 0){
				htmlString+=dataAnimal[i].foods.dislikes[j];
			} else{
				htmlString+=" and "+dataAnimal[i].foods.dislikes[j];
			}
		}
		htmlString+=".</p>"
	}
	animalContainer.insertAdjacentHTML("beforeend", htmlString);
}





