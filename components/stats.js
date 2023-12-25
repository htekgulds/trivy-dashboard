import { useRouter } from 'next/router'

export default function Stats ({ stats }) {
  const router = useRouter()

  const handleClick = (stat, level) => e => {
    if (stat === 0) return false

    router.query.level = level
    router.push(router)
  }

  return (
    <div className='stats border'>
      <div className='stat w-64'>
        <div className='stat-value text-primary'>{stats.totalCount}</div>
        <div className='stat-title'>Total Vulnerabilities</div>
      </div>
      <div className='stat w-40'>
        <div className={`stat-value text-red-500`}>{stats.criticalCount}</div>
        <div className='stat-title'>Crital</div>
      </div>
      <div className='stat w-40'>
        <div className='stat-value text-orange-500'>{stats.highCount}</div>
        <div className='stat-title'>High</div>
      </div>
      <div className='stat w-40'>
        <div className='stat-value text-yellow-500'>{stats.mediumCount}</div>
        <div className='stat-title'>Medium</div>
      </div>
      <div className='stat w-40'>
        <div className='stat-value text-green-500'>{stats.lowCount}</div>
        <div className='stat-title'>Low</div>
      </div>
      <div className='stat w-40'>
        <div className='stat-value text-gray-500'>{stats.unknownCount}</div>
        <div className='stat-title'>Unknown</div>
      </div>
    </div>
  )
}
