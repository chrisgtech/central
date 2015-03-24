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
    $('#CheckOutButton').confirmation(
    {
        popout: true,
        onConfirm : checkPatientOut
    });
    
    
    var num_of_patients = parseInt(Math.random()*100%15);
    var patient_index = [];
    while(patient_index.length < num_of_patients){
        var index = parseInt(Math.random()*100%100) + 4;
        if(patient_index.indexOf(index) === -1) {
            patient_index.push(index);
        }
    }
    getPatients({
        _count: 15,
        _skip : 4
    });
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
function getPatients(param) {
    $.ajax({
        url: "http://52.11.104.178:8080/Patient",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        /*TODO: Find out what all parameters we can send over*/
        data: param,
        success: function (data) {
            if(data.totalResults > 0) {
                parseData(data);
            }
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
    
    //set up the time variables for the appointments
    var time = new Date();
    var inc_time = 30 * 60000; // 15 minutes 
    //inc_time.setHours(0,15,0);
    time.setHours(8,0,0);
    var options = {hour: "numeric", minute: "numeric"};
    
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
        var picture = "";
        try{
        var picture = patientContent.photo[0].data;
        patient_img.setAttribute('src','data:image/jpg;base64,'+picture);
        }
        catch(e){
        patient_img.setAttribute('src','img/no_photo.jpg');
        }
        
        //patient_img.setAttribute('src', patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg');
        patient_img.setAttribute('alt', 'no_photo');

        var patient_demographics = document.createElement("div");
        patient_demographics.className = "card_demographic col-sm-7";
        //Patient Name
        patient_demographics.innerHTML += patientContent.name[0].given[0] + " " + patientContent.name[0].family[0];
        //Gender
        patient_demographics.innerHTML += patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '';
        //DOB
        patient_demographics.innerHTML += '<br>DOB: ' + (patientContent.birthDate ? formatDate(patientContent.birthDate) : 'N/A');
        //patient_demographics.innerHTML += '<br>Reason For Visit: ' + reasonForVisit;
        
        var reason_for_visit = document.createElement("div");
        reason_for_visit.className = "card_reason_for_visit col-sm-12";
        reason_for_visit.innerHTML = reasonForVisit;
        
        var newtime = new Intl.DateTimeFormat("en-US", options).format(time);
        var appointment_queue = document.createElement("div");
        appointment_queue.className = "card_appointment_queue col-sm-11";
        appointment_queue.innerHTML = "Appointment #" + (e+1) + "                       Scheduled:"+ newtime; //Why don't the (exaggerated) spaces show up on the screen? WLT
        time = new Date(time.getTime() + inc_time);
        
        patient_card.appendChild(patient_img);
        patient_card.appendChild(patient_demographics);
        patient_card.appendChild(reason_for_visit);
        patient_card.appendChild(appointment_queue);
        
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
function formatDate(date) {
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
    $('#patient_detail_DOB').text(formatDate(patient_data.content.birthDate));
    $('#patient_detail_gender').text(patient_data.content.gender.coding[0].display);
    $('#patient_detail_line').text(patient_data.content.address[0].line[0]);
    $('#patient_detail_city').text(patient_data.content.address[0].city);
    $('#patient_detail_state').text(patient_data.content.address[0].state);
    $('#patient_detail_zip').text(patient_data.content.address[0].zip);
    
    try{
        var picture = patient_data.content.photo[0].data;
        $('#patient_detail_photo').attr("src", 'data:image/jpg;base64,' + picture);
       }
    catch(e){
        $('#patient_detail_photo').attr("src", 'img/no_photo.jpg');
       }

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
    
    var options = ['Condition', 'MedicationPrescription', 'Observation'];
    $.each(options, function(o, option){
       if(typeof $(card).data(option + 'Data') === 'undefined'){
        var param = {
            'subject' : $(card).attr('patient_id').split('/')[1],
            _count: 50,
            _skip : 0
        };
        if(option === 'MedicationPrescription'){
            param = {
                'patient._id' : $(card).attr('patient_id').split('/')[1],
                _count: 50,
                _skip : 0
            };
        }
        var array = [];
        var processDrugs = function(x){
            array.push.apply(array, x.entry);
            param._skip += 50;
            if(param._skip < x.totalResults){
                getPatientData(option, param, processDrugs);
            } else {
                $(card).data(option + 'Data', array);
                loadData(option, array);
            }
        };
        getPatientData(option, param, processDrugs);
        //function to fetch Conditions, right now randomly getting 1-3 conditions from the server
        
        } else {
            //Already have bounded data for Condtion so don't refetch
            loadData(option, $(card).data(option + 'Data'));
        }
    });
    
    /*Reason For Visit*/
    $('#visit').html($(card).data('ReasonForVisit'));
}

function loadData(option, results) {
    switch(option){
        case 'Condition' : globC = results; loadPatientConditions(results); break;
        case 'MedicationPrescription' : globMP = results; loadPatientMedicationPrescriptions(results); break;
        case 'Observation' : globO = results; loadPatientObservations(results); break;
        default: globD = results; break;
    }
}


/*
 * Author: Michael
 * Date: 03/21/2015
 * Purpose: Renders the Patient's Conditions on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientConditions(ConditionData){
    $('#PatientDetailScreen #conditions').empty();
    if(ConditionData.length === 0) $('#PatientDetailScreen #conditions').append("No Condition Data");
    $.each(ConditionData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.code.text + "</div>";
        $(el).data(item);
        $('#PatientDetailScreen #conditions').append(el);
    });
    
}

/*
 * Author: Michael
 * Date: 03/21/2015
 * Purpose: Renders the Patient's MedicationPrescriptions on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientMedicationPrescriptions(MedicationData){
    $('#PatientDetailScreen #medications').empty();
    if(MedicationData.length === 0) $('#PatientDetailScreen #medications').append("No Medication Data");
    $.each(MedicationData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.medication.display + "</div>";
        el.innerHTML += "<div class='col-sm-12'>Date Written: " + formatDate(item.content.dateWritten) + "</div>";
        if(item.content.dispense.expectedSupplyDuration){
            el.innerHTML += "<div class='col-sm-12'>Supply Duration: " + item.content.dispense.expectedSupplyDuration .value
                    + " " + item.content.dispense.expectedSupplyDuration.units + "</div>";
        }
        el.innerHTML += "<div class='col-sm-12'>Quantity: " + item.content.dispense.quantity.value + "</div>";
        
        
        $(el).data(item);
        $('#PatientDetailScreen #medications').append(el);
    });
}

/*
 * Author: Michael
 * Date: 03/22/2015
 * Purpose: Renders the Patient's Observations on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientObservations(ObservationData){
    $('#PatientDetailScreen #observations').empty();
    if(ObservationData.length === 0) $('#PatientDetailScreen #observations').append("No Observation Data");
    $.each(ObservationData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>Recorded: " + formatDate(item.content.issued) + "</div>";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.name.coding[0].display 
                + ": " + (item.content.valueQuantity ? item.content.valueQuantity.value + " " 
                    + item.content.valueQuantity.units : 'N/A'); 
        $(el).data(item);
        $('#PatientDetailScreen #observations').append(el);
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
}/*
 * Clears the Check In Screen
 */
function clearCheckInScreen() {
    $('#CheckInScreen input, #CheckInScreen textarea').val('');
}

/*
 * Author: Michael
 * Date: 03/19/2015
 * Purpose: Open Drug Screen
 */
function openDrugScreen() {
    $('#DrugScreen').modal();
    //More to come here
}




/* Author: Michael
 * Date: 3/22/2015
 * Purpose: Generic function to reuse to fetch data based on the data_option sent in
 * @param {String} data_option
 * @param {Object} param
 * @param {Function} process
 */
function getPatientData(data_option, param, process) {
    $.ajax({
        url: "http://52.11.104.178:8080/" + data_option,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        data: param,
        dataType: 'json',
        contentType: 'application/json',
        success: process
    });
}


/* Author: Michael
 * Date: 3/21/2015
 * Purpose: Remove a patient from the Queue list
 * @returns {undefined}
 */
function checkPatientOut(){
    $('#PatientDetailScreen').modal('hide');
    $('.patient_card[patient_id="' + $('#PatientDetailScreen').data('PatientID') + '"]').remove();
    updateScrollContainerWidth();
}



/*
 * 
 * Functions for testing purposes
 * 
 * 
 */


//Just a test to see what's in drugs table
var allDrugs = [];
function getAllMedications(){
    
    var param = {
        _count: 50,
        _skip: 0
    };
    var processDrugs = function(x){
        allDrugs.push.apply(allDrugs, x.entry);
        param._skip += 50;
        if(param._skip < x.totalResults){
            getMedications(param, processDrugs);
        } else {
            console.log("Finished retrieving drugs");
        }
        
    };
    if(allDrugs.length === 0) {
        getMedications(param, processDrugs);
    }
    
}

function getAllRecords(option, array){
    
    var param = {
        _count: 50,
        _skip: 0
    };
    var processDrugs = function(x){
        array.push.apply(array, x.entry);
        param._skip += 50;
        if(param._skip < x.totalResults){
            $.ajax({
                url: "http://52.11.104.178:8080/" + option,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
                },
                dataType: 'json',
                data: param,
                contentType: 'application/json',
                /*TODO: Find out what all parameters we can send over*/
                success: processDrugs
            });
        } else {
            console.log("Finished retrieving data");
        }
        
    };
    if(array.length === 0) {
        $.ajax({
            url: "http://52.11.104.178:8080/" + option,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
            },
            dataType: 'json',
            data: param,
            contentType: 'application/json',
            /*TODO: Find out what all parameters we can send over*/
            success: processDrugs
        });
    }
    
}

