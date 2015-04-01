


function createChart(){
//data to be passed to this function
var titleText = "Put title here";
var 
chart = new Highcharts.Chart({
        chart: {
            type: 'spline',
            renderTo: 'myChart'
        },
        title: {
            text: titleText
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
    
    
function openFDAtest(){            //This works
        $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:+239191",
        success: function (data) {
            globData=data;
            console.log("rxcui = 239191 adverse reactions: "+globData.results[0].adverse_reactions );
        }
        });
    
}
    
    
    
    
    
    
function printObservationData(ObservationData){
   $.each(ObservationData,
    function(e,Data){
           console.log("arrayvalue:"+e);
           console.log("    "+Data.content.resourceType);
           console.log("        "+Data.content.issued);
           console.log("             "+Data.content.name.coding[0].display);
           console.log("                 "+Data.content.name.coding[0].code);
       try{
           console.log("                    "+Data.content.valueQuantity.value);
           console.log("                        "+Data.content.valueQuantity.units);
           console.log("                            "+Data.content.valueQuantity.interpretation)
       }
       catch(e)
       {
           console.log("                    "+"NOVALUE");
           console.log("                        "+"NODATA");
       }
       });
}




//function buildChart() {
//    $('#container').highcharts({
//        chart: {
//            type: 'line'
//        },
//        title: {
//            text: 'Blood Pressure'
//        },
//        xAxis: {
//            categories: getBPDataCategories()
//        },
//        yAxis: {
//            labels: {
//                formatter: function() {
//                    return this.value + ' mm[Hg]';
//                }
//            }
//        },
//        series: getBPDataSeries()
//    });
//    $('#container2').highcharts({
//        chart: {
//            type: 'line'
//        },
//        title: {
//            text: 'Weight'
//        },
//        xAxis: {
//            categories: getBPDataCategories()
//        },
//        yAxis: {
//            labels: {
//                formatter: function() {
//                    return this.value + ' lbs';
//                }
//            }
//        },
//        series: getWeightDataSeries()
//    });
//}
//
//function getBPDataCategories() {
//    var categoriesAry = [];
//    _.each(window.bb.data.vitals, function(vital, index, list){
//       categoriesAry.push(moment(vital.date).format('MM/DD/YYYY'));
//    });
//    return categoriesAry;
//}
//
//function getBPDataSeries() {
//    /*
//     * {
//     *   name: 'Systolic',
//     *   data: [{date: d, y:value},...]
//     * },
//     * { name: 'Diastolic',
//     *   data: [{date: d, y:value},...]
//     * },
//     */
//
//    var seriesAry = [];
//    var systolicObj = {
//        name: 'Systolic',
//        data: []
//    };
//    var diastolicObj = {
//        name: 'Diastolic',
//        data: []
//    };
//
//    _.each(window.bb.data.vitals, function(vital, index, list){
//        var sObj = {}, dObj = {};
//        sObj.date = vital.date;
//        dObj.date = vital.date;
//        if(_.findWhere(vital.results, {name: 'Intravascular Diastolic'})) {
//            sObj.y = _.findWhere(vital.results, {name: 'Intravascular Systolic'}).value;
//            dObj.y = _.findWhere(vital.results, {name: 'Intravascular Diastolic'}).value;
//            systolicObj.data.push(sObj);
//            diastolicObj.data.push(dObj);
//        }
//
//    });
//
//    seriesAry[0] = systolicObj;
//    seriesAry[1] = diastolicObj;
//    return seriesAry;
//}
//
//function getWeightDataSeries() {
//    var seriesAry = [];
//    var weightObj = {
//        name: 'Weight',
//        data: []
//    };
//    _.each(window.bb.data.vitals, function(vital, index, list){
//        var obj = {};
//        obj.date = vital.date;
//        obj.y = _.findWhere(vital.results, {name:'Patient Body Weight - Measured'}).value;
//        weightObj.data.push(obj);
//    });
//
//    seriesAry.push(weightObj);
//    return seriesAry;
//}


//function wlt_getPatients(count, first_name, last_name){
//    $.ajax({
//            url: "http://52.11.104.178:8080/Patient",
//            beforeSend: function(shr) {
//                xhr.setRequestHeader("Authorization", "Basic Y2xpZWS0QnNlY3Jlda==");
//            },
//            dataType: 'json',
//            contentType: 'application/json',
//            data:{
//                _count: count ? count : 25,
//                _skip: $('.patient_card').length
//            },
//            success: function (data) {
//                globData = data;
//                parseData(data);                     
//            }
//        });
//    }
                            

//    $.ajax({
//            url: "http://52.11.104.178:8080/Patient",
//            dataType: 'json',
//            contentType: 'application/json',
//            data:{
//                _count: 25,
//            },
//            success: function (data) {
//                globData=data;                   
//            }
//        });
//
//    $.ajax({
//            url: "http://52.11.104.178:8080/Patient",
//            dataType: 'json',
//            contentType: 'application/json',
//            data:{
//                _count: 25,
//            },
//            success: function (data) {
//                globData=data;                   
//            }
//        });
//        
//        
//        $.ajax({
//        url: "https://api.fda.gov/drug/event.json?search=patient.drug.openfda.pharm_class_epc:\"nonsteroidal+anti-inflammatory+drug\"&count=patient.reaction.reactionmeddrapt.exact",
//        dataType: 'json',
//        contentType: 'application/json',
//        success: function (data) {
//            globData=data;                   
//        }
//        });
//        
//        //This works
//        $.ajax({
//        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:+239191",
//        success: function (data) {
//            globData=data;                   
//        }
//        });
//        
//        
//        https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:+239191
