var current = 0;
var next = 1;
var frame = 0;

var dec_current = 0;
var dec_next = 1;
var dec_frame = 0;

var min_current = 0;
var min_next = 1;
var min_frame = 0;

var animateMinutes = 0;

var points = [
		[[44.5, 100], [100, 18], [156, 100], [100, 180], [44.5, 100]], // 0
		[[77, 20.5], [104.5, 20.5], [104.5, 181], [104.5, 181], [104.5, 181]], //1
		[[56, 60], [144.5, 61], [108, 122], [57, 177], [147, 177]], // 2
		[[63.25, 54], [99.5, 18], [99.5, 96], [100, 180], [56.5, 143]], // 3
		[[155, 146], [43, 146], [129, 25], [129, 146], [129, 179]], //4
		[[146, 20], [91, 20], [72, 78], [145, 129], [45, 154]], // 5
		[[110, 20], [110, 20], [46, 126], [153, 126], [53.5, 100]], // 6
		[[47, 21], [158, 21], [120.67, 73.34], [83.34, 126.67], [46, 181]],  // 7
		[[101, 96], [101, 19], [101, 96], [101, 179], [101, 96]], // 8
		[[146.5, 100], [47, 74], [154, 74], [90, 180], [90, 180]] // 9
	];

	var control_one = [
		[[44.5, 60], [133, 18], [156 , 140], [67, 180]], // 0
		[[77, 20.5], [104.5, 20.5], [104.5, 181], [104.5, 181]], // 1
		[[59, 2], [144.5, 78], [94, 138], [57, 177]], // 2
		[[63, 27], [156, 18], [158, 96], [54, 180]], // 3
		[[155, 146], [43, 146], [129, 25], [129, 146]], // 4
		[[91, 20], [72, 78], [97, 66], [140, 183]], // 5
		[[110, 20], [71, 79], [52, 208], [146, 66]], // 6
		[[47, 21], [158, 21], [120.67, 73.34], [83.34, 126.67]], // 7
		[[44, 95], [154, 19], [44, 96], [154, 179]], // 8
		[[124, 136], [42, 8], [152, 108], [90, 180]] // 9
	];

	var control_two = [
		[[67, 18], [156, 60], [133, 180], [44.5, 140]], // 0
		[[104.5, 20.5], [104.5, 181], [104.5, 181], [104.5, 181]], // 1
		[[143, 4], [130, 98], [74, 155], [147, 177]], // 2
		[[86, 18], [146, 96], [150, 180], [56, 150]], // 3
		[[43, 146], [129, 25], [129, 146], [129, 179]], // 4
		[[91, 20], [72, 78], [145, 85], [68, 198]], // 5
		[[110, 20], [48, 92], [158, 192], [76, 64]], // 6
		[[158, 21], [120.67, 73.34], [83.34, 126.67], [46, 181]], // 7
		[[44, 19], [154, 96], [36, 179], [154, 96]], // 8
		[[54, 134], [148, -8], [129, 121], [90, 180]] // 9
	];


/**
	 * Draws each frame of the animation.
	 */
	function draw(i, j, frame, context) {
	    context.clearRect(0, 0, 200, 200);
	    context.beginPath();
	
	    var current = points[i];
	    var next = points[j];

	    var curr1 = control_one[i];
	    var next1 = control_one[j];

	    var curr2 = control_two[i];
	    var next2 = control_two[j];
	    
	    // Interpolated value.
	    frame = getInterpolation(frame);
	    
	    // First point.
	    context.moveTo(current[0][0] + ((next[0][0] - current[0][0]) * frame),
	               current[0][1] + ((next[0][1] - current[0][1]) * frame));
	    
	    // Rest of the points connected as bezier curve.
	    for (var index = 1; index < 5; index++) {
	        context.bezierCurveTo(
	            curr1[index-1][0] + ((next1[index-1][0] - curr1[index-1][0]) * frame),
	            curr1[index-1][1] + ((next1[index-1][1] - curr1[index-1][1]) * frame),
	            curr2[index-1][0] + ((next2[index-1][0] - curr2[index-1][0]) * frame),
	            curr2[index-1][1] + ((next2[index-1][1] - curr2[index-1][1]) * frame),
	            current[index][0] + ((next[index][0] - current[index][0]) * frame),
	            current[index][1] + ((next[index][1] - current[index][1]) * frame));
	    }
	    
	    context.stroke();
	}




	/*
	 * Each number change is divided into 10 frames.
	 * First two frames and last two frames are static.
	 * Acceleration-Deceleration happens in the in-between 6 frames.
	 */
	function nextFrame() {
	    // Frames 0, 1 is the first pause.
	    // Frames 9, 10 is the last pause.
	    if (frame >= 2 && frame <= 8) {
	        draw(current, next, (frame - 2) / 6, secCtx);
	    }
	
	    frame++;
	
	    // Each number change has 10 frames. Reset.
	    if (frame == 10) {
	        frame = 0;
	        current = next;
	        next++;
	
	        // Reset to zarro.
	        if (next == 10) {
	            next = 0;
	            // incrDecSec();
	            decTimeOut = setTimeout(nextDecSecFrame, 100);
	        }
	    }
	
		if (stopWatch === 0) {
	    	setTimeout(nextFrame, 100);
		}
	}


	function nextDecSecFrame() {
		console.log("nextDecSecFrame called!");
		if (animateMinutes === 1) {
			setTimeout(nextMinFrame, 100);
			animateMinutes = 0;
			var textMinutesView = document.getElementById("text_min");
			textMinutesView.style.visibility='visible'; 
		}
		
	    // Frames 0, 1 is the first pause.
	    // Frames 9, 10 is the last pause.
	    if (dec_frame >= 2 && dec_frame <= 8) {
	        draw(dec_current, dec_next, (dec_frame - 2) / 6, dec_secCtx);
	    }
	
	    dec_frame++;
	
	    // Each number change has 10 frames. Reset.
	    if (dec_frame == 10) {

	        dec_frame = 0;
	        dec_current = dec_next;
	        dec_next++;

	        // clearTimeout(decTimeOut);
	
	        // Reset to zarro.
	        if (dec_next == 6) {
	            dec_next = 0;
	            animateMinutes = 1;
	            // incrMin();
	            // setTimeout(nextMinFrame, 100);
	        }
	        
	    } else {
	    	setTimeout(nextDecSecFrame, 100);
	    }
	}

	function nextMinFrame() {
		console.log("nextDecSecFrame called!");
	    // Frames 0, 1 is the first pause.
	    // Frames 9, 10 is the last pause.
	    if (min_frame >= 2 && min_frame <= 8) {
	        draw(min_current, min_next, (min_frame - 2) / 6, minCtx);
	    }
	
	    min_frame++;
	
	    // Each number change has 10 frames. Reset.
	    if (min_frame == 10) {
	        min_frame = 0;
	        min_current = min_next;
	        min_next++;
	        // clearTimeout(decTimeOut);
	
	        // Reset to zarro.
	        if (min_next == 6) {
	            min_next = 0;
	            // setTimeout(nextMinFrame, 100);
	            // incrMin();
	        }
	    } else {
	    	setTimeout(nextMinFrame, 100);
	    }
	}



	/**
	 * Accelerate Decelerate interpolator.
	 */
	function getInterpolation(input) {
	    return (Math.cos((input + 1) * Math.PI) / 2) + 0.5;
	}

