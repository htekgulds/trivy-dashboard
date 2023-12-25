import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

const columns = [
  { accessorKey: 'metadata.namespace', header: 'Namespace' },
  { accessorKey: 'metadata.name', header: 'Name' },
  { accessorKey: 'report.artifact.repository', header: 'Repository' },
  { accessorKey: 'report.artifact.tag', header: 'Tag' },
  { accessorKey: 'report.summary.criticalCount', header: 'Critical' },
  { accessorKey: 'report.summary.highCount', header: 'High' },
  { accessorKey: 'report.summary.mediumCount', header: 'Medium' },
  { accessorKey: 'report.summary.lowCount', header: 'Low' },
  { accessorKey: 'report.summary.unknownCount', header: 'Unknown' }
]

function getRowColor (item) {
  if (item.report.summary.criticalCount) return 'text-red-500'
  if (item.report.summary.highCount) return 'text-orange-500'
  if (item.report.summary.mediumCount) return 'text-yellow-500'
  if (item.report.summary.lowCOunt) return 'text-green-500'
  if (item.report.summary.unknownCount) return 'text-gray-500'
  return 'text-gray-500'
}

export default function ReportTable ({ reports = [], handleRowClick }) {
  const table = useReactTable({
    data: reports.items,
    columns,
    getCoreRowModel: getCoreRowModel()
  })
  console.log(table)
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            {table
              .getHeaderGroups()
              .map(headerGroup =>
                headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))
              )}
          </tr>
        </thead>
        <tbody>
          {reports.items.map((item, i) => (
            <tr key={item.metadata.uuid} className='hover cursor-pointer' onClick={handleRowClick(item)}>
              <th>{i + 1}</th>
              <th className={getRowColor(item)}>{item.metadata.namespace}</th>
              <th className={getRowColor(item)}>{item.metadata.name}</th>
              <th className={getRowColor(item)}>{item.report.artifact.repository}</th>
              <th className={getRowColor(item)}>{item.report.artifact.tag}</th>
              <td className={item.report.summary.criticalCount === 0 ? 'text-gray-500' : 'text-red-500'}>
                {item.report.summary.criticalCount}
              </td>
              <td className={item.report.summary.highCount === 0 ? 'text-gray-500' : 'text-orange-500'}>
                {item.report.summary.highCount}
              </td>
              <td className={item.report.summary.mediumCount === 0 ? 'text-gray-500' : 'text-yellow-500'}>
                {item.report.summary.mediumCount}
              </td>
              <td className={item.report.summary.lowCount === 0 ? 'text-gray-500' : 'text-green-500'}>
                {item.report.summary.lowCount}
              </td>
              <td className='text-gray-500'>{item.report.summary.unknownCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
