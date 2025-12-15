
import { MdFlight } from "react-icons/md";
import Searcher from './Searcher';
import fondo from '../assets/Fondo.jpg';

function Header({ searchParams, setSearchParams, onSearch }) {
  return (
    <div
      className="relative min-h-48 w-full bg-[#1F3A5F] rounded-xl bg-cover bg-center"
      style={{ backgroundImage: `url(${fondo})` }}
    >
      <div className="flex p-4 sm:p-8 text-white">
        <div className="flex items-center mr-4 ">
          <MdFlight size={25} />
        </div>
        <h1 className="font-semibold text-xl sm:text-2xl">
          Deal Engine
        </h1>
      </div>
      <div className="text-white font-bold p-4 sm:p-8 text-lg sm:text-xl">
        <h1>
          Vuelos
        </h1>
        <Searcher
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          onSearch={onSearch} />

      </div>

    </div >
  )
}

export default Header