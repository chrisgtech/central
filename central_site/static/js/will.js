   
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


//<div id="labs" class="panel">
//    <h1>Lab Results</h1>
//    <!-- Nav tabs -->
//    <ul class="nav nav-tabs" role="tablist">
//        <li role="presentation" class="active"><a href="#all_labs" role="tab" data-toggle="tab">All</a></li>
//        <li role="presentation"><a href="#labs_by_date" role="tab" data-toggle="tab">By Date</a></li>
//        <li role="presentation"><a href="#labs_by_lab" role="tab" data-toggle="tab">By Lab</a></li>
//    </ul>
//
//    <!-- Tab panes -->
//    <div class="tab-content">
//        <div role="tabpanel" class="tab-pane active" id="all_labs">
//            
// <ul class="resultsHeader">
//            <li>
//                <h2>
//                    <span class="date">Apr 26, 2013</span>
//                    Pulse Ox
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">84 %   (low) </span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 26, 2013</span>
//                    Imaging
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild-moderate LV enlargement <a href="/img/mildmoderate.jpg" class="image-popup"> View</a></span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Early LVH </span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">2D Echocardiogram</span>
//                        <span class="lab-value highResult">Mild LVH, Moderate Pulmonary Hypertension </span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 26, 2013</span>
//                    BMP
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value lowResult">130 mmol/L   (low) </span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value unknownResult">3.4 mmol/L  </span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value unknownResult">88 mmol/L  </span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 26, 2013</span>
//                    CBC WO DIFFERENTIAL
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">13 g/dl </span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 % </span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.3 mcL </span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 25, 2012</span>
//                    Pulse Ox
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">90 %   (low) </span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 25, 2012</span>
//                    Imaging
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" class="image-popup"> View</a></span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 25, 2012</span>
//                    BMP
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value lowResult">132 mmol/L   (low) </span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value lowResult">3.2 mmol/L   (low) </span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value lowResult">92 mmol/L   (low) </span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 25, 2012</span>
//                    CBC WO DIFFERENTIAL
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">13 g/dl </span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 % </span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.4 mcL </span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 23, 2011</span>
//                    PulseOx
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">92 %   (low) </span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 23, 2011</span>
//                    Imaging
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" class="image-popup"> View</a></span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low"></span>
//                        <span class="lab-high"></span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 23, 2011</span>
//                    BMP
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value ">137 mmol/L </span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value lowResult">3.4 mmol/L   (low) </span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value ">98 mmol/L </span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="date">Apr 23, 2011</span>
//                    CBC WO DIFFERENTIAL
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">12.5 g/dl </span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 % </span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.2 mcL </span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            </ul>
// 
//        </div>
//        <div role="tabpanel" class="tab-pane" id="labs_by_date">
//            
// <ul class="resultsHeader">
//            <li>
//                <h2>
//                    <span class="">Apr 26th 2013</span>
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-panel">Panel</span>
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">Pulse Ox</span>
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">84 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild-moderate LV enlargement <a href="/img/mildmoderate.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">2D Echocardiogram</span>
//                        <span class="lab-value highResult">Mild LVH, Moderate Pulmonary Hypertension </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value lowResult">130 mmol/L   (low)</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value lowResult">3.4 mmol/L    (low)</span>
//                        <span class="lab-low">3.5 mmol/L </span>
//                        <span class="lab-high">5.1 mmol/L </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value lowResult">88 mmol/L    (low)</span>
//                        <span class="lab-low">96 mmol/L </span>
//                        <span class="lab-high">106 mmol/L </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">13 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.3 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="">Apr 25th 2012</span>
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-panel">Panel</span>
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">Pulse Ox</span>
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">90 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value lowResult">132 mmol/L   (low)</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value lowResult">3.2 mmol/L   (low)</span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value lowResult">92 mmol/L   (low)</span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">13 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.4 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2>
//                    <span class="">Apr 23rd 2011</span>
//                </h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-panel">Panel</span>
//                        <span class="lab-component">Component</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">PulseOx</span>
//                        <span class="lab-component">Pulse Ox</span>
//                        <span class="lab-value lowResult">92 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">Chest X-ray</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">Imaging</span>
//                        <span class="lab-component">ECG</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Sodium</span>
//                        <span class="lab-value ">137 mmol/L</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Potassium</span>
//                        <span class="lab-value lowResult">3.4 mmol/L   (low)</span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">BMP</span>
//                        <span class="lab-component">Serum Chloride</span>
//                        <span class="lab-value ">98 mmol/L</span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Serum Hemoglobin</span>
//                        <span class="lab-value ">12.5 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Hematocrit</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-panel">CBC WO DIFFERENTIAL</span>
//                        <span class="lab-component">Red Blood Count</span>
//                        <span class="lab-value ">4.2 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            </ul>
// 
//
//        </div>
//        <div role="tabpanel" class="tab-pane" id="labs_by_lab">
//            
// <ul class="resultsHeader">
//            <li>
//                <h2><span class="">Pulse Ox</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value lowResult">84 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value lowResult">90 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value lowResult">92 %   (low)</span>
//                        <span class="lab-low">95 %</span>
//                        <span class="lab-high">100 %</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Chest X-ray</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value highResult">Mild-moderate LV enlargement <a href="/img/mildmoderate.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value highResult">Mild LV enlargement <a href="/img/mild.jpg" data-lightbox="image-1" data-title="Mild" class="image-popup"> View</a></span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">ECG</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value highResult">Early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value highResult">Possible early LVH </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">2D Echocardiogram</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value highResult">Mild LVH, Moderate Pulmonary Hypertension </span>
//                        <span class="lab-low">N/A </span>
//                        <span class="lab-high">N/A </span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Serum Sodium</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value lowResult">130 mmol/L   (low)</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value lowResult">132 mmol/L   (low)</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value ">137 mmol/L</span>
//                        <span class="lab-low">135 mmol/L</span>
//                        <span class="lab-high">145 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Serum Potassium</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value lowResult">3.4 mmol/L    (low)</span>
//                        <span class="lab-low">3.5 mmol/L </span>
//                        <span class="lab-high">5.1 mmol/L </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value lowResult">3.2 mmol/L   (low)</span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value lowResult">3.4 mmol/L   (low)</span>
//                        <span class="lab-low">3.5 mmol/L</span>
//                        <span class="lab-high">5.1 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Serum Chloride</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value lowResult">88 mmol/L    (low)</span>
//                        <span class="lab-low">96 mmol/L </span>
//                        <span class="lab-high">106 mmol/L </span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value lowResult">92 mmol/L   (low)</span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value ">98 mmol/L</span>
//                        <span class="lab-low">96 mmol/L</span>
//                        <span class="lab-high">106 mmol/L</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Serum Hemoglobin</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value ">13 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value ">13 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value ">12.5 g/dl</span>
//                        <span class="lab-low">12 g/dl</span>
//                        <span class="lab-high">16 g/dl</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Hematocrit</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value ">40 %</span>
//                        <span class="lab-low">34.9 %</span>
//                        <span class="lab-high">44.5 %</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            
// 
// 
//            <li>
//                <h2><span class="">Red Blood Count</span></h2>
//                <ul class="results">
//                    <li class="header">
//                        <span class="lab-date">Date</span>
//                        <span class="lab-value">Value</span>
//                        <span class="lab-low">Low</span>
//                        <span class="lab-high">High</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 26th 2013</span>
//                        <span class="lab-value ">4.3 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                    <li class="odd">
//                        <span class="lab-date">Apr 25th 2012</span>
//                        <span class="lab-value ">4.4 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                    <li class="even">
//                        <span class="lab-date">Apr 23rd 2011</span>
//                        <span class="lab-value ">4.2 mcL</span>
//                        <span class="lab-low">4.2 mcL</span>
//                        <span class="lab-high">5.4 mcL</span>
//                    </li>
//                    
//                </ul>
//            </li>
//            </ul>
// 
//        </div>
//    </div>
//</div>