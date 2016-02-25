'use strict';

var doggy = {};
var google = {};

// +++++++++ ON SUBMIT +++++++++++++++++++++++++++++++++++ //
doggy.apiKey = "290f422c91ecdc030991bbc422712f64";
doggy.apiToken = "8463c41dbe3965fc6b42c2794511969d";
doggy.doggyUrl = "http://api.petfinder.com/pet.find";

doggy.form = function () {
	$('#dogForm').on('submit', function (e) {
		e.preventDefault();
		doggy.userLocation = $('.currentLocation').val();
		var sizeOfDog = $('#dogSize option:selected').val();
		// console.log(userLocation, sizeOfDog);
		doggy.doggyAjax(doggy.userLocation, sizeOfDog);
		// doggy.getCurrentLocation(userLocation);
	});
};

// +++++++++ PETFINDER AJAX CALL - FINDS DOGS +++++++++++++++++++++++++++++++++++ //
doggy.doggyAjax = function (userLocation, sizeOfDog) {
	// console.log(userLocation);
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
		doggy.dogLocationsForMap(results);
	});
};

// +++++++++ AFTER PETFINDER AJAX CALL, PRINTS DOG RESULTS TO PAGE ++++++++++++++++++ //
doggy.printDogsToPage = function (filteredDogResults) {

	var cleanup = function cleanup(string) {
		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
	};

	var pets = filteredDogResults.petfinder.pets.pet;
	for (var i = 0; i < pets.length; i++) {
		$('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t'] + pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
		console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t'] + pets[i].contact.zip['$t'] + pets[i].description['$t']);
	}
};

// +++++++++ AFTER PETFINDER AJAX CALL, SAVES DOG POSTAL CODES ++++++++++++++++++++++++++++++ //
doggy.dogLocationsForMap = function (filteredDogResults) {
	var pets = filteredDogResults.petfinder.pets.pet;
	var dogLocationsArray = [];
	for (var i = 0; i < pets.length; i++) {
		dogLocationsArray.push(pets[i].contact.zip['$t']);
	};
	dogLocationsArray = dogLocationsArray.join('|');
	doggy.getCurrentLocation(doggy.userLocation, dogLocationsArray);
	console.log(dogLocationsArray);
	// doggy.getCurrentLocation(dogLocationsArray);
};

// **************** GOOGLE MAPS - FINDS LOCATIONS (USER + DOGS) FOR MAP  **********************
doggy.googleAPI = "https://maps.googleapis.com/maps/api/distancematrix/json";
doggy.googleKEY = "AIzaSyDNFi-ralR7UhZuTx56jU0FEqxa50uxK6U";

doggy.getCurrentLocation = function (userLocation, dogLocationsArray) {
	$.ajax({
		url: "http://proxy.hackeryou.com",
		method: 'GET',
		dataType: 'json',
		data: {
			key: doggy.googleKEY,
			origins: userLocation,
			destinations: dogLocationsArray,
			reqUrl: doggy.googleAPI
		}
	}).then(function (result) {
		console.log(result);
	});
};

// +++++++++ GOOGLE MAPS - PLACES MAP ON PAGE +++++++++++++++++++++++++++++++++++ //
doggy.map;
function initMap() {
	doggy.map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 43.7, lng: -79.4 },
		zoom: 10
	});
};

doggy.init = function () {
	doggy.form();
};

$(document).ready(function () {
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