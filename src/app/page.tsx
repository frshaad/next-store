import { auth } from '@/auth'

export default async function Home() {
  const session = await auth()

  if (!session?.user.id) {
    return <h1>No User</h1>
  }

  return <h1>Hello {session.user.name}</h1>
}
