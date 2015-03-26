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
    if(MedicationData.length === 0) $('#PatientDetailScreen #medications').append("No Medication Data");
    
    //Adding 4 years to Dates and order by desc
    $.each(MedicationData, function(i, item) {
        var temp = new Date(item.content.dateWritten);
        MedicationData[i].content.dateWritten  = new Date(temp.setFullYear(temp.getFullYear() + 4));
    });
    MedicationData.sort(function(a, b) {
        var a = a.content.dateWritten;
        var b = b.content.dateWritten; 
        return ((b < a) ? -1 : ((b > a) ? 1 : 0)); 
    });
    
    $.each(MedicationData, function(i, item) { 
        
        var medId = item.content.medication.reference.split('/')[1];
        
        var el = document.createElement("div");
        el.className = "col-sm-12 drug_card";
        el.innerHTML += "<div class='col-sm-12' style='font-weight: bold;'>" + item.content.medication.display + "</div>";
        
        el.innerHTML += "<div class='col-sm-4'>Date Written: " + item.content.dateWritten.toLocaleDateString()
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
    //$('#PatientDetailScreen #medications').prepend('Prescription Count: ' + medicationCount); // jc test data
}