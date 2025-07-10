import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto flex h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">{children}</CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our Terms of Service and Privacy
        Policy.
      </div>
    </div>
  )
}
