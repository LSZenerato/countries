document.querySelectorAll("#draggable").forEach(item => {
    item.addEventListener("dragstart", onDragStart);
});

document.querySelectorAll("#dropzone").forEach(item => {
    item.addEventListener("drop", onDrop);
    item.addEventListener("dragover", onDragOver);
});

function onDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);

    event.currentTarget.style.backgroundColor = 'yellow';
}

function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    const id = event.dataTransfer.getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;
    dropzone.appendChild(draggableElement);

    event.dataTransfer.clearData();
  }