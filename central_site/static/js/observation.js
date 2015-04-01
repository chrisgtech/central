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
    
    $('#PatientDetailScreen #observations').append("<div style='display: none;' id='plot_data' class='observation_container'><div id='myChart'></div></div>");
    
}

function plotScreenToggle(btn){
    var container = $(btn).attr('data-container');
    if(container === 'plot'){
        $('#observation_data').hide();
        $('#plot_data').show();
        if($('#myChart').html() === ''){
            plotChart();
        }
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
    var observationStore = {
        'interpretation' : [],
        'types_of_observations' : []
    };
    
    $.each(obs, function(o, observation) {
        //if observation has an interpretation, push it in the interpretation member
        if(typeof observation.content.interpretation !== 'undefined') {
            observationStore['interpretation'].push(observation);
        } else {
            //Grab the obersvation display name (lower casing to prevent case sensitive errors)
            var display = observation.content.name.coding[0].display.toLowerCase();
            //If this display is not in our array of types, add it and create a new empty array member in the 'Store'
            if(observationStore['types_of_observations'].indexOf(display) === -1){
                  observationStore['types_of_observations'].push(display);
                  observationStore[display] = [];
            }
            //Push the observation in the appropriate member array
            observationStore[display].push(observation);
        }
    });
    
    $('#myChart').highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: 'Snow depth at Vikjafjellet, Norway'
                },
                subtitle: {
                    text: 'Irregular time data in Highcharts JS'
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: { // don't display the dummy year
                        month: '%e. %b',
                        year: '%b'
                    },
                    title: {
                        text: 'Date'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Snow depth (m)'
                    },
                    min: 0
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                },
                plotOptions: {
                    spline: {
                        marker: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Winter 2007-2008',
                    // Define the data points. All series have a dummy year
                    // of 1970/71 in order to be compared on the same x axis. Note
                    // that in JavaScript, months start at 0 for January, 1 for February etc.
                    data: [
                        [Date.UTC(1970,  9, 27), 0   ],
                        [Date.UTC(1970, 10, 10), 0.6 ],
                        [Date.UTC(1970, 10, 18), 0.7 ],
                        [Date.UTC(1970, 11,  2), 0.8 ],
                        [Date.UTC(1970, 11,  9), 0.6 ],
                        [Date.UTC(1970, 11, 16), 0.6 ],
                        [Date.UTC(1970, 11, 28), 0.67],
                        [Date.UTC(1971,  0,  1), 0.81],
                        [Date.UTC(1971,  0,  8), 0.78],
                        [Date.UTC(1971,  0, 12), 0.98],
                        [Date.UTC(1971,  0, 27), 1.84],
                        [Date.UTC(1971,  1, 10), 1.80],
                        [Date.UTC(1971,  1, 18), 1.80],
                        [Date.UTC(1971,  1, 24), 1.92],
                        [Date.UTC(1971,  2,  4), 2.49],
                        [Date.UTC(1971,  2, 11), 2.79],
                        [Date.UTC(1971,  2, 15), 2.73],
                        [Date.UTC(1971,  2, 25), 2.61],
                        [Date.UTC(1971,  3,  2), 2.76],
                        [Date.UTC(1971,  3,  6), 2.82],
                        [Date.UTC(1971,  3, 13), 2.8 ],
                        [Date.UTC(1971,  4,  3), 2.1 ],
                        [Date.UTC(1971,  4, 26), 1.1 ],
                        [Date.UTC(1971,  5,  9), 0.25],
                        [Date.UTC(1971,  5, 12), 0   ]
                    ]
                }, {
                    name: 'Winter 2008-2009',
                    data: [
                        [Date.UTC(1970,  9, 18), 0   ],
                        [Date.UTC(1970,  9, 26), 0.2 ],
                        [Date.UTC(1970, 11,  1), 0.47],
                        [Date.UTC(1970, 11, 11), 0.55],
                        [Date.UTC(1970, 11, 25), 1.38],
                        [Date.UTC(1971,  0,  8), 1.38],
                        [Date.UTC(1971,  0, 15), 1.38],
                        [Date.UTC(1971,  1,  1), 1.38],
                        [Date.UTC(1971,  1,  8), 1.48],
                        [Date.UTC(1971,  1, 21), 1.5 ],
                        [Date.UTC(1971,  2, 12), 1.89],
                        [Date.UTC(1971,  2, 25), 2.0 ],
                        [Date.UTC(1971,  3,  4), 1.94],
                        [Date.UTC(1971,  3,  9), 1.91],
                        [Date.UTC(1971,  3, 13), 1.75],
                        [Date.UTC(1971,  3, 19), 1.6 ],
                        [Date.UTC(1971,  4, 25), 0.6 ],
                        [Date.UTC(1971,  4, 31), 0.35],
                        [Date.UTC(1971,  5,  7), 0   ]
                    ]
                }, {
                    name: 'Winter 2009-2010',
                    data: [
                        [Date.UTC(1970,  9,  9), 0   ],
                        [Date.UTC(1970,  9, 14), 0.15],
                        [Date.UTC(1970, 10, 28), 0.35],
                        [Date.UTC(1970, 11, 12), 0.46],
                        [Date.UTC(1971,  0,  1), 0.59],
                        [Date.UTC(1971,  0, 24), 0.58],
                        [Date.UTC(1971,  1,  1), 0.62],
                        [Date.UTC(1971,  1,  7), 0.65],
                        [Date.UTC(1971,  1, 23), 0.77],
                        [Date.UTC(1971,  2,  8), 0.77],
                        [Date.UTC(1971,  2, 14), 0.79],
                        [Date.UTC(1971,  2, 24), 0.86],
                        [Date.UTC(1971,  3,  4), 0.8 ],
                        [Date.UTC(1971,  3, 18), 0.94],
                        [Date.UTC(1971,  3, 24), 0.9 ],
                        [Date.UTC(1971,  4, 16), 0.39],
                        [Date.UTC(1971,  4, 21), 0   ]
                    ]
                }]
            });
    
    
    
}