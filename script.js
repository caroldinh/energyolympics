var availableWatts = 0, usedWatts = 0, icons = 0;
var stairClimbing, hurdles, sprint, slider, output, bulbWattage;
var weight, stairs, stairtime, jumps, jumptime;

var numSprints = 0, numHurdles = 0, numStairs = 0;

function load(){
  document.getElementById("step1").style.display = "block";
  $("html, body").animate({ scrollTop: 0 }, "fast");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.target.style.backgroundColor = "#ffffff"
  var data = ev.dataTransfer.getData("text");
  if(ev.target.id == "dragBox"){
    ev.preventDefault();
    var nodeCopy = document.getElementById(data).cloneNode(true);
    nodeCopy.id = data + icons;
    icons++;
    ev.target.appendChild(nodeCopy);
    if(data.indexOf("stairs_icon") != -1){
      usedWatts += stairClimbing;
      numStairs++;
    } else if(data.indexOf("sprint_icon") != -1){
      usedWatts += sprint;
      numSprints++;
    } else if(data.indexOf("hurdle_icon") != -1){
      usedWatts += hurdles;
      numHurdles++;
    }
  } else{
    if(!(data=="stairs_icon" || data == "hurdle_icon" || data=="sprint_icon")){
      console.log(data);
      document.getElementById(data).remove();
      if(data.indexOf("stairs_icon") != -1){
        usedWatts -= stairClimbing;
        numStairs--;
      } else if(data.indexOf("sprint_icon") != -1){
        usedWatts -= sprint;
        numSprints--;
      } else if(data.indexOf("hurdle_icon") != -1){
        usedWatts -= hurdles;
        numHurdles--;
      }
    }
  }
  wattreader = document.getElementById("used");
  wattreader.innerHTML = "Watts used: " + usedWatts;
  if(Math.abs(availableWatts - usedWatts) < 200){
    wattreader.style.color = "orange";
  } if(usedWatts >= availableWatts){
    wattreader.style.color = "darkcyan"
     document.getElementById("step4").style.display = "block";
     document.getElementById("step3").style.marginBottom = "0vw";
    window.location = "#4";
  }else{
    wattreader.style.color = "black";
  }
}

function calculate(){

  weight = document.getElementById("weight").value;
  stairs = document.getElementById("stairs").value;
  stairtime = document.getElementById("stairtime").value;
  jumps = document.getElementById("jumps").value;
  jumptime = document.getElementById("jumptime").value;

  var alertBox = document.getElementById("alert");
  alertBox.innerHTML = ""

  if(weight == "" || stairs == "" || stairtime == "" || jumps == "" || jumptime == ""){
    var warning = document.createElement("div");
    warning.className = "alert alert-danger";
    warning.role = "alert";
    warning.innerHTML = "Please fill in all of the boxes!";
    alertBox.appendChild(warning);
  } else{
    stairClimbing = Math.round((weight * 4.5 * 0.18 * stairs) / stairtime);
    hurdles = Math.round((weight * 0.5 * 10 * 0.3 * jumps) / jumptime);
    sprint = Math.round(1.5 * weight);

    var display = document.getElementById("calculation");
    display.innerHTML = "<p>Nice job! The values below will tell you how many watts you used to perform each activity.</p>"
      + "Stair climbing: " + stairClimbing + "W<br>" +
      "Hurdles: " + hurdles + "W<br>" + 
      "50m sprint: " + sprint + "W<br>";

      document.getElementById("step2").style.display = "block";
      window.location = "#2";
      document.getElementById("step1").style.marginBottom = "0vw";

  }

}


document.addEventListener("dragenter", function(event) {
  if ( event.target.className == "div2" ) {
    event.target.style.backgroundColor = "#88ff88";
  }
});

document.addEventListener("dragover", function(event) {
  event.preventDefault();
});

document.addEventListener("dragleave", function(event) {
  if ( event.target.className == "div2" ) {
    event.target.style.backgroundColor = "#ffffff";
  }
}); // Display the default slider value

function selectbulb(wattage){
  bulbWattage = wattage;
  dropdown = document.getElementById("dropdownMenuButton");
  if(wattage==60){
    dropdownMenuButton.innerHTML = "60W Incandescent";
  } else if(wattage==15){
    dropdownMenuButton.innerHTML = "15W CFL";
  } else{
    dropdownMenuButton.innerHTML = "8W LED";
  }
  wattreader = document.getElementById("available");
  availableWatts = wattage * 24 * 7;
  wattreader.innerHTML = "Watts available: " + availableWatts;
  document.getElementById("step3").style.display = "block";
  document.getElementById("step2").style.marginBottom = "0vw";
  window.location = "#3";
}

function finish(){
  dropdown = document.getElementById("dropdownMenuButton");
  lightbulbType = document.getElementById("type");
  lightbulbType.innerHTML = dropdown.innerHTML;
  results = document.getElementById("results");
  results.innerHTML = "Run " + numSprints + " 50-meter sprints,<br>" +
    "Climb your staircase " + numStairs + " times, <br>" +
    "AND jump " + (numHurdles * jumps) + " hurdles.";
  document.getElementById("step5").style.display = "block";
  document.getElementById("step4").style.marginBottom = "0vw";
  window.location = "#5";
  document.getElementById("step5").style.marginBottom = "7vw";
}

function reload(){
  location.reload();
  load();
}