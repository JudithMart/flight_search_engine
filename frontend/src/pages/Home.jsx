import Filter from "../components/Filter"
import Header from "../components/header"
import Card from "../components/Card"
import { useEffect, useState } from "react"

/*
Página principal Home
 Maneja el estado de búsqueda, filtros y resultados de vuelos
 Renderiza el header, filtros y las cards de resultados
*/

import Filter from "../components/Filter"
import Header from "../components/header"
import Card from "../components/Card"
import { useEffect, useState } from "react"

function Home() {
  // Estado para los parámetros de búsqueda (origen, destino, fecha)
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departureDate: ""
  })

  // Estado para los filtros adicionales
  const [filters, setFilters] = useState({
    maxPrice: 10000,
    airline: "",
    timeRange: "",
    scales: ""
  })

  // Estado para los vuelos obtenidos y los filtrados
  const [flights, setFlights] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Llama al backend para buscar vuelos según los parámetros
  async function fetchFlights() {
    try {
      setLoading(true)
      setError(null)

      // Extrae los parámetros de búsqueda
      const { origin, destination, departureDate } = searchParams

      // Valida que todos los campos estén completos
      if (!origin || !destination || !departureDate) {
        setError("Completa todos los campos de búsqueda")
        setLoading(false)
        return
      }

      // Construye la URL de la API
      const url = `http://localhost:3000/api/search?origin=${origin}&destination=${destination}&date=${departureDate}`

      // Realiza la petición al backend
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Error al obtener vuelos")
      }

      // Parsea la respuesta JSON
      const data = await response.json()

      // Guarda los vuelos obtenidos
      setFlights(data)
      setFilteredFlights(data)

    } catch (err) {
      // Manejo de errores
      console.error(err)
      setError("No se pudieron cargar los vuelos")
      setFlights([])
      setFilteredFlights([])
    } finally {
      setLoading(false)
    }
  }

  // Aplica los filtros locales a los vuelos obtenidos
  useEffect(() => {
    let result = [...flights];

    // Filtra por precio máximo
    if (filters.maxPrice) {
      result = result.filter(flight => flight.price <= filters.maxPrice);
    }

    // Filtra por aerolínea
    if (filters.airline) {
      result = result.filter(flight => flight.airline === filters.airline);
    }

    // Filtra por número de escalas
    if (filters.scales !== "") {
      if (filters.scales === "0") {
        result = result.filter(flight => flight.scales === 0);
      }
      if (filters.scales === "1") {
        result = result.filter(flight => flight.scales === 1);
      }
      if (filters.scales === "2+") {
        result = result.filter(flight => flight.scales >= 2);
      }
    }

    // Filtra por rango horario de salida
    if (filters.timeRange) {
      result = result.filter(flight => {
        const hour = parseInt(flight.departure_time.split(":")[0]);

        if (filters.timeRange === "morning") return hour >= 6 && hour < 12;
        if (filters.timeRange === "afternoon") return hour >= 12 && hour < 18;
        if (filters.timeRange === "evening") return hour >= 18;

        return true;
      });
    }

    // Actualiza los vuelos filtrados
    setFilteredFlights(result);

  }, [filters, flights]);

  // Render principal
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header con buscador */}
      <Header
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={fetchFlights}
      />
      <div className=" p-20 flex gap-20">
        {/* Filtros laterales */}
        <div className="max-w-80 mx-auto w-full ">
          <Filter
            filters={filters}
            setFilters={setFilters} />
        </div>

        {/* Resultados de vuelos */}
        <div className="flex-1 max-w-4xl mx-auto w-full">
          {/* Mensaje de carga */}
          {loading && <p className="text-[#3E4C99] font-bold text-2xl" >Cargando vuelos...</p>}
          {/* Mensaje de error */}
          {error && <p className="text-[#cf443f] font-bold text-2xl">{error}</p>}

          {/* Lista de cards de vuelos */}
          {!loading && !error && filteredFlights.length > 0 && (
            filteredFlights.map((flight, index) => (
              <Card
                key={index}
                origin={flight.origin}
                destination={flight.destination}
                airline={flight.airline}
                n_flight={flight.flight_number}
                d_time={flight.departure_time}
                a_time={flight.arrival_time}
                duration={flight.duration}
                cost={flight.price}
                currency={flight.currency}
                scales={flight.scales}
              />
            ))
          )}
          {/* Mensaje si no hay resultados */}
          {!loading && !error && filteredFlights.length === 0 && (
            <p className="text-gray-500 text-center text-lg">
              No se encontraron vuelos con los filtros seleccionados
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
