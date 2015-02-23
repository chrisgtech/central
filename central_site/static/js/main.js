$(document).ready(function(){
	$('body').on('click', '.patient_card', function(x) {
		$('.modal').modal();
	});
	getPatients();
});


function getPatients() {
	$.ajax({
      url:"http://fhir.healthintersections.com.au/open/Patient?_format=json",  
      success:function(data) {
      		globData = data;
         parseData(data);
      }
   });
}

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
		//["resourceType", "text", "identifier", "name", "telecom", "gender", "birthDate", "address", "photo", "active", "extension", "managingOrganization"]
		$('.patient_card_scroll').append('<div class="patient_card">' 
		 		+ '<img class="card_photo_thumbnail" src="' 
		 				+ (patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg')
		 		+ '" alt="no_photo">' 
		 		+ '<div class="card_demographic">'
		 			+ e + '<br>'
		 			+ patientContent.name[0].given[0] + " " + patientContent.name[0].family[0]
		 			+ (patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '')
		 			+ '<br>DOB: ' + ( patientContent.birthDate ? patientContent.birthDate.split('-')[1] 
		 					+ "/" + patientContent.birthDate.split('-')[2] 
		 					+ "/" + patientContent.birthDate.split('-')[0]
		 					: 'N/A' )
		 		+ '</div>' 
		 	+ '</div>');
	});
	$('.patient_card_scroll').css('width', (350 * data.entry.length) + 'px');
	
}