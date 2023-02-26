package pila

type NodeStack struct {
	Hora   string
	Accion string
	Next   *NodeStack
}
