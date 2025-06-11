package actividades

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type Actividad struct {
	IDActividad       string `json:"idactividad"`
	Titulo            string `json:"titulo"`
	Tipo              string `json:"tipo"`
	Fecha             string `json:"fecha"`
	RangoInicio       string `json:"rango_inicio"`
	RangoFinal        string `json:"rango_final"`
	Locacion          string `json:"locación"`
	Recordatorio      string `json:"recordatorio"`
	FechaRecordatorio string `json:"fecha_recordatorio"`
	EstaCompletada    int    `json:"esta_completada"`
	IDInfante         string `json:"idInfante"`
}

const actividadesFile = "data/actividades.json"

func leerActividades() ([]Actividad, error) {
	absPath, err := filepath.Abs(actividadesFile)
	if err != nil {
		return nil, err
	}
	if _, err := os.Stat(absPath); os.IsNotExist(err) {
		return []Actividad{}, nil
	}
	file, err := os.ReadFile(absPath)
	if err != nil {
		return nil, err
	}
	if len(file) == 0 {
		return []Actividad{}, nil
	}
	var actividades []Actividad
	err = json.Unmarshal(file, &actividades)
	if err != nil {
		return nil, err
	}
	return actividades, nil
}

func guardarActividades(actividades []Actividad) error {
	absPath, err := filepath.Abs(actividadesFile)
	if err != nil {
		return err
	}
	data, err := json.MarshalIndent(actividades, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(absPath, data, 0644)
}

// Listar actividades del usuario para el próximo año
func ListarActividades(w http.ResponseWriter, r *http.Request) {
	var req struct {
		IDInfante string `json:"idInfante"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	actividades, err := leerActividades()
	if err != nil {
		http.Error(w, "Error al leer actividades", http.StatusInternalServerError)
		return
	}
	ahora := time.Now()
	limite := ahora.AddDate(1, 0, 0)
	var resultado []Actividad
	for _, act := range actividades {
		if act.IDInfante == req.IDInfante {
			fecha, _ := time.Parse("02-01-2006", act.Fecha)
			rangoInicio, _ := time.Parse("02-01-2006", act.RangoInicio)
			if (fecha.After(ahora) && fecha.Before(limite)) || (rangoInicio.After(ahora) && rangoInicio.Before(limite)) {
				resultado = append(resultado, act)
			}
		}
	}
	w.Header().Set("Content-Type", "application/json")
	if len(resultado) == 0 {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "No se encontraron actividades", "status": 404})
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"actividades": resultado, "status": 200})
}

// Crear actividad personalizada
func CrearActividad(w http.ResponseWriter, r *http.Request) {
	var act Actividad
	if err := json.NewDecoder(r.Body).Decode(&act); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	act.EstaCompletada = 0
	actividades, err := leerActividades()
	if err != nil {
		http.Error(w, "Error al leer actividades", http.StatusInternalServerError)
		return
	}
	actividades = append(actividades, act)
	if err := guardarActividades(actividades); err != nil {
		http.Error(w, "Error al guardar actividad", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"mensaje": "Actividad creada", "status": 200})
}

// Editar actividad personalizada
func EditarActividad(w http.ResponseWriter, r *http.Request) {
	var req Actividad
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	actividades, err := leerActividades()
	if err != nil {
		http.Error(w, "Error al leer actividades", http.StatusInternalServerError)
		return
	}
	encontrado := false
	for i, act := range actividades {
		if act.IDActividad == req.IDActividad {
			if req.Titulo != "" {
				actividades[i].Titulo = req.Titulo
			}
			if req.Tipo != "" {
				actividades[i].Tipo = req.Tipo
			}
			if req.Fecha != "" {
				actividades[i].Fecha = req.Fecha
			}
			if req.RangoInicio != "" {
				actividades[i].RangoInicio = req.RangoInicio
			}
			if req.RangoFinal != "" {
				actividades[i].RangoFinal = req.RangoFinal
			}
			if req.Locacion != "" {
				actividades[i].Locacion = req.Locacion
			}
			if req.Recordatorio != "" {
				actividades[i].Recordatorio = req.Recordatorio
			}
			if req.FechaRecordatorio != "" {
				actividades[i].FechaRecordatorio = req.FechaRecordatorio
			}
			encontrado = true
			break
		}
	}
	if !encontrado {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Actividad no encontrada", "status": 404})
		return
	}
	if err := guardarActividades(actividades); err != nil {
		http.Error(w, "Error al guardar actividad", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"mensaje": "Actividad actualizada", "status": 200})
}

// Eliminar actividad personalizada
func EliminarActividad(w http.ResponseWriter, r *http.Request) {
	var req struct {
		IDActividad string `json:"idActividad"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	actividades, err := leerActividades()
	if err != nil {
		http.Error(w, "Error al leer actividades", http.StatusInternalServerError)
		return
	}
	nuevasActividades := make([]Actividad, 0)
	encontrado := false
	for _, act := range actividades {
		if act.IDActividad == req.IDActividad {
			encontrado = true
			continue
		}
		nuevasActividades = append(nuevasActividades, act)
	}
	if !encontrado {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Actividad no encontrada", "status": 404})
		return
	}
	if err := guardarActividades(nuevasActividades); err != nil {
		http.Error(w, "Error al eliminar actividad", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"mensaje": "Actividad eliminada", "status": 200})
}

// Marcar actividad como completada
func MarcarCompletada(w http.ResponseWriter, r *http.Request) {
	var req struct {
		IDActividad string `json:"idActividad"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	actividades, err := leerActividades()
	if err != nil {
		http.Error(w, "Error al leer actividades", http.StatusInternalServerError)
		return
	}
	encontrado := false
	for i, act := range actividades {
		if act.IDActividad == req.IDActividad {
			actividades[i].EstaCompletada = 1
			encontrado = true
			break
		}
	}
	if !encontrado {
		json.NewEncoder(w).Encode(map[string]interface{}{"error": "Actividad no encontrada", "status": 404})
		return
	}
	if err := guardarActividades(actividades); err != nil {
		http.Error(w, "Error al guardar actividad", http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(map[string]interface{}{"mensaje": "Actividad marcada como completada", "status": 200})
}
