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

## Flujo de la aplicación
          **Usuario ingresa:**
          Origen (IATA)
          Destino (IATA)
          Fecha
          **Frontend hace request al backend**
          **Backend**
          Valida parámetros
          Consulta Amadeus
          Si falla → usa mock
          Datos se transforman a formato estándar
          **Frontend**
          Renderiza cards
          Aplica filtros locales
          **Validaciones**
          Backend 
          Campos obligatorios
          Códigos IATA válidos (3 letras)
          Manejo de errores HTTP:
            -400 Bad Request
            -502 Bad Gateway
            -500 Internal Server Error
          **Testing**
          Se implementaron tests unitarios usando Jest para:
          -Transformación de datos (transformFlightOffers)
          -Validación de escalas
          -Validación de duración
          -Controladores (mockeando services) -
          -Ejecutar test **npm run test**
##Instalación
-Clonar repositorio
git clone https://github.com/tu-usuario/deal-engine.git cd deal-engine
-Backend
cd backend
npm install
--crear archivo .env
AMADEUS_API_KEY=tu_api_key
AMADEUS_API_SECRET=tu_api_secret
PORT=3000
--Ejecutar: node src/app.js
-Frontend
 cd frontend
npm install
--Ejecutar: npm run dev


**Autora Agui Martínez**
