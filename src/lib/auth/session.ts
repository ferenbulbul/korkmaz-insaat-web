import { SignJWT, jwtVerify } from 'jose'

const SESSION_COOKIE = 'korkmaz_admin_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const getSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured')
  return new TextEncoder().encode(secret)
}

export interface AdminSessionPayload {
  role: 'admin'
  iat?: number
  exp?: number
}

export const signAdminSession = async (): Promise<string> => {
  const secret = getSecret()
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret)
}

export const verifyAdminSession = async (
  token: string | undefined,
): Promise<AdminSessionPayload | null> => {
  if (!token) return null
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret)
    if ((payload as unknown as AdminSessionPayload).role !== 'admin') return null
    return payload as unknown as AdminSessionPayload
  } catch {
    return null
  }
}

export { SESSION_COOKIE, SESSION_MAX_AGE }
