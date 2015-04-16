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
function loadMedicationOpenFDALabel(medId, drug_card){
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
    if($(drug_card).find('.glyphicon').hasClass('glyphicon-menu-down')) {
        $(drug_card).find('.glyphicon').removeClass('glyphicon-menu-down');
        $(drug_card).find('.glyphicon').addClass('glyphicon-menu-up');
    } else {
        
        $(drug_card).find('.glyphicon').removeClass('glyphicon-menu-up');
        $(drug_card).find('.glyphicon').addClass('glyphicon-menu-down');
    }
    
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

function parseMedicationOpenFDA(data, rxNorm){
    globFDA = data;

    $('.fda.' + rxNorm).html(MedicationOpenFDAtoHTML(data,rxNorm));
}    

function onOpenFDABlackList(data){
	var blacklist = ["version","id","set_id"];
	for (var i = 0, l = blacklist.length; i < l ; i++){
		if (data.toLowerCase() === blacklist[i].toLowerCase()) {
			return 1
		}
	}
	return 0
}

/**
 * @param String str The text to be converted to titleCase.
 * @param Array glue the words to leave in lowercase. 
 */
function toTitleCase(str, glue){
    glue = (glue) ? glue : ['of', 'for', 'and', 'or', 'but', 'by'];
    return str.replace(/(\w)(\w*)/g, function(_, i, r){
        var j = i.toUpperCase() + (r != null ? r : "");
        return (glue.indexOf(j.toLowerCase())<0)?j:j.toLowerCase();
    });
};

function MedicationOpenFDAtoHTML(data,rxNorm){
    var outhtml = "";
    if (data.results === undefined) {
    	outhtml = "<div class='col-sm-offset-4' style='font-weight: bold;'>No Open FDA Label Information Found</div><br/>";0 
    }
    else {
		outhtml = "<div class='col-sm-offset-4' style='font-weight: bold;'>Open FDA Label Information</div><br/>"; 
		outhtml += "<div class='col-sm-4'>Brand Name: " + data.results[0].openfda.brand_name  + "</div>"; 
		outhtml += "<div class='col-sm-4'>Generic Name: " + data.results[0].openfda.generic_name  + "</div>"; 
		outhtml += "<div class='col-sm-4'>Manufacturer: " + data.results[0].openfda.manufacturer_name  + "</div>";
		
		outhtml += "<br/><br/><div class='accordion' id='openfda"+rxNorm+"'>";
	
		var grpnum = 1;
		[].forEach.call( Object.keys( data.results[0] ), function( key ){
			if ( onOpenFDABlackList(key) === 0 ) {
			    if (data.results[0][key][0] !== undefined) {
			    	if ( typeof(data.results[0][key+"_table"]) !== "undefined") {
			    		return;
			    	}
					var displaykey = toTitleCase((key.replace(/_/g," ").replace(/^spl/,"SPL")));
			    	
					outhtml += "<div class='accordion-group"+rxNorm+"'>";
					outhtml += "<div class='accordion-heading"+rxNorm+"'>";
					outhtml += "<a class='accordion-toggle"+rxNorm+"' data-toggle='collapse' data-parent='#openfda"+rxNorm+"' href='#collapse" +rxNorm + grpnum + "'>" + displaykey + "<span class='glyphicon glyphicon-menu-right'></span></a>";
					outhtml += "</div><div id='collapse" + rxNorm+ grpnum + "' class='accordion-body"+rxNorm+" collapse'>";
					outhtml += "<div class='accordion-inner"+rxNorm+"'><br>";
					var isAry = $.isArray(data.results[0][key]);
					if (isAry) {
						for (var i = 0, l = data.results[0][key].length; i < l; i++ ) {
							outhtml +=  data.results[0][key][i];
						}
					}
					else {
						outhtml +=  data.results[0][key];
					}
					outhtml += "<br><br></div></div></div>";
					grpnum += 1;
				}
		    }
		});
		
	    outhtml += "</div>";
    }
	return(outhtml);


}


function getOpenFDALabelData(rxNorm, process) {
    $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:" + rxNorm,
        error: process,
        success: process
    });
}
