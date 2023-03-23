package main

import (
	"EDD_PROYECTO1_FASE1/cola"
	"EDD_PROYECTO1_FASE1/doble"
	"EDD_PROYECTO1_FASE1/pila"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"
)

func main() {
	//var carnet int
	//var nombre string
	//var contrasena string
	crear := &cola.Cola{Size: 1}
	doble := &doble.ListaDoble{}
	pil := &pila.Pila{}

	var menu_prin int
	var usuario2 string
	var contrasena string
	i := true
	for i == true {
		fmt.Println("***********EDD GoDrive***********")
		fmt.Println("*          1.Iniciar Sesion     *")
		fmt.Println("*          2. Salir             *")
		fmt.Println("*********************************")
		fmt.Print("   Seleccionar: ")
		fmt.Scanln(&menu_prin)
		if menu_prin == 1 {
			fmt.Println("Ingrese su usuario: ")
			fmt.Scanln(&usuario2)

			usuario, err2 := strconv.Atoi(usuario2)
			if err2 != nil {
				fmt.Println("")
			} else {
				fmt.Println("")
			}
			fmt.Println("Ingrese la contraseña")
			fmt.Scanln(&contrasena)
			if usuario2 == "admin" && contrasena == "admin" {
				administrador(crear, doble, pil)
			} else if doble.Buscar(usuario, contrasena) != nil {
				temp := doble.Buscar(usuario, contrasena)
				temp.Pila.Push(formato_hora(), "Ingreso Usuario")
				println("-------------------")
				temp.Pila.Peek()
			}
		} else if menu_prin == 2 {
			break
		} else {
			println("Accion invalida")
		}
	}

}

func administrador(cola *cola.Cola, lista *doble.ListaDoble, p *pila.Pila) {
	var menu_admin int
	var nombre string
	var apellido string
	var carnet int
	var password string
	var pendientes int
	var entrada string
	var leer string
	var nombre_entero string

	for menu_admin != 6 {
		pendientes = 0
		fmt.Println("******Dashboard Aadministrador - EDD GoDrive*********")
		fmt.Println("*           1.Ver Estudiantes pendientes            *")
		fmt.Println("*           2.Ver Estudiantes del Sistema           *")
		fmt.Println("*           3.Registrar Nuevo estudiante            *")
		fmt.Println("*           4.Carga Masiva Estudiante               *")
		fmt.Println("*           5.Ver reportes                          *")
		fmt.Println("*           6.Salir                                 *")
		fmt.Println("*****************************************************")
		fmt.Print("   Seleccionar: ")
		fmt.Scanln(&menu_admin)
		if menu_admin == 1 {
			fmt.Println("**********Estudiantes Pendientes**********")
			fmt.Println("")
			for pendientes != 3 {
				if !cola.IsEmpty() {
					temp, size := cola.Desencolar()
					fmt.Printf("**********Pendientes : %d", size)
					fmt.Print("**********\n")
					fmt.Printf("*Estuante Actual : %s \n", temp.Nombre)
					fmt.Println("*    1. Aceptar         *")
					fmt.Println("*    2. Rechazar        *")
					fmt.Println("*    3. Regresar        *")
					fmt.Print("Elige una opcion: ")
					fmt.Scanln(&pendientes)
					if pendientes == 1 {
						lista.Insertar(temp.Nombre, temp.Carnet, temp.Password)
						fmt.Println("Estudiante Aceptado")
						p.Push(formato_hora(), "Se acepto estuadiante")
					} else if pendientes == 2 {
						fmt.Println("Estudiante Rechazado")
						p.Push(formato_hora(), "Se Rechazo estuadiante")
					} else if pendientes == 3 {
						cola.Encolar(temp.Nombre, temp.Carnet, temp.Password)
					}

				} else {
					pendientes = 3
					fmt.Println("Ya no hay estudiantes pendientes")
				}
			}
		} else if menu_admin == 2 {
			fmt.Println("**************Lista Estudiantes***************")
			lista.Print()
		} else if menu_admin == 3 {
			fmt.Print("Ingrese su nombre: ")
			fmt.Scanln(&nombre)
			fmt.Print("Ingrese su apellido: ")
			fmt.Scanln(&apellido)
			fmt.Print("Ingrese su carnet: ")
			fmt.Scanln(&carnet)
			fmt.Print("Ingrese su contraseña: ")
			fmt.Scanln(&password)
			nombre_entero = nombre + " " + apellido
			cola.Encolar(nombre_entero, carnet, password)
		} else if menu_admin == 4 {
			fmt.Println("Ingrese el nombre del archivo de lectura: ")
			fmt.Scanln(&entrada)
			leer = "./" + entrada
			file, err := os.Open(leer)
			if err != nil {
				fmt.Println("Error al abrir el archivo:", err)
				return
			}
			defer file.Close()
			reader := csv.NewReader(file)
			rows, err := reader.ReadAll()
			if err != nil {
				fmt.Println("Error al leer el archivo CSV:", err)
				return
			}
			for _, row := range rows {
				// Leer los datos de cada columna
				carnet := row[0]
				nombre := row[1]
				contraseña := row[2]
				if carnet != "carnet" {
					i, err := strconv.Atoi(carnet)
					if err != nil {
						fmt.Println("Error:", err)
					} else {
						cola.Encolar(nombre, i, contraseña)
					}
				}

			}

		} else if menu_admin == 5 {
			cola.Graph()
			p.Graph()
			lista.Graph()
			lista.ExportarJSON()
		}
	}

}

func formato_hora() string {

	tiempo := time.Now()
	dia := tiempo.Day()
	mes := int(tiempo.Month())
	anio := tiempo.Year()
	hora := tiempo.Hour()
	minuto := tiempo.Minute()
	segundo := tiempo.Second()

	texto_final := fmt.Sprintf("%02d/%02d/%d %02d:%02d:%02d", dia, mes, anio, hora, minuto, segundo)
	return texto_final

}
