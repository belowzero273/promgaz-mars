window.onload = function () {
  document.getElementById("flag-ru").onclick = function () {
    document.cookie = "language=ru";
    location.reload();
  };
  document.getElementById("flag-gb").onclick = function () {
    document.cookie = "language=en";
    location.reload();
  };
};
