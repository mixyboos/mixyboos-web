import { siteConfig } from "@/config/site";
import LoginForm from "@/components/forms/auth/login-form";
import { Icons } from "@/components/icons";
export default function Login() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="flex flex-col items-center space-y-8 w-full max-w-md">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Icons.mixyboos className="h-16 w-auto" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome to {siteConfig.name}
          </h1>
          <p className="text-muted-foreground text-lg">
            {siteConfig.description}
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
