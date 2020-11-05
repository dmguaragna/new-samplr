


var nav = false;
function openNav(){

  document.getElementById("mySidepanel").style.width = "300px";
  document.getElementById("toggle").style.right = "300px"
  document.getElementById("arrow").src = "images/arrow-right-bold-outline.png";

  nav = true;

}
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
  document.getElementById("toggle").style.right = "-40px";
  document.getElementById("arrow").src = "images/arrow-left-bold-outline.png";

  nav = false;

}

function toggleNav() {
   nav ? closeNav() : openNav();
}


  document.getElementById("toggle").onmouseenter = function() {mouseEnter()};
  document.getElementById("toggle").onmouseleave = function() {mouseLeave()};

  function mouseEnter() {
    document.getElementById("toggle").style.background = "red";
    if(!nav){
      document.getElementById("toggle").style.right = "0";
      // changeGenre(genre);

      }
  }

  function mouseLeave() {
    document.getElementById("toggle").style.background = "#111";
    if(!nav){
      document.getElementById("toggle").style.right = "-40px";

      }

  }
//


  $(".like").each(function(i, el) {
     if(localStorage['like-this' + i] == 'fav'){
       $(this).addClass('fav');
     }
    else if (localStorage['like-this' + i] == 'fv-btn') {
      $(this).addClass('fv-btn');
    }
    });


        $('.login-button').on('click', function(){


            $('.popUp').removeClass("popUpForm").addClass("popUpSee");
            $(".login-sec").addClass(".pageOverlay");

        });




$(document).ready(function() {

  $('.like').on('click', function() {
    var $item = $(this).closest('.like');
    var index = $('.like').index($item);

    if ($item.hasClass('fv-btn')) {
      $item.removeClass("fv-btn").addClass("fav");
      console.log(index + "this shit running fv-btn")
      localStorage.setItem('like-this' + index, 'fav');
    }
    else if ($item.hasClass('fav')) {
      $item.removeClass('fav').addClass('fv-btn');
      console.log(index + "this shit running fav")
      localStorage.setItem('like-this' + index, 'fv-btn');
    }

  });
});

//
// const yoInput = document.querySelector('.yo-storage');
// const yoText = document.querySelector('.yo-text');
// const yoSave = document.querySelector('.yo-save');
// const yoStoredInput = localStorage.getItem('textinput');
//
//
// if(yoStoredInput) {
//   yoText.textContent = yoStoredInput;
// }
//
// yoInput.addEventListener('input', letter => {
//
//   yoText.textContent = letter.target.value
// });
//
// const saveToLocalStorage = () => {
//   localStorage.setItem('textinput', yoText.textContent);
// }
// yoSave.addEventListener('click', saveToLocalStorage);



// SEARCH BAR FILTER
  $("#sp-search").keyup(function() {

     // Retrieve the input field text and reset the count to zero
     var filter = $(this).val(),
       count = 0;

     // Loop through the comment list
     $('.row-info').each(function() {


       // If the list item does not contain the text phrase fade it out
       if ($(this).text().search(new RegExp(filter, "i")) < 0) {
         $(this).hide();  // MY CHANGE

         // Show the list item if the phrase matches and increase the count by 1
       } else {
         $(this).show(); // MY CHANGE
         count++;
       }

     });

   });
// GENRE BUTTON DROP DOWN SWITCH HEADER
  var genreButtons = document.querySelectorAll(".btn-inst").length;

  for (var i = 0; i < genreButtons; i++) {

    document.querySelectorAll(".btn-inst")[i].addEventListener("click", function(){
      var buttonInnerHTML = this.textContent;
      changeGenre(buttonInnerHTML);

    });

  }


  function changeGenre(genre){

      switch(genre) {

      case "All":
      document.getElementById("tp-header").innerHTML = "Samples";
      document.getElementById("sp-header").innerHTML = "Explore Samples";
      break;

      case "EDM":
        document.getElementById("tp-header").innerHTML = "EDM";
        document.getElementById("sp-header").innerHTML = "Explore EDM Samples";
      break;

      case "House":
       document.getElementById("tp-header").innerHTML = "House";
       document.getElementById("sp-header").innerHTML = "Explore House Samples";
      break;

      case "Trap":
        document.getElementById("tp-header").innerHTML = "Trap";
        document.getElementById("sp-header").innerHTML = "Explore Trap Samples";
      break;

      case "Dubstep":
        document.getElementById("tp-header").innerHTML = "Dubstep";
        document.getElementById("sp-header").innerHTML = "Explore Dubstep Samples";

      break;

      case "Hybrid":
        document.getElementById("tp-header").innerHTML = "Hybrid";
        document.getElementById("sp-header").innerHTML = "Explore Hybrid Samples";
      break;
      case "Future Bass":
        document.getElementById("tp-header").innerHTML = "Future Bass";
        document.getElementById("sp-header").innerHTML = "Explore Future Bass Samples";
      break;

      case "R&B":
        document.getElementById("tp-header").innerHTML = "R&B";
        document.getElementById("sp-header").innerHTML = "Explore R&B Samples";
      break;

      case "Hip Hop":
        document.getElementById("tp-header").innerHTML = "Hip Hop";
        document.getElementById("sp-header").innerHTML = "Explore Hip Hop Samples";
      break;

      case "Soul":
        document.getElementById("tp-header").innerHTML = "Soul";
        document.getElementById("sp-header").innerHTML = "Explore Soul Samples";
      break;

      case "Moombahton":
        document.getElementById("tp-header").innerHTML = "Moombahton";
        document.getElementById("sp-header").innerHTML = "Explore Moombahton Samples";
      break;
      case "Future House":
        document.getElementById("tp-header").innerHTML = "Future House";
        document.getElementById("sp-header").innerHTML = "Explore Future House Samples";
      break;


      default: console.log(buttonInnerHTML);
      }

  }

  $(document).ready(function(){

      $(".filter-button").click(function(){

          $(".filter-button").removeClass('active');
          $(this).addClass('active');

          var value = $(this).attr('data-filter');

          if(value == "all") {
              //$('.filter').removeClass('hidden');
              $('.filter').show();
          } else {
              //$('.filter[filter-item="'+value+'"]').removeClass('hidden');
              //$(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
              $(".filter").not('.'+value).hide();
              $(".filter").filter('.'+value).show();
          }
      });

  });


  $( ".custom-select" ).change(function() {
    var selectedEventType = this.options[this.selectedIndex].value;
    if (selectedEventType == "all") {
      // $('.row-info').removeClass('hidden');
      $('.row-info').attr('style', 'display: ');
    } else {
      // $('.row-info').addClass('hidden');
      $('.row-info').attr('style', 'display: none');
      $('.row-info[data-eventtype="' + selectedEventType + '"]').attr('style', 'display: ');
    }
  });



$('.wave').each(function(){
  //Generate unic ud
  var id = '_' + Math.random().toString(36).substr(2, 9);
  var path = $(this).attr('data-path');

  //Set id to container
  $(this).find(".wave-container").attr("id", id);

  //Initialize WaveSurfer
  var wavesurfer = WaveSurfer.create({
      container: '#' + id,
      waveColor: '#828282',
      // progressColor: '#343233',
      // progressColor: '#fa1616',
      progressColor: '#fa7d09',

      height: 80,
      width: 200
  });

  //Load audio file
  wavesurfer.load(path);

  //Add button event
  $(this).find("button").click(function(){
    wavesurfer.playPause();
  });
  });








///////////SCRIPT THAT WAS IN INDEX.HTML


timebase=16;
actx=new AudioContext();
osc=actx.createOscillator();
gain=actx.createGain();
gain.gain.value=0;
osc.type="sawtooth";
osc.start();
osc.connect(gain).connect(actx.destination);

function Callback(ev){
    osc.detune.setValueAtTime((ev.n-69)*100,ev.t);
    gain.gain.setTargetAtTime(0.5,ev.t,0.005);
    gain.gain.setTargetAtTime(0,ev.g,0.1);
}
function Play(){
    actx.resume();
    document.getElementById("proll").play(actx,Callback);
}
function Layout(k){
    switch(k.id){
    case "xrange":
        document.getElementById("proll").xrange=k.value*timebase;
        break;
    case "xoffset":
        document.getElementById("proll").xoffset=k.value*timebase;
        break;
    case "yrange":
        document.getElementById("proll").yrange=k.value;
        break;
    case "yoffset":
        document.getElementById("proll").yoffset=k.value;
        break;
    }
}

  $(document).ready(function(){   //this makes it so i could make the tabbing back and forth work again added this last
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
    });
  });



  $("#collapse-btn").on("click", function() {
    $("#base").slideToggle();
  });
    // JavaScript code to avoid dropdown
    // menu close

    // Clicking dropdown button will toggle display
    // function btnToggle() {
    //     document.getElementById("dropdownMenuButton").classList.toggle("show");
    // }
    $('.btn-notes').on('click', function(){
        $('.btn-notes').removeClass('selected');
        $(this).addClass('selected');
    });


    // Prevents menu from closing when clicked inside
    document.getElementById("myTab").addEventListener('click', function (event) {
        // alert("click outside");
        event.stopPropagation();
    });

    // Closes the menu in the event of outside click
    window.onclick = function(event) {
        if (!event.target.matches('.dropdown-item')) {

            var dropdowns =
            document.getElementsByClassName("dropdownmenu");

            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    document.getElementById("myTab2").addEventListener('click', function (event) {
        // alert("click outside");
        event.stopPropagation();
    });

    // Closes the menu in the event of outside click
    window.onclick = function(event) {
        if (!event.target.matches('.tab-content')) {

            var dropdowns =
            document.getElementsByClassName("dropdownmenu");

            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
