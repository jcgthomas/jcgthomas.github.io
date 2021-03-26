$("document").ready(() => {

    $(".introText").hover(function() {
        $("#james").css( "color", "var(--col5)" );
      }, function() {
        $("#james").css( "color", "rgba(255, 255, 255, 0.8)" );
      })

});


let cvHighlight = function() {
  $("#cv").toggleClass("cvHighlight");

}