package contacto

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Contactos dentro del json
type Contacto struct {
	Nombre      string `json:"nombre"`
	Telefono    string `json:"telefono"`
	Descripcion string `json:"descripcion"`
}

// Leer el archivo json
func cargarContactos() ([]Contacto, error) {
	// Obtiene la ruta del archivo
	ruta, err := filepath.Abs("../data/contacto.json")
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
	var contactos []Contacto
	err = json.Unmarshal(contenido, &contactos)
	if err != nil {
		log.Fatalln("Error al deserializar el archivo:", err)
		return nil, err
	}

	return contactos, nil
}

// Handler de contactos que usara la API
func HandlerContactos(w http.ResponseWriter, r *http.Request) {
	contactos, err := cargarContactos()
	if err != nil {
		log.Fatalln("Error al cargar los contactos:", err)
		http.Error(w, "Error al cargar los contactos", http.StatusInternalServerError)
		return
	}

	// Establece el header
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Codifica el slice con contactos a JSON
	err = json.NewEncoder(w).Encode(contactos)
	if err != nil {
		log.Fatalln("Error al codificar los contactos:", err)
		http.Error(w, "Error al codificar los contactos", http.StatusInternalServerError)
		return
	}
}
