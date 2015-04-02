/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * Author: Michael
 * Date: 03/21/2015
 * Purpose: Renders the Patient's MedicationPrescriptions on the Patient Detail Screen
 * @returns {undefined}
 */
function loadPatientMedicationPrescriptions(MedicationData){
    var medicationCount = 0; // jc test data
    $('#PatientDetailScreen #medications').empty();
    if(MedicationData.length === 0) { 
        $('#PatientDetailScreen #medications').append("No Medication Data"); 
    }
    else {
        var today = new Date();
        //WLT - I commented out the below value because all med data was getting clobbered due to comparing Unix time to a string.
        //MedicationData = $.grep(MedicationData, function(rx) { return rx.content.dateWritten < today;});
        MedicationData.sort(function(a, b) {
            var a = a.content.dateWritten;
            var b = b.content.dateWritten; 
            return ((b < a) ? -1 : ((b > a) ? 1 : 0)); 
        });
        var threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        $.each($.grep(MedicationData, function(rx) { 
            //WLT - I added the below lines to test just the year for 2015 (roughly 3 months)
            //I wasn't sure why you were comparing strings to Date() variables.
            //var temp = rx.content.dateWritten;
            //var temp2 = temp.split("-")[0]
            if (rx.content.dateWritten.split("-")[0] === "2015"){
                return rx.content.dateWritten;// > threeMonthsAgo;  //WLT -I left the threeMonthsAgo in as a placeholder to what you had before.
            }
            }), function(i, item) { 

            var medId = item.content.medication.reference.split('/')[1];

            var el = document.createElement("div");
            el.className = "col-sm-12 drug_card";
            el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.medication.display + "</div>";

            el.innerHTML += "<div class='col-sm-4'>Date Written: " + item.content.dateWritten    //.toLocaleDateString() //WLT - I left this as a placeholder to what you had before
                    + "</div><div class='col-sm-8 rxnorm " + medId + "'>&nbsp;</div>";

            el.innerHTML += "<div class='col-sm-4'>" + ( item.content.dispense.expectedSupplyDuration ? "Supply Duration: " + item.content.dispense.expectedSupplyDuration .value
                        + " " + item.content.dispense.expectedSupplyDuration.units : "&nbsp;")
                        + "</div><div class='col-sm-8 brand " + medId + "'>&nbsp;</div>";

            el.innerHTML += "<div class='col-sm-4'>Quantity: " + item.content.dispense.quantity.value 
                    + "</div><div class='col-sm-8 form " + medId + "'>&nbsp;</div>";

            $(el).data(item);
            medicationCount++;  // jc test data

            if(typeof $("#drugStore").data("inventory")[medId] === 'undefined'){
                getPatientData('Medication', { _id : medId }, 
                    function(drug){
                        $("#drugStore").data("inventory")[medId] = drug;
                        loadMedicationDetails(medId);
                    });
            } else {
                setTimeout(function() { loadMedicationDetails(medId);}, 500);
            }

            $('#PatientDetailScreen #medications').append(el);
        });
        
        if(MedicationData.length > $('#PatientDetailScreen #medications .drug_card').length) {
            $('#PatientDetailScreen #medications').append("<button type='button' class='btn btn-primary medication_history_btn'>Medication History</button>")
        }
    //$('#PatientDetailScreen #medications').prepend('Prescription Count: ' + medicationCount); // jc test data
    }
}