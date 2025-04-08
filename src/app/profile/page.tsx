"use client"

import { useState, useEffect } from "react"
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Shield, Upload } from "lucide-react"
import { toast } from 'sonner' // Optional: Add toast notifications for better UX

// Define the type for user metadata
interface UserMetadata {
  phone?: string;
  currency?: string;
  twoFactorEnabled?: boolean;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  [key: string]: any; // Allow for additional properties
}

export default function ProfilePage() {
  const { user, error, isLoading: authLoading } = useUser()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [userMetadata, setUserMetadata] = useState<UserMetadata>({})

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      // Set basic user info from Auth0
      setName(user.name || "")
      setEmail(user.email || "")
      
      // Try to get user metadata which may contain additional profile fields
      const metadata = (user.user_metadata as UserMetadata) || {}
      setUserMetadata(metadata)
      
      // Set additional fields from metadata if they exist
      setPhone(metadata.phone || "")
      setCurrency(metadata.currency || "USD")
      setTwoFactorEnabled(metadata.twoFactorEnabled || false)
      setEmailNotifications(metadata.emailNotifications !== undefined ? metadata.emailNotifications : true)
      setPushNotifications(metadata.pushNotifications !== undefined ? metadata.pushNotifications : true)
    }
  }, [user])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          currency,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      toast?.success("Profile updated successfully!")
      // Update local metadata state
      setUserMetadata(prev => ({ ...prev, phone, currency }))
    } catch (error: any) {
      console.error('Error updating profile:', error)
      toast?.error(error.message || "Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSecurityUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          twoFactorEnabled,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update security settings')
      }

      toast?.success("Security settings updated successfully!")
      // Update local metadata state
      setUserMetadata(prev => ({ ...prev, twoFactorEnabled }))
    } catch (error: any) {
      console.error('Error updating security settings:', error)
      toast?.error(error.message || "Failed to update security settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailNotifications,
          pushNotifications,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update notification preferences')
      }

      toast?.success("Notification preferences updated successfully!")
      // Update local metadata state
      setUserMetadata(prev => ({ ...prev, emailNotifications, pushNotifications }))
    } catch (error: any) {
      console.error('Error updating notification preferences:', error)
      toast?.error(error.message || "Failed to update notification preferences")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  if (error) return <div className="text-red-500">Error: {error.message}</div>
  if (!user) return <div className="text-center p-8">Please log in to view your profile.</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled />
                      <p className="text-xs text-muted-foreground mt-1">Name can only be changed through Auth0</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                      <p className="text-xs text-muted-foreground mt-1">Email can only be changed through Auth0</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Preferred Currency</Label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                          <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                          <SelectItem value="JPY">Japanese Yen (JPY)</SelectItem>
                          <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                          <SelectItem value="AUD">Australian Dollar (AUD)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.picture || "/placeholder.svg?height=96&width=96"} alt="Profile" />
                  <AvatarFallback>{name?.substring(0, 2).toUpperCase() || "JD"}</AvatarFallback>
                </Avatar>

                <p className="text-xs text-muted-foreground text-center">
                  Profile picture is managed through your Auth0 account
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication methods</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSecurityUpdate} className="space-y-6">
                <div className="space-y-4">
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                    </div>

                    {twoFactorEnabled && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm mb-2">
                          Two-factor authentication is enabled. You'll be asked to enter a verification code when
                          signing in from a new device.
                        </p>
                        <Button variant="outline" size="sm">
                          <Shield className="mr-2 h-4 w-4" />
                          Configure 2FA
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Active Sessions</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">Current Browser • Active Now</p>
                        </div>
                        <div className="text-sm text-green-600 font-medium">Active Now</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Security Settings"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationUpdate} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-muted-foreground">Receive email notifications</div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Enable Push Notifications</div>
                          <div className="text-sm text-muted-foreground">Receive notifications on your device</div>
                        </div>
                        <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Notification Preferences"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}