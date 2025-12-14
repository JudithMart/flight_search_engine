
function Card({
  origin, destination, airline, n_flight, d_time, a_time, duration, cost, scales, currency
}) {
  return (
    <div className="bg-white w-full shadow-md shadow-[#3E4C99] rounded-xl mb-10
    flex flex-col lg:flex-row items-center justify-between p-6 gap-6  lg:gap-10">
      <div className="text-center sm:text-left  ">
        <p className="text-[#11325f] font-bold  lg:text-xl text-base">
          {airline}</p>
        <p className=" text-[#11325f] font-light text-xl">
          {n_flight}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 lg:gap-5 w-full lg:w-auto ">
        <div className="text-center sm:text-left">
          <p className=" text-[#11325f] font-bold text-xl">
            {origin}</p>
          <p className="  text-[#11325f] font-light text-xl">
            {d_time}</p>
        </div>
        <div className="text-center sm:text-left ">
          <p className=" text-[#11325f] font-bold text-xl  sm:text-left">
            {destination}</p>
          <p className=" text-[#11325f] font-light text-base lg:text-xl">
            {a_time}</p>
        </div>

      </div>
      <div className="text-center lg:text-left w-full lg:w-auto">
        <p className="  text-[#11325f] font-bold text-xl">
          {scales} escala</p>
      </div>
      <div className="text-center lg:text-left w-full lg:w-auto ">
        <p className=" text-[#11325f] font-light text-base lg:text-xl">
          {duration}</p>
      </div>

      <div className="text-center lg:text-left w-full lg:w-auto">
        <p className="text-[#00B3A4] font-bold text-2xl">
          {cost} {currency}
        </p>
      </div>

    </div>
  )
}

export default Card