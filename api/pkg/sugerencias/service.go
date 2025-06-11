package sugerencias

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
)

const sugerenciasFile = "data/sugerencia.json"

func leerSugerencias() (map[string]interface{}, error) {
	absPath, err := filepath.Abs(sugerenciasFile)
	if err != nil {
		return nil, err
	}
	file, err := os.ReadFile(absPath)
	if err != nil {
		return nil, err
	}
	var sugerencias map[string]interface{}
	err = json.Unmarshal(file, &sugerencias)
	if err != nil {
		return nil, err
	}
	return sugerencias, nil
}

// Listar todos los consejos
func ListarConsejos(w http.ResponseWriter, r *http.Request) {
	sugerencias, err := leerSugerencias()
	if err != nil {
		http.Error(w, "Error al leer sugerencias", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{"sugerencias": sugerencias, "status": 200})
}

// Listar consejos por edad y categoría
func ListarConsejosPorEdadYCategoria(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Edad      string `json:"edad"`
		Categoria string `json:"categoria"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	sugerencias, err := leerSugerencias()
	if err != nil {
		http.Error(w, "Error al leer sugerencias", http.StatusInternalServerError)
		return
	}
	// sugerencias["sugerencia"] es un map[string]interface{} de edades
	edades, ok := sugerencias["sugerencia"].(map[string]interface{})
	if !ok {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Estructura de sugerencias inválida", "status": 500})
		return
	}
	catMap, ok := edades[req.Edad].(map[string]interface{})
	if !ok {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Edad no encontrada", "status": 404})
		return
	}
	consejos, ok := catMap[req.Categoria]
	if !ok {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Categoría no encontrada", "status": 404})
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"consejos": consejos, "status": 200})
}

// Listar consejos por edad
func ListarConsejosPorEdad(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Edad string `json:"edad"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	sugerencias, err := leerSugerencias()
	if err != nil {
		http.Error(w, "Error al leer sugerencias", http.StatusInternalServerError)
		return
	}
	edades, ok := sugerencias["sugerencia"].(map[string]interface{})
	if !ok {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Estructura de sugerencias inválida", "status": 500})
		return
	}
	catMap, ok := edades[req.Edad].(map[string]interface{})
	if !ok {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Edad no encontrada", "status": 404})
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"consejos": catMap, "status": 200})
}
