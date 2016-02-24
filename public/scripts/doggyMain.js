"use strict";

var doggy = {};
var google = {};

doggy.apiKey = "290f422c91ecdc030991bbc422712f64";
doggy.apiToken = "8463c41dbe3965fc6b42c2794511969d";
//we can add our individual keys in here if you like
doggy.doggyUrl = "http://api.petfinder.com/pet.find";

doggy.form = function () {
	$('#dogForm').on('submit', function (e) {
		e.preventDefault();
		var userLocation = $('.currentLocation').val();
		var sizeOfDog = $('#dogSize option:selected').val();
		console.log(userLocation, sizeOfDog);
		doggy.doggyAjax(userLocation, sizeOfDog);
		doggy.getCurrentLocation(userLocation);
	});
};

// ****************POSSIBLE GOOGLE API FUNCTION****************************
var userInput = "toronto, On";
doggy.googleAPI = "https://maps.googleapis.com/maps/api/distancematrix/json";
doggy.googleKEY = "AIzaSyDNFi-ralR7UhZuTx56jU0FEqxa50uxK6U";

doggy.getCurrentLocation = function (userLocation) {
	$.ajax({
		url: "http://proxy.hackeryou.com",
		method: 'GET',
		dataType: 'json',
		data: {
			key: doggy.googleKEY,
			origins: userLocation,
			destinations: "M8Z 4L5|L3T3R8",
			reqUrl: doggy.googleAPI
		}
	}).then(function (result) {
		console.log(result);
	});
};
// ********************END OF POSSIBLE GOOGLE API FUNCTION*******************

// 			var lat = (result.results[0].geometry.location.lat);
// 			var lng= (result.results[0].geometry.location.lng);
// 			var latLng = lat + "," + lng;
// 			console.log(latLng)

// 			// doggy.myLatLng = {lat: lat, lng: lng}

// 			// var marker = new google.maps.Marker ({
// 			// 	position: searchApp.myLatLng,
// 			// 	map: searchApp.map,
// 			// 	title: "You Are Here!"

// })
// 	});
// }

doggy.doggyAjax = function (userLocation, sizeOfDog) {
	console.log(userLocation);
	$.ajax({
		url: doggy.doggyUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			key: doggy.apiKey,
			location: userLocation,
			animal: 'dog',
			format: 'json',
			size: sizeOfDog,
			age: 'Senior',
			status: 'A'
		}
	}).then(function (results) {
		console.log(results);
		doggy.printDogsToPage(results);
	});
};

doggy.printDogsToPage = function (filteredDogResults) {
	var pets = filteredDogResults.petfinder.pets.pet;
	for (var i = 0; i < pets.length; i++) {
		$('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t'] + pets[i].contact.zip['$t'] + pets[i].description['$t'] + '</p>');
		console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t'] + pets[i].contact.zip['$t'] + pets[i].description['$t']);
	}
};

doggy.init = function () {
	doggy.form();
};

$(document).ready(function () {
	// doggy.doggyAjax();
	doggy.init();
});

// get user information (location + breeds)
// on submit, push info to Petfinder to find dogs (requires location field to work)
// get results from Petfinder on dogs
// see exclusions below
// filter postal code from dogs

// ********POSSIBLE Filter Function: NEEDS TO BE LOOKED OVER? *********

// doggy.filterdoggy = function(AJAXresults) {
//  var displayDogs = [];
//  for (i = 0; i < AJAXresults.petfinder.pets.pet.length; i += 1;) {
// 		var checkPostal = AJAXresults.petfinder.pets.pet[i].contact
// 		if (checkPostal = 'undefined') {

// 			console.log('no postal');
// 		} else {
// 		displayDogs.push(AJAX.petfinder.pets.pet[i]);
// 		}
// 		console.log(displayDogs)
// 		***then use the "filtered" array in next function****
// 	}
// }
// ********************************************************************

// plot location of dogs on google maps based on postal code
// display Pic, Name, Location, Description of dog

// REQUIRED:
// key, location, animal, format (json), age (senior)

// EXCLUDE (in an if/else statement):
// if no zip code (undefined)
// if animal is adopted (regex /adopted/ in 'petfinder.pets.pet[name]' field)

// MOBILE EXTRAS
// slide scroll on dynamic content