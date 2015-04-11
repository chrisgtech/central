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

	grpnum = 1;
	[].forEach.call( Object.keys( data.results[0] ), function( key ){    
	    if (data.results[0][key][0] !== undefined) {
	    	
			outhtml += "<div class='accordion-group'>";
			outhtml += "<div class='accordion-heading'>";
			outhtml += "<a class='accordion-toggle' data-toggle='collapse' data-parent='#openfda2' href='#collapse" + grpnum + "'>" + key + "</a>";
			outhtml += "</div><div id='collapse" + grpnum + "' class='accordion-body collapse'>";
			outhtml += "<div class='accordion-inner'><br>";
			for (v in data.results[0][key]) {
				outhtml +=  data.results[0][key][v];
			}
			outhtml += "<br><br></div></div></div>";
			grpnum += 1;
	    }
	});
	
    outhtml += "</div>";
	
	return(outhtml);


}


function getOpenFDALabelData(rxNorm, process) {
    $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:" + rxNorm,
        success: process
    });
}
