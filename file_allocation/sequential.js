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
      if (this.usedSpace + size > this.diskSize) {
        console.log(`Insufficient disk space to allocate file '${name}'.`);
        return;
      }
  
      let currentNode = this.head;
      while (currentNode) {
        if (currentNode.next === null) {
          const newStart = currentNode.end + 1;
          const newEnd = newStart + size - 1;
          if (newEnd > this.diskSize - 1) {
            console.log(`Insufficient disk space to allocate file '${name}'.`);
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
  
      console.log(`Insufficient disk space to allocate file '${name}'.`);
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
  

  const diskSize = 50; 
  const fileList = new LinkedList(diskSize);
  
  fileList.insertFile("file1.txt", 10);
  fileList.insertFile("file2.txt", 20);
  fileList.insertFile("file3.txt", 15);
  
  fileList.displayFiles();
  
  fileList.allocateFile("file4.txt", 12);
  fileList.allocateFile("file2.txt", 20);
  fileList.allocateFile("file5.txt", 25); 

  fileList.displayFiles();
  