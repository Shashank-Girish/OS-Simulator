class FileNode {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.start = null;
    this.end = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(diskSize) {
    this.head = null;
    this.diskSize = diskSize;
    this.usedSpace = 0;
  }

  insertFile(name, size) {
    if (this.usedSpace + size > this.diskSize) {
      const errorMessage = document.getElementById("error-message");
      errorMessage.textContent = `Insufficient disk space to allocate file '${name}'.`;
      errorMessage.style.display = "block";
      console.log(`Insufficient disk space to insert file '${name}'.`);
      return;
    }

    const newNode = new FileNode(name, size);

    if (!this.head) {
      newNode.start = 0;
      newNode.end = size - 1;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      const prevEnd = currentNode.end;
      newNode.start = prevEnd + 1;
      newNode.end = prevEnd + size;
      currentNode.next = newNode;
    }

    this.usedSpace += size;
    console.log(`Inserted file '${name}' with size ${size}.`);
  }

  allocateFile(name, size) {
    if (this.usedSpace + parseInt(size) > parseInt(this.diskSize)) {
      console.log(`Insufficient disk space to allocate file '${name}'.`);
      return;
    }

    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.next === null) {
        const newStart = currentNode.end + 1;
        const newEnd = newStart + size - 1;
        if (newEnd > parseInt(this.diskSize) - 1) {
          console.log(`Insufficient disk space to allocate 2file '${name}'.`);
          return;
        }
        const newNode = new FileNode(name, size);
        newNode.start = newStart;
        newNode.end = newEnd;
        currentNode.next = newNode;
        this.usedSpace += size;
        console.log(`Allocated file '${name}' with size ${size}.`);
        return;
      }
      const gap = currentNode.next.start - currentNode.end - 1;
      if (gap >= size) {
        const newStart = currentNode.end + 1;
        const newEnd = newStart + size - 1;
        const newNode = new FileNode(name, size);
        newNode.start = newStart;
        newNode.end = newEnd;
        newNode.next = currentNode.next;
        currentNode.next = newNode;
        this.usedSpace += size;
        console.log(`Allocated file '${name}' with size ${size}.`);
        return;
      }
      currentNode = currentNode.next;
    }

    console.log(`Insufficient disk space to allocate 1file '${name}'.`);
  }

  displayFiles() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(
        `File: ${currentNode.name}, Size: ${currentNode.size}, Range: ${currentNode.start}-${currentNode.end}`
      );
      currentNode = currentNode.next;
    }
  }
}

function allocatesFile() {
  const fileNameInput = document.getElementById("file-name-allocate");
  const fileSizeInput = document.getElementById("file-size-allocate");

  const fileName = fileNameInput.value;
  const fileSize = parseInt(fileSizeInput.value);

  fileList.insertFile(fileName, fileSize);

  fileNameInput.value = "";
  fileSizeInput.value = "";
}

function displayFiles() {
  const fileStructureDiv = document.getElementById("file-structure");
  fileStructureDiv.innerHTML = ""; // Clear the previous file structure

  let currentNode = fileList.head;

  const table = document.createElement("table");

  const headerRow = document.createElement("tr");
  const header1 = document.createElement("th");
  const header2 = document.createElement("th");
  const header3 = document.createElement("th");
  header1.textContent = "File";
  header2.textContent = "Size";
  header3.textContent = "Range";
  headerRow.appendChild(header1);
  headerRow.appendChild(header2);
  headerRow.appendChild(header3);
  table.appendChild(headerRow);

  while (currentNode) {
    const fileRow = document.createElement("tr");
    const fileCell1 = document.createElement("td");
    const fileCell2 = document.createElement("td");
    const fileCell3 = document.createElement("td");
    fileCell1.textContent = currentNode.name;
    fileCell2.textContent = currentNode.size;
    fileCell3.textContent = `${currentNode.start}-${currentNode.end}`;
    fileRow.appendChild(fileCell1);
    fileRow.appendChild(fileCell2);
    fileRow.appendChild(fileCell3);
    table.appendChild(fileRow);

    currentNode = currentNode.next;
  }

  fileStructureDiv.appendChild(table);
}

function displayTable() {
  displayFiles();
}