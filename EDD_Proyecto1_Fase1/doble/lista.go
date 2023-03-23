package doble

import (
	"EDD_PROYECTO1_FASE1/pila"
	"fmt"
	"os"
	"os/exec"
	"strconv"
)

type ListaDoble struct {
	head *NodeDoble
	tail *NodeDoble
}

func (lista *ListaDoble) Insertar(nombre string, carnet int, password string) {
	inserta := &pila.Pila{}
	newNode := &NodeDoble{Nombre: nombre, Carnet: carnet, Password: password, Pila: inserta, Prev: nil, Next: nil}
	// Verificar que la lista está vacía
	if lista.head == nil {
		lista.head = newNode
		lista.tail = newNode
	} else if lista.head.Carnet >= carnet {
		// Insertar en la cabeza de la lista
		newNode.Next = lista.head
		lista.head.Prev = newNode
		lista.head = newNode
	} else {
		// Encontrar la posición correcta para insertar el nuevo nodo
		currentNode := lista.head
		for currentNode.Next != nil && currentNode.Next.Carnet < carnet {
			currentNode = currentNode.Next
		}
		// Insertar el nuevo nodo después de currentNode
		newNode.Next = currentNode.Next
		newNode.Prev = currentNode
		if currentNode.Next != nil {
			currentNode.Next.Prev = newNode
		} else {
			lista.tail = newNode
		}
		currentNode.Next = newNode
	}
}

// IMPRIMIR
func (lista *ListaDoble) Print() {
	temp := lista.head
	for temp.Next != nil {
		fmt.Printf("*  Nombre: %s , Carnet: %d  *\n", temp.GetNombre(), temp.GetCarnet())
		fmt.Println("***********************************************************************************")
		temp = temp.Next
	}
	fmt.Printf("*  Nombre: %s , Carnet: %d   *\n", temp.GetNombre(), temp.GetCarnet())
}

// Buscar
func (lista *ListaDoble) Buscar(carnet int, password string) *NodeDoble {
	temp := lista.head
	for temp != nil {
		if temp.Carnet == carnet && temp.Password == password {
			return temp
		}
		temp = temp.Next
	}
	return nil
}

func (lista *ListaDoble) Graph() {

	for lista.head == nil {
		fmt.Println("La Lista esta vacia")
		return
	}

	texto := "digraph lista{\n"
	texto += "\trankdir=\"LR\";\n"
	texto += "\tedge [arrowhead=vee];\n\tnode [shape=record,height=0.6];\n"

	temp := lista.head
	aux := lista.head
	i := 0

	for temp != nil {
		texto += "\tnodo" + strconv.Itoa(i) + "[label=\"" + strconv.Itoa(temp.Carnet) + "\\n" + temp.Nombre + "\"];\n"

		if temp.Pila != nil {
			pila := temp.Pila.Pila_Estudiantes(i)
			texto += pila
		}
		i += 1
		temp = temp.Next

	}
	j := 0
	for aux.Next != nil {
		texto += "\tnodo" + strconv.Itoa(j) + "-> nodo" + strconv.Itoa(j+1) + ";\n"
		texto += "\tnodo" + strconv.Itoa(j+1) + "-> nodo" + strconv.Itoa(j) + ";\n"
		j += 1
		aux = aux.Next
	}

	texto += "}"

	// Crear archivo
	f, err := os.Create("./reportes/lista.dot")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()

	_, err = f.WriteString(texto)
	if err != nil {
		fmt.Println(err)
		return
	}
	f.Sync()

	// Crear imagen
	cmd := exec.Command("dot", "-Tpng", "./reportes/lista.dot", "-o", "./reportes/lista.png")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("La imagen se ha creado con éxito")

}

func (lista *ListaDoble) ExportarJSON() {
	// Crear un slice para guardar los nodos como mapas

	// Recorrer la lista doble y guardar la información de cada nodo como mapa
	temp := lista.head
	texto := "{\n\t\"alumnos\": [\n"
	for temp != nil {
		texto += "\t\t{\n\t\t\t\"nombre\": \"" + temp.Nombre + "\",\n"
		texto += "\t\t\t\"carnet\": \"" + strconv.Itoa(temp.Carnet) + "\",\n"
		texto += "\t\t\t\"password\": \"" + temp.Password + "\",\n"

		if temp.Next != nil {
			texto += "\t\t\t\"Carpeta_Raiz\": \"" + "/" + "\"\n\t\t},\n"
		} else {
			texto += "\t\t\t\"Carpeta_Raiz\": \"" + "/" + "\"\n\t\t}\n"
		}
		temp = temp.Next
	}
	texto += "\t]\n}"

	// Crear archivo
	f, err := os.Create("./reportes/alumnos.json")
	if err != nil {
		fmt.Println(err)
		return
	}
	defer f.Close()
	_, err = f.WriteString(texto)
	if err != nil {
		fmt.Println(err)
		return
	}
	f.Sync()

}
