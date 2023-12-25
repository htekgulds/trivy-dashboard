import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

async function getNamespaces () {
  const res = await axios.get('/api/k8s/namespaces')

  return res.data
}

export default function useNamespaces () {
  return useQuery({ queryKey: ['namespaces'], queryFn: getNamespaces })
}
