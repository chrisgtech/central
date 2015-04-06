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
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='plot' class='btn Observ_btn '>Plot</button>";
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='observation' class='btn Observ_btn '>Raw</button>";
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
    
    $('#PatientDetailScreen #observations').append("<div id='observation_data' class='observation_container'></div>");
    $.each(ObservationData, function(i, item) { 
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12'>Recorded: " + item.content.issued.toLocaleDateString() + "</div>";
        el.innerHTML += "<div class='col-sm-12'>" + item.content.name.coding[0].display 
                + ": " + (item.content.valueQuantity ? item.content.valueQuantity.value + " " 
                    + item.content.valueQuantity.units : item.content.interpretation.coding[0].display); 
        $(el).data(item);
        observationTotal++; // jc test data
        $('#PatientDetailScreen #observations #observation_data').append(el);
    });
    //$('#PatientDetailScreen #observations').prepend('Observation Count: ' + observationTotal); // jc test data
    
    $('#PatientDetailScreen #observations').append("<div style='display: none;' id='plot_data' class='observation_container'><div id='sysDia'></div><div id='weightData'></div></div>");
    //$('#PatientDetailScreen #observations').append("<div style='display: none;' id='plot_data' class='observation_container'><div id='weightData'></div></div>");
    
    printObservationData(ObservationData);
}

function plotScreenToggle(btn){
    var container = $(btn).attr('data-container');
    if(container === 'plot'){
        $('#observation_data').hide();
        $('#plot_data').show();
        if($('#sysDia').html() === ''){
            plotChart();
        }
//        if($('#weight').html() === ''){
//            plotChart();
//        }
    } else {
        $('#observation_data').show();
        $('#plot_data').hide();
    }
}

function plotChart(){
    //PatientDetailScreen is bounded with the current patient's ID
    var patientID = $('#PatientDetailScreen').data().PatientID;
    //Each Patient Card is bounded with its patients data (Condition, MedicationPrescription, Observations);
    var obs = $('.patient_card[patient_id="' + patientID + '"]').data("ObservationData");
    
    //Create our 'Store' to hold all our organized data;
//    var graphableObsStore = {
//        'interpretation' : [],
//        'types_of_observations' : []
//    };
    var wgtData = [];
    var sysData = [];
    var diaData = [];
    var singleData = [];
    var systitle;
    var diatitle;
    var sysunits;
    var wgtUnits;
    var wgtTitle;
    $.each(obs, function(o, observation) {
        //if observation has an interpretation, push it in the interpretation member
        if(typeof observation.content.interpretation !== 'undefined')  {
//            graphableObsStore['interpretation'].push(observation);
        } 
        else if (observation.content.name.coding[0].display === "Systolic Blood Pressure")
        {
            //Grab the obersvation display name (lower casing to prevent case sensitive errors)
            var display = observation.content.name.coding[0].display.toLowerCase();
            //If this display is not in our array of types, add it and create a new empty array member in the 'Store'
//            if(graphableObsStore['types_of_observations'].indexOf(display) === -1){
//                  graphableObsStore['types_of_observations'].push(display);
//                  graphableObsStore[display] = [];
//            }
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            //Push the observation in the appropriate member array
            sysData.push(singleData);
            singleData = [];
            //graphableObsStore[display].push(observation);
            systitle = observation.content.name.coding[0].display;
            sysunits = observation.content.valueQuantity.units;
            
        }
        else if (observation.content.name.coding[0].display === "Diastolic Blood Pressure")
        {
            var display = observation.content.name.coding[0].display.toLowerCase();
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            diaData.push(singleData);
            singleData = [];
            diatitle = observation.content.name.coding[0].display;
            
            
        }
        else if (observation.content.name.coding[0].display === "Weight")
        {

            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            wgtData.push(singleData);
            singleData = [];
            wgtTitle = observation.content.name.coding[0].display;
            wgtUnits = observation.content.valueQuantity.units;
            
        }
//
       
    });
    graphit("#sysDia", systitle,sysData,sysunits,diatitle,diaData,"","");
    graphit("#weightData",wgtTitle,wgtData,wgtUnits,"","","","");
    
}
    
function graphit(jclass,title1,Data1,units,title2,Data2,title3,Data3)
{
    var fulltitle;
    if (title2 !== ""){
        fulltitle = title1 + " and " + title2;
    }
    else{
        fulltitle = title1;
    }

var allSeries=[];

function dataset() {
    this.name = "";
    this.data =[];
};


var dataset1 = new dataset();
dataset1.name = title1;
dataset1.data = Data1;
allSeries.push(dataset1);

if (title2 !== "")
{
    var dataset2 = new dataset();
    dataset2.name = title2;
    dataset2.data = Data2;
    allSeries.push(dataset2);
}

if (title3 !== "")
{
    var dataset3 = new dataset();
    dataset3.name = title3;
    dataset3.data = Data3;
    allSeries.push(dataset3);
}






    $(jclass).highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: fulltitle 
                },
                //subtitle: {
                //    text: 'Irregular time data in Highcharts JS'
                //},
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%Y'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: units
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b %Y}: {point.y:.2f}'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: allSeries
//                 [{
//                     name: title1,
//                     // Define the data points. All series have a dummy year
//                     // of 1970/71 in order to be compared on the same x axis. Note
//                     // that in JavaScript, months start at 0 for January, 1 for February etc.
//                     data: sysData
//                 }, {
//                     name: title2,
//                     data: diaData
//                 }]
            });
}