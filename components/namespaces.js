export default function Namespaces ({ items, onSelect, selectedItem }) {
  return (
    <div>
      <div className='label'>Namespaces</div>
      <select className='select select-bordered w-full max-w-xs' onChange={onSelect} value={selectedItem}>
        <option key='_all' value='_all'>
          all
        </option>
        {items.items.map(ns => (
          <option key={ns.metadata.uuid} value={ns.metadata.name}>
            {ns.metadata.name}
          </option>
        ))}
      </select>
    </div>
  )
}
