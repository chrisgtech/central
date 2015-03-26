/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*Author: Michael
 * Date: 03/2015
 * Just something to reuse to adjust width of scroll container
 * */
function updateScrollContainerWidth() {
    var num_of_cards = $('.patient_card:visible').length;
    
    //Dynamically edit width for the scroll container depending on the number of cards rendered
    $('.patient_card_scroll').css('width', ((parseInt($('.patient_card:first').css('width')) + 50) * $('.patient_card:visible').length) + 'px');
    $('#num_of_patients').html('Patients Shown: ' + num_of_cards);
    
}

/*
 * Author: Michael
 * Date: 3/17/2015
 * Format the date to MM/DD/YYYY
 * 
 */
function formatDate(date) {
    return date.split('-')[1] + "/" + date.split('-')[2] + "/" + date.split('-')[0];
}
