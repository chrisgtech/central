/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * Author: Cheryl
 * Date: 04/07/2015
 * Purpose: Renders the Patient's Medication OpenFDA Label information 
 * @returns {undefined}
 */
function loadMedicationOpenFDALabel(medId){
    /*
     *  1. Get the medications reference ID
     *  2. Check the drug store for its record
     *      2a. If it exists in the drugStore, grab the rxNorm number
     *      2b. Else, go fetch the drug info and add it to the drugStore ... then grab the rxNorm number
     *  3. Use the rxNorm number and check the openfdalabeldrugStore
     *      3a. If it exists in this store, parse the data on the screen
     *      3b. Else, go fetch the openFDA data ... then parse the data on the screen
     *  4. Enjoy a beverage, you earned it
     *  
     */
    
    
    //Step 1 is passed in
    //Step 2
    if(typeof $("#drugStore").data("inventory")[medId] === 'undefined'){
        getPatientData('Medication', { _id : medId }, 
            function(drug){
                $("#drugStore").data("inventory")[medId] = drug;
                var rxNorm = $('#drugStore').data('inventory')[medId].entry[0].content.code.coding[0].code;
                continueToOpenFDAfetch(rxNorm);
        });
    } else {
        var rxNorm = $('#drugStore').data('inventory')[medId].entry[0].content.code.coding[0].code;
        continueToOpenFDAfetch(rxNorm);
    }
    
}

function continueToOpenFDAfetch(rxNorm) {
    
    //Step 3
    if(typeof $("#openfdalabeldrugStore").data("inventory")[rxNorm] === 'undefined'){
        getOpenFDALabelData(rxNorm, 
            function(drug){
                //Add the FDA data to Cheryl's store
                $("#openfdalabeldrugStore").data("inventory")[rxNorm] = drug;
                //Step 3b
                parseMedicationOpenFDA($("#openfdalabeldrugStore").data("inventory")[rxNorm], rxNorm);
            }
        );
    } else {
        //Steb 3a
        parseMedicationOpenFDA($("#openfdalabeldrugStore").data("inventory")[rxNorm], rxNorm);
    }
    
}

var outhtml = "";
function parseMedicationOpenFDA(data, rxNorm){
    globFDA = data;

    $('.fda.' + rxNorm).html(MedicationOpenFDAtoHTML(data,rxNorm));
}    
    
function MedicationOpenFDAtoHTML(data,rxNorm){
	outhtml = "<div class='col-sm-4'>Brand Name: " + data.results[0].openfda.brand_name  + "</div>"; 
	outhtml += "<div class='col-sm-4'>Generic Name: " + data.results[0].openfda.generic_name  + "</div>"; 
	outhtml += "<div class='col-sm-4'>Manufacturer: " + data.results[0].openfda.manufacturer_name  + "</div>";
	
	outhtml += "<br/><br/><div class='accordion' id='openfda2'>";
	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseOne'>Description</a>";
	outhtml += "</div><div id='collapseOne' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].description === undefined ? 'No Description Information' : data.results[0].description;
	outhtml += "<br><br></div></div></div>";
	
	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseTwo'>Dosage/Adminstration Table</a>";
	outhtml += "</div><div id='collapseTwo' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].dosage_and_administration_table === undefined ? 'No Dosage/Administration Table Information' : data.results[0].dosage_and_administration_table;
	outhtml += "<br><br></div></div></div>";

	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseThree'>Warnings</a>";
	outhtml += "</div><div id='collapseThree' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].warnings === undefined ? 'No Warning Information' : data.results[0].warnings;
	outhtml += "<br><br></div></div></div>";

	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseFour'>General Precautions</a>";
	outhtml += "</div><div id='collapseFour' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].general_precautions === undefined ? 'No General Precaution Information' : data.results[0].general_precautions;
	outhtml += "<br><br></div></div></div>";

	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseFive'>Drug Interactions</a>";
	outhtml += "</div><div id='collapseFive' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].drug_interactions === undefined ? 'No Drug Interaction Information' : data.results[0].drug_interactions;
	outhtml += "<br><br></div></div></div>";

	outhtml += "<div class='accordion-group'>";
	outhtml += "<div class='accordion-heading'>";
	outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapseSix'>Adverse Reactions</a>";
	outhtml += "</div><div id='collapseSix' class='accordion-body collapse'>";
	outhtml += "<div class='accordion-inner'><br>";
	outhtml +=  data.results[0].adverse_reactions === undefined ? 'No Adverse Reaction Information' : data.results[0].adverse_reactions;
	outhtml += "<br><br></div></div></div>";

    outhtml += "</div>";
	
	return(outhtml);


}


function getOpenFDALabelData(rxNorm, process) {
    $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:" + rxNorm,
        success: process
    });
}
