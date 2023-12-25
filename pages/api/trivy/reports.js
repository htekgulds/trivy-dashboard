import { k8sCustomObjects } from '@/src/api/k8s/config'
import { masterProps, simplify } from '@/src/api/k8s/util'
import { DEFAULT_K8S_FETCH_LIMIT, DEFAULT_NAMESPACE, ReportTypes } from '@/src/config'

export const config = {
  api: {
    responseLimit: '32mb'
  }
}

export default async function handler (req, res) {
  console.time()
  let reports = null
  const type = req.query.type || ReportTypes.VULNERABILITY
  const limit = req.query.limit || DEFAULT_K8S_FETCH_LIMIT

  const apiParams = ['aquasecurity.github.io', 'v1alpha1']
  const restOfParams = [type, false, false, null, null, null, limit]

  if (req.query.cluster || req.query.ns === '_all') {
    reports = await k8sCustomObjects.listClusterCustomObject(...apiParams, ...restOfParams)
  } else {
    const ns = req.query.ns || DEFAULT_NAMESPACE
    reports = await k8sCustomObjects.listNamespacedCustomObject(...apiParams, ns, ...restOfParams)
  }
  console.timeEnd()
  res.status(200).json(simplify(reports.body))
}
