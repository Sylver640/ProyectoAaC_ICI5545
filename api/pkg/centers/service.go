package centers

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type Centro struct {
	Nombre    string      `json:"nombre"`
	Direccion string      `json:"direccion"`
	Horario   string      `json:"horario"`
	Telefono  PhoneNumber `json:"telefono"`
}

type PhoneNumber struct {
	Numero               string `json:"numero"`
	Horario              string `json:"horario"`
	Poblacion_preferente string `json:"poblacion_preferente"`
}

// Leer el archivo json
func cargarCentros() ([]Centro, error) {
	// Obtiene la ruta del archivo
	ruta, err := filepath.Abs("../data/centros.json")
	if err != nil {
		log.Fatalln("Error al obtener la ruta del archivo:", err)
		return nil, err
	}

	// Lee el contenido
	contenido, err := os.ReadFile(ruta)
	if err != nil {
		log.Fatalln("Error al leer el archivo:", err)
		return nil, err
	}

	// Obtiene los contactos
	var centros []Centro
	err = json.Unmarshal(contenido, &centros)
	if err != nil {
		log.Fatalln("Error al deserializar el archivo:", err)
		return nil, err
	}

	return centros, nil
}

// Handler de centros que usara la API
func HandlerCentros(w http.ResponseWriter, r *http.Request) {
	centros, err := cargarCentros()
	if err != nil {
		log.Fatalln("Error al cargar los centros:", err)
		http.Error(w, "Error al cargar los centros", http.StatusInternalServerError)
		return
	}

	// Establece el header
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Codifica el slice con centros a JSON
	err = json.NewEncoder(w).Encode(centros)
	if err != nil {
		log.Fatalln("Error al codificar los centros:", err)
		http.Error(w, "Error al codificar los centros", http.StatusInternalServerError)
		return
	}
}
