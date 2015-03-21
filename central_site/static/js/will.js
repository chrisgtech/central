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
            wlt_placeData(data);
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
    $('#check_in_first_name').val(data.entry[0].content.name[0].given[0]);
    $('#check_in_middle_name').val(data.entry[0].content.name[0].given[1]);
    $('#check_in_last_name').val(data.entry[0].content.name[0].family[0]);

    //$('#check_in_dob').val("test?");
    $('#check_in_dob').val(data.entry[0].content.birthDate);
    debugger;
    $('#check_in_street').val(data.entry[0].content.address[0].line[0]);
    $('#check_in_city').val(data.entry[0].content.address[0].city);
    $('#check_in_state').val(data.entry[0].content.address[0].state);
    $('#check_in_zip').val(data.entry[0].content.address[0].zip);

    $.each(data.entry[0].content.telecom, function (e, telecom) {
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


    $('#check_in_gender').val(data.entry[0].content.gender.coding[0].display);

    }

}


function selectThisPatient(resultsContent){
    $('#MultplePatientSelection').modal('hide');
    
    globThis = resultsContent;
}