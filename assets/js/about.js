document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, { fullWidth: true });

  // Initialize the navigation arrows
  var prevBtn = document.querySelector(".carousel-prev");
  var nextBtn = document.querySelector(".carousel-next");

  prevBtn.addEventListener("click", function () {
    var instance = M.Carousel.getInstance(elems[0]);
    instance.prev();
  });

  nextBtn.addEventListener("click", function () {
    var instance = M.Carousel.getInstance(elems[0]);
    instance.next();
  });

  var modalElems = document.querySelectorAll(".modal");
  var modalInstances = M.Modal.init(modalElems);

  var modalTriggerButtons = document.querySelectorAll(".modal-trigger");
  modalTriggerButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var personName = this.getAttribute("data-person");
      var modal = document.querySelector(
        "#" + this.getAttribute("data-target")
      );
      var modalPersonName = modal.querySelector(".person-name");
      modalPersonName.textContent = personName;
    });
  });
});