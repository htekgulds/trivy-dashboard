export default function Namespaces ({ items = [], onSelect, selectedItem }) {
  return (
    <div>
      <div className='label'>Namespaces</div>
      <select className='select select-bordered w-full max-w-xs' onChange={onSelect} value={selectedItem}>
        <option key='_all' value='_all'>
          all
        </option>
        {items.map(ns => (
          <option key={ns.uid} value={ns.name}>
            {ns.name}
          </option>
        ))}
      </select>
    </div>
  )
}
