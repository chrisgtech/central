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
                parseMedationOpenFDA($("#openfdalabeldrugStore").data("inventory")[rxNorm], rxNorm);
            }
        );
    } else {
        //Steb 3a
        parseMedationOpenFDA($("#openfdalabeldrugStore").data("inventory")[rxNorm], rxNorm);
    }
    
}

var test = 0;
function parseMedationOpenFDA(data, rxNorm){
    
    
    console.log("We gots some stuff!!!");
    console.log(data);
    globFDA = data;
    
    $('.fda.' + rxNorm).html("Hello Cheryl " + (test++));
    /*
     * 
     * 
     * 
     */
    
    
    
    /*var drugObj = $('#openfdalabeldrugStore').data('inventory')[medId];
    $('.' + medId + '.product_type').html("Product Type: " + drugObj.results[0].openfda.product_type);
    $('.' + medId + '.manufacturer_name').html("Manufacturer: " + drugObj.results[0].openfda.manufacturer_name);
    $('.' + medId + '.brand_name').html("Brand Name: " + drugObj.results[0].openfda.brand_name);
    $('.' + medId + '.generic_name').html("Generic Name: " + drugObj.results[0].openfda.generic_name);

    
    var description_body = document.createElement("div");
    description_body.className = "description-body";
    description_body.innerHTML = drugObj.results[0].description;
    var dosage_body = document.createElement("div");
    dosage_body.className = "dosage-body";
    dosage_body.innerHTML = drugObj.results[0].dosage_and_administration_table;
    var warnings_body = document.createElement("div");
    warnings_body.className = "warnings-body";
    warnings_body.innerHTML = drugObj.results[0].warnings;
    var genprecautions_body = document.createElement("div");
    genprecautions_body.className = "genprecautions-body";
    genprecautions_body.innerHTML = drugObj.results[0].general_precautions;
    var druginteractions_body = document.createElement("div");
    druginteractions_body.className = "druginteractions-body";
    druginteractions_body.innerHTML = drugObj.results[0].drug_interactions;
    var adversereactions_body = document.createElement("div");
    adversereactions_body.className = "adversereactions-body";
    adversereactions_body.innerHTML = drugObj.results[0].adverse_reactions;*/
}


function getOpenFDALabelData(rxNorm, process) {
    $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:" + rxNorm,
        success: process
    });
}
