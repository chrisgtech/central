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