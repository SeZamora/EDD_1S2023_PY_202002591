package cola

import "EDD_PROYECTO1_FASE1/estudiante"

type NodeCola struct {
	Student *estudiante.Student
	Next    *NodeCola
}
