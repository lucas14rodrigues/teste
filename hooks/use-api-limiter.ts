"use client"

import { useState, useCallback } from "react"

interface ApiLimiterConfig {
  maxRequests: number
  timeWindow: number
}

export function useApiLimiter(config: ApiLimiterConfig) {
  const [requests, setRequests] = useState<number[]>([])

  const canMakeRequest = useCallback(() => {
    const now = Date.now()
    const windowStart = now - config.timeWindow

    const recentRequests = requests.filter((time) => time > windowStart)

    return recentRequests.length < config.maxRequests
  }, [requests, config])

  const makeRequest = useCallback(async <T>(\
    requestFn: () => Promise<T>
  ): Promise<T | null> => {
  if (!canMakeRequest()) {
    console.warn("API rate limit reached, skipping request")
    return null
  }

  const now = Date.now()
  setRequests((prev) => [...prev.filter((time) => time > now - config.timeWindow), now])

  return await requestFn()
}
, [canMakeRequest, config.timeWindow])

return { canMakeRequest, makeRequest }
}
