import { k8sApi } from '@/src/api/k8s/config'
import { pick } from 'lodash'

function simplify (body) {
  return body.items.map(item => pick(item.metadata, ['name', 'uid']))
}

export default async function handler (req, res) {
  const namespaces = await k8sApi.listNamespace()
  res.status(200).json(simplify(namespaces.body))
}
