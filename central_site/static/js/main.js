$(document).ready(function(){
	$('body').on('click', '.patient_card', function(x) {
		console.log(this);
		card = this;
		$('.modal').modal();
		//patient Detail
		//TODO: Create function to handle how to display patient detail
	});
	getPatients();
});


function getPatients() {
	//TODO: Get parameter to gather more than 50 patients
	//TODO: Get a list of possible parameters to pass in

	$.ajax({
      url:"http://52.11.104.178:8080/Patient",  
      beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
      },
      dataType: 'json',
      contentType: 'application/json',
      success:function(data) {
      		globData = data;
         parseData(data);
      }
   });
}

//Array for just learning what fields are available on a fhir server patient entry
var allAttr = [];
function parseData(data) {
	$('.patient_card_scroll').empty();
	$.each(data.entry, function(e, entry) {
		var patientContent = entry.content;
		for(attr in patientContent){
			if(allAttr.indexOf(attr) === -1){
				allAttr.push(attr);
			}
		}
		
		//This is just a note of the types of fields I've encountered with other servers
		//["resourceType", "text", "identifier", "name", "telecom", "gender", "birthDate", "address", "photo", "active", "extension", "managingOrganization"]
		
		//Two paths to go down: 1) where we just quickly throw data in the cards and assign the patient ID for reference 
		//in a shared global array to populate the patient detail modal or 2) create each element as a javascript object, 
		//bind the patient's data to the element, and use that to populate the patient detail modal
		
		//path with patient ID as reference for global array
		$('.patient_card_scroll').append('<div class="patient_card" patient_id="' + entry.title + '">' 
		 		+ '<img class="card_photo_thumbnail" src="' 
		 				+ (patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg')
		 		+ '" alt="no_photo">' 
		 		+ '<div class="card_demographic">'
		 			//For patient name, see what could possible be in the array past the first element
		 			+ patientContent.name[0].given[0] + " " + patientContent.name[0].family[0]
		 			+ (patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '')
		 			+ '<br>DOB: ' + ( patientContent.birthDate ? patientContent.birthDate.split('-')[1] 
		 					+ "/" + patientContent.birthDate.split('-')[2] 
		 					+ "/" + patientContent.birthDate.split('-')[0]
		 					: 'N/A' )
		 		+ '</div>' 
		 	+ '</div>');
		 	
		 //path to binding data to the card
		 
		 
	});
	//Dynamically edit width for the scroll container depending on the number of cards rendered
	$('.patient_card_scroll').css('width', (350 * data.entry.length) + 'px');
	
}