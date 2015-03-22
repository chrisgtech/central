ReasonsForVisit = [
    'Patient is being referred to a pulmonary specialist for a pulmonary function test and diagnosis.',
    'Patient is being referred for a chronic bronchitis treatment and medication review.',
    'Patient is being referred for a chronic bronchitis and medication review.',
    'Patient is being referred for an Asthma diagnosis confirmation.',
    'Cold symptoms',
    'Broken arm'
];

$(document).ready(function () {
    //binding [loadPatientDetails()] to dynamically added patient cards
    $('body').on('click', '.patient_card', function (x) {
        /*Need to clear out the Detail Screen first*/
        //TODO: clearDetailScreen()
        
        loadPatientDetails(this);
        //.modal is the 
        $('#PatientDetailScreen').modal();
    });
    $('#Patient_Search').on('keyup', patientSearch);
    //initial load for patient data on card
    getPatients(parseInt(Math.random()*10%6) + 1, parseInt(Math.random()*100%200));
});

/*
 * Author: Michael
 * Date: 03/15/2015
 * Purpose: Filters out the current Patient Cards in the scroll container to the inquiry
 * TODO: Fire another ajax call to the database with the inquiry if no results were found; handle results
 */
function patientSearch() {
    var inquiry = $(this).val().toLowerCase();
    if (inquiry === "") {
        $('.patient_card').show();
    } else {
        $('.patient_card').each(function (i, item) {
            if ($(item).find('.card_demographic').text().toLowerCase().indexOf(inquiry) === -1) {
                $(item).hide();
            } else {
                $(item).show();
            }
        });
    }
    //Update scroll container's width
    updateScrollContainerWidth();
    //If there are at least 1 visible card, hide that loading thing.  Otherwise, show that loading thing.
    $('.patient_card:visible').length > 0 ? $('#dashboard_loading_img').hide() : $('#dashboard_loading_img').show();
}

/*
 Author: Michael
 Date: 03/14/2015
 Purpose: Fetches the patient data from the fhir server
 Todo:
 Add parameter to accept the number of desired records to pass
 */
function getPatients(count, skip) {
    $.ajax({
        url: "http://52.11.104.178:8080/Patient",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        /*TODO: Find out what all parameters we can send over*/
        data: {
            _count: count ? count : 25,
            _skip: skip ? skip : $('.patient_card').length
        },
        success: function (data) {
            globPatients = data;
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
    //$.each([array], function(index, element) {});
    $.each(data.entry, function (e, entry) {
        var reasonForVisit = ReasonsForVisit[parseInt(Math.random()*10%6)];
        
        var patientContent = entry.content;
        
        $('#dashboard_loading_img').hide();
        var patient_card = document.createElement("div");
        patient_card.className = "patient_card";
        patient_card.setAttribute('patient_id', entry.title);

        // [condition] ? [true] : [false]
        var patient_img = document.createElement("img");
        patient_img.className = "card_photo_thumbnail col-sm-5";
        patient_img.setAttribute('src', patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg');
        patient_img.setAttribute('alt', 'no_photo');

        var patient_demographics = document.createElement("div");
        patient_demographics.className = "card_demographic col-sm-7";
        //Patient Name
        patient_demographics.innerHTML += patientContent.name[0].given[0] + " " + patientContent.name[0].family[0];
        //Gender
        patient_demographics.innerHTML += patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '';
        //DOB
        patient_demographics.innerHTML += '<br>DOB: ' + (patientContent.birthDate ? formateDate(patientContent.birthDate) : 'N/A');
        //patient_demographics.innerHTML += '<br>Reason For Visit: ' + reasonForVisit;
        
        var reason_for_visit = document.createElement("div");
        reason_for_visit.className = "card_reason_for_visit col-sm-12";
        reason_for_visit.innerHTML = reasonForVisit;
        
        patient_card.appendChild(patient_img);
        patient_card.appendChild(patient_demographics);
        patient_card.appendChild(reason_for_visit);
        
        $(patient_card).data("PatientData", entry).data("ReasonForVisit", reasonForVisit);
        $('.patient_card_scroll').append(patient_card);
        
        updateScrollContainerWidth();
    });
}

/*Author: Michael
 * Date: 03/2015
 * Just something to reuse to adjust width of scroll container
 * */
function updateScrollContainerWidth() {
    var num_of_cards = $('.patient_card:visible').length;
    
    //Dynamically edit width for the scroll container depending on the number of cards rendered
    $('.patient_card_scroll').css('width', ((parseInt($('.patient_card:first').css('width')) + 50) * $('.patient_card:visible').length) + 'px');
    $('#num_of_patients').html('Patients Shown: ' + num_of_cards);
    
}

/*
 * Author: Michael
 * Date: 3/17/2015
 * Format the date to MM/DD/YYYY
 * 
 */
function formateDate(date) {
    return date.split('-')[1] + "/" + date.split('-')[2] + "/" + date.split('-')[0];
}



/*
 Author: Michael
 Date: 03/14/2015
 Purpose: Load details of patient in the Patient Detail screen
 Todo: everything :)
 */
function loadPatientDetails(card) {
    $('#PatientDetailScreen').data('PatientID', $(card).attr('patient_id'));
    /*Patent Section*/
    var patient_data = $(card).data('PatientData');
    var dob = new Date(patient_data.content.birthDate);
    var today = new Date();
    var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
    $('#patient_detail_name').text(patient_data.content.name[0].given[0] + " " +
            patient_data.content.name[0].given[1] + " " +
            patient_data.content.name[0].family[0]);
    $('#patient_detail_age').text(age);
    $('#patient_detail_DOB').text(formateDate(patient_data.content.birthDate));
    $('#patient_detail_gender').text(patient_data.content.gender.coding[0].display);
    $('#patient_detail_line').text(patient_data.content.address[0].line[0]);
    $('#patient_detail_city').text(patient_data.content.address[0].city);
    $('#patient_detail_state').text(patient_data.content.address[0].state);
    $('#patient_detail_zip').text(patient_data.content.address[0].zip);

    $('#patient_detail_phone1, #patient_detail_phone2').text('');
    $.each(patient_data.content.telecom, function (t, type) {
        if (type.system === 'email') {
            $('#patient_detail_email').text(type.value);
            $('#patient_detail_email').closest('a').attr('href', 'mailto:' + type.value);
        } else {
            switch (type.use) {
                case 'mobile' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-phone');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-phone');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
                case 'home' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-home');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-home');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
                case 'work' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-briefcase');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-briefcase');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
            }
        }
    });
    
    /*Section for Conditions*/
    //If the card does not have Condition data bounded to it, we'll go fetch them
    if(typeof $(card).data('ConditionData') === 'undefined'){
        //function to fetch Conditions, right now randomly getting 1-3 conditions from the server
        getConditions(parseInt(Math.random()*10%3) + 1, parseInt(Math.random()*100%261), function(results){
           $(card).data('ConditionData', results);
           loadPatientConditions(results);
        });
    } else {
        //Already have bounded data for Condtion so don't refetch
        loadPatientConditions($(card).data('ConditionData'));
    }
    
    /*Section for Medication*/
    if(typeof $(card).data('MedicationData') === 'undefined'){
        getMedications(parseInt(Math.random()*10%3) + 1, parseInt(Math.random()*100%4270), function(results){
           $(card).data('MedicationData', results);
           loadPatientMedications(results);
        });
    } else {
        //Already have bounded data for Medications so don't refetch
        loadPatientMedications($(card).data('MedicationData'));
    }
}

/*
 * Author: Michael
 * Date: 03/21/2015
 * Purpose: Renders the Patients Conditions on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientConditions(ConditionData){
    $('#PatientDetailScreen #conditions').empty();
    $.each(ConditionData.entry, function(i, item) { 
        $('#PatientDetailScreen #conditions').append(item.content.code.text + "<br/>");
    });
}

/*
 * Author: Michael
 * Date: 03/21/2015
 * Purpose: Renders the Patients Medications on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientMedications(MedicationData){
    $('#PatientDetailScreen #drugs').empty();
    $.each(MedicationData.entry, function(i, item) { 
        $('#PatientDetailScreen #drugs').append(item.content.name + "<br/>");
    });
    
}


/*
 * Author: Michael
 * Date: 03/18/2015
 * Purpose: Open and clear out the Check In Screen
 */
function openCheckInScreen() {
    clearCheckInScreen();
    $('#CheckInScreen').modal();

}

/*
 * Author: Michael
 * Date: 03/19/2015
 * Purpose: Open Drug Screen
 */
function openDrugScreen() {
    $('#DrugScreen').modal();

}

/*
 * 
 * @returns {undefined}
 */
function clearCheckInScreen() {
    $('#CheckInScreen input, #CheckInScreen textarea').val('');
}

/* Author: Michael
 * Date: 3/21/2015 
 * Purpose: Temp workaround for Conditions; might actually turn into real
 * 
 */
function getConditions(count, skip, processConditions) {
    $.ajax({
        url: "http://52.11.104.178:8080/Condition",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        data: {
            _count: count ? count : 25,
            _skip: skip ? skip : 0
        },
        dataType: 'json',
        contentType: 'application/json',
        success: processConditions
    });
}

/* Author: Michael
 * Date: 3/21/2015 
 * Purpose: Temp workaround for medication
 * 
 */
function getMedications(count, skip, processDrugs) {
    $.ajax({
        url: "http://52.11.104.178:8080/Medication",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        data: {
            _count: count ? count : 25,
            _skip: skip ? skip : 0
        },
        dataType: 'json',
        contentType: 'application/json',
        success: processDrugs
    });
}


function checkPatientOut(){
    $('#PatientDetailScreen').modal('hide');
    $('.patient_card[patient_id="' + $('#PatientDetailScreen').data('PatientID') + '"]').remove();
    updateScrollContainerWidth();
}