package pila

import (
	"fmt"
	"os"
	"os/exec"
	"strconv"
)

type Pila struct {
	Primero  *NodeStack
	Longitud int
}

func (p *Pila) estaVacia() bool {
	if p.Longitud == 0 {
		return true
	} else {
		return false
	}
}

func (p *Pila) Push(hora string, accion string) {
	if p.estaVacia() {
		nuevoNodo := &NodeStack{hora, accion, nil}
		p.Primero = nuevoNodo
		p.Longitud++
	} else {
		nuevoNodo := &NodeStack{hora, accion, p.Primero}
		p.Primero = nuevoNodo
		p.Longitud++
	}
}

func (p *Pila) Peek() {
	if p.estaVacia() {
		fmt.Println("La pila no tiene elementos")
	} else {
		temp := p.Primero
		for temp != nil {
			fmt.Println(temp.Hora, temp.Accion)
			temp = temp.Next
		}
	}
}

func (p *Pila) Graph() {

	if p.Primero == nil {
		fmt.Println("La pila está vacía")
		return
	}

	texto := "digraph pila{\n"
	texto += "\trankdir=\"LR\";\n"

	temp := p.Primero
	texto += "\tnode[shape = record]\n"
	texto += "\tnodo0 [label=\""

	for temp != nil {
		texto += "\t|" + temp.Accion + "\\n" + temp.Hora
		temp = temp.Next
	}
	texto += "\t\"];\n}"
	// Crear archivo
	f, err := os.Create("./reportes/pila.dot")
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
	cmd := exec.Command("dot", "-Tpng", "./reportes/pila.dot", "-o", "./reportes/pila.png")
	err = cmd.Run()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("La imagen se ha creado con éxito")

}

func (p *Pila) Pila_Estudiantes(num int) string {
	if p.Primero == nil {
		return ""
	}
	temp := p.Primero

	texto := "\tpila" + strconv.Itoa(num) + " [label=\""

	for temp != nil {
		texto += "|" + temp.Accion + "\\n" + temp.Hora
		temp = temp.Next
	}
	texto += "\"];\n"
	texto += "\tnodo" + strconv.Itoa(num) + " -> pila" + strconv.Itoa(num) + "\n"
	return texto
}
