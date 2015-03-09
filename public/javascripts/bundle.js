(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
*
*	COMPUTE: quantile
*
*
*	DESCRIPTION:
*		- Computes a quantile for a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );


// FUNCTIONS //

/**
* FUNCTION: ascending( a, b )
*	Comparator function used to sort values in ascending order.
*
* @private
* @param {Number} a
* @param {Number} b
* @returns {Number} difference between `a` and `b`
*/
function ascending( a, b ) {
	return a - b;
} // end FUNCTION ascending()


// QUANTILE //

/**
* FUNCTION: quantile( arr, prob[, opts] )
*	Computes a quantile for a numeric array.
*
* @private
* @param {Array} arr - 1d array
* @param {Number} prob - quantile prob [0,1]
* @param {Object} [opts] - method options:
	`method`: method used to interpolate a quantile value
	`sorted`: boolean flag indicating if the input array is sorted
* @returns {Number} quantile value
*/
function quantile( arr, p, opts ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'quantile()::invalid input argument. First argument must be an array.' );
	}
	if ( typeof p !== 'number' || p !== p ) {
		throw new TypeError( 'quantile()::invalid input argument. Quantile probability must be numeric.' );
	}
	if ( p < 0 || p > 1 ) {
		throw new TypeError( 'quantile()::invalid input argument. Quantile probability must be on the interval [0,1].' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'quantile()::invalid input argument. Options must be an object.' );
		}
		if ( opts.hasOwnProperty( 'sorted' ) && typeof opts.sorted !== 'boolean' ) {
			throw new TypeError( 'quantile()::invalid input argument. Sorted flag must be a boolean.' );
		}
		if ( opts.hasOwnProperty( 'method' ) && typeof opts.method !== 'string' ) {
			throw new TypeError( 'quantile()::invalid input argument. Method must be a string.' );
		}
		// TODO: validate that the requested method is supported. list.indexOf( method )
	} else {
		opts = {};
	}
	var len = arr.length,
		id;

	if ( !opts.sorted ) {
		arr = arr.slice();
		arr.sort( ascending );
	}

	// Cases...

	// [0] 0th percentile is the minimum value...
	if ( p === 0.0 ) {
		return arr[ 0 ];
	}
	// [1] 100th percentile is the maximum value...
	if ( p === 1.0 ) {
		return arr[ len-1 ];
	}
	// Calculate the vector index marking the quantile:
	id = ( len*p ) - 1;

	// [2] Is the index an integer?
	if ( id === Math.floor( id ) ) {
		// Value is the average between the value at id and id+1:
		return ( arr[ id ] + arr[ id+1 ] ) / 2.0;
	}
	// [3] Round up to the next index:
	id = Math.ceil( id );
	return arr[ id ];
} // end FUNCTION quantile()


// EXPORTS //

module.exports = quantile;

},{"validate.io-object":2}],2:[function(require,module,exports){
/**
*
*	VALIDATE: object
*
*
*	DESCRIPTION:
*		- Validates if a value is a JavaScript object.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// ISOBJECT //

/**
* FUNCTION: isObject( value )
*	Validates if a value is a object; e.g., {}.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is a object
*/
function isObject( value ) {
	return ( typeof value === 'object' && value !== null && !isArray( value ) );
} // end FUNCTION isObject()


// EXPORTS //

module.exports = isObject;

},{"validate.io-array":3}],3:[function(require,module,exports){
/**
*
*	VALIDATE: array
*
*
*	DESCRIPTION:
*		- Validates if a value is an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: isArray( value )
*	Validates if a value is an array.
*
* @param {*} value - value to be validated
* @returns {Boolean} boolean indicating whether value is an array
*/
function isArray( value ) {
	if ( Array.isArray ) {
		return Array.isArray( value );
	}
	return Object.prototype.toString.call( value ) === '[object Array]';
} // end FUNCTION isArray()

// EXPORTS //

module.exports = isArray;

},{}],4:[function(require,module,exports){
// Export ./lib/randgen

module.exports = require("./lib/randgen");

},{"./lib/randgen":5}],5:[function(require,module,exports){
/*jslint indent: 2, plusplus: true, sloppy: true */
// Generate uniformly distributed random numbers
// Gives a random number on the interval [min, max).
// If discrete is true, the number will be an integer.
function runif(min, max, discrete) {
  if (min === undefined) {
    min = 0;
  }
  if (max === undefined) {
    max = 1;
  }
  if (discrete === undefined) {
    discrete = false;
  }
  if (discrete) {
    return Math.floor(runif(min, max, false));
  }
  return Math.random() * (max - min) + min;
}

// Generate normally-distributed random nubmers
// Algorithm adapted from:
// http://c-faq.com/lib/gaussian.html
function rnorm(mean, stdev) {
  var u1, u2, v1, v2, s;
  if (mean === undefined) {
    mean = 0.0;
  }
  if (stdev === undefined) {
    stdev = 1.0;
  }
  if (rnorm.v2 === null) {
    do {
      u1 = Math.random();
      u2 = Math.random();

      v1 = 2 * u1 - 1;
      v2 = 2 * u2 - 1;
      s = v1 * v1 + v2 * v2;
    } while (s === 0 || s >= 1);

    rnorm.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
    return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
  }

  v2 = rnorm.v2;
  rnorm.v2 = null;
  return stdev * v2 + mean;
}

rnorm.v2 = null;

// Generate Chi-square distributed random numbers
function rchisq(degreesOfFreedom) {
  if (degreesOfFreedom === undefined) {
    degreesOfFreedom = 1;
  }
  var i, z, sum = 0.0;
  for (i = 0; i < degreesOfFreedom; i++) {
    z = rnorm();
    sum += z * z;
  }

  return sum;
}

// Generate Poisson distributed random numbers
function rpoisson(lambda) {
  if (lambda === undefined) {
    lambda = 1;
  }
  var l = Math.exp(-lambda),
    k = 0,
    p = 1.0;
  do {
    k++;
    p *= Math.random();
  } while (p > l);

  return k - 1;
}

// Generate Cauchy distributed random numbers
function rcauchy(loc, scale) {
  if (loc === undefined) {
    loc = 0.0;
  }
  if (scale === undefined) {
    scale = 1.0;
  }
  var n2, n1 = rnorm();
  do {
    n2 = rnorm();
  } while (n2 === 0.0);

  return loc + scale * n1 / n2;
}

// Bernoulli distribution: gives 1 with probability p
function rbernoulli(p) {
  return Math.random() < p ? 1 : 0;
}

// Vectorize a random generator
function vectorize(generator) {
  return function () {
    var n, result, i, args;
    args = [].slice.call(arguments)
    n = args.shift();
    result = [];
    for (i = 0; i < n; i++) {
      result.push(generator.apply(this, args));
    }
    return result;
  };
}

// Generate a histogram from a list of numbers
function histogram(data, binCount) {
  binCount = binCount || 10;

  var bins, i, scaled,
    max = Math.max.apply(this, data),
    min = Math.min.apply(this, data);

  // edge case: max == min
  if (max === min) {
    return [data.length];
  }

  bins = [];

  // zero each bin
  for (i = 0; i < binCount; i++) {
    bins.push(0);
  }

  for (i = 0; i < data.length; i++) {
    // scale it to be between 0 and 1
    scaled = (data[i] - min) / (max - min);

    // scale it up to the histogram size
    scaled *= binCount;

    // drop it in a bin
    scaled = Math.floor(scaled);

    // edge case: the max
    if (scaled === binCount) { scaled--; }

    bins[scaled]++;
  }

  return bins;
}

/**
 * Get a random element from a list
 */
function rlist(list) {
  return list[runif(0, list.length, true)];
}

exports.runif = runif;
exports.rnorm = rnorm;
exports.rchisq = rchisq;
exports.rpoisson = rpoisson;
exports.rcauchy = rcauchy;
exports.rbernoulli = rbernoulli;
exports.rlist = rlist;

exports.rvunif = vectorize(runif);
exports.rvnorm = vectorize(rnorm);
exports.rvchisq = vectorize(rchisq);
exports.rvpoisson = vectorize(rpoisson);
exports.rvcauchy = vectorize(rcauchy);
exports.rvbernoulli = vectorize(rbernoulli);
exports.rvlist = vectorize(rlist);

exports.histogram = histogram;

},{}],6:[function(require,module,exports){
$(document).ready(function(){
    $("#go_to_estim").click(function(){
    	Rtool_logic();
    });
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

	// var minTime1 = localStorage.getItem("min_time_1");
	// 			var maxTime1 = localStorage.getItem("max_time_1");
	// 			var minDist1 = localStorage.getItem("min_dist_1");
	// 			var maxDist1 = localStorage.getItem("max_dist_1");

	// 			var minTime2 = localStorage.getItem("min_time_2");
	// 			var maxTime2 = localStorage.getItem("max_time_2");
	// 			var minDist2 = localStorage.getItem("min_dist_2");
	// 			var maxDist2 = localStorage.getItem("max_dist_2");

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

$(document).ready(function(){
    window.onload = function() {
    	Rtool_logic();
    	updateFooter();
    };
});

},{"compute-quantile":1,"randgen":4}]},{},[6]);
