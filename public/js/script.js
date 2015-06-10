$(document).ready(function () {

	//get user details
	 
	

	var puzzleData = [
			 	{
					clue: "A Java based mobile agent platform and library for building mobile agents based applications. ",
					answer: "aglet",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "Basic unit of information in a quantum computer .",
					answer: "qubit",
					position: 3,
					orientation: "across",
					startx: 7,
					starty: 1
				},
				{
					clue: "Software systems designed to support interoperable machine-to-machine interaction over a network",
					answer: "webservices",
					position: 5,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "A software that enables creating, deploying, running, or managing applications in the cloud",
					answer: "cloudwares",
					position: 8,
					orientation: "across",
					startx: 1,
					starty: 5
				},
				{
					clue: "A hardware identification number that uniquely identifies each device on a network.",
					answer: "macaddress",
					position: 10,
					orientation: "across",	
					startx: 2,
					starty: 7
				},
				{
					clue: "It uses incremental, iterative work sequences that are commonly known as sprints.",
					answer: "agilemethod",
					position: 13,
					orientation: "across",
					startx: 1,
					starty: 9
				},
				{
					clue: "An action that occurs as a result of the user or another source",
					answer: "event",
					position: 16,
					orientation: "across",
					startx: 1,
					starty: 11
				},
				{
					clue: "A hypothetical subatomic particle of low mass and energy that is postulated to exist because of certain properties of the strong force",
					answer: "axion",
					position: 17,
					orientation: "across",
					startx: 7,
					starty: 11
				},
				{
					clue: "The conference of a tech company to showcase its new software and technologies for software developers. (abbr.)",
					answer: "awwdc",
					position: 1,
					orientation: "down",
					startx: 1,
					starty: 1
				},
				{
					clue: "A a technology that is gaining popularity in high-speed Ethernet systems for the purpose of optimizing throughput.",
					answer: "toe",
					position: 2,
					orientation: "down",
					startx: 5,
					starty: 1
				},
				{
					clue: "The retailing part of e-commerce on the Internet.  ",
					answer: "b2c",
					position: 4,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					clue: "A file format standard for electronic business cards.",
					answer: "vcard",
					position: 6,
					orientation: "down",
					startx: 7,
					starty: 3
				},
				{
					clue: "A orderable or downloadable update to a customer's software (abbr.)",
					answer: "sp",
					position: 7,
					orientation: "down",
					startx: 11,
					starty: 3
				},
				{
					clue: "The world's first commercially available quantum computer",
					answer: "dwave",
					position: 9,
					orientation: "down",
					startx: 5,
					starty: 5
				},
				{
					clue: "An input stream where data is sent to and read by a program",
					answer: "stdin",
					position: 11,
					orientation: "down",
					startx: 11,
					starty: 7
				},
				{
					clue: "Is a way of preventing mistakes or defects (abbr.)",
					answer: "qa",
					position: 12,
					orientation: "down",
					startx: 1,
					starty: 8
				},
				{
					clue: "A software application that provides comprehensive facilities to computer programmers for software development. (abbr.)",
					answer: "ide",
					position: 14,
					orientation: "down",
					startx: 3,
					starty: 9
				},
				{
					clue: "Electronic design automation",
					answer: "eda",
					position: 15,
					orientation: "down",
					startx: 7,
					starty: 9
				}
			] 
		
	$('#puzzle-wrapper').crossword(puzzleData);
	$( "#pause" ).click(function() {
	  CountDown.Pause();
	});
	$( "#resume" ).click(function() {
	  CountDown.Resume();
	});

	$( "#btn_reguser" ).click(function() {
	   var x = clickPlay();
	  	// ms
	  	if(x==0){
	  		CountDown.Start(300000);	
	  	}
		
	});


 

	var CountDown = (function ($) {
    // Length ms 
    var TimeOut = 10000;
    // Interval ms
    var TimeGap = 1000;
    
    var CurrentTime = ( new Date() ).getTime();
    var EndTime = ( new Date() ).getTime() + TimeOut;
    
    var GuiTimer = $('#timer');
    var GuiPause = $('#pause');
    var GuiResume = $('#resume').hide();
    
    var Running = true;
    
    var UpdateTimer = function() {
        // Run till timeout
        if( CurrentTime + TimeGap < EndTime ) {
            setTimeout( UpdateTimer, TimeGap );
        }
        // Countdown if running
        if( Running ) {
            CurrentTime += TimeGap;
            var solvetime = $("#solvetime").val();
            if( CurrentTime >= EndTime ) {
                GuiTimer.css('color','#f00');
                var solvetime = "00:00";//$("#solvetime").val("500");
				var totalsolve = $("#totalsolve").val();
				var ename = $("#ename").val();
				var uname = $("#uname").val();

				$("#user_preg .panel .panel-heading h3").text("Time is up.");
		  		$("#user_preg .panel .panel-body").html("<h1>Think again!</h1><p>You have completed "+totalsolve+" words. Check your rank on the <a href='/leaderboard'>leaderboard</a></p>");
		  		$("#user_preg").css("display","block");	
                //alert('Time ended!'+totalsolve+solvetime);

                updateLeaderboardTime(ename, uname, solvetime, totalsolve);
            }else if( (CurrentTime+ 5000) == EndTime){
            	GuiTimer.css('color','#faa');
            }
        }
        // Update Gui
        var Time = new Date();
        Time.setTime( EndTime - CurrentTime );
        var Minutes = Time.getMinutes();
        var Seconds = Time.getSeconds();
        
        GuiTimer.html(  
            (Minutes < 10 ? '0' : '') + Minutes 
            + ':' 
            + (Seconds < 10 ? '0' : '') + Seconds );
    };
    
    var Pause = function() {
        Running = false;
        GuiPause.hide();
        GuiResume.show();
    };
    
    var Resume = function() {
        Running = true;
        GuiPause.show();
        GuiResume.hide();
    };
    
    var Start = function( Timeout ) {
        TimeOut = Timeout;
        CurrentTime = ( new Date() ).getTime();
        EndTime = ( new Date() ).getTime() + TimeOut;
        UpdateTimer();
    };

    return {
        Pause: Pause,
        Resume: Resume,
        Start: Start
    };

})(jQuery);


});


function clickPlay( ){
	var ename = $("#ename").val();
	var uname = $("#uname").val();
	var x = 1;
	//alert("Playing with"+ ename+uname);
	if(!ename){
		$("#enot").text("Please enter your full name.");
	}else{
		x =0;
		$("#user_preg").css("display","none");
	}
	return x;
}



function updateLeaderboardTime(ename, uname, solvetime, totalsolve){
	 
	//alert("Updating leaderboard" + uname+ename+ solvetime+totalsolve);
	//update leaderboard
	//call updatepoints
	if(totalsolve <10){totalsolve = "0"+totalsolve;}
	
	var data = { email: ename, uname: uname, solvetime: totalsolve };


	$.ajax({
		url: "https://thinkfun.mybluemix.net/updateboard/"+ename+"/"+solvetime+"/"+totalsolve,
		type: 'post',
		dataType: 'html',
		success: function(results){
		  	console.log(results); 
		  	if(totalsolve == 18){
		  		$("#user_preg .panel .panel-heading h3").text("Puzzle complete.");
		  		$("#user_preg .panel .panel-body").html("<h1>Congratulations!</h1><p>"+results+"</p>");
		  		$("#user_preg").css("display","block");	 
		  	}


		  	//toLeaderboard();

		}	
		});
}

function toLeaderboard() {
    setTimeout(function(){ window.location.replace("https://thinkfun.mybluemix.net/leaderboard"); }, 10000);
}
