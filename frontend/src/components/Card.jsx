import React from 'react'

function Card({
  origin, destination, airline, n_flight, d_time, a_time, duration, cost, scales
}) {
  return (
    <div className="bg-white w-full h-40 shadow-md shadow-[#5B4B8A] rounded-xl mb-10
    flex items-center justify-between px-10 gap-10">
      <div className=" ">
        <p className="text-[#11325f] font-bold text-xl">
          Airline{airline}</p>
        <p className=" text-[#11325f] font-light text-xl">
          ADCF6{n_flight}</p>
      </div>
      <div className="flex gap-5 ">
        <div className="">
          <p className=" text-[#11325f] font-bold text-xl">
            Origen{origin}</p>
          <p className=" ml-2 text-[#11325f] font-light text-xl">
            10:50{d_time}</p>
        </div>
        <div className=" ">
          <p className=" text-[#11325f] font-bold text-xl">
            Destination{destination}</p>
          <p className="px-6 text-[#11325f] font-light text-xl">
            10:50{a_time}</p>
        </div>
       
      </div>
 <div className="">
          <p className="  text-[#11325f] font-bold text-xl">
            {scales}2 escalas</p>
        </div>
      <div className=" ">
        <p className=" text-[#11325f] font-light text-xl">
          {duration}1:40hr</p>
      </div>

    </div>
  )
}

export default Card