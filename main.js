const item = document.querySelector(".item");
const placeholder = document.querySelector(".placeholder-wrapper");

//захват элемента
item.addEventListener("dragstart", dragStart);
item.addEventListener("dragend", dragEnd);

placeholder.addEventListener("dragover", dragOver);

//
placeholder.addEventListener("dragleave", dragLeave);
placeholder.addEventListener("dragenter", dragEnter);
placeholder.addEventListener("drop", dragDrop);

function dragStart(e) {
  console.log("start");

  e.target.classList.add("hold");

  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0);
}
function dragEnd(e) {
  e.target.className = "item";
}

function dragOver(e) {
  e.preventDefault(); // чтобы не перебивать событие drop
  console.log(e.target);
  if (e.target.classList.contains("placeholder")) {
    e.target.classList.remove("hovered");
  }
}
function dragLeave(e) {
  console.log("dragLeave");
  console.log(e);
}
function dragEnter(e) {
  console.log("dragEnter");
  if (e.target.classList.contains("placeholder")) {
    console.log(this);
    changeClass(this, "add"); //вся строка
  }
}
function dragDrop(e) {
  console.log("dragDrop");
  if (e.target.classList.contains("placeholder")) {
    e.target.append(item);
    changeClass(this, "remove");
  }
}

function changeClass(parent, operation) {
  const placeholders = parent.children;
  Array.from(placeholders).forEach((el) => {
    operation === "remove"
      ? el.classList.remove("hovered")
      : el.classList.add("hovered");
  });
  console.log(placeholders);
}
