class NodoC {
    constructor(accion, nombre, fecha, hora) {
      this.accion = accion;
      this.nombre = nombre;
      this.fecha = fecha;
      this.hora = hora;
      this.next = null;
    }
  }
  
class ListaCircular{
    constructor() {
      this.root = new NodoC("root","root",null,null);
      this.root.next = this.root;
      this.root.prev = this.root;
      this.size = 0;
    }
  
    agregar(accion, nombre, fecha, hora) {
      let newNode = new NodoC(accion, nombre, fecha, hora);
  
      newNode.next = this.root;
      newNode.prev = this.root.prev;
      this.root.prev.next = newNode;
      this.root.prev = newNode;
      this.size++;
    }
  

    graph() {
      let graph = "";
      let currentNode = this.root.prev;
      while (currentNode !== this.root) {
        console.log(currentNode.nombre);
        graph += `  "${currentNode.nombre}" [label="${currentNode.accion} \\n ${currentNode.nombre} \\n ${currentNode.fecha} \\n ${currentNode.hora}"] \n `;
        currentNode = currentNode.prev;
        if (currentNode.nombre == undefined){
          break;
        }
      }
      graph += `  "${this.root.nombre}" [label="${this.root.nombre} "] \n`;

      let currentNode2 = this.root.prev;
      while (currentNode2 !== this.root) {
        graph += `  ${currentNode2.nombre} -> ${currentNode2.prev.nombre}\n`;
        currentNode2 = currentNode2.prev;
        if (currentNode2.nombre == undefined){
          break;
        }
      }
      graph += `  ${this.root.nombre} -> ${this.root.prev.nombre}\n`;
      graph += `  undefined -> root\n`
      console.log(graph);
      return 'node[shape="record"];\n' + graph;
    }
      
  }