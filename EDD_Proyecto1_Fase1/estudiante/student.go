package estudiante

import "fmt"

type Student struct {
	Nombre   string
	Carnet   int
	Password string
}

func (s *Student) Print() {
	fmt.Println("________________________________________________")
	fmt.Printf("Carnet: %d\n", s.Carnet)
	fmt.Printf("Nombre: %s\n", s.Nombre)
}
