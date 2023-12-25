import { DEFAULT_K8S_OMITTED_KEYS } from '@/src/config'
import { omit } from 'lodash'

export function simplify (body) {
  return {
    ...body,
    items: body.items.map(item => omit(item, DEFAULT_K8S_OMITTED_KEYS))
  }
}

export function masterProps (body) {
  return {
    ...body,
    items: body.items.map(item => omit(item, [...DEFAULT_K8S_OMITTED_KEYS, 'report.vulnerabilities']))
  }
}

export function detailProps (body) {
  return {}
}
