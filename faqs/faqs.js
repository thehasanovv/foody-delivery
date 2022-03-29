import { questions } from "./questions.js";

$(document).ready(function () {
  $(".acc").on("click", function (e) {
    var dataId = $(this).attr("data-id");
    // $(`.plus[data-id='${dataId}']`).css({ display: "none" });
    // $(`.minus[data-id='${dataId}']`).css({ display: "block" });
    // $(`.acc-body[data-id='${dataId}']`).addClass("active");
    if ($(e.target).hasClass("fa-plus")) {
      $(this).find(".plus").css({ display: "none" });
      $(this).find(".minus").css({ display: "block" });
      $(this).find(".acc-body").addClass("active");
    }
  });

  $(".acc").on("click", function (e) {
    var dataId = $(this).attr("data-id");
    // $(`.plus[data-id='${dataId}']`).css({ display: "block" });
    // $(`.minus[data-id='${dataId}']`).css({ display: "none" });
    // $(`.acc-body[data-id='${dataId}']`).removeClass("active");
    if ($(e.target).hasClass("fa-minus")) {
      $(this).find(".plus").css({ display: "block" });
      $(this).find(".minus").css({ display: "none" });
      $(this).find(".acc-body").removeClass("active");
    }
  });
});

questions.map((item) => {
  $(".faqs-wrapper").append(`<div class="acc">
    <div class="acc-header">
        <h3>${item.question}</h3>
        <span class="plus" id="plus" data-id="${item.id}"><i class="fa-solid fa-plus"></i></span>
        <span class="minus" id="minus" data-id="${item.id}"><i class="fa-solid fa-minus"></i></span>
    </div>
    <div class="acc-body" data-id="${item.id}" >
        <p>${item.answer}</p>
    </div>
</div>`);
});
