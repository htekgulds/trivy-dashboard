export const DEFAULT_NAMESPACE = 'default'
export const DEFAULT_K8S_FETCH_LIMIT = 20
export const DEFAULT_K8S_OMITTED_KEYS = [
  'metadata.creationTimestamp',
  'metadata.generation',
  'metadata.managedFields',
  'metadata.resourceVersion',
  ['metadata', 'annotations', 'kubectl.kubernetes.io/last-applied-configuration']
]

export const Colors = {
  CRITICAL: 'text-red-500',
  HIGH: 'text-orange-500',
  MEDIUM: 'text-yellow-500',
  LOW: 'text-green-500',
  DEFAULT: 'text-gray-500'
}
export const ReportTypes = {
  CLUSTER_COMPLIANCE: 'clustercompliancereports',
  CLUSTER_CONFIG_AUDIT: 'clusterconfigauditreports',
  CLUSTER_INFRA_ASSESSMENT: 'clusterinfraassessmentreports',
  CLUSTER_RBAC_ASSESSMENT: 'clusterrbacassessmentreports',
  CLUSTER_SBOM: 'clustersbomreports',
  CONFIG_AUDIT: 'configauditreports',
  INFRA_ASSESSMENT: 'infraassessmentreports',
  RBAC_ASSESSMENT: 'rbacassessmentreports',
  SBOM: 'sbomreports',
  EXPOSED_SECRETS: 'exposedsecretreports',
  VULNERABILITY: 'vulnerabilityreports'
}
