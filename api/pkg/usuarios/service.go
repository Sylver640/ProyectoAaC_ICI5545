package usuarios

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type Usuario struct {
	ID              string `json:"id"`
	Nombre          string `json:"nombre"`
	FechaNacimiento string `json:"fecha_nacimiento"`
	Genero          string `json:"genero"`
}

const usuariosFile = "data/usuarios.json"

// Utilidad para leer todos los usuarios
func leerUsuarios() ([]Usuario, error) {
	absPath, err := filepath.Abs(usuariosFile)
	if err != nil {
		return nil, err
	}
	if _, err := os.Stat(absPath); os.IsNotExist(err) {
		return []Usuario{}, nil
	}
	file, err := os.ReadFile(absPath)
	if err != nil {
		return nil, err
	}
	if len(file) == 0 {
		return []Usuario{}, nil
	}
	var usuarios []Usuario
	err = json.Unmarshal(file, &usuarios)
	if err != nil {
		return nil, err
	}
	return usuarios, nil
}

// Utilidad para guardar todos los usuarios
func guardarUsuarios(usuarios []Usuario) error {
	absPath, err := filepath.Abs(usuariosFile)
	if err != nil {
		return err
	}
	data, err := json.MarshalIndent(usuarios, "", "  ")
	if err != nil {
		return err
	}
	return os.WriteFile(absPath, data, 0644)
}

// Generar ID único
func generarID(nombre, fechaNacimiento string) string {
	t := time.Now().Format("02:01:2006:15:04:05")
	base := t + nombre + fechaNacimiento
	hash := sha256.Sum256([]byte(base))
	return hex.EncodeToString(hash[:])
}

// 1. Crear usuario (POST)
func CrearUsuario(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Nombre          string `json:"nombre"`
		FechaNacimiento string `json:"fecha_nacimiento"`
		Genero          string `json:"genero"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	id := generarID(req.Nombre, req.FechaNacimiento)
	usuario := Usuario{
		ID:              id,
		Nombre:          req.Nombre,
		FechaNacimiento: req.FechaNacimiento,
		Genero:          req.Genero,
	}
	usuarios, err := leerUsuarios()
	if err != nil {
		http.Error(w, "Error al leer usuarios", http.StatusInternalServerError)
		return
	}
	usuarios = append(usuarios, usuario)
	if err := guardarUsuarios(usuarios); err != nil {
		http.Error(w, "Error al guardar usuario", http.StatusInternalServerError)
		return
	}
	resp := map[string]interface{}{"id": id, "status": 200}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// 2. Listar todos los usuarios (POST)
func ListarUsuarios(w http.ResponseWriter, r *http.Request) {
	usuarios, err := leerUsuarios()
	if err != nil {
		http.Error(w, "Error al leer usuarios", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(usuarios)
}

// 3. Buscar usuario por ID (POST)
func BuscarUsuario(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	usuarios, err := leerUsuarios()
	if err != nil {
		http.Error(w, "Error al leer usuarios", http.StatusInternalServerError)
		return
	}
	for _, u := range usuarios {
		if u.ID == req.ID {
			resp := map[string]interface{}{"usuario": u, "status": 200}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(resp)
			return
		}
	}
	resp := map[string]interface{}{"error": "Usuario no encontrado", "status": 404}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// 4. Editar usuario (POST)
func EditarUsuario(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ID              string `json:"id"`
		Nombre          string `json:"nombre"`
		FechaNacimiento string `json:"fecha_nacimiento"`
		Genero          string `json:"genero"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	usuarios, err := leerUsuarios()
	if err != nil {
		http.Error(w, "Error al leer usuarios", http.StatusInternalServerError)
		return
	}
	encontrado := false
	for i, u := range usuarios {
		if u.ID == req.ID {
			usuarios[i].Nombre = req.Nombre
			usuarios[i].FechaNacimiento = req.FechaNacimiento
			usuarios[i].Genero = req.Genero
			encontrado = true
			break
		}
	}
	if !encontrado {
		resp := map[string]interface{}{"error": "Usuario no encontrado", "status": 404}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
		return
	}
	if err := guardarUsuarios(usuarios); err != nil {
		http.Error(w, "Error al guardar usuario", http.StatusInternalServerError)
		return
	}
	resp := map[string]interface{}{"mensaje": "Usuario actualizado", "status": 200}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}

// 5. Eliminar usuario (DELETE)
func EliminarUsuario(w http.ResponseWriter, r *http.Request) {
	var req struct {
		ID string `json:"id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	usuarios, err := leerUsuarios()
	if err != nil {
		http.Error(w, "Error al leer usuarios", http.StatusInternalServerError)
		return
	}
	nuevosUsuarios := make([]Usuario, 0)
	encontrado := false
	for _, u := range usuarios {
		if u.ID == req.ID {
			encontrado = true
			continue
		}
		nuevosUsuarios = append(nuevosUsuarios, u)
	}
	if !encontrado {
		resp := map[string]interface{}{"error": "Usuario no encontrado", "status": 404}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(resp)
		return
	}
	if err := guardarUsuarios(nuevosUsuarios); err != nil {
		http.Error(w, "Error al eliminar usuario", http.StatusInternalServerError)
		return
	}
	resp := map[string]interface{}{"mensaje": "Usuario eliminado", "status": 200}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}
