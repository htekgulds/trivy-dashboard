import Stats from '@/components/stats'
import ReportTable from '@/components/table'
import { DEFAULT_NAMESPACE, ReportTypes } from '@/src/config'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const tabs = ['Vulnerabilities', 'Exposed Secrets']

async function getNamespaces () {
  const res = await axios.get('/api/k8s/namespaces')

  return res.data
}

async function getTrivyVulnerabilityReports (ns) {
  const res = await axios.get('/api/trivy/reports', {
    params: { ns, type: ReportTypes.VULNERABILITY, limit: 1000 }
  })

  return res.data
}

export default function Home () {
  const router = useRouter()
  const [selectedNamespace, setSelectedNamespace] = useState(DEFAULT_NAMESPACE)
  const [selectedTab, setSelectedTab] = useState(0)

  const { data: namespaces, isLoading: isNamespacesLoading } = useQuery({
    queryKey: ['namespaces'],
    queryFn: getNamespaces
  })

  const { data: vulnerabilityReports, isLoading: isVulnerabilityReportsLoading } = useQuery({
    queryKey: ['trivyVulnerabilityReports', selectedNamespace],
    queryFn: () => getTrivyVulnerabilityReports(selectedNamespace)
  })

  const vulnerabilitySum = vulnerabilityReports?.items.reduce(
    (sum, item) => {
      const totalCount = sum.totalCount + Object.values(item.report.summary).reduce((counts, c) => counts + c, 0)
      console.log(totalCount)

      return {
        totalCount,
        ...Object.entries(item.report.summary).reduce(
          (obj, [key, value]) => ({
            ...obj,
            [key]: sum[key] + value
          }),
          {}
        )
      }
    },
    {
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0,
      lowCount: 0,
      noneCount: 0,
      unknownCount: 0,
      totalCount: 0
    }
  )
  console.log('Sum', vulnerabilitySum)

  const handleNamespaceChange = e => {
    setSelectedNamespace(e.target.value)
  }

  const handleTabChange = i => e => {
    e.preventDefault()
    setSelectedTab(i)
  }

  const handleRowClick = i => e => {
    console.log('row click', i)
    router.push(`vulnerabilityreports/${i.metadata.name}`)
  }

  if (isNamespacesLoading || isVulnerabilityReportsLoading) {
    return (
      <div className='w-full text-center py-24'>
        <span className='loading loading-infinity loading-lg'></span>
      </div>
    )
  }

  return (
    <div className='container mx-auto'>
      <div className='navbar bg-base-100'>
        <div className='navbar-start'>
          <a className='btn btn-ghost text-xl'>Trivy Dashboard</a>
        </div>
        <div className='navbar-center'>
          <ul className='menu menu-horizontal px-1'>
            {tabs.map((tab, i) => (
              <li key={tab}>
                <a className={i === selectedTab ? 'active' : ''} onClick={handleTabChange(i)}>
                  {tab}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='mr-3'>Namespaces</div>
          <select
            className='select select-bordered w-full max-w-xs'
            onChange={handleNamespaceChange}
            value={selectedNamespace}
          >
            <option key='_all' value='_all'>
              all
            </option>
            {namespaces.items.map(ns => (
              <option key={ns.metadata.uuid} value={ns.metadata.name}>
                {ns.metadata.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <div className='mb-10'>
          <Stats stats={vulnerabilitySum} />
        </div>
        <ReportTable reports={vulnerabilityReports} handleRowClick={handleRowClick} />
      </div>
    </div>
  )
}
