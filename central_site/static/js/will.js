   
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
