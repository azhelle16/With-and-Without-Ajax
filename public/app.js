$(document).ready(function() {

	$('#ajax-form').submit(function(e) {

	    e.preventDefault(); // avoid to execute the actual submit of the form.
	    var an = $( "input[name='animal_name']" ).val();

	    if (an == "") {
	    	alert("Please enter an animal name")
	    	return
	    }

		$.ajax({
			url: '/animals-insert',
			method: 'GET',
			data: {animal_name : an}
		}).then(function(message){
			$( "input[name='animal_name']" ).val("")
			getAnimals();
		});

	});

}) 


function getAnimals() {

	$("div").empty()

	$.ajax({
        url: "/animals",
        method: "GET",
        async: false
    }).then(function (data) {
     	for (var n = 0; n < data.length; n++) {
        	var p = $("<p>")
        	p.append("Animal "+parseInt(n+1)+": "+data[n].animal_name)
        	$("div").append(p)
        }
    })

}