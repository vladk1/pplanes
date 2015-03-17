$(document).ready(function(){
    window.onload = function() {
    	calculateResults();
    	updateFooter();
    };
});

function calculateResults() {

	console.log("calculateResults");
	var scoreSeconds = localStorage.getItem("build_time");
	

	var minTime1 = parseInt(localStorage.getItem("min_time_1"));
	var maxTime1 = parseInt(localStorage.getItem("max_time_1"));
	var minDist1 = parseInt(localStorage.getItem("min_dist_1"));
	var maxDist1 = parseInt(localStorage.getItem("max_dist_1"));

	var minTime2 = parseInt(localStorage.getItem("min_time_2"));
	var maxTime2 = parseInt(localStorage.getItem("max_time_2"));
	var minDist2 = parseInt(localStorage.getItem("min_dist_2"));
	var maxDist2 = parseInt(localStorage.getItem("max_dist_2"));


	var planeType = localStorage.getItem("plane_type");
	var planeDist = localStorage.getItem("flight_distance");

	
	var finalBenefit = 0;
	var timeEstimPercent = (maxTime1 + maxTime2) 
	var timeInterval = Array(2);
	var distInterval = Array(2);

	console.log("planeType="+planeType);
	if (planeType === "the_basic_dart") {
		finalBenefit = 28;
		console.log("minTime1="+minTime1+" maxTime1="+maxTime1);

		timeInterval[0] = minTime1;
		timeInterval[1] = maxTime1;
		distInterval[0] = minDist1;
		distInterval[1] = maxDist1;

	} else {
		finalBenefit = 25;
		
		timeInterval[0] = minTime2;
		timeInterval[1] = maxTime2;
		distInterval[0] = minDist2;
		distInterval[1] = maxDist2;
	}

	var score = finalBenefit*planeDist - scoreSeconds;
	$('#score_points').html(score);

	$('#time_estimation_min').html(timeInterval[0]);
	$('#time_estimation_max').html(timeInterval[1]);
	$('#real_time').html(scoreSeconds);
	if(scoreSeconds < timeInterval[0] || scoreSeconds > timeInterval[1]) {
		$('#real_time').addClass("bad_highlight");
	} else {
		$('#real_time').addClass("highlight");
	}

	$('#dist_estimation_min').html(distInterval[0]);
	$('#dist_estimation_max').html(distInterval[1]);
	$('#real_dist').html(planeDist);
	if(planeDist < distInterval[0] || planeDist > distInterval[1]) {
		$('#real_dist').addClass("bad_highlight");
	} else {
		$('#real_dist').addClass("highlight");
	}	
}
