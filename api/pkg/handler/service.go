package handler

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"chicuco/api/pkg/center"
	"chicuco/api/pkg/contacto"
	"chicuco/api/pkg/hito"
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
	r.Post("/v1/hitos", hito.HandlerHitos) // Funcion para obtener el hito según la edad del infante

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
