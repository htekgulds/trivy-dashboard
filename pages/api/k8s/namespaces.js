import { k8sApi } from '@/src/api/k8s/config'
import { simplify } from '@/src/api/k8s/util'

export default async function handler (req, res) {
  const namespaces = await k8sApi.listNamespace()
  res.status(200).json(simplify(namespaces.body))
}
