$(document).ready(function () {

	//get user details
	 
	var uname = "";

	var puzzleData = [
			 	{
					clue: "First letter of greek alphabet",
					answer: "alpha",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "Not a one ___ motor, but a three ___ motor",
					answer: "phase",
					position: 3,
					orientation: "across",
					startx: 7,
					starty: 1
				},
				{
					clue: "Created from a separation of charge",
					answer: "capacitance",
					position: 5,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "The speeds of engines without and accelaration",
					answer: "idlespeeds",
					position: 8,
					orientation: "across",
					startx: 1,
					starty: 5
				},
				{
					clue: "Complex resistances",
					answer: "impedances",
					position: 10,
					orientation: "across",	
					startx: 2,
					starty: 7
				},
				{
					clue: "This device is used to step-up, step-down, and/or isolate",
					answer: "transformer",
					position: 13,
					orientation: "across",
					startx: 1,
					starty: 9
				},
				{
					clue: "Type of ray emitted frm the sun",
					answer: "gamma",
					position: 16,
					orientation: "across",
					startx: 1,
					starty: 11
				},
				{
					clue: "C programming language operator",
					answer: "cysan",
					position: 17,
					orientation: "across",
					startx: 7,
					starty: 11
				},
				{
					clue: "Defines the alpha-numeric characters that are typically associated with text used in programming",
					answer: "ascii",
					position: 1,
					orientation: "down",
					startx: 1,
					starty: 1
				},
				{
					clue: "Generally, if you go over 1kV per cm this happens",
					answer: "arc",
					position: 2,
					orientation: "down",
					startx: 5,
					starty: 1
				},
				{
					clue: "Control system strategy that tries to replicate the human through process (abbr.)",
					answer: "ann",
					position: 4,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					clue: "Greek variable that usually describes rotor positon",
					answer: "theta",
					position: 6,
					orientation: "down",
					startx: 7,
					starty: 3
				},
				{
					clue: "Electromagnetic (abbr.)",
					answer: "em",
					position: 7,
					orientation: "down",
					startx: 11,
					starty: 3
				},
				{
					clue: "No. 13 across does this to a voltage",
					answer: "steps",
					position: 9,
					orientation: "down",
					startx: 5,
					starty: 5
				},
				{
					clue: "Emits a lout wailing sound",
					answer: "siren",
					position: 11,
					orientation: "down",
					startx: 11,
					starty: 7
				},
				{
					clue: "Information technology (abbr.)",
					answer: "it",
					position: 12,
					orientation: "down",
					startx: 1,
					starty: 8
				},
				{
					clue: "Asynchronous transfer mode (abbr.)",
					answer: "atm",
					position: 14,
					orientation: "down",
					startx: 3,
					starty: 9
				},
				{
					clue: "Offset current control (abbr.)",
					answer: "occ",
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
	  clickPlay();
	  	// ms
		CountDown.Start(10000);	
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
            if( CurrentTime >= EndTime ) {
                GuiTimer.css('color','#f00');
                 
                alert('Time ended!');
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


function clickPlay(){

	var name =	$("#name").val();
	var uname = $("#uname").val();

	alert("Playing with"+ name+uname);

	$("#user_preg").css("display","none");
}



function updateLeaderboardTime(username, solvetime, totalsolve){
	 
	alert("Updating leaderboard" +solvetime+totalsolve);
	//update leaderboard
}
