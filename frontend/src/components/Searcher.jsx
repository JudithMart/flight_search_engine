import React from 'react'
import Box from './box_searcher/Box'



/*
Componente Searcher
 Renderiza los campos de búsqueda de vuelos y el botón de búsqueda
 Recibe los parámetros de búsqueda y funciones para actualizar y buscar
 Cada Box representa un campo (origen, destino, ida, vuelta)
 El botón ejecuta la búsqueda usando onSearch
 */


function Searcher({ searchParams, setSearchParams, onSearch }) {
    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-3 items-stretch lg:items-center justify-center">
            {/* Campos de origen y destino */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full lg:w-auto">
                {/* Origen: actualiza searchParams.origin */}
                <Box
                    texto="Origen"
                    value={searchParams.origin}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, origin: value })
                    } />
                {/* Destino: actualiza searchParams.destination */}
                <Box texto="Destino"
                    value={searchParams.destination}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, destination: value })} />
            </div>

            {/* Campos de fechas: ida y vuelta */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full lg:w-auto">
                {/* Ida: input tipo date, actualiza searchParams.departureDate */}
                <Box
                    texto="Ida"
                    value={searchParams.departureDate}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, departureDate: value })
                    } />
                {/* Vuelta: (no implementado en el backend, por eso value vacío) */}
                <Box
                    texto="Vuelta"
                    value=""
                    onChange={() => { }}
                />
            </div>

            {/* Botón de búsqueda: ejecuta onSearch al hacer clic */}
            <div className="w-full lg:w-auto">
                <button
                    onClick={onSearch}
                    className="flex items-center shadow-xl justify-center w-full lg:w-32 h-12 text-slate-100 bg-[#00B3A4] rounded-xl hover:bg-[#6e7abe] transition-colors">
                    <p>Buscar</p>
                </button>
            </div>
        </div>
    )
}

export default Searcher