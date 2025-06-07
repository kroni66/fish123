import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, Fish } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login, isLoading, error } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      setSubmitError(null);
      await login(data);
      // Small delay to ensure auth state is updated before navigation
      setTimeout(() => {
        setLocation("/dashboard");
      }, 100);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Přihlášení se nezdařilo");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-green-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Fish className="h-12 w-12 text-blue-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Přihlášení
            </CardTitle>
            <CardDescription className="text-blue-200">
              Přihlaste se do svého účtu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="vas.email@example.com"
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Heslo
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-400 text-sm">{errors.password.message}</p>
                )}
              </div>

              {(submitError || error) && (
                <Alert className="bg-red-500/20 border-red-500/50 text-red-100">
                  <AlertDescription>
                    {submitError || error}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Přihlašování...
                  </>
                ) : (
                  "Přihlásit se"
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <p className="text-blue-200 text-sm">
                Nemáte účet?{" "}
                <Link href="/register" className="text-blue-400 hover:text-blue-300 underline">
                  Registrovat se
                </Link>
              </p>
              <Link href="/" className="text-gray-400 hover:text-gray-300 text-sm underline">
                Zpět na hlavní stránku
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}