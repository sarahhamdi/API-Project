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
		doggy.province = $('#province option:selected').val();
		doggy.userFullLocation = doggy.userLocation + "," + doggy.province;
		console.log(doggy.userFullLocation);
		doggy.sizeOfDog = $('#dogSize option:selected').val();
		// window.setTimeout(function(){
		// $('header').animate({
		// 	scrollTop: $(".flexContainer").offset().top
		// 	})
		// },500)
		// $('.flexContainer').addClass('flexHeight');

		$('video').hide();
		$('div.overlay').removeClass('overlay');
		// $('header').addClass('headerHeight');
		$('footer').addClass('footerPosition').css('max-width', '1080px').css('margin', '0 auto');
		$('body').addClass('bodyBackground');
		$('.wrapper').css('background', 'white').css('padding-top', '50px');
		$('.siteWrapper').css('background', 'white').css('padding-top', '50px').css('margin-top', '0px');
		$('aside').css('background-color', 'white');
		$('header').css('padding-top', '0').css('height', '400px');
		// $('header').css('background-color', 'white');
		// console.log(userLocation, sizeOfDog);
		doggy.doggyAjax(doggy.userFullLocation, doggy.sizeOfDog);
		doggy.customerLocation(doggy.userFullLocation);
	});
};

// +++++++++ PETFINDER AJAX CALL - FINDS DOGS +++++++++++++++++++++++++++++++++++ //
doggy.doggyAjax = function (userFullLocation, sizeOfDog) {
	// console.log(userLocation);
	$.ajax({
		url: doggy.doggyUrl,
		method: 'GET',
		dataType: 'jsonp',
		data: {
			key: doggy.apiKey,
			location: userFullLocation,
			animal: 'dog',
			format: 'json',
			size: sizeOfDog,
			age: 'Senior',
			status: 'A'
		}
	}). // count: 10
	then(function (results) {
		// doggy.printDogsToPage(results);
		doggy.dogLocationsForMap(results);

		var resultsForDogToPage = results.petfinder.pets.pet;

		doggy.displayDogInfo(resultsForDogToPage);

		console.log(results);
	});
};

// +++++++++ ON SUBMIT - CONVERTS USER LOCATION TO LAT LANG +++++++++++++ //

doggy.lat = {};
doggy.lng = {};
doggy.latLng = {};

doggy.customerLocation = function (userFullLocation) {
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json",
		method: 'GET',
		dataType: 'json',
		data: {
			address: userFullLocation
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
var lat;
var lng;
var latLng;

doggy.customerLocation = function (userFullLocation) {
	$.ajax({
		url: "https://maps.googleapis.com/maps/api/geocode/json",
		method: 'GET',
		dataType: 'json',
		data: {
			address: userFullLocation
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

doggy.displayDogInfo = function (results) {
	$('.flexContainer').show();
	google.maps.event.trigger(document.getElementById('map'), 'resize');
	google.maps.event.addListenerOnce(map, 'idle', function () {
		google.maps.event.trigger(map, 'resize');
		map.setCenter({ lat: app.bandsIn2Lat, lng: app.bandsIn2Long });
	});

	$.each(results, function (i, result) {
		// stores dog name
		var dogName = result.name['$t'];
		// stores dog image
		var dogImage = result.media.photos.photo[3]['$t'];
		// stores dog description
		var dogDescription = result.description['$t'];
		// stores dog breed
		var dogBreed = result.breeds.breed['$t'];
		console.log(dogDescription);

		console.log(dogImage);
		// wraps the doggy data in html elements to be placed on page
		var dogImageToPage = $('<img>').attr('src', dogImage);
		var dogNameToPage = $('<h3>').addClass('dogName').text(dogName);
		var dogBreedToPage = $('<h4>').addClass('dogBreed').text(dogBreed);
		var dogDescriptionToPage = $('<p>').addClass('dogDescription').append(dogDescription);
		// creates the list Item html structure and elements where the doggy data will be placed
		var summaryImageContainer = $('<div>').addClass('summaryImageContainer').css('background-color', '$purple;').append(dogImageToPage);

		var summaryTextContainer = $('<div>').addClass('summaryTextContainer').append(dogNameToPage).append(dogBreedToPage);

		var summaryContainer = $('<div>').addClass('summaryContainer clearfix').append(summaryImageContainer).append(summaryTextContainer);

		var summary = $('<summary>').append(summaryContainer);

		var details = $('<details>').append(summary).append(dogDescriptionToPage);

		var dogListItem = $('<li>').addClass('dogListItem').append(details);

		console.log(dogName);
		// puts each of the list items in the <ul>
		$('.resultsList').append(dogListItem);
	});
};

// // +++++++++ AFTER PETFINDER AJAX CALL, PRINTS DOG RESULTS TO PAGE ++++++++++++++++++ //
// doggy.printDogsToPage = function(filteredDogResults) {

// 	// var cleanup = function(string) {
// 	// 		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
// 	// 	}

// 	// var cleanup = function(string) {
// 	// 		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
// 	// 	}

// 	var pets = filteredDogResults.petfinder.pets.pet;
// 	for (var i = 0; i < pets.length; i++) {

// 		// $('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
// 		// console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + pets[i].description['$t'])
// 	}
// };

// $('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
// console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + pets[i].description['$t'])

// // +++++++++ AFTER PETFINDER AJAX CALL, PRINTS DOG RESULTS TO PAGE ++++++++++++++++++ //
// doggy.printDogsToPage = function(filteredDogResults) {

// 	// var cleanup = function(string) {
// 	// 		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
// 	// 	}

// 	// var cleanup = function(string) {
// 	// 		return string.replace(/&lt;\/*[a-z]*&gt;/g, " ").replace(/&amp;/g, "&").replace(/â/g, "'");
// 	// 	}

// 	var pets = filteredDogResults.petfinder.pets.pet;
// 	for (var i = 0; i < pets.length; i++) {

// 		// $('main.results').append('<p>' + pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + cleanup(pets[i].description['$t']) + '</p>');
// 		// console.log(pets[i].name['$t'] + pets[i].age['$t'] + pets[i].size['$t']+ pets[i].contact.zip['$t'] + pets[i].description['$t'])
// 	}
// };

doggy.originaldogLocationsArray = [];

// +++++++++ AFTER PETFINDER AJAX CALL, SAVES DOG POSTAL CODES ++++++++++++++++++++++++++++++ //
doggy.dogLocationsForMap = function (filteredDogResults) {
	var pets = filteredDogResults.petfinder.pets.pet;

	for (var i = 0; i < pets.length; i++) {
		doggy.originaldogLocationsArray.push(pets[i].contact.zip['$t']);
	};
	var newdogLocationsArray = doggy.originaldogLocationsArray.join('|');
	doggy.getCurrentLocation(doggy.userFullLocation, newdogLocationsArray);
	doggy.convertLatLng(doggy.originaldogLocationsArray);
	console.log(newdogLocationsArray);
	console.log(doggy.originaldogLocationsArray);
};

// **************** GOOGLE MAPS - FINDS LOCATIONS (USER + DOGS) FOR MAP  **********************
doggy.googleAPI = "https://maps.googleapis.com/maps/api/distancematrix/json";
doggy.googleKEY = "AIzaSyDNFi-ralR7UhZuTx56jU0FEqxa50uxK6U";

doggy.getCurrentLocation = function (userFullLocation, newdogLocationsArray) {
	$.ajax({
		url: "http://proxy.hackeryou.com",
		method: 'GET',
		dataType: 'json',
		data: {
			key: doggy.googleKEY,
			origins: userFullLocation,
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

	for (var i = 0; i < originaldogLocationsArray.length; i++) {
		var dogLocationsArray2 = originaldogLocationsArray[i];
		console.log(dogLocationsArray2);
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

			console.log(counter);
			if (counter === originaldogLocationsArray.length) {
				console.log(doggy.lngArray);
				console.log(doggy.lngArray.length);
				console.log(doggy.latArray);
				// call function that plots things out here
				doggy.plotOnMap(doggy.latArray, doggy.lngArray);
			}
		});
	}
};

// +++++++++++ PLOTS THE ICONS ON THE MAP BASED ON LNG/LAT ++++++++
doggy.plotOnMap = function (latArray, lngArray, myLatLng) {
	var markers = [];

	for (var i = 0; i < doggy.originaldogLocationsArray.length; i++) {
		var singleLat = latArray[i];
		var singleLng = lngArray[i];
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		// doggy.myLatLng = {lng: 43.7921395, lat: -79.386151};
		doggy.map.setCenter(doggy.myLatLng);
		var marker = new google.maps.Marker({
			position: {
				lat: singleLat,
				lng: singleLng
			},
			map: doggy.map,
			label: labels[i]
		});
		markers.push(marker);
		// console.log(marker.label);

		// var finalLatLng = latlng;

		// if (allMarkers.length != 0) {
		//     for (i=0; i < allMarkers.length; i++) {
		//         var existingMarker = allMarkers[i];
		//         var pos = existingMarker.getPosition();

		//         //if a marker already exists in the same position as this marker
		//         if (latlng.equals(pos)) {
		//             //update the position of the coincident marker by applying a small multipler to its coordinates
		//             var newLat = latlng.lat() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
		//             var newLng = latlng.lng() + (Math.random() -.5) / 1500;// * (Math.random() * (max - min) + min);
		//             finalLatLng = new google.maps.LatLng(newLat,newLng);
		//         }
		//     }
		// }
	}

	var markerCluster = new MarkerClusterer(doggy.map, markers);
	var minClusterZoom = 10;
	markerCluster.setMaxZoom(minClusterZoom);
	// google.maps.event.trigger(doggy.map, 'resize');
	// ++++++++ POTENTIAL USE LATER - MARKERS FOR DOG LOCATIONS
	// var infowindow = new google.maps.InfoWindow({
	//     content: '<h2>'+ title.text() +'</h2>' + '<h4>' + location.text() + '</h4>' + '<h5>' + website.text() + '</h5>'
	// });

	// marker.addListener('click', function() {
	// infowindow.open(doggy.map, marker);
};

// ++++++ THE ACTUAL MAP ++++++++++

// +++++++++++ TO DISPLAY THE ACTUAL MAP ON THE PAGE +++++++++++++
doggy.map;
function initMap() {
	doggy.map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 43.7, lng: -79.4 },
		zoom: 8,
		sensor: false,
		scrollwheel: false,
		styles: [{
			"featureType": "all",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ede3de"
			}]
		}, {
			"featureType": "poi.park",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#252628"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry",
			"stylers": [{
				"lightness": "58"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#7426d9"
			}, {
				"lightness": "58"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#cccccc"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "labels",
			"stylers": [{
				"visibility": "on"
			}, {
				"hue": "#6f00ff"
			}, {
				"lightness": "43"
			}]
		}, {
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [{
				"lightness": "-5"
			}, {
				"color": "#98d5ea"
			}]
		}]
	});
	// var marker = new google.maps.Marker({
	//   position: doggy.myLatLng,
	//   map: map,
	//   title: 'Hello World!'
	// });
};

doggy.init = function () {
	doggy.form();
};

$(document).ready(function () {
	doggy.init();
	$('.flexContainer').hide();
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