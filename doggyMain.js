var doggy = {};

doggy.apiKey ="290f422c91ecdc030991bbc422712f64"
doggy.apiToken ="8463c41dbe3965fc6b42c2794511969d"
	//we can add our individual keys in here if you like 
doggy.doggyUrl = "http://api.petfinder.com/pet.find"



doggy.getCurrentLocation = function() {
		$.ajax({
			url: "https://maps.googleapis.com/maps/api/geocode/json",
			method: 'GET',
			dataType: 'json',
			data: {
				address: 'L4J5X4'
			}
		}).then(function(result){
			var lat = (result.results[0].geometry.location.lat);
			var lng= (result.results[0].geometry.location.lng);
			var latLng = lat + "," + lng;
			console.log(latLng)

			// doggy.myLatLng = {lat: lat, lng: lng}
			
			// var marker = new google.maps.Marker ({
			// 	position: searchApp.myLatLng,
			// 	map: searchApp.map,
			// 	title: "You Are Here!"
				
			// })
		});
	}


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
	doggy.getCurrentLocation();
});


