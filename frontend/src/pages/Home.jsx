import Filter from "../components/Filter"
import Header from "../components/header"
import Card from "../components/Card"
import { useEffect, useState } from "react"

function Home() {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    departureDate: ""
  })

  const [filters, setFilters] = useState({
    maxPrice: 10000,
    airline: "",
    timeRange: "",
    scales: ""
  })

  const [flights, setFlights] = useState([])
  const [filteredFlights, setFilteredFlights] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchFlights() {
    try {
      setLoading(true)
      setError(null)

      const { origin, destination, departureDate } = searchParams

      if (!origin || !destination || !departureDate) {
        setError("Completa todos los campos de búsqueda")
        setLoading(false)
        return
      }

      const url = `http://localhost:3000/api/search?origin=${origin}&destination=${destination}&date=${departureDate}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error("Error al obtener vuelos")
      }

      const data = await response.json()

      setFlights(data)
      setFilteredFlights(data)

    } catch (err) {
      console.error(err)
      setError("No se pudieron cargar los vuelos")
      setFlights([])
      setFilteredFlights([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let result = [...flights];


    if (filters.maxPrice) {
      result = result.filter(flight => flight.price <= filters.maxPrice);
    }


    if (filters.airline) {
      result = result.filter(flight => flight.airline === filters.airline);
    }


    if (filters.scales) {
      result = result.filter(flight => flight.scales === filters.scales);
    }

    if (filters.timeRange) {
      result = result.filter(flight => {
        const hour = parseInt(flight.departure_time.split(":")[0]);

        if (filters.timeRange === "morning") return hour >= 6 && hour < 12;
        if (filters.timeRange === "afternoon") return hour >= 12 && hour < 18;
        if (filters.timeRange === "evening") return hour >= 18;

        return true;
      });
    }

    setFilteredFlights(result);

  }, [filters, flights]);


  return (
    <div className="min-h-screen bg-gray-100">
      <Header
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        onSearch={fetchFlights}
      />
      <div className=" p-20 flex gap-20">
        <div className="max-w-80 mx-auto w-full ">
          <Filter
            filters={filters}
            setFilters={setFilters} />
        </div>

        <div className="flex-1 max-w-4xl mx-auto w-full">
          {loading && <p className="text-[#3E4C99] font-bold text-2xl" >Cargando vuelos...</p>}
          {error && <p className="text-[#cf443f] font-bold text-2xl">{error}</p>}

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
