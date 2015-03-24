function wlt_getPatient(psearch) {
    var urlcall = "http://52.11.104.178:8080/Patient?name:exact=" + psearch;
    $.ajax({
        url: urlcall,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        //TODO: Find out what all parameters we can send over
        success: function (data) {
            globData = data;
            if (globData.totalResults > 0){
            wlt_placeData(data);
            }
            else{
                alert("No records were returned with that name");
                clearPatient();
                
            }
            
        }
    });
}

function wlt_searchClicked(){
       var pSearch = $('#Check_In_Patient_Search').val();
       wlt_getPatient(pSearch);
    }


function wlt_placeData(data){
    //build alert string
    var alertString = "";
    $.each(data.entry, function (e, entry) {
        var resultsContent = entry.content;
        alertString += resultsContent.name[0].given[0] + " " + resultsContent.name[0].given[1] + " " + resultsContent.name[0].family[0] + "\n";
        });
    if (data.entry.length>1){
        $('#MultplePatientSelection .modal-body .list-group').empty();
        $.each(data.entry, function (e, entry){
            var resultsContent = entry.content;
           $('#MultplePatientSelection .modal-body .list-group').append(
                    '<li class="list-group-item" onclick="selectThisPatient(this);">' 
                    + resultsContent.name[0].given[0] 
                    + " " + resultsContent.name[0].given[1] 
                    + " " + resultsContent.name[0].family[0]
                    + "</li>");
            $('#MultplePatientSelection .modal-body .list-group li:last').data(resultsContent);
        });
        
        $('#MultplePatientSelection').modal();
        //alert(alertString);
    }
    else
    {
        fillInSinglePatient(data.entry[0].content)
    }
}


function selectThisPatient(resultsContent){
    $('#MultplePatientSelection').modal('hide');
    fillInSinglePatient($(resultsContent).data());
    globThis = resultsContent;
}


function checkSearchKeyPress(event){
    var key = event.keyCode;
    if (event.keyCode === 13) ///parseInt()
    {
        wlt_searchClicked();
    }
    
}

function fillInSinglePatient(singlePatient)
{
    $('#check_in_first_name').val(singlePatient.name[0].given[0]);
    $('#check_in_middle_name').val(singlePatient.name[0].given[1]);
    $('#check_in_last_name').val(singlePatient.name[0].family[0]);

    $('#check_in_dob').val(singlePatient.birthDate);
     
    $('#check_in_street').val(singlePatient.address[0].line[0]);
    $('#check_in_city').val(singlePatient.address[0].city);
    $('#check_in_state').val(singlePatient.address[0].state);
    $('#check_in_zip').val(singlePatient.address[0].zip);

    $.each(singlePatient.telecom, function (e, telecom) {
        var resultsTelecom = telecom;
        if (resultsTelecom.use === "home")
        {
            $('#check_in_number_home').val(resultsTelecom.value);
        }
        else if(resultsTelecom.use === "mobile")
        {
            $('#check_in_number_mobile').val(resultsTelecom.value);
        }
        else if(resultsTelecom.use === "work")
        {
            $('#check_in_number_work').val(resultsTelecom.value);
        }
        else if(resultsTelecom.system === "email")
        {
            $('#check_in_email').val(resultsTelecom.value);
        }

        });


    $('#check_in_gender').val(singlePatient.gender.coding[0].code);

    } 
function clearPatient()
{
    $('#check_in_first_name').val("");
    $('#check_in_middle_name').val("");
    $('#check_in_last_name').val("");

    $('#check_in_dob').val("");
     
    $('#check_in_street').val("");
    $('#check_in_city').val("");
    $('#check_in_state').val("");
    $('#check_in_zip').val("");
    
    $('#check_in_number_home').val("");
    $('#check_in_number_mobile').val("");
    $('#check_in_number_work').val("");
    $('#check_in_email').val("");
       
     $('#check_in_gender').val('');

    }
    
function createChart()
{

    var options = 
    {

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - Whether to show horizontal lines (except X axis)
    scaleShowHorizontalLines: true,

    //Boolean - Whether to show vertical lines (except Y axis)
    scaleShowVerticalLines: true,

    //Boolean - Whether the line is curved between points
    bezierCurve : true,

    //Number - Tension of the bezier curve between points
    bezierCurveTension : 0.4,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Number - Radius of each point dot in pixels
    pointDotRadius : 4,

    //Number - Pixel width of point dot stroke
    pointDotStrokeWidth : 1,

    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
    pointHitDetectionRadius : 20,

    //Boolean - Whether to show a stroke for datasets
    datasetStroke : true,

    //Number - Pixel width of dataset stroke
    datasetStrokeWidth : 2,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

};

    var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
// Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
// This will get the first returned node in the jQuery collection.
//var myNewChart = new Chart(ctx);
var myLineChart = new Chart(ctx).Line(data, options);
}