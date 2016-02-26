'use strict';

var doggy = {};
var google = {};

// +++++++++ ON SUBMIT +++++++++++++++++++++++++++++++++++ //
doggy.apiKey = "290f422c91ecdc030991bbc422712f64";
doggy.apiToken = "8463c41dbe3965fc6b42c2794511969d";
doggy.doggyUrl = "http://api.petfinder.com/pet.find";

doggy.form = function () {

	$('#dogForm').on('submit', function (e) {
		doggy.originaldogLocationsArray = [];
		doggy.latArray = [];
		doggy.lngArray = [];
		e.preventDefault();
		doggy.userLocation = $('.currentLocation').val();
		var sizeOfDog = $('#dogSize option:selected').val();
		// console.log(userLocation, sizeOfDog);
		doggy.doggyAjax(doggy.userLocation, sizeOfDog);
		doggy.customerLocation(doggy.userLocation);
		console.log(doggy.userLocation);
		// doggy.getCurrentLocation(userLocation);
		doggy.customerLocation(doggy.userLocation);
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
<<<<<<< HEAD
	}).then(function (results) {
=======
	}). // count: 10
	then(function (results) {
		// console.log(results);
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
		doggy.printDogsToPage(results);
		doggy.dogLocationsForMap(results);
	});
};
var lat;
var lng;
var latLng;

doggy.customerLocation = function (userLocation) {
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json",
		method: 'GET',
		dataType: 'json',
		data: {
			address: userLocation
		}
	}).then(function (result) {
		lat = result.results[0].geometry.location.lat;
		lng = result.results[0].geometry.location.lng;
		latLng = lat + "," + lng;
		console.log(latLng);
		// // doggy.getEvent(latLng, userPrice,foodChoice);

		doggy.myLatLng = { lat: lat, lng: lng };
	});
};

// +++++++++ ON SUBMIT - CONVERTS USER LOCATION TO LAT LANG +++++++++++++ //

doggy.lat = {};
doggy.lng = {};
doggy.latLng = {};

doggy.customerLocation = function (userLocation) {
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json",
		method: 'GET',
		dataType: 'json',
		data: {
			address: userLocation
		}
	}).then(function (result) {
		console.log('hey');
		doggy.lat = result.results[0].geometry.location.lat;
		doggy.lng = result.results[0].geometry.location.lng;
		doggy.latLng = doggy.lat + "," + doggy.lng;
		// console.log(doggy.latLng);
		// // doggy.getEvent(latLng, userPrice,foodChoice);

		doggy.myLatLng = { lat: doggy.lat, lng: doggy.lng };
		console.log(doggy.myLatLng);
		doggy.plotOnMap(doggy.myLatLng);
	});
};

// +++++++++ AFTER PETFINDER AJAX CALL, PRINTS DOG RESULTS TO PAGE ++++++++++++++++++ //
doggy.printDogsToPage = function (filteredDogResults) {

	// var cleanup = function(string) {
	// 		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
	// 	}

	var pets = filteredDogResults.petfinder.pets.pet;
	for (var i = 0; i < pets.length; i++) {
<<<<<<< HEAD
		$('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t'] + pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
=======
		// $('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
		// console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + pets[i].description['$t'])
	}
};

doggy.originaldogLocationsArray = [];

// +++++++++ AFTER PETFINDER AJAX CALL, SAVES DOG POSTAL CODES ++++++++++++++++++++++++++++++ //
doggy.dogLocationsForMap = function (filteredDogResults) {
	var pets = filteredDogResults.petfinder.pets.pet;

	for (var i = 0; i < pets.length; i++) {
		doggy.originaldogLocationsArray.push(pets[i].contact.zip['$t']);
	};
	var newdogLocationsArray = doggy.originaldogLocationsArray.join('|');
	doggy.getCurrentLocation(doggy.userLocation, newdogLocationsArray);
<<<<<<< HEAD
	doggy.convertLatLng(dogLocationsArray);
	// console.log(newdogLocationsArray);
	// console.log(dogLocationsArray);
=======
	doggy.convertLatLng(doggy.originaldogLocationsArray);
	console.log(newdogLocationsArray);
	console.log(doggy.originaldogLocationsArray);
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
	// doggy.getCurrentLocation(dogLocationsArray);
};

// **************** GOOGLE MAPS - FINDS LOCATIONS (USER + DOGS) FOR MAP  **********************
doggy.googleAPI = "https://maps.googleapis.com/maps/api/distancematrix/json";
doggy.googleKEY = "AIzaSyDNFi-ralR7UhZuTx56jU0FEqxa50uxK6U";

doggy.getCurrentLocation = function (userLocation, newdogLocationsArray) {
	$.ajax({
		url: "http://proxy.hackeryou.com",
		method: 'GET',
		dataType: 'json',
		data: {
			key: doggy.googleKEY,
			origins: userLocation,
			destinations: newdogLocationsArray,
			reqUrl: doggy.googleAPI

		}
	}).then(function (result) {
		// console.log(result)
	});
};

// +++++++++++ GOOGLE MAPS - TO DISPLAY THE ACTUAL MAP ON THE PAGE +++++++++++++
// doggy.map;
// function initMap() {
//   doggy.map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 43.7, lng: -79.4},
//     zoom: 10
//   });

// var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Hello World!'
//   });

doggy.lngArray = [];
doggy.latArray = [];

// +++++++++++ TO CONVERT POSTAL CODES INTO LAT/LNG +++++++
doggy.convertLatLng = function (originaldogLocationsArray) {

	var counter = 0;
<<<<<<< HEAD
	for (var i = 0; i < dogLocationsArray.length; i++) {
		var dogLocationsArray2 = dogLocationsArray[i];
		// console.log(dogLocationsArray2);
=======
	for (var i = 0; i < originaldogLocationsArray.length; i++) {
		var dogLocationsArray2 = originaldogLocationsArray[i];
		console.log(dogLocationsArray2);
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
		$.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json",
			method: 'GET',
			dataType: 'json',
			data: {
				address: dogLocationsArray2
			}
		}).then(function (result) {
			doggy.latArray.push(result.results[0].geometry.location.lat);
			doggy.lngArray.push(result.results[0].geometry.location.lng);
			counter++;

<<<<<<< HEAD
			// console.log(counter)
			if (counter === dogLocationsArray.length) {
				// console.log(doggy.lngArray);
				// console.log(doggy.latArray);
=======
			console.log(counter);
			if (counter === originaldogLocationsArray.length) {
				console.log(doggy.lngArray);
				console.log(doggy.latArray);
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
				// call function that plots things out here
				doggy.plotOnMap(doggy.latArray, doggy.lngArray);
			}
		});
	}
};

// +++++++++++ PLOTS THE ICONS ON THE MAP BASED ON LNG/LAT ++++++++
doggy.plotOnMap = function (latArray, lngArray, myLatLng) {

<<<<<<< HEAD
	for (var i = 0; i < doggy.dogLocationsArray.length; i++) {
		var singleLat = latArray[i];
		var singleLng = lngArray[i];
		// doggy.myLatLng = latLng;
		// console.log(doggy.myLatLng)
		// doggy.map.setCenter(doggy.myLatLng);
=======
	for (var i = 0; i < doggy.originaldogLocationsArray.length; i++) {
		var singleLat = latArray[i];
		var singleLng = lngArray[i];
		// doggy.myLatLng = {lng: 43.7921395, lat: -79.386151};
		doggy.map.setCenter(doggy.myLatLng);
>>>>>>> a8833ad531b9bdfa964038041b2edcf06a3bf652
		var image = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
		var marker = new google.maps.Marker({
			position: {
				lat: singleLat,
				lng: singleLng
			},
			map: doggy.map,
			image: image
		});
		// console.log(marker);
	}
	// google.maps.event.trigger(doggy.map, 'resize');
	// ++++++++ POTENTIAL USE LATER - MARKERS FOR DOG LOCATIONS
	// var infowindow = new google.maps.InfoWindow({
	//     content: '<h2>'+ title.text() +'</h2>' + '<h4>' + location.text() + '</h4>' + '<h5>' + website.text() + '</h5>'
	// });

	// marker.addListener('click', function() {
	// infowindow.open(doggy.map, marker);
};

// ++++++ THE ACTUAL MAP ++++++++++
doggy.map;
function initMap() {
	doggy.map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 43.7, lng: -79.4 },
		zoom: 7
	});
	var marker = new google.maps.Marker({
		position: doggy.myLatLng,
		map: map,
		title: 'Hello World!'
	});
};

// +++++++++++ TO DISPLAY THE ACTUAL MAP ON THE PAGE +++++++++++++

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