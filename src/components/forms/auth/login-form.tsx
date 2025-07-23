import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { EyeIcon, EyeOffIcon, LoaderIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Label } from '@/components/ui/label'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  className?: string
  onSuccess?: () => void
  onError?: (error: string) => void
}

export default function LoginForm({
  className,
  onSuccess,
  onError,
}: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'fergal.moran+mixyboos@gmail.com',
      password: 'SVqVKJWZh5dIaM7JsNY1h0E/xbzPCD7y7Veedxa1Q/k=',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError(null)
      await login(data.email, data.password)
      onSuccess?.()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed'
      setError(errorMessage)
      onError?.(errorMessage)
    }
  }

  return (
    // <Card className={cn('w-full max-w-sm', className)}>
    //   <CardHeader>
    //     <CardTitle className="text-2xl">Login</CardTitle>
    //     <CardDescription>
    //       Enter your email below to login to your account
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent>
    //     <Form {...form}>
    //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    //         {error && (
    //           <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
    //             {error}
    //           </div>
    //         )}

    //         <FormField
    //           control={form.control}
    //           name="email"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Email</FormLabel>
    //               <FormControl>
    //                 <Input
    //                   placeholder="m@example.com"
    //                   type="email"
    //                   autoComplete="email"
    //                   {...field}
    //                 />
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <FormField
    //           control={form.control}
    //           name="password"
    //           render={({ field }) => (
    //             <FormItem>
    //               <FormLabel>Password</FormLabel>
    //               <FormControl>
    //                 <div className="relative">
    //                   <Input
    //                     placeholder="••••••••"
    //                     type={showPassword ? 'text' : 'password'}
    //                     autoComplete="current-password"
    //                     className="pr-10"
    //                     {...field}
    //                   />
    //                   <Button
    //                     type="button"
    //                     variant="ghost"
    //                     size="sm"
    //                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
    //                     onClick={() => setShowPassword(!showPassword)}
    //                   >
    //                     {showPassword ? (
    //                       <EyeOffIcon className="h-4 w-4" />
    //                     ) : (
    //                       <EyeIcon className="h-4 w-4" />
    //                     )}
    //                   </Button>
    //                 </div>
    //               </FormControl>
    //               <FormMessage />
    //             </FormItem>
    //           )}
    //         />

    //         <Button type="submit" className="w-full" disabled={isLoading}>
    //           {isLoading && (
    //             <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
    //           )}
    //           Sign In
    //         </Button>
    //       </form>
    //     </Form>
    //   </CardContent>
    // </Card>
    <Card className="w-[350px] max-w-[90vw]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">
            <Icons.message />
            Google
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.github />
            GitHub
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="••••••••"
                          type={showPassword ? 'text' : 'password'}
                          autoComplete="current-password"
                          className="pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-4 w-4" />
                          ) : (
                            <EyeIcon className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login with Email'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
