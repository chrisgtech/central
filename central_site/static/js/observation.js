/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * Author: Michael
 * Date: 03/22/2015
 * Purpose: Renders the Patient's Observations on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientObservations(ObservationData){
    var observationTotal = 0; // jc test count
    $('#PatientDetailScreen #observations').empty();
    //Draw display buttons
    var nav1 = document.createElement("div");
    nav1.className = "col-sm-12 Observ_btn";
    nav1.innerHTML += "<div class='col-sm-1' style='font-weight: bold;'>View:</div>";
    
    nav1.innerHTML += "<button type='button' onclick='openPlotScreen();' class='btn Observ_btn '>Plot</button>";
    nav1.innerHTML += "<button type='button' onclick='dummyLoadPatientObservations();'class='btn Observ_btn '>Raw</button>";
    $('#PatientDetailScreen #observations').append(nav1);

    if(ObservationData.length === 0) $('#PatientDetailScreen #observations').append("No Observation Data");
    
    //Convert Date strings to date objects
    $.each(ObservationData, function(i, item) {
        ObservationData[i].content.issued  = new Date(item.content.issued);
    });
    ObservationData.sort(function(a, b) {
        var a = a.content.issued;
        var b = b.content.issued; 
        return ((b < a) ? -1 : ((b > a) ? 1 : 0)); 
    });
    
    
    $.each(ObservationData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12'>Recorded: " + item.content.issued.toLocaleDateString() + "</div>";
        el.innerHTML += "<div class='col-sm-12'>" + item.content.name.coding[0].display 
                + ": " + (item.content.valueQuantity ? item.content.valueQuantity.value + " " 
                    + item.content.valueQuantity.units : item.content.interpretation.coding[0].display); 
        $(el).data(item);
        observationTotal++; // jc test data
        $('#PatientDetailScreen #observations').append(el);
    });
    //$('#PatientDetailScreen #observations').prepend('Observation Count: ' + observationTotal); // jc test data
}