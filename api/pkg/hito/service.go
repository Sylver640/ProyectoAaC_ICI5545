package hito

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Hitos por intervalo
type Hitos struct {
	PrimerIntervalo  []string `json:"0-6 meses"`
	SegundoIntervalo []string `json:"7-12 meses"`
	TercerIntervalo  []string `json:"13-23 meses"`
	CuartoInteralo   []string `json:"2-5 años"`
	QuintoIntervalo  []string `json:"6-10 años"`
}

// Contenido con los hitos
type HitosArray struct {
	Contenido Hitos `json:"hitos"`
}

// Input del handler
type Input struct {
	Contenido string `json:"hito"`
}

// Leer el archivo json
func cargarContactos() (*HitosArray, error) {
	// Obtiene la ruta del archivo
	ruta, err := filepath.Abs("data/hitos.json")
	if err != nil {
		fmt.Println("Error al obtener la ruta del archivo:", err)
		return nil, err
	}

	// Lee el contenido
	contenido, err := os.ReadFile(ruta)
	if err != nil {
		fmt.Println("Error al leer el archivo:", err)
		return nil, err
	}

	// Obtiene los hitos
	var hitos HitosArray
	err = json.Unmarshal(contenido, &hitos)
	if err != nil {
		fmt.Println("Error al deserializar el archivo:", err)
		return nil, err
	}

	return &hitos, nil
}

// Handler de contactos que usara la API
func HandlerHitos(w http.ResponseWriter, r *http.Request) {

	// Verificar que se recibio un body valido
	var input Input
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		fmt.Println("Input invalido")
		http.Error(w, "Input JSON inválido", http.StatusBadRequest)
		return
	}

	log.Println("Valor del hito:", input.Contenido)

	// Cargar los hitos
	hitos, err := cargarContactos()
	if err != nil {
		fmt.Println("Error al cargar los contactos:", err)
		http.Error(w, "Error al cargar los contactos", http.StatusInternalServerError)
		return
	}

	var respuesta []string
	switch input.Contenido {
	case "0-6 meses":
		respuesta = hitos.Contenido.PrimerIntervalo
	case "7-12 meses":
		respuesta = hitos.Contenido.SegundoIntervalo
	case "13-23 meses":
		respuesta = hitos.Contenido.TercerIntervalo
	case "2-5 años":
		respuesta = hitos.Contenido.CuartoInteralo
	case "6-10 años":
		respuesta = hitos.Contenido.QuintoIntervalo
	default:
		http.Error(w, "Hito no válido", http.StatusBadRequest)
		return
	}

	// Establece el header
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Codifica el slice con contactos a JSON
	err = json.NewEncoder(w).Encode(respuesta)
	if err != nil {
		fmt.Println("Error al codificar los contactos:", err)
		http.Error(w, "Error al codificar los contactos", http.StatusInternalServerError)
		return
	}
}
