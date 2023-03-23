package cola

import (
	"EDD_PROYECTO1_FASE1/estudiante"
	"fmt"
	"os"
	"os/exec"
	"strconv"
)

var contador int

type Cola struct {
	head *NodeCola
	Size int
}

func (cola *Cola) Encolar(nombre string, carnet int, password string) {
	nstd := &estudiante.Student{Nombre: nombre, Carnet: carnet, Password: password}
	//Declarar nuevo nodo
	newNode := &NodeCola{Student: nstd, Next: nil}
	contador += 1
	//Verificar si la lista está vacía
	if cola.head == nil {
		cola.head = newNode
	} else {
		//Recorrer hasta encontrar el último nodo
		temp := cola.head
		for temp.Next != nil {
			temp = temp.Next
		}
		//Agregar el nuevo nodo hasta el final
		temp.Next = newNode
		cola.Size += 1
	}
}

func (cola *Cola) Desencolar() (*estudiante.Student, int) {
	if cola.head == nil {

		return nil, -1
	} else {
		// Tomar valor de la
		temp := cola.head
		// Eliminar de la Pila
		cola.head = cola.head.Next
		cola.Size -= 1
		contador -= 1
		// Retornar Estudiante
		return temp.Student, contador
	}
}

func (cola *Cola) Print() {
	temp := cola.head
	for temp != nil {
		temp.Student.Print()
		temp = temp.Next
	}
}

func (cola *Cola) IsEmpty() bool {
	return cola.head == nil
}

func (cola *Cola) Sumar() {
	contador += 1
}

func (cola *Cola) Graph() {

	if cola.head == nil {
		fmt.Println("La cola está vacía")
		return
	}

	texto := "digraph cola{\n"
	texto += "\trankdir=\"LR\";\n"

	temp := cola.head
	aux := cola.head
	i := 0
	for temp != nil {
		texto += "\tnodo" + strconv.Itoa(i) + "[label=\"" + temp.Student.Nombre + " " + strconv.Itoa(temp.Student.Carnet) + "\"];\n"
		i += 1
		fmt.Println("entre 1")
		temp = temp.Next
	}

	j := 0
	for aux.Next != nil {
		texto += "\tnodo" + strconv.Itoa(j) + "->nodo" + strconv.Itoa(j+1) + ";\n"
		j += 1
		fmt.Println("entre 2")
		aux = aux.Next
	}
	texto += "}\n"
	fmt.Println("pase")
	// Crear archivo
	f, err := os.Create("./reportes/cola.dot")
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
	cmd := exec.Command("dot", "-Tpng", "./reportes/cola.dot", "-o", "./reportes/cola.png")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("La imagen se ha creado con éxito")

}
