const Controls = ({ filter, sort, onFilter, onSort }) => {
  return (
    <div className="controls">
      <div>
        <label>Filtro: </label>
        <select value={filter} onChange={(e) => onFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="pending">Pendientes</option>
          <option value="completed">Completadas</option>
        </select>
      </div>
      <div>
        <label>Orden: </label>
        <select value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  )
}

export default Controls