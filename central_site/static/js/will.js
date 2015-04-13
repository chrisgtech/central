   
function openFDAtest(){            //This works
        $.ajax({
        url: "https://api.fda.gov/drug/label.json?api_key=BVwl0V7hfVYHDw5SwEg8DZ75q9SHzCRqD5ibjY7Q&search=openfda.rxcui:+239191",
        success: function (data) {
            globData=data;
            console.log("rxcui = 239191 adverse reactions: "+globData.results[0].adverse_reactions );
        }
        });
    
}
    
function printObservationData(ObservationData){
   $.each(ObservationData,
    function(e,Data){
           console.log("arrayvalue:"+e);
           console.log("    "+Data.content.resourceType);
           console.log("    "+Data.content.issued);
           console.log("    "+Data.content.name.coding[0].display);
           console.log("    "+Data.content.name.coding[0].code);
       try{
           console.log("    "+Data.content.valueQuantity.value);
           console.log("    "+Data.content.valueQuantity.units);
           console.log("    "+Data.content.valueQuantity.interpretation)
       }
       catch(e)
       {
           console.log("    "+"NOVALUE");
           console.log("    "+"NODATA");
       }
       });
}
