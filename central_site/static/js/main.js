$(document).ready(function(){

    //binding [loadPatientDetails()] to dynamically added patient cards
    $('body').on('click', '.patient_card', function(x) {
        loadPatientDetails($(this).attr('patient_id'));
        //.modal is the 
        $('.modal').modal();
    });

    $('#Patient_Search').on('keyup', patientSearch);
    //initial load for patient data on card
    getPatients();
});


/*
 * Author: Michael
 * Date: 03/15/2015
 * Purpose: Filters out the current Patient Cards in the scroll container to the inquiry
 * TODO: Fire another ajax call to the database with the inquiry if no results were found; handle results
 */
function patientSearch() {
    var inquiry = $(this).val().toLowerCase();
    if(inquiry === ""){
        $('.patient_card').show();
    } else {
        $('.patient_card').each(function(i, item) {
            if($(item).find('.card_demographic').text().toLowerCase().indexOf(inquiry) === -1){
                $(item).hide();
            } else {
                $(item).show();
            }
        });
    }
    //Update scroll container's width
    updateScrollContainerWidth();
    //If there are atleast 1 visible card, hide that loading thing.  Otherwise, show that loading thing.
    $('.patient_card:visible').length > 0 ? $('#dashboard_loading_img').hide() : $('#dashboard_loading_img').show();
}

/*
Author: Michael
Date: 03/14/2015
Purpose: Fetches the patient data from the fhir server
Todo:
Add parameter to accept the number of desired records to pass
*/
function getPatients(count) {
    $.ajax({
        url:"http://52.11.104.178:8080/Patient",  
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        /*TODO: Find out what all parameters we can send over*/
        data: {
          _count : count ? count : 25,
          _skip  : $('.patient_card').length
        },
        success:function(data) {
            globData = data;
            parseData(data);
        }
    });
}



/*
Author: Michael
Date: 03/14/2015
Purpose: parses the data from getPatients() to render the patient cards
in the Scroll container
*/
function parseData(data) {
    $('.patient_card_scroll').empty();
    $.each(data.entry, function(e, entry) {
        var patientContent = entry.content;
        
        $('#dashboard_loading_img').hide();

        var patient_card = document.createElement("div");
        patient_card.className = "patient_card";
        patient_card.setAttribute('patient_id', entry.title);
        
        var patient_img = document.createElement("img");
        patient_img.className = "card_photo_thumbnail";
        patient_img.setAttribute('src', patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg');
        patient_img.setAttribute('alt', 'no_photo');
         
        var patient_demographics = document.createElement("div");
        patient_demographics.className = "card_demographic";
        //Patient Name
        patient_demographics.innerHTML += patientContent.name[0].given[0] + " " + patientContent.name[0].family[0];
        //Gender
        patient_demographics.innerHTML += patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '';
        //DOB
        patient_demographics.innerHTML += '<br>DOB: ' + ( patientContent.birthDate ? patientContent.birthDate.split('-')[1] 
                                        + "/" + patientContent.birthDate.split('-')[2] 
                                        + "/" + patientContent.birthDate.split('-')[0]
                                        : 'N/A');
         patient_card.appendChild(patient_img);
         patient_card.appendChild(patient_demographics);
         $(patient_card).data(entry);
        $('.patient_card_scroll').append(patient_card);
         
         
        updateScrollContainerWidth();
    });
    
}

function updateScrollContainerWidth(){
    //Dynamically edit width for the scroll container depending on the number of cards rendered
    $('.patient_card_scroll').css('width', (
            (   parseInt($('.patient_card:first').css('width')) + 2 * parseInt($('.patient_card:first').css('padding')))
            * $('.patient_card:visible').length) + 'px');
}

/*
Author: Michael
Date: 03/14/2015
Purpose: Load details of patient in the Patient Detail screen
Todo: everything :)
*/
function loadPatientDetails(patient_id) {
	console.log(patient_id);
}