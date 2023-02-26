package doble

import "EDD_PROYECTO1_FASE1/pila"

type NodeDoble struct {
	Nombre   string
	Carnet   int
	Password string
	Pila     *pila.Pila
	Next     *NodeDoble
	Prev     *NodeDoble
}

func (n *NodeDoble) GetNombre() string {
	return n.Nombre
}

func (n *NodeDoble) GetCarnet() int {
	return n.Carnet
}

func (n *NodeDoble) GetPassword() string {
	return n.Password
}
