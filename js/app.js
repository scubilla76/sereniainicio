function mostrarRecomendacion() {
  document.querySelector("#inicio").setAttribute("visible", "false");
  document.querySelector("#recomendacion").setAttribute("visible", "true");
}

function entrarBosque() {
  document.querySelector("#recomendacion").setAttribute("visible", "false");
  document.querySelector("#bosque").setAttribute("visible", "true");
  document.querySelector("a-sky").setAttribute(
    "src",
    "assets/bosque.jpg"
  );
}
