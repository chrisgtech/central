//GLOBAL VARIABLES AND INITIALIZATIONS
//set up the time variables for the appointments
var time = new Date();
var inc_time = 30 * 60000; 
time.setHours(8,0,0);

var globData;


$(document).ready(function () {
    //binding [loadPatientDetails()] to dynamically added patient cards
    //openFDAtest();
    $('body').on('click', '.patient_card', function (x) {
        loadPatientDetails(this);
        //.modal is the popup screen
        $('#PatientDetailScreen').modal();
    });
    $('#drugStore').data("inventory", {});
    $('#Patient_Search').on('keyup', patientSearch);
    $('#CheckOutButton').confirmation(
    {
        popout: true,
        onConfirm : checkPatientOut
    });
    
    //Picks a random number of patients between 5-20 count
    // and adds a random index of the patient to an array
    var num_of_patients = parseInt(Math.random()*100%15) + 5;
    var patient_index = [];
    while(patient_index.length < num_of_patients){
        var index = parseInt(Math.random()*100%100);
        if(patient_index.indexOf(index) === -1) {
            patient_index.push(index);
        }
    }
    //Uses the randomly generated array of patient indicies to fetch
    $.each(patient_index, function(i, index){
       getPatientData('Patient' , { _count : 1, _skip: index }, function(data){
           if(data.totalResults > 0) {
                parsePatientData(data);
            }
       });
    });
    
    
    /*getPatientData('Patient' , { _count: 15,
        _skip : 4 }, function(data){
           if(data.totalResults > 0) {
                parsePatientData(data);
            }
       });*/
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
 Purpose: parses the data from getPatients() to render the patient cards
 in the Scroll container
 */

function parsePatientData(data) {
    globda = data;

    var options = {hour: "numeric", minute: "numeric"}; //options for time 
    
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
        //appointment_queue.innerHTML = "Appointment #" + ($('.patient_card').length + 1) + "&nbsp;&nbsp;&nbsp; Scheduled: "+ newtime; //Why don't the (exaggerated) spaces show up on the screen? WLT
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


/*
 Author: Michael
 Date: 03/14/2015
 Purpose: Load details of patient in the Patient Detail screen
 Todo: everything :)
 */
function loadPatientDetails(card) {
    $('#PatientDetailScreen').data('PatientID', $(card).attr('patient_id'));
    $('#conditions, #medications, #observations').empty().append("<img class='patient_detail_loading' src='img/loading.gif' alt='Loading'/>");
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
                dataSwitch(option, array);
            }
        };
        getPatientData(option, param, processDrugs);
        //function to fetch Conditions, right now randomly getting 1-3 conditions from the server
        
        } else {
            //Already have bounded data for Condtion so don't refetch
            dataSwitch(option, $(card).data(option + 'Data'));
        }
    });
    
    /*Reason For Visit*/
    $('#visit').html($(card).data('ReasonForVisit'));
}

/*
 * Author: Michael
 * Date: 3/14/2015
 * Purpose: Switch data to proper load function based on [option]
 */
function dataSwitch(option, results) {
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
    var patientConditionCount = 0; // jc test data
    $('#PatientDetailScreen #conditions').empty();
    if(ConditionData.length === 0) $('#PatientDetailScreen #conditions').append("No Condition Data");
    $.each(ConditionData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.code.text + "</div>";
        $(el).data(item);
        patientConditionCount++;  // jc test data
        $('#PatientDetailScreen #conditions').append(el);
    });
    //$('#PatientDetailScreen #conditions').prepend('Condition Count: ' + patientConditionCount); // jc test data
    
}



/* Author: Michael
 * Date: 3/23/2015
 * Purpose: Load the medication details for a prescription
 * @param {type} ObservationData
 * @returns {undefined}
 */
function loadMedicationDetails(medId){
    var drugObj = $('#drugStore').data('inventory')[medId];
    $('.' + medId + '.rxnorm').html("Rxnorm: " + drugObj.entry[0].content.code.coding[0].code);
    $('.' + medId + '.brand').html("Brand: " + (drugObj.entry[0].content.isBrand ? 'Y' : 'N'));
    $('.' + medId + '.form').html("Form: " + drugObj.entry[0].content.product.form.text);
}



function openPlotScreen() {
    $('#PatientDetailScreen #observations').empty();
    var nav1 = document.createElement("div");
    nav1.className = "col-sm-12 Observ_btn";
    nav1.innerHTML += "<div class='col-sm-1' style='font-weight: bold;'>View:</div>";
    
    nav1.innerHTML += "<button type='button' onclick='openPlotScreen();' class='btn Observ_btn '>Plot</button>";
    
    nav1.innerHTML += "<button type='button' onclick='dummyLoadPatientObservations();'class='btn Observ_btn '>Raw</button>";
    $('#PatientDetailScreen #observations').append(nav1);
    
    var el = document.createElement("div");
    el.className = "col-sm-12";
    el.innerHTML +="<row></row>";  
    $('#PatientDetailScreen #observations').append(el);
}

function dummyLoadPatientObservations(){
    loadPatientObservations(globO);
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
    $('.patient_card[patient_id="' + $('#PatientDetailScreen').data('PatientID') + '"]').hide();
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

