$(document).ready(function(){
  var work = true;
  var interval = false;
  var degree = -30;

  /* Adding 1 minute to the overall time */
  $(".minutes").click(function(){
    var curTime = getCurrentTime();
    var newMinutes = parseInt(curTime[0]) + 1;
    if (newMinutes > 60) {
      alert("You're not allowed to work more than an hour! It's not good for your health.");
      newMinutes -= 1;
    }
    minutes = newMinutes + ":" + curTime[1];
    $("span").html(minutes);
  });

  /* Take away 1 minute from the overall time */
  $(".seconds").click(function(){
    var curTime = getCurrentTime();
    var newMinutes = parseInt(curTime[0]) - 1;
    if (newMinutes < 1) {
      if (work) {
        alert("You have to work at least a minute.");
        newMinutes += 1;
      } else {
        alert("Hold on man. Sit and relax.");
        newMinutes += 1;
      }
    }
    minutes = newMinutes + ":" + curTime[1];
    $("span").html(minutes);
  });

  /* Refresh pomodoro clock */
  $(".refresh").click(function(){
    $("span").html("25:00");
  });

  /* Toggle between rest and work time */
  $(".switch").click(function(){
    var curTime = getCurrentTime();
    clearInterval(interval);
    if (work) {
      $("span").html("5:00");
      $("span").css("color", "#6BD2F1");
      work = false;
    } else {
      $("span").html("25:00");
      $("span").css("color", "black");
      work = true;
    }
  });

  /* Start pomodoro clock */
  $(".play").click(function(){
    interval = setInterval(changeTime, 1000);
  });

  /* Stop pomodoro clock */
  $(".stop").click(function(){
    clearInterval(interval);
  });

  /* Change time string */
  var changeTime = function() {
    $(".title img").css("transform", "rotate(" + degree + "deg)");
    degree = changeDegree();

    var curTime = getCurrentTime();
    if (curTime[0] == "0" && curTime[1] == "00") {
      if (work) {
        curTime[0] = "5";
        curTime[1] = "00";
        $("span").css("color", "#6BD2F1");
        work = false;
      } else {
        curTime[0] = "25";
        curTime[1] = "00";
        $("span").css("color", "black");
        work = true;
      }
    } else if (curTime[1] == "00") {
      curTime[0] = String(parseInt(curTime[0]) - 1);
      curTime[1] = "59";
    } else {
      curTime[1] = String(parseInt(curTime[1]) - 1);
    }
    if (curTime[1].length == 1) {
      curTime[1] = "0" + curTime[1];
      $("span").html(curTime[0] + ":" + curTime[1]);
    } else {
      $("span").html(curTime[0] + ":" + curTime[1]);
    }
  };

  var getCurrentTime = function() {
    var timeString = $("span").text();
    var timeArray = timeString.split(":");
    return timeArray;
  };

  var changeDegree = function() {
    return degree == -30 ? 30 : -30;
  };
});
