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
	console.log("planeType="+planeType);
	if (planeType === "the_basic_dart") {
		finalBenefit = 28;
		console.log("minTime1="+minTime1+" maxTime1="+maxTime1);

		var timeEstimMean = (minTime1 + maxTime1) / 2;
		timeEstimPercent = (timeEstimMean - scoreSeconds) / scoreSeconds;
		var distEstimMean = (minDist1 + maxDist1) / 2;
		distEstimPercent = (distEstimMean - planeDist) / planeDist;

		console.log("timeEstimMean="+timeEstimMean+" scoreSeconds="+scoreSeconds + " timeEstimPercent="+timeEstimPercent);
		console.log("distEstimMean="+distEstimMean+" planeDist="+planeDist + " distEstimPercent="+distEstimPercent);
	} else {
		finalBenefit = 25;
		timeEstimPercent = (((minTime2 + maxTime2) / 2) - scoreSeconds) / scoreSeconds;
		distEstimPercent = (((minDist2 + maxDist2) / 2) - planeDist) / planeDist;
	}

	var strTimeEstim = (timeEstimPercent*100).toFixed(10);
	strTimeEstim = strTimeEstim.substring(0, 6);

	var strDistEstim = (distEstimPercent*100).toFixed(10);
	strDistEstim = strDistEstim.substring(0, 6);

	var score = finalBenefit*planeDist - scoreSeconds;


	$('#score_points').html(score);
	
	if (timeEstimPercent < 0) {
		$('#time_estimation_type').html("underestimated");
		$("#time_estimation_type").addClass("bad_highlight");
		$('#time_estimation_value').addClass("bad_highlight");
	} else {
		$('#time_estimation_type').html("overestimated");
		$("#time_estimation_type").addClass("highlight");
		$('#time_estimation_value').addClass("highlight");
	}

	if (distEstimPercent < 0) {
		$('#distance_estimation_type').html("underestimated");
		$("#distance_estimation_type").addClass("bad_highlight");
		$('#distance_estimation_value').addClass("bad_highlight");
	} else {
		$('#distance_estimation_type').html("overestimated");
		$("#distance_estimation_type").addClass("highlight");
		$('#distance_estimation_value').addClass("highlight");
	}

	$('#time_estimation_value').html(strTimeEstim +"%");
	
	$('#distance_estimation_value').html(strDistEstim +"%");
	
}
