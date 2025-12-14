import React from 'react'
import Box from './box_searcher/box'



function Searcher({ searchParams, setSearchParams, onSearch }) {

    return (
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-3 items-stretch lg:items-center justify-center">

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full lg:w-auto">
                <Box
                    texto="Origen"
                    value={searchParams.origin}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, origin: value })
                    } />

                <Box texto="Destino"
                    value={searchParams.destination}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, destination: value })} />
            </div>


            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full lg:w-auto">
                <Box
                    texto="Ida"
                    value={searchParams.departureDate}
                    onChange={(value) =>
                        setSearchParams({ ...searchParams, departureDate: value })
                    } />

                <Box
                    texto="Vuelta"
                    value=""
                    onChange={() => { }}
                />
            </div>

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