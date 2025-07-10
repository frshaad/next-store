import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  if (!session?.user.id) return null

  return <h1>Hello World</h1>
}
