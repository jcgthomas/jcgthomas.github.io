$("document").ready(() => {

    $(".introText").hover(() => {
        $("#james").css( "color", "var(--col5)" );
      }, () => {
        $("#james").css( "color", "rgba(255, 255, 255, 0.8)" );
      })
});

