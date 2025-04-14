"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axios from "axios"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Password validation criteria
  const hasMinLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)
  const passwordsMatch = password === confirmPassword && password !== ""

  // Calculate password strength
  const calculatePasswordStrength = () => {
    let strength = 0
    if (hasMinLength) strength += 1
    if (hasUpperCase) strength += 1
    if (hasLowerCase) strength += 1
    if (hasNumber) strength += 1
    if (hasSpecialChar) strength += 1
    return strength
  }

  // Update password strength when password changes
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordStrength(calculatePasswordStrength())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!passwordsMatch) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
        axios.post("/api/auth/signup", {
        email,
        password,
        }).then((response) => {
            console.log(response.data);
        }
        ).catch((error) => {
            console.error(error.response.data);
        }
    )

      // In a real app, you would call your registration API here
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Redirect to dashboard on successful signup
      window.location.href = "/dashboard"
    } catch (error) {
      console.error("Signup failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="flex-1 bg-muted hidden md:flex items-center justify-center p-10">
        <div className="max-w-md">
          <Image
            src="/signupp.png"
            alt="Budget Management Illustration"
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
            priority
          />
          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold">Take Control of Your Finances</h2>
            <p className="text-muted-foreground mt-2">
              Join thousands of users who manage their expenses efficiently with our tracker.
            </p>
          </div>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details to get started with expense tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                  </Button>
                </div>

                {/* Password strength indicator */}
                {password && (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < passwordStrength
                              ? passwordStrength < 3
                                ? "bg-red-500"
                                : passwordStrength < 5
                                ? "bg-yellow-500"
                                : "bg-green-500"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs space-y-1">
                      <div
                        className={`flex items-center gap-1 ${hasMinLength ? "text-green-500" : "text-muted-foreground"}`}
                      >
                        {hasMinLength && <CheckCircle2 className="h-3 w-3" />}
                        At least 8 characters
                      </div>
                      <div
                        className={`flex items-center gap-1 ${hasUpperCase ? "text-green-500" : "text-muted-foreground"}`}
                      >
                        {hasUpperCase && <CheckCircle2 className="h-3 w-3" />}
                        Uppercase letter
                      </div>
                      <div
                        className={`flex items-center gap-1 ${hasLowerCase ? "text-green-500" : "text-muted-foreground"}`}
                      >
                        {hasLowerCase && <CheckCircle2 className="h-3 w-3" />}
                        Lowercase letter
                      </div>
                      <div
                        className={`flex items-center gap-1 ${hasNumber ? "text-green-500" : "text-muted-foreground"}`}
                      >
                        {hasNumber && <CheckCircle2 className="h-3 w-3" />}
                        Number
                      </div>
                      <div
                        className={`flex items-center gap-1 ${
                          hasSpecialChar ? "text-green-500" : "text-muted-foreground"
                        }`}
                      >
                        {hasSpecialChar && <CheckCircle2 className="h-3 w-3" />}
                        Special character
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !passwordsMatch || passwordStrength < 3}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}