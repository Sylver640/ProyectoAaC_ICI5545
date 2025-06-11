package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"chicuco/api/pkg/actividades"
	"chicuco/api/pkg/center"
	"chicuco/api/pkg/contacto"
	"chicuco/api/pkg/hito"
	"chicuco/api/pkg/sugerencias"
	"chicuco/api/pkg/usuarios"
)

// Api represents the API with its address and endpoints
type Api struct {
	Addr string
}

// Mount creates a new ServeMux with all endpoints
func (a *Api) Mount() http.Handler {
	// Crear el router
	r := chi.NewRouter()

	// Usar middleware
	r.Use(cors.Handler(cors.Options{
		// Origenes permitidas
		AllowedOrigins: []string{"*"},
		// Metodos permitidos
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		// Cabeceras permitidas
		AllowedHeaders: []string{"Accept", "Content-Type"},
		// Credenciales
		AllowCredentials: false,
	}))
	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)

	// Rutas GET
	r.Get("/v1/contactos", contacto.HandlerContactos)    // Funcion para obtener el contacto
	r.Get("/v1/centros_de_salud", center.HandlerCentros) // Funcion para obtener los centros

	// Rutas POST
	r.Post("/v1/usuarios/listar", usuarios.ListarUsuarios) // Funcion para obtener todos los usuarios
	r.Post("/v1/usuarios/crear", usuarios.CrearUsuario)    // Funcion para crear un usuario
	r.Post("/v1/usuarios/editar", usuarios.EditarUsuario)  // Funcion para modificar un usuario
	r.Post("/v1/usuarios/buscar", usuarios.BuscarUsuario)  // Funcion para obtener los datos de un usuario específico
	r.Post("/v1/hitos", hito.HandlerHitos)                 // Funcion para obtener el hito según la edad del infante

	// Rutas ACTIVIDADES
	r.Post("/v1/actividades/listar", actividades.ListarActividades)
	r.Post("/v1/actividades/crear", actividades.CrearActividad)
	r.Post("/v1/actividades/editar", actividades.EditarActividad)
	r.Post("/v1/actividades/eliminar", actividades.EliminarActividad)
	r.Post("/v1/actividades/completar", actividades.MarcarCompletada)

	// Rutas SUGERENCIAS
	r.Get("/v1/sugerencias/listar", sugerencias.ListarConsejos)
	r.Post("/v1/sugerencias/por_edad_categoria", sugerencias.ListarConsejosPorEdadYCategoria)
	r.Post("/v1/sugerencias/por_edad", sugerencias.ListarConsejosPorEdad)

	// Rutas DELETE
	r.Delete("/v1/usuarios/eliminar", usuarios.EliminarUsuario) // Funcion para eliminar un usuario

	// Retornar el router
	return r
}

// Run starts the HTTP server
func (a *Api) Run(mux http.Handler) error {
	server := &http.Server{
		Addr:    a.Addr,
		Handler: mux,
		// Se que aqui se puede usar distintos tipos de timeout
	}
	return server.ListenAndServe()
}
