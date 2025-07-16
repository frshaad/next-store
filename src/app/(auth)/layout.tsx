export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="z-10 mx-auto flex h-screen w-full max-w-md flex-col justify-center gap-6 p-4">
      {children}
    </div>
  )
}
