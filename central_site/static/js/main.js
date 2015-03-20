$(document).ready(function () {

    //binding [loadPatientDetails()] to dynamically added patient cards
    $('body').on('click', '.patient_card', function (x) {
        loadPatientDetails($(this).data());
        //.modal is the 
        $('#PatientDetailScreen').modal();
    });

    $('#Patient_Search').on('keyup', patientSearch);
    //initial load for patient data on card
    getPatients();
});

/*
 * Author: Michael
 * Date: 03/15/2015
 * Purpose: Filters out the current Patient Cards in the scroll container to the inquiry
 * TODO: Fire another ajax call to the database with the inquiry if no results were found; handle results
 */
function patientSearch() {
    var inquiry = $(this).val().toLowerCase();
    if (inquiry === "") {
        $('.patient_card').show();
    } else {
        $('.patient_card').each(function (i, item) {
            if ($(item).find('.card_demographic').text().toLowerCase().indexOf(inquiry) === -1) {
                $(item).hide();
            } else {
                $(item).show();
            }
        });
    }
    //Update scroll container's width
    updateScrollContainerWidth();
    //If there are atleast 1 visible card, hide that loading thing.  Otherwise, show that loading thing.
    $('.patient_card:visible').length > 0 ? $('#dashboard_loading_img').hide() : $('#dashboard_loading_img').show();
}

/*
 Author: Michael
 Date: 03/14/2015
 Purpose: Fetches the patient data from the fhir server
 Todo:
 Add parameter to accept the number of desired records to pass
 */
function getPatients(count) {
    $.ajax({
        url: "http://52.11.104.178:8080/Patient",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        /*TODO: Find out what all parameters we can send over*/
        data: {
            _count: count ? count : 25,
            _skip: $('.patient_card').length
        },
        success: function (data) {
            globData = data;
            parseData(data);
        }
    });
}

/*
 Author: Michael
 Date: 03/14/2015
 Purpose: parses the data from getPatients() to render the patient cards
 in the Scroll container
 */
function parseData(data) {
    $('.patient_card_scroll').empty();
    $.each(data.entry, function (e, entry) {
        var patientContent = entry.content;

        $('#dashboard_loading_img').hide();

        var patient_card = document.createElement("div");
        patient_card.className = "patient_card";
        patient_card.setAttribute('patient_id', entry.title);

        var patient_img = document.createElement("img");
        patient_img.className = "card_photo_thumbnail";
        patient_img.setAttribute('src', patientContent.photo && patientContent.photo[0].url ? patientContent.photo[0].url : 'img/no_photo.jpg');
        patient_img.setAttribute('alt', 'no_photo');

        var patient_demographics = document.createElement("div");
        patient_demographics.className = "card_demographic";
        //Patient Name
        patient_demographics.innerHTML += patientContent.name[0].given[0] + " " + patientContent.name[0].family[0];
        //Gender
        patient_demographics.innerHTML += patientContent.gender ? '<br>' + patientContent.gender.coding[0].display : '';
        //DOB
        patient_demographics.innerHTML += '<br>DOB: ' + (patientContent.birthDate ? formateDate(patientContent.birthDate) : 'N/A');
        patient_card.appendChild(patient_img);
        patient_card.appendChild(patient_demographics);
        $(patient_card).data(entry);
        $('.patient_card_scroll').append(patient_card);


        updateScrollContainerWidth();
    });

}

/*Author: Michael
 * Date: 03/2015
 * Just something to reuse to adjust width of scroll container
 * */
function updateScrollContainerWidth() {
    //Dynamically edit width for the scroll container depending on the number of cards rendered
    //Hayes, figure out why you chose 350
    $('.patient_card_scroll').css('width', ((parseInt($('.patient_card:first').css('width')) + 50) * $('.patient_card:visible').length) + 'px');
}

/*
 * Author: Michael
 * Date: 3/17/2015
 * Formate the date nicer
 * 
 */

function formateDate(date) {
    return date.split('-')[1] + "/" + date.split('-')[2] + "/" + date.split('-')[0];
}

/*
 Author: Michael
 Date: 03/14/2015
 Purpose: Load details of patient in the Patient Detail screen
 Todo: everything :)
 */
function loadPatientDetails(patient_data) {
    $('#patient_detail_name').text(patient_data.content.name[0].given[0] + " " +
            patient_data.content.name[0].given[1] + " " +
            patient_data.content.name[0].family[0]);
    $('#patient_detail_DOB').text(formateDate(patient_data.content.birthDate));
    $('#patient_detail_gender').text(patient_data.content.gender.coding[0].display);
    $('#patient_detail_line').text(patient_data.content.address[0].line[0]);
    $('#patient_detail_city').text(patient_data.content.address[0].city);
    $('#patient_detail_state').text(patient_data.content.address[0].state);
    $('#patient_detail_zip').text(patient_data.content.address[0].zip);

    $('#patient_detail_phone1, #patient_detail_phone2').text('');
    $.each(patient_data.content.telecom, function (t, type) {
        if (type.system === 'email') {
            $('#patient_detail_email').text(type.value);
            $('#patient_detail_email').closest('a').attr('href', 'mailto:' + type.value);
        } else {
            switch (type.use) {
                case 'mobile' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-phone');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-phone');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
                case 'home' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-home');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-home');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
                case 'work' :
                    if ($('#patient_detail_phone1').text() === '') {
                        $('#phone1_icon').attr('class', 'glyphicon glyphicon-briefcase');
                        $('#patient_detail_phone1').text(type.value);
                    } else {
                        $('#phone2_icon').attr('class', 'glyphicon glyphicon-briefcase');
                        $('#patient_detail_phone2').text(type.value);
                    }
                    break;
            }
        }


    });

}

/*
 * Author: Michael
 * Date: 03/18/2015
 * Purpose: Open and clear out the Check In Screen
 */
function openCheckInScreen() {
    $('#CheckInScreen').modal();

}


/* Author: Michael and Chris
 * Date: 0/18/2015
 * Purpose: Function to gather patient's conditions
 */
function getPatientConditions(patient_id) {
    $.ajax({
        url: "http://52.11.104.178:8080/Condition?subject=" + patient_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic Y2xpZW50OnNlY3JldA==");
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
            globCondition = data;
            //Function goes here to handle conditions
        }
    });
}

function htmlbodyHeightUpdate(){
		var height3 = $( window ).height()
		var height1 = $('.nav').height()+50
		height2 = $('.main').height()
		if(height2 > height3){
			$('html').height(Math.max(height1,height3,height2)+10);
			$('body').height(Math.max(height1,height3,height2)+10);
		}
		else
		{
			$('html').height(Math.max(height1,height3,height2));
			$('body').height(Math.max(height1,height3,height2));
		}
		
	}
	$(document).ready(function () {
		htmlbodyHeightUpdate()
		$( window ).resize(function() {
			htmlbodyHeightUpdate()
		});
		$( window ).scroll(function() {
			height2 = $('.main').height()
  			htmlbodyHeightUpdate()
		});
	});