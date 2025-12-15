# Deal Engine – Flight Search Engine

Motor de búsqueda de vuelos que consume la API de **Amadeus**, permite buscar vuelos por origen, destino y fecha,  
aplicar filtros en el frontend y manejar errores de forma controlada.

---

## Características principales

- **Búsqueda de vuelos por:**
  - Origen (IATA)
  - Destino (IATA)
  - Fecha de salida
- Consumo de **Amadeus Flight Offers API**
- Manejo de errores y fallback con **mock data**
- **Filtros en frontend:**
  - Precio máximo
  - Aerolínea
  - Horario
  - Escalas
- Transformación de datos crudos → formato estándar
- Unit testing con **Jest**

---

## Arquitectura Backend (Node.js + Express)

```text
src/
├── controllers/
│   └── flights.controller.js   # Validación de entrada y respuestas HTTP
├── services/
│   └── flights.service.js      # Lógica de negocio
├── utils/
│   ├── amadeusClient.js        # Comunicación con Amadeus
│   └── transform.js            # Normalización de datos
├── mock/
│   └── amadeus.json            # Datos simulados
├── routes/
│   └── flights.routes.js
├── app.js
└── server.js

---
```
## Frontend (React + Tailwind)

```text
src/
├── components/
│   ├── Header.jsx
│   ├── Searcher.jsx
│   ├── Filter.jsx
│   └── Card.jsx
├── pages/
│   └── Home.jsx
└── assets/
```
---
## Flujo de la aplicación

### Usuario
- Ingresa:
  - Origen (IATA)
  - Destino (IATA)
  - Fecha
- El frontend realiza una petición al backend.

### Backend
- Valida los parámetros de entrada.
- Consulta la API de Amadeus.
  - Si falla, utiliza datos simulados (mock).
- Transforma los datos a un formato estándar.

### Frontend
- Renderiza las tarjetas de vuelos.
- Aplica filtros locales.

---

## Validaciones

### Backend
- Campos obligatorios.
- Códigos IATA válidos (3 letras).
- Manejo de errores HTTP:
  - `400 Bad Request`
  - `502 Bad Gateway`
  - `500 Internal Server Error`

---

## Testing

Se implementaron tests unitarios usando **Jest** para:
- Transformación de datos (`transformFlightOffers`)
- Validación de escalas
- Validación de duración
- Controladores (mockeando services)

Ejecutar los tests:

```bash
npm run test
```

 ---        
## Instalación

### Clonar repositorio

```bash
git clone https://github.com/tu-usuario/deal-engine.git
cd deal-engine
```

### Backend

```bash
cd backend
npm install
```
- Crear archivo `.env` con las siguientes variables:
```bash
AMADEUS_API_KEY=tu_api_key
AMADEUS_API_SECRET=tu_api_secret
PORT=3000
```
Ejecutar
```bash
node src/app.js
```
### Frontend
```bash
cd frontend
npm install
```
Ejecutar
```bash
npm run dev
```
---   

**Autora**
Agui Martínez
