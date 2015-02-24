


// rnorm_fromCI returns an array of values normal sampled
// from the interval given with confidence interval 95%
function rnorm_fromCI(N, lower, upper, minVal) {
	if(typeof(minVal)==='undefined') a = null;
	var mean = (lower + upper)/2;
	var sd = (upper - lower)/3.29; // this is the 95% confidence interval
	var result_array = Array(N);
	var result = 0;

	for (var i=0; i<N; i++){
		result = randgen.rnorm(mean, sd); // rnorm from randgen npm !!! need install
		if(isNumber(minVal)) {
			result_array[i] = ((result > minVal) ? result : minVal);
		}
    }
    return result_array;
}

// N is number of simulations
// cb_data template: [buildLower, buildUpper, distanceLower, distanceUpper]
function generate_cb_sim_mean(N, cb_data) {
	var n_planes = cb_data.length / 4;
	
	var Cost 	= Array(n_planes);
	var Benefit = Array(n_planes);
	var plane_offset;

	for(var	k=0; k<n_planes; k++){
		plane_offset = 4*k;
		for(var i=0; i<N; i++){
			Cost[i] 	= rnorm_fromCI(N, cb_data[plane_offset + 0], cb_data[plane_offset + 1], 0);
			Benefit[i] 	= rnorm_fromCI(N, cb_data[plane_offset + 2], cb_data[plane_offset + 3], 0);
		}
	}

	return [Cost, Benefit];
}

function Rtool_logic() {
	// LOL
	var N = Math.pow(10,3);
	var cb_data = [];
	cb_data[0] = document.getElementById('buildLower1').value
	cb_data[1] = document.getElementById('buildUpper1').value
	cb_data[2] = document.getElementById('distanceLower1').value
	cb_data[3] = document.getElementById('distanceUpper1').value

	cb_data[4] = document.getElementById('buildLower2').value
	cb_data[5] = document.getElementById('buildUpper2').value
	cb_data[6] = document.getElementById('distanceLower2').value
	cb_data[7] = document.getElementById('distanceUpper2').value

	if (cb_data.every(isNumber)) {
		var sim = generate_cb_sim_mean(N, cb_data);
		var Cost = sim[0];
		var Benefit = sim[1];

		// (ECost, EBenefit, ENB, LP, VaR)
		var result = planes_analysis(Cost, Benefit);
		document.getElementById("summary").innerHTML = 	"A --> ECost: " + result[0][0] + " EBenefit: " + result[1][0] +
												" ENB: " + result[2][0] + " LP: " + result[3][0] + " VaR: " + result[4][0] +
														"B --> ECost: " + result[0][1] + " EBenefit: " + result[1][1] +
												" ENB: " + result[2][1] + " LP: " + result[3][1] + " VaR: " + result[4][1];
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

	return (ECost, EBenefit, ENB, LP, VaR);
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
	for(var i=0; i<NB.length; i++){
		for(var j=0; j<NB[i].length; j++){
			NB[i][j] = Benefit[i][j] - Cost[i][j];
		}
	}
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
	if(typeof(q)==='undefined') q = 0.01;
	var result = Array(NB.length);
	for(var i=0; i<NB.length; i++){
		result[i] = quantile(NB[i], q); // unsorted array
	}
	return result;
}

//exports.Rtool_logic = Rtool_logic;