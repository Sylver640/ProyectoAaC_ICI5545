# CHICUCO

# Endpoints
Aquí estará la lista de endpoints que se pueden usar para obtener la información dentro la virtual machine.

**Tener en cuenta que esto puede cambiar con el tiempo, ya sea por decisión de nosotros como equipo back-end, como también por sugerencia del equipo front-end, pero cada cambio se intentara actualizar dentro del README.**

## Contactos
Para obtener los contactos tendrán que realizar una request de tipo ```GET``` para este el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/contactos
```
Tener en cuenta que este endpoint **NO** requiere ningún input de entrada.
Esta debería ser la respuesta en caso de tener un status 200:

```shell
[
    {
        "nombre": "Fono infantil",
        "telefono": "800 200 818",
        "descripcion": "Responde dudas relacionadas con la crianza y desarrollo de niños y niñas: pataletas, agresividad, retraimiento, pesadillas, control de esfínteres, etc."
    },
    {y otros contactos con la misma estructura}
]
```

## Centros de salud
Para obtener los centros de salud tendran que realizar un request de tipo ```GET``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/centros_de_salud
```
Tener en cuenta que este endpoint **NO** requiere ningún input de entrada.
Esta debería ser la respuesta en caso de tener un status 200:

```shell
[
    {
        "nombre": "CECOSF Juan Pablo II - Dependiente de CESFAM Rodelillo",
        "direccion": "Av. Juan Pablo II 540 Valparaíso",
        "horario": "Lunes a Viernes de 8:00 a 17:00 horas.",
        "telefono": {
            "numero": "+56 9 6452 9540",
            "horario": "",
            "poblacion_preferente": ""
        }
    },
    {y otros centros con la misma estructura}
]
```

Ojito que el apartado ```teléfono```, dentro de ```horario``` y ```poblacion_preferente``` puede ser string vacíos, o sea este valor "".

## Hitos
Para obtener los hitos de salud tendran que realizar un request de tipo ```POST``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/hitos
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar el intervalo de edad perteneciente al infante, estos intervalos son:

* 0-6 meses
* 7-12 meses
* 13-23 meses
* 2-5 años
* 6-10 años

Ejemplo de input.
```shell
{
  "hito": "0-6 meses"
}
```
Esta debería ser la respuesta en caso de tener un status 200:

```shell
[
    "A los 2 meses el lactante deberia ser capaz de fijar y seguir con la mirada, así com demostrar sonrisa social.",
    "A los 4 meses el lactante tiene una postura estable con cabeza en línea media, levanta las manos hacia un objeto y luego puede llevárselo a la boca. Además, levanta las piernas y las mantiene en esa posición, con las caderas centradas.",
    "A los 6 meses el lactante se puede apoyar con las palmas estando boca abajo, el lactante es capaz de apoyarse con las palmas abiertas y los codos extendidos. A distal, apoyo en la parte más distal de los muslos, soportando así el peso de su cuerpo.",
    "A los 6 meses el lactante es capaz de pasarse las cosas de una mano a otra, en ambos sentidos. Completa el proceso inicial de la prensión al poder tomar y soltar objetos a voluntad."
]
```

## Niño o Niña
Ahora vienen los enpoints enfocado en el infante.

### Crear niño o niña
Para crear el "perfil" de un niño o niña se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/usuarios/crear
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar la siguiente información del infante:

Ejemplo:
```shell
{
  "nombre" : "Juan carballo",
  "fecha_nacimiento": "11/9/2024",
  "genero": "Masculino"
}
```
**En duda**, aún no tenemos certeza cuál de los dos, front-end o back-end tiene que encargarse de verificar si la fecha de nacimiento es correcto, o sea que el infante está entre la edad de 0 a 10 años.

Esta debería ser la respuesta en caso de tener un status 200:

```shell
{
  "id": "id del infante, importante guardar.",
  "status": número, 200 si salió algo bien, distinto de eso es que salió algo mal.
}
```

### Listar todos los infantes
Para obtener una lista con todos los niños o niñas, se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/usuarios/listar
```
Tener en cuenta que este endpoint **NO** requiere ningún input de entrada.
Esta debería ser la respuesta en caso de tener un status 200:

```shell
[
    {
        "id": "1",
        "nombre": "Juan Pérez",
        "fecha_nacimiento": "15/04/19",
        "genero": "Masculino"
    },
    {lista de los demas infantes}
]
```

### Buscar infante en concreto
Para obtener a un infante en concreto, se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/usuarios/buscar
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar el ```id``` del infante previamente guardado al momento de crearlo.

Ejemplo:
```shell
{
    "id": "SHA256 momento"
}
```

Esta debería ser la respuesta en caso de tener un status 200:
```shell
{
    "status": 200,
    "usuario": {
        "id": "SHA256 poderoso",
        "nombre": "Juan Pérez",
        "fecha_nacimiento": "15/04/19",
        "genero": "Masculino"
    }
}
```
### Editar a un infante
Para editar a un niño o niña, se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/usuarios/editar
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar el ```id```, más los tres parámetros principal del infnante, ```nombre```, ```fecha_nacimiento``` y ```genero```.

***CUIDADO QUE SI ALGUNO DE ESTOS PARÁMETROS NO ES COLOCADO, SE EDITARÁ LOS PARÁMETROS FALTANTES CON EL VALOR DE "", ASIQUE TENGAN OJO CON ESO***.

Ejemplo:
```shell
{
    "id": "SHA256 momento",
    "nombre": "Juan Carballo",
    "fecha_nacimiento": "15/04/19",
    "genero": "Masculino"
}
```

Esta debería ser la respuesta en caso de tener un status 200:
```shell
{
    "mensaje": "Usuario actualizado",
    "status": 200
}
```

### Eliminar infante
Para eliminar un infante en concreto, se tendra que realizar un request de tipo ```DELETE``` para el siguiente endpoint.

```shell
http://135.232.120.200:8080/v1/usuarios/eliminar
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar el ```id``` del infante previamente guardado al momento de crearlo.

Ejemplo:
```shell
{
    "id": "SHA256 momento"
}
```

Esta debería ser la respuesta en caso de tener un status 200:
```shell
{
    "mensaje": "Usuario eliminado",
    "status": 200
}
```

## SUGERENCIA/CONSEJOS

### Listar todo el JSON de sugerencias
Para listar todas las sugerencias, se tendra que realizar un request de tipo ```GET``` para el siguiente endpoint.
```shell
http://135.232.120.200:8080/v1/sugerencias/listar
```

Tener en cuenta que este endpoint **NO** requiere ningún input de entrada.
Esta debería ser la respuesta en caso de tener un status 200:

```shell
{
    "status": 200,
    "sugerencias": {
        "sugerencia": {}
    }
}
```

### Filtrar por edad y categoria
Para obtener las sugerencias por edad y categoria, se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.
```shell
http://135.232.120.200:8080/v1/sugerencias/por_edad_categoria
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar la ```edad``` y ```categoria``` del infante.

Ejemplo
```shell
{
    "edad": "0-6 meses",
    "categoria": "Consejo de alimentacion"
}
```

Esta debería ser la respuesta en caso de tener un status 200:
```shell
{
    "consejo": [],
    "status": 200
}
```

### Filtrar solo por edad
Para obtener las sugerencias por edad, se tendra que realizar un request de tipo ```POST``` para el siguiente endpoint.
```
http://135.232.120.200:8080/v1/sugerencias/por_edad
```

Tener en cuenta que este endpoint **SÍ** requiere un input de entrada, donde se debe entregar la ```edad``` del infante.

Ejemplo
```shell
{
    "edad": "0-6 meses"
}
```

Esta debería ser la respuesta en caso de tener un status 200:
```shell
{
    "consejos": [],
    "status": 200
}
```
