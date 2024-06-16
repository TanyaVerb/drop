const item = document.querySelector(".item");
const placeholder = document.querySelector(".placeholder-wrapper");

//захват элемента
//Пользователь начинает перетаскивать элемент
item.addEventListener("dragstart", dragStart);
//Вызывается, когда пользователь завершает перетаскивание.
item.addEventListener("dragend", dragEnd);

//Вызывается, когда перетаскиваемый элемент перемещается над областью сброса (в нашем случае, "placeholder-wrapper").
placeholder.addEventListener("dragover", dragOver);

//
placeholder.addEventListener("dragleave", dragLeave); //Вызывается, когда перетаскиваемый элемент покидает область сброса.
placeholder.addEventListener("dragenter", dragEnter); //Вызывается, когда перетаскиваемый элемент входит в область сброса.
placeholder.addEventListener("drop", dragDrop); //Вызывается, когда перетаскиваемый элемент сбрасывается в область сброса.

function dragStart(e) {
  console.log("start");
  e.target.classList.add("hold"); //меняем стиль перетаскиваемого элемента

  setTimeout(() => {
    e.target.classList.add("hide");
  }, 0); //Сразу же после начала перетаскивания добавляет класс "hide", чтобы элемент был визуально скрыт
}
function dragEnd(e) {
  e.target.className = "item"; //Возвращает элементу его первоначальный класс "item", удаляя "hold" и "hide"
}

function dragOver(e) {
  e.preventDefault(); // Предотвращает стандартное поведение браузера, которое по умолчанию не позволяет сброс.
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
    e.target.append(item); //Добавляет перетаскиваемый элемент ("item") в качестве дочернего элемента области сброса.
    changeClass(this, "remove"); //Удаляет класс "hovered" у всех дочерних элементов "placeholder-wrapper".
  }
}

/*  Получает в качестве аргументов элемент родительской области сброса и операцию ("add" или "remove").
 *  Перебирает все дочерние элементы родительской области и добавляет/удаляет класс "hovered" в зависимости от операции.*/
function changeClass(parent, operation) {
  const placeholders = parent.children;
  Array.from(placeholders).forEach((el) => {
    operation === "remove"
      ? el.classList.remove("hovered")
      : el.classList.add("hovered");
  });
  console.log(placeholders);
}

/*Элемент скрывается при перетаскивании.
· Во время перетаскивания над областью сброса  в ней добавляется класс "hovered", чтобы визуально подчеркнуть возможность сброса. 
· После сброса элемента в область сброса класс "hovered" удаляется.*/
