var doggy = {};

doggy.apiKey ="290f422c91ecdc030991bbc422712f64"
doggy.apiToken ="8463c41dbe3965fc6b42c2794511969d"
	//we can add our individual keys in here if you like 
doggy.doggyUrl = "http://api.petfinder.com/pet.find"


doggy.doggyAjax = function() {
	$.ajax({
		url: doggy.doggyUrl,
		method: 'GET',
		dataType: 'jsonp',
		data : {
			key: doggy.apiKey,
			location: 'Toronto, On',
			animal: 'dog',
			format: 'json'
		}  
	}).then(function(results){
		console.log(results);
	});
};

$(document).ready(function() {
	doggy.doggyAjax();
});



// get user information (location + breeds)
// on submit, push info to Petfinder to find dogs (requires location field to work)
// get results from Petfinder on dogs
// see exclusions below
// get postal code from dogs
// plot location of dogs on google maps based on postal code
// display Pic, Name, Location, Description of dog

// REQUIRED: 
// key, location, animal, format (json), age (senior)

// EXCLUDE (in an if/else statement):
// if no zip code (undefined)
// if animal is adopted (regex /adopted/ in 'petfinder.pets.pet[name]' field)


// MOBILE EXTRAS
// slide scroll on dynamic content