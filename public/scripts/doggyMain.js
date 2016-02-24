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
		console.log(userLocation);
		doggy.doggyAjax(userLocation);
	});
};

// doggy.getCurrentLocation = function() {
// 		$.ajax({
// 			url: "https://maps.googleapis.com/maps/api/geocode/json",
// 			method: 'GET',
// 			dataType: 'json',
// 			data: {
// 				address: 'L4J5X4'
// 			}
// 		}).then(function(result){
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

doggy.doggyAjax = function (userLocation) {
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
			age: 'Senior',
			status: 'A'
			// count: 10
		}
	}).then(function (results) {
		console.log(results);
	});
};

$(document).ready(function () {
	// doggy.doggyAjax();
	doggy.form();
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