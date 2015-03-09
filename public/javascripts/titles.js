var titles = new Array();
var urls = new Array();

titles.push("Home");
urls.push("/");

titles.push("Starting questions");
urls.push("/start_questions");

titles.push("Paper Planes");
urls.push("/planes");

titles.push("Uncertainty Theory");
urls.push("/uncertainty");

titles.push("Uncertainty Approximation");
urls.push("/approximation");

titles.push("Monte-Carlo methods");
urls.push("/analysis");

titles.push("Results");
urls.push("/results");

titles.push("Choose Plane");
urls.push("/choose_plane");

titles.push("Build plane");
urls.push("/game_build_plane");

titles.push("Measure flight distance");
urls.push("/flight_distance");

titles.push("Score");
urls.push("/score");


window.onload = function() {
  updateFooter();
};

function updateFooter() {
	for (var i=0; i<titles.length; i++) {
		var idNextTitle = "#footer_next_" + i;
		var idBackTitle = "#footer_back_" + i;
		
		var aIdNextLink = "#footer_next_link_" + i;
		var aIdBackLink = "#footer_back_link_" + i;

		var headerTitleId = "#header_title_" + i;

		$(headerTitleId).text(getTitle(i));

		$(aIdNextLink).attr("href", getUrl(i+1))
		$(idNextTitle).text(getTitle(i+1));

		$(aIdBackLink).attr("href", getUrl(i-1))
		$(idBackTitle).text(getTitle(i-1));
	}
}

function getUrl(slideNum) {
	return urls[slideNum];
}
function getPrevUrl(slideNum) {
	if (slideNum-1 > 0) {
		return urls[slideNum-1];
	} else {
		return "";
	}
}
function getNextUrl(slideNum) {
	if (slideNum+1 < urls.length) {
		return urls[slideNum+1];
	} else {
		return "";
	}
}


function getTitle(slideNum) {
	return titles[slideNum];
}
function getPrevTitle(slideNum) {
	if (slideNum-1 > 0) {
		return titles[slideNum-1];
	} else {
		return "";
	}
}
function getNextTitle(slideNum) {
	if (slideNum+1 < titles.length) {
		return titles[slideNum+1];
	} else {
		return "";
	}
}