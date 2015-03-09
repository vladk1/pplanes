$(document).ready(function(){
    window.onload = function() {
    	console.log("hi");
    	calculateResults();
    	updateFooter();
    };
});

function calculateResults() {

	console.log("calculateResults");
	// $('<p>Text</p>').appendTo('#final_score');
	var scoreSeconds = localStorage.getItem("build_time");
	// localStorage.setItem("build_time", scoreSeconds);


	var minTime1 = localStorage.getItem("min_time_1");
	var maxTime1 = localStorage.getItem("max_time_1");
	var minDist1 = localStorage.getItem("min_dist_1");
	var maxDist1 = localStorage.getItem("max_dist_1");

	var minTime2 = localStorage.getItem("min_time_2");
	var maxTime2 = localStorage.getItem("max_time_2");
	var minDist2 = localStorage.getItem("min_dist_2");
	var maxDist2 = localStorage.getItem("max_dist_2");


	var planeType = localStorage.getItem("plane_selection");
	var planeDist = localStorage.getItem("flight_distance");

	console.log(minTime1+maxTime1+minDist1+maxDist1+minTime2+maxTime2+minDist2+maxDist2+planeType);

	// var estim = localStorage.getItem("min_time_1") + localStorage.getItem("max_time_1");

	// FinalBenefit*C1 - abs(FinalCost -CostMean) * C2 - abs(FinalBenefit - BenefitMean)*C3 - FinalCost*C4
	// FinalBenefit*50 - abs(FinalCost -CostMean) * 0.5 - abs(FinalBenefit - BenefitMean)*0.5 - FinalCost*1
	var finalBenefit = 0;
	if (planeType === "the_basic_dart") {
		finalBenefit = 100;
	} else {
		finalBenefit = 300;
	}

	var score = finalBenefit + 20*planeDist - scoreSeconds;
	
	// $("#final_score").text(score + " points");

	
	// $("#result_container").removeClass("core-header");
	// // remove a class
	// $("#result_container").addClass("core-red-header");

	$('.main-text').html($('<div>'+score+" points </div> <div> flight distance="+planeDist+" <div> building time="+scoreSeconds + "</div>"));
}
