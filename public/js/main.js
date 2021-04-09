var icon = document.querySelector(".animated-icon1");

function openNav() {
  if (!icon.classList.contains("open")) {
    document.getElementById("mySidenav").style.width = "250px";
    icon.classList.add("open");
    icon.classList.add("bz");

    $("body").addClass("fixed-position");
  } else {
    document.getElementById("mySidenav").style.width = "0";
    icon.classList.remove("bz");
    icon.classList.remove("open");
    $("body").removeClass("fixed-position");
  }
}

$(window).on("load", function () {
  $(".loader-wrapper").fadeOut("slow");
});

$('[name="username"]').bind("keypress", function (e) {
  console.log(e.which);
  if ($('[name="username"]')) {
    var k = e.which;
    var ok =
      (k >= 65 && k <= 90) || // A-Z
      (k >= 97 && k <= 122) || // a-z
      (k >= 48 && k <= 57); // 0-9

    if (!ok) {
      e.preventDefault();
    }
  }
});
