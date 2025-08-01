import type { Roles } from '@/types/globals'
import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: Roles) => {
  const { sessionClaims } = await auth()
  return (sessionClaims?.metadata as { role?: string })?.role === role
} 