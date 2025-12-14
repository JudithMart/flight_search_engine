import React, { useState } from 'react'
import { MdFlightTakeoff, MdOutlineFlightLand } from "react-icons/md";


function Box({ texto, value, onChange }) {

    const mostrarCalendario = texto === "Ida" || texto === "Vuelta";

    return (
        <div className="relative h-24 w-full  sm:w-56 bg-white rounded-xl shadow-xl ">

            <div className="flex items-center p-3 ">
                <h1 className="text-black text-sm font-thin flex items-center">
                    {(texto === "Origen" || texto === "Ida") ? (
                        <MdFlightTakeoff className="text-gray-500 mr-2" size={18} />
                    ) : (
                        <MdOutlineFlightLand className="text-gray-500 mr-2" size={18} />
                    )}
                    {texto}
                </h1>
            </div>
            {mostrarCalendario ? (
                <input
                    type="date"
                    className="w-[calc(100%-1rem)] mx-2 h-[37px] text-gray-400 bg-slate-100 rounded-md ml-2 text-lg"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    className="w-[calc(100%-1rem)] mx-2 h-[37px] bg-slate-100 rounded-md ml-2"
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>


    );
}

export default Box