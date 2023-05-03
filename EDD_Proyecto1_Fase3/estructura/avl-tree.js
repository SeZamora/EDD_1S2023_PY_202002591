
class AvlNode{
    constructor(item, arbol){
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.arbolnario = arbol;
    }
}


let = nodes = "";
let = connections = "";


class AvlTree{

    

    constructor(){
        this.root = null;
    }

    insert(item){
        this.root = this.#insertRecursive(item, this.root);
    }

    getHeight(node){
        if (node === null) {
            return -1;
          } else {
            return node.height;
          }
    }
    
    getMaxHeight(leftNode, rightNode){
        if (leftNode > rightNode) {
            return leftNode;
          } else {
            return rightNode;
          }
    }

    #insertRecursive(item, node){
        if(node == null){
            let arbolnario = new NarioTree();
            var node12 = new AvlNode(item, arbolnario);
            return node12;
            
        }
        if(item.carnet < node.item.carnet){
            node.left = this.#insertRecursive(item, node.left);
            
        }else if(item.carnet > node.item.carnet){
            node.right = this.#insertRecursive(item, node.right);
           
        }else{
            alert("Elemento ya existe en el árbol");
        }

        switch ((this.getHeight(node.right) - this.getHeight(node.left))) {
            case 2:
                if(item.carnet > node.right.item.carnet){
                    node = this.#rotatederecha(node);
                }else{
                    node = this.#doublederecha(node);
                }
               break;
            case -2:
                if(item.carnet < node.left.item.carnet){
                    node = this.#rotateizquierda(node);
                }else{
                    node = this.#doubleizquierda(node);
                }
               break;
            default:
               node.height = this.getMaxHeight(this.getHeight(node.left), this.getHeight(node.right)) + 1;
        }

        return node;
    }

    #rotatederecha(node1) {
        if (node1 && node1.right != null) {
        let node2 = node1.right;
    
          // Actualizar enlace derecho de node1
          node1.right = node2.left;
          // Actualizar enlace izquierdo de node2
          node2.left = node1;
         // Actualizar altura de node1
        node1.height = this.getMaxHeight(this.getHeight(node1.left), this.getHeight(node1.right)) + 1;
        // Actualizar altura de node2
        node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
          // Retornar el nuevo nodo raíz de la subárbol rotado
       
          return node2;
        }return node1
      }
    
    #rotateizquierda(node2){
        
        if (node2 && node2.left != null) {
            let node1 = node2.left;
        console.log("nodo aux1: ",node1.item);
            node2.left = node1.right;
            node1.right = node2;
            node2.height = this.getMaxHeight(this.getHeight(node2.left), this.getHeight(node2.right)) + 1;
           // Actualizar altura de node1
            node1.height = this.getMaxHeight(this.getHeight(node1.left), this.getHeight(node1.right)) + 1;
            // Actualizar altura de node2

          
            return node1;
        }
        return node2
        
    }

    #doubleizquierda(node){
       
        node.right = this.#rotatederecha(node.right);
        
        return this.#rotateizquierda(node);
    }
    #doublederecha(node){
       
        node.left = this.#rotateizquierda(node.left);
       
        return this.#rotatederecha(node);
    }

    treeGraph(){       
        nodes = "";
        connections = "";
        this.#treeGraphRecursive(this.root);
        console.log("hola", nodes,connections);
        return nodes + connections;
    }
    #treeGraphRecursive(current){
        if(current.left != null){
            this.#treeGraphRecursive(current.left);
            connections += `S_${current.item.carnet} -> S_${current.left.item.carnet};\n`;
        }
        nodes += `S_${current.item.carnet}[label="${current.item.carnet+ "\\n"+ current.item.nombre + "\\n Altura: "+current.height}"];`
        if(current.right != null){
            this.#treeGraphRecursive(current.right);
            connections += `S_${current.item.carnet} -> S_${current.right.item.carnet};\n`;
        }
    }
    
    inOrder(){
        console.log("InOrder");
        const tablaH = [];
   
       
        this.#inOrderRecursive(this.root, tablaH);
        return tablaH;
        
    }
    #inOrderRecursive(current, tablaH){
    
        if(current.left != null){
            this.#inOrderRecursive(current.left, tablaH);
        }
        tablaH.push({ carnet: current.item.carnet, nombre: current.item.nombre, password: current.item.password });
        
        if(current.right != null){
            this.#inOrderRecursive(current.right, tablaH);
        }
        
    }

   

    search(carnet, password){
        let current = this.root;
        while(current != null){
            if(current.item.carnet == carnet && current.item.password == password){
                return current;
            }else if(carnet < current.item.carnet){
                current = current.left;
            }else{
                current = current.right;
            }
        }
        return null;
    }
    

}