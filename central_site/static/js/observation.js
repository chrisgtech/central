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
function loadPatientObservations(ObservationData) {
    var observationTotal = 0; // jc test count
    $('#PatientDetailScreen #observations').empty();
    //Draw display buttons
    var nav1 = document.createElement("div");
    nav1.className = "col-sm-12 Observ_btn";
    nav1.innerHTML += "<div class='col-sm-1' style='font-weight: bold;'>View:</div>";
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='plot' class='btn Observ_btn '>Plot</button>";
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='tests' class='btn Observ_btn '>Tests</button>";
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='screenings' class='btn Observ_btn '>Screenings</button>";
    nav1.innerHTML += "<button type='button' onclick='plotScreenToggle(this);' data-container='observation' class='btn Observ_btn '>Raw</button>";
    $('#PatientDetailScreen #observations').append(nav1);

    if (ObservationData.length === 0) $('#PatientDetailScreen #observations').append("No Observation Data");


    //Convert Date strings to date objects
    $.each(ObservationData, function(i, item) {
        ObservationData[i].content.issued = new Date(item.content.issued);
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
        el.innerHTML += "<div class='col-sm-12'>" + item.content.name.coding[0].display +
            ": " + (item.content.valueQuantity ? item.content.valueQuantity.value +
                " " + item.content.valueQuantity.units : item.content.interpretation.coding[0].display);
        $(el).data(item);
        observationTotal++; // jc test data
        $('#PatientDetailScreen #observations #observation_data').append(el);
    });
    //$('#PatientDetailScreen #observations').prepend('Observation Count: ' + observationTotal); // jc test data

    $('#PatientDetailScreen #observations').append(
        "<div style='display: none;' id='plot_data' class='observation_container'> \
                <div id='sysDia'></div> \
                <div id='weightData'></div> \
                <div id='fat'></div> \
                <div id='cholesterol'></div> \
            </div>");
    
    $('#PatientDetailScreen #observations').append(
        "<div style='display: none;' id='tests_data' class='observation_container'> \
            </div>");
    
    $('#PatientDetailScreen #observations').append(
        "<div style='display: none;' id='screenings_data' class='observation_container'> \
            </div>");


    //printObservationData(ObservationData);
}

function plotScreenToggle(btn) {
    var container = $(btn).attr('data-container');

    if (container === 'tests') {
        $('#observation_data').hide();
        $('#plot_data').hide();
        $('#screenings_data').hide();
        $('#tests_data').show();
        var tests = organizeObs("tests");
        loadtests(tests);
        }
        
    else if (container === 'screenings') {
        $('#observation_data').hide();
        $('#plot_data').hide();
        $('#screenings_data').show();
        $('#tests_data').hide();
        var screenings = organizeObs("screenings");
        loadscreenings(screenings);
        } 
     
    else if (container === 'observation') {
        $('#observation_data').show();
        $('#plot_data').hide();
    }
    else {
        $('#observation_data').hide();
        $('#plot_data').show();
        if ($('#sysDia').html() === '') {
            plotChart();
        }
    }
    
    
}

function organizeObs(testType) {
    //This function organizes all of the observation data into a data dictionary
    //that uses the observation code as the key.  The value associated with the
    //key is an array of objects that specify a given test or screening.
    //it has this structure:
    // key: 2085-1 (observation code)
    // value: Array of 3 objects.
    // value[0]{
    //                    date: date observation issued
    //                    name: name of observation
    //                    code: should match key. (put here for troubleshooting)
    //                    value: only available if screen = false
    //                    units: only available if screen = false
    //                    interpretation: only available if screen = true
    //                    screen: true or false to denote if the observation is a lab test or screening.
    //
    var dict = {};

    //PatientDetailScreen is bounded with the current patient's ID
    var patientID = $('#PatientDetailScreen').data().PatientID;
    //Each Patient Card is bounded with its patients data (Condition, MedicationPrescription, Observations);
    var obs = $('.patient_card[patient_id="' + patientID + '"]').data("ObservationData");

    $.each(obs, function(o, observation) {
        if (typeof observation.content.name.coding[0].code !== 'undefined') {
            var obsInfo = {
                date: "",
                name: "",
                code: "",
                value: "",
                units: "",
                interpretation: "",
                screen: false
            };
            var key = observation.content.name.coding[0].code;
            obsInfo.date = observation.content.issued;
            obsInfo.name = observation.content.name.coding[0].display;
            obsInfo.code = key;
            if (typeof observation.content.interpretation !== 'undefined') {
                obsInfo.screen = true;
                obsInfo.interpretation = observation.content.interpretation.coding[0].display;
            } else {
                obsInfo.value = observation.content.valueQuantity.value;
                obsInfo.units = observation.content.valueQuantity.units;
                obsInfo.screen = false;
            }
            if (!(key in dict)) {
                var obsarray = [];
                obsarray.push(obsInfo);
                dict[key] = obsarray;
            } else {
                var obsarray = [];
                dict[key].push(obsInfo);
            }
        }

    });
    var screenings = {};
    var tests = {};
    for (var index in dict) {
        if (dict[index][0].screen) {
            screenings[index] = dict[index];
        } else {
            tests[index] = dict[index];
        }
    }
}

function plotChart() {
    //PatientDetailScreen is bounded with the current patient's ID
    var patientID = $('#PatientDetailScreen').data().PatientID;
    //Each Patient Card is bounded with its patients data (Condition, MedicationPrescription, Observations);
    var obs = $('.patient_card[patient_id="' + patientID + '"]').data("ObservationData");

    var singleData = [];

    var systitle;
    var sysunits;
    var sysData = [];
    var sysmax;
    var sysmin;

    var diatitle;
    var diaData = [];
    var diamax;
    var diamin;

    var wgtTitle;
    var wgtUnits;
    var wgtData = [];
    var wgtmax;
    var wgtmin;

    var triTitle;
    var triUnits;
    var triData = [];
    var trimax;
    var trimin;

    var choTitle;
    var choData = [];
    var chomax;
    var chomin;

    var ldlTitle;
    var ldlData = [];
    var ldlmax;
    var ldlmin;

    var hdlTitle;
    var hdlData = [];
    var hdlmax;
    var hdlmin;

    //start to separate out the graphable functions
    $.each(obs, function(o, observation) {
        //we will have to take care of the interpreted tests.

        //this begins the graphable vitals and tests.
        if (observation.content.name.coding[0].display === "Systolic Blood Pressure") {
            var display = observation.content.name.coding[0].display.toLowerCase();
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            sysData.push(singleData);
            singleData = [];
            systitle = observation.content.name.coding[0].display;
            sysunits = observation.content.valueQuantity.units;
            sysmax = observation.content.referenceRange[0].high.value;
            sysmin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "Diastolic Blood Pressure") {
            var display = observation.content.name.coding[0].display.toLowerCase();
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            diaData.push(singleData);
            singleData = [];
            diatitle = observation.content.name.coding[0].display;
            diamax = observation.content.referenceRange[0].high.value;
            diamin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "Weight") {
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            wgtData.push(singleData);
            singleData = [];
            wgtTitle = observation.content.name.coding[0].display;
            wgtUnits = observation.content.valueQuantity.units;
            wgtmax = observation.content.referenceRange[0].high.value;
            wgtmin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "Triglyceride") {
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            triData.push(singleData);
            singleData = [];
            triTitle = observation.content.name.coding[0].display;
            triUnits = observation.content.valueQuantity.units;
            trimax = observation.content.referenceRange[0].high.value;
            trimin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "Total cholesterol") {
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            choData.push(singleData);
            singleData = [];
            choTitle = observation.content.name.coding[0].display;
            chomax = observation.content.referenceRange[0].high.value;
            chomin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "LDL") {
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            ldlData.push(singleData);
            singleData = [];
            ldlTitle = observation.content.name.coding[0].display;
            ldlmax = observation.content.referenceRange[0].high.value;
            ldlmin = observation.content.referenceRange[0].low.value;
        } else if (observation.content.name.coding[0].display === "HDL") {
            singleData.push(observation.content.issued.valueOf());
            singleData.push(observation.content.valueQuantity.value);
            hdlData.push(singleData);
            singleData = [];
            hdlTitle = observation.content.name.coding[0].display;
            hdlmax = observation.content.referenceRange[0].high.value;
            hdlmin = observation.content.referenceRange[0].low.value;
        }
    });

    var graphGen1 = new graphGen();
    var graphDataset1 = new graphDataset();
    var graphDataset2 = new graphDataset();
    var graphDataset3 = new graphDataset();
    var graphDataset4 = new graphDataset();

    graphGen1.jclass = "#sysDia";
    graphGen1.units = sysunits;
    graphDataset1.title = systitle;
    graphDataset1.data = sysData;
    graphDataset1.max = sysmax;
    graphDataset1.min = sysmin;

    graphDataset2.title = diatitle;
    graphDataset2.data = diaData;
    graphDataset2.max = diamax;
    graphDataset2.min = diamin;

    graphit(graphGen1, graphDataset1, graphDataset2);

    graphGen1.jclass = "#weightData";
    graphGen1.units = wgtUnits;
    graphDataset1.title = wgtTitle;
    graphDataset1.data = wgtData;
    graphDataset1.min = wgtmin;
    graphDataset1.max = wgtmax;

    graphit(graphGen1, graphDataset1);

    graphGen1.jclass = "#fat";
    graphGen1.units = triUnits;

    graphDataset1.title = triTitle;
    graphDataset1.data = triData;
    graphDataset1.max = trimax;
    graphDataset1.min = trimin;

    graphDataset2.title = choTitle;
    graphDataset2.data = choData;
    graphDataset2.max = chomax;
    graphDataset2.min = chomin;


    graphDataset3.title = ldlTitle;
    graphDataset3.data = ldlData;
    //graphDataset3.max = ldlmax;
    //graphDataset3.min = ldlmin;

    graphDataset4.title = hdlTitle;
    graphDataset4.data = hdlData;
    //graphDataset4.max = hdlmax;
    //graphDataset4.min = hdlmin;

    graphit(graphGen1, graphDataset2, graphDataset3, graphDataset4);

    graphGen1.jclass = "#cholesterol";
    graphGen1.units = triUnits;
    graphit(graphGen1, graphDataset1);

}

function graphGen() {
    this.jclass = "";
    this.units = ""
};

function graphDataset() {
    this.title = "";
    this.data = [];
    this.max = -1;
    this.min = -1;
};

function dataset() {
    this.name = "";
    this.data = [];
};

function graphit(graphGen, graphDataset1, graphDataset2, graphDataset3, graphDataset4) {
    //set the title of the graph based on the number of passed variables
    var fulltitle;
    if (graphDataset4) {
        fulltitle = graphDataset1.title + " and " + graphDataset2.title + " and " + graphDataset3.title + " and " + graphDataset4.title;
    } else if (graphDataset3) {
        fulltitle = graphDataset1.title + " and " + graphDataset2.title + " and " + graphDataset3.title;
    } else if (graphDataset2) {
        fulltitle = graphDataset1.title + " and " + graphDataset2.title;
    } else {
        fulltitle = graphDataset1.title;
    }

    //create the series object (up to 4 series on the same graph)
    var allSeries = [];
    var highVal1 = -1;
    var highVal2 = -1;
    var highVal3 = -1;
    var highVal4 = -1;
    var lowVal1 = -1;
    var lowVal2 = -1;
    var lowVal3 = -1;
    var lowVal4 = -1;

    var label1;
    var label2;
    var label3;
    var label4;

    var dataset1 = new dataset();
    dataset1.name = graphDataset1.title;
    dataset1.data = graphDataset1.data;
    allSeries.push(dataset1);
    lowVal1 = graphDataset1.min;
    highVal1 = graphDataset1.max;
    label1 = graphDataset1.title + " normal range"

    if (graphDataset2) {
        var dataset2 = new dataset();
        dataset2.name = graphDataset2.title;
        dataset2.data = graphDataset2.data;
        allSeries.push(dataset2);
        lowVal2 = graphDataset2.min;
        highVal2 = graphDataset2.max;
        label2 = graphDataset2.title + " normal range"
    }

    if (graphDataset3) {
        var dataset3 = new dataset();
        dataset3.name = graphDataset3.title;
        dataset3.data = graphDataset3.data;
        allSeries.push(dataset3);
        lowVal3 = graphDataset3.min;
        highVal3 = graphDataset3.max;
        label3 = graphDataset3.title + " normal range"
    }

    if (graphDataset4) {
        var dataset4 = new dataset();
        dataset4.name = graphDataset4.title;
        dataset4.data = graphDataset4.data;
        allSeries.push(dataset4);
        lowVal4 = graphDataset4.min;
        highVal4 = graphDataset4.max;
        label4 = graphDataset4.title + " normal range"
    }

    $(graphGen.jclass).highcharts({
        chart: {
            type: 'spline',
            borderColor: '#ccc',
            marginLeft: 110,
            marginRight: 50,
            backgroundColor: '#eee',
            plotBackgroundColor: '#fff',
            borderWidth: 1,


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
                text: graphGen.units
            },
            min: 0,

            plotBands: [{
                color: '#C4F0C4',
                from: lowVal1,
                to: highVal1,
                label: {
                    text: label1,
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: -3
                }
            }, {
                color: '#C4F0C4',
                from: lowVal2,
                to: highVal2,
                label: {
                    text: label2,
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: -3
                }
            }, {
                color: '#C4F0C4',
                from: lowVal3,
                to: highVal3,
                label: {
                    text: label3,
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: -3
                }
            }, {
                color: '#C4F0C4',
                from: lowVal4,
                to: highVal4,
                label: {
                    text: label4,
                    align: 'center',
                    verticalAlign: 'bottom',
                    y: -3
                }
            }]


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
    });
}

function loadscreenings(data){
$('#screenings_data').append(

                        );
}

function loadtests(data){
$('#tests_data').append(
"<div id='labs' class='panel'> \
        Lab Results\
        <!-- Nav tabs --> \
        <!-- Tab panes --> \
        <div class='tab-content'> \
            <div role='tabpanel' class='tab-pane active' id='all_labs'> \
 \
                <ul class='resultsHeader'> \
                    <li> \
                    <span class='date'>Apr 26, 2013</span> \
                    Pulse Ox \
                        <ul class='results'> \
                            <li class='header'> \
                                <span class='lab-component'>Component</span> \
                                <span class='lab-value'>Value</span> \
                                <span class='lab-low'>Low</span> \
                                <span class='lab-high'>High</span> \
                            </li> \
 \
                            <li class='even'> \
                                <span class='lab-component'>Pulse Ox</span> \
                                <span class='lab-value lowResult'>84 %   (low) </span> \
                                <span class='lab-low'>95 %</span> \
                                <span class='lab-high'>100 %</span> \
                            </li> \
 \
                        </ul> \
                    </li> \
 \
 \
 \
                    <li> \
                    <span class='date'>Apr 26, 2013</span> \
                    Imaging \
                        <ul class='results'> \
                            <li class='header'> \
                                <span class='lab-component'>Component</span> \
                                <span class='lab-value'>Value</span> \
                                <span class='lab-low'>Low</span> \
                                <span class='lab-high'>High</span> \
                            </li> \
 \
                            <li class='even'> \
                                <span class='lab-component'>Chest X-ray</span> \
                                <span class='lab-value highResult'>Mild-moderate LV enlargement <a href='/img/mildmoderate.jpg' class='image-popup'> View</a></span> \
                                <span class='lab-low'></span> \
                                <span class='lab-high'></span> \
                            </li> \
 \
                            <li class='odd'> \
                                <span class='lab-component'>ECG</span> \
                                <span class='lab-value highResult'>Early LVH </span> \
                                <span class='lab-low'></span> \
                                <span class='lab-high'></span> \
                            </li> \
 \
                            <li class='even'> \
                                <span class='lab-component'>2D Echocardiogram</span> \
                                <span class='lab-value highResult'>Mild LVH, Moderate Pulmonary Hypertension </span> \
                                <span class='lab-low'></span> \
                                <span class='lab-high'></span> \
                            </li> \
                        </ul> \
                    </li> \
                </ul> \
            </div> \
        </div> \
    </div>");
}