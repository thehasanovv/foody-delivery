$("#signup-btn").on("click", function () {
  $(".login-container").css("display", "none");
  $(".signup-container").css("display", "block");
});

$("#login-btn").on("click", function () {
  $(".login-container").css("display", "block");
  $(".signup-container").css("display", "none");
});
