const DEFAULT_COUNTS = {
  criticalCount: 0,
  highCount: 0,
  mediumCount: 0,
  lowCount: 0,
  noneCount: 0,
  unknownCount: 0,
  totalCount: 0
}

export function getSumOfVulnerabilityReports (reports) {
  if (!reports) return DEFAULT_COUNTS

  return reports.items.reduce((sum, item) => {
    const totalCount = sum.totalCount + Object.values(item.report.summary).reduce((counts, c) => counts + c, 0)

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
  }, DEFAULT_COUNTS)
}
