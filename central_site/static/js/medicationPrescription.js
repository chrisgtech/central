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
         $.each(MedicationData, function(i, item) {
                item.content.dateWritten = new Date(item.content.dateWritten);
                 });
        MedicationData = $.grep(MedicationData, function(rx) { return rx.content.dateWritten < today;}); 
        MedicationData.sort(function(a, b) {
            var a = a.content.dateWritten;
            var b = b.content.dateWritten; 
            return ((b < a) ? -1 : ((b > a) ? 1 : 0)); 
        });
        /*var threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        $.each($.grep(MedicationData, function(rx) {return rx.content.dateWritten > threeMonthsAgo; }), function(i, item) { */
        $.each(MedicationData, function(i, item) { 
            //Let's just limit to 25 medications per patient for now
            if(i < 25) {
                var medId = item.content.medication.reference.split('/')[1];
                
                /* //Structure of collapse items
                 * <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="headingOne">
                      <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          Medication
                        </a>
                      </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                      <div class="panel-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                      </div>
                    </div>
                  </div>
                 */
                
                var panel = document.createElement("div");
                panel.className = "panel";
                
                var panel_heading = document.createElement("div");
                panel_heading.className = "";
                panel_heading.setAttribute('id', 'heading' + i);
                panel_heading.setAttribute('role', 'tab');
                
                var panel_title = document.createElement("h4");
                panel_title.className = "panel-title";
                
                var anchor = document.createElement("a");
                anchor.setAttribute("data-toggle", "collapse");
                anchor.setAttribute("data-parent", "#medications");
                anchor.setAttribute("href", "#collapse" + i);
                anchor.setAttribute("aria-expanded", "true");
                anchor.setAttribute("aria-controls", "collapse" + i);
                
                var panel_collapse = document.createElement("div");
                panel_collapse.className = "panel-collapse collapse " + (i === 0? "in": "");
                panel_collapse.setAttribute("id", "collapse" + i);
                panel_collapse.setAttribute("role", "tabpanel");
                panel_collapse.setAttribute("aria-labelledby", "heading" + i);
                
                var panel_body = document.createElement("div");
                panel_body.className = "panel-body";
                panel_body.innerHTML = "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.";
                                
                var el = document.createElement("div");
                el.className = "col-sm-12 drug_card";
                el.setAttribute("onclick","loadMedicationOpenFDALabel('" + medId + "')");
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
                
                
                anchor.appendChild(el);
                panel_title.appendChild(anchor);
                panel_heading.appendChild(panel_title);
                panel_collapse.appendChild(panel_body);
                
                panel.appendChild(panel_heading);
                panel.appendChild(panel_collapse);
                
                $('#PatientDetailScreen #medications').append(panel);
            }
        });
        
        if(MedicationData.length > $('#PatientDetailScreen #medications .drug_card').length) {
            $('#PatientDetailScreen #medications').append("<button type='button' class='btn btn-primary medication_history_btn'>Medication History</button>")
        }
    //$('#PatientDetailScreen #medications').prepend('Prescription Count: ' + medicationCount); // jc test data
    }
}