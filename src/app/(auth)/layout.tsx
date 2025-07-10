import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="z-10 mx-auto flex h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
      <Card className="border-none shadow-lg backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">{children}</CardContent>
      </Card>
    </div>
  )
}
