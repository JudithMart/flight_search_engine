
function Filter({ filters, setFilters }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 h-fit sticky top-4">
      <h3 className="text-[#11325f] font-bold text-xl mb-4">Filtros</h3>
      <div className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-[#11325f] mb-2">
           Precio máximo: ${filters.maxPrice.toLocaleString()} 
          </label>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            step="100"
            value={filters.maxPrice}
            onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
            className="w-full accent-[#5161c0]" 
          />
        </div>

      
        <div>
          <label className="block text-sm font-medium text-[#11325f] mb-2">
            Aerolínea
          </label>
          <select 
            value={filters.airline}
            onChange={(e) => setFilters({...filters, airline: e.target.value})}
            className="w-full border border-gray-300 rounded-lg p-2 text-[#11325f] focus:ring-2 focus:ring-[#5161c0] focus:border-transparent"
          >
            <option value="">Todas</option>
            <option value="Aeroméxico">Aeroméxico</option>
            <option value="Volaris">Volaris</option>
            <option value="VivaAerobus">VivaAerobus</option>
            <option value="Interjet">Interjet</option>
          </select>
        </div> 


        <div>
          <label className="block text-sm font-medium text-[#11325f] mb-2">
            Horario de salida
          </label>
          <select 
            value={filters.timeRange}
            onChange={(e) => setFilters({...filters, timeRange: e.target.value})}
            className="w-full border border-gray-300 rounded-lg p-2 text-[#11325f] focus:ring-2 focus:ring-[#5161c0] focus:border-transparent"
          >
            <option value="">Cualquier hora</option>
            <option value="morning">Mañana (6:00 - 11:59)</option>
            <option value="afternoon">Tarde (12:00 - 17:59)</option>
            <option value="evening">Noche (18:00 - 23:59)</option>
          </select>
        </div>

      
        <div>
          <label className="block text-sm font-medium text-[#11325f] mb-2">
            Escalas
          </label>
          <select 
            value={filters.scales}
            onChange={(e) => setFilters({...filters, scales: e.target.value})}
            className="w-full border border-gray-300 rounded-lg p-2 text-[#11325f] focus:ring-2 focus:ring-[#5161c0] focus:border-transparent"
          >
            <option value="">Todas</option>
            <option value="Directo">Directo</option>
            <option value="1 escala">1 escala</option>
            <option value="2+ escalas">2+ escalas</option>
          </select>
        </div>

      
        <button
          onClick={() => setFilters({
            maxPrice: 10000,
            airline: '',
            timeRange: '',
            scales: ''
          })}
          className="w-full py-2 px-4  text-white bg-[#3E4C99]  rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
}

export default Filter