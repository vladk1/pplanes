$(document).ready(function(){
    window.onload = function() {
    	Rtool_logic();
    };
});


// rnorm_fromCI returns an array of values normal sampled
// from the interval given with confidence interval 95%
function rnorm_fromCI(N, lower, upper, minVal) {
	var randgen = require( 'randgen' );

	if(typeof(minVal)==='undefined') minVal = null;

	lower = parseInt(lower);
	upper = parseInt(upper);
	var mean = (lower + upper)/2;
	var sd = (upper - lower)/3.29; // this is the 95% confidence interval
	var result_array = Array(N);
	var result = 0;
	for (var i=0; i<N; i++){
		result = randgen.rnorm(mean,sd);
		result_array[i] = ((result > minVal) ? result : minVal);
    }
    return result_array;
}

// N is number of simulations
// cb_data template: [buildLower, buildUpper, distanceLower, distanceUpper]
function generate_cb_sim_mean(N, cb_data) {
	var n_planes = cb_data.length / 4;
	
	var Cost 	= Array(n_planes);
	var Benefit = Array(n_planes);
	var plane_offset = 0;

	for(var	k=0; k<n_planes; k++){
		plane_offset = 4*k;
		Cost[k] 	= rnorm_fromCI(N, cb_data[plane_offset + 0], cb_data[plane_offset + 1], 0);
		Benefit[k] 	= rnorm_fromCI(N, cb_data[plane_offset + 2], cb_data[plane_offset + 3], 0);
	}

	return [Cost, Benefit];
}

var tac = 0;
function Rtool_logic() {
	// LOL
	var N = Math.pow(10,3);
	var cb_data = [];
	// cb_data[0] = document.getElementById('min_time_1').value;
	// cb_data[1] = document.getElementById('max_time_1').value;
	// cb_data[2] = document.getElementById('min_dist_1').value;
	// cb_data[3] = document.getElementById('max_dist_1').value;

	// cb_data[4] = document.getElementById('min_time_2').value;
	// cb_data[5] = document.getElementById('max_time_2').value;
	// cb_data[6] = document.getElementById('min_dist_2').value;
	// cb_data[7] = document.getElementById('max_dist_2').value;

	cb_data[0] = localStorage.getItem("min_time_1");
	cb_data[1] = localStorage.getItem("max_time_1");
	cb_data[2] = localStorage.getItem("min_dist_1");
	cb_data[3] = localStorage.getItem("max_dist_1");

	cb_data[4] = localStorage.getItem("min_time_2");
	cb_data[5] = localStorage.getItem("max_time_2");
	cb_data[6] = localStorage.getItem("min_dist_2");
	cb_data[7] = localStorage.getItem("max_dist_2");

	if (cb_data.every(isNumber)) {
		var sim = generate_cb_sim_mean(N, cb_data);
		var Cost = sim[0];
		var Benefit = sim[1];

		// (ECost, EBenefit, ENB, LP, VaR)
		var result = planes_analysis(Cost, Benefit);
		var jsonData = [{Plane: 1, ECost: result[0][0], EBenefit: result[1][0], ENB: result[2][0], LP: result[3][0], VaR: result[4][0]},
						{Plane: 2, ECost: result[0][1], EBenefit: result[1][1], ENB: result[2][1], LP: result[3][1], VaR: result[4][1]}];
		loadTable('estimations_table', ['Plane', 'ECost', 'EBenefit', 'ENB', 'LP', 'VaR'], jsonData);
	}
}

// auxiliary function to check input data
function isNumber(elem, index, array) {
	return !isNaN(parseFloat(elem));
}

function planes_analysis(Cost, Benefit) {
	// we don't compute the portfolio Cost and Benefits anymore

	var NB = getNB(Cost, Benefit);

	// compute the expected values
	var ECost = getMean(Cost);
	var EBenefit = getMean(Benefit);
	var ENB = getMean(NB);
	var LP = getLossProbability(NB); // NB<0
	var VaR = getVaR(NB, 0.01);

	// graph absent atm

	return [ECost, EBenefit, ENB, LP, VaR];
}

// auxiliary function to compute the column mean/avg of an array of arrays
// returns an array of means/avgs
function getMean(elems) {
	var n_portfolios = elems.length; // here n_planes == n_portfolios
	var n_mean = Array();
	for (var k=0; k<n_portfolios; k++) {
		var sum = 0;
		for (var i=0; i<elems[k].length; i++) {
    		sum += parseInt( elems[k][i], 10 ); //don't forget to add the base
		}
		n_mean[k] = sum/elems[k].length;
	}
	return n_mean;
}

// auxiliary function
function getNB(Cost, Benefit) {
	var NB = Array();
	for(var i=0; i<Cost.length; i++){
		NB[i] = Array();
		for(var j=0; j<Cost[i].length; j++){
			NB[i][j] = Benefit[i][j] - Cost[i][j];
		}
	}
	return NB;
}

// auxiliary function to compute the loss probability
// it is based on mean
function getLossProbability(elems) {
	var n_portfolios = elems.length; // here n_planes == n_portfolios
	var n_lp = Array();
	for (var k=0; k<n_portfolios; k++) {
		var sum = 0;
		for (var i=0; i<elems[k].length; i++) {
    		sum += ((parseInt( elems[k][i], 10 ) < 0) ? 1 : 0);
		}
		n_lp[k] = sum/elems[k].length;
	}
	return n_lp;
}

function getVaR(NB, q) {
	var quantile = require( 'compute-quantile' );

	if(typeof(q)==='undefined') q = 0.01;
	var result = Array(NB.length);
	for(var i=0; i<NB.length; i++){
		result[i] = quantile(NB[i], q); // unsorted array
	}
	return result;
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
            row += '<td>' + item[field+''] + '</td>';
        });
        rows += row + '</tr>';
    });
    rows += '</tbody>';
    $('#' + tableId).html($('#'+tableId).val() + rows);
}