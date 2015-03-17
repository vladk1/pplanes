$(document).ready(function(){
    window.onload = function() {
    	display_results();
    	updateFooter();
    };
});

function display_results(){
	console.log("i m in the results js display_results");

	var jsonData = JSON.parse(localStorage.getItem("jsonData"));
	//jsonData[1] = JSON.parse(localStorage.getItem("jsonData2"));
	var fields = ['Plane', 'ECost', 'EBenefit', 'ENB', 'LP', 'VaR'];

	loadTable('estimations_table', fields, jsonData);
}

function loadTable(tableId, fields, data) {
    var rows = '<thead>' + '<tr>';
    $.each(fields, function(index, field){
    	rows += '<th>' + field + '' + '</td>';
    });
    rows += '</tr>' + '</thead>';

    $.each(data, function(index, item) {
        var row = '<tr>';
        $.each(fields, function(index, field) {
        	if (index === 0) {
				row += '<td class="highlight">' + item[field+''] + '</td>';
        	} else {
            	row += '<td>' + item[field+''] + '</td>';
      		}
        });
        rows += row + '</tr>';
    });
    rows += '</tbody>';
    $('#' + tableId).html($('#'+tableId).val() + rows);
}