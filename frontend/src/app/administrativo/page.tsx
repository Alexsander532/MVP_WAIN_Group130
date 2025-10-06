'use client'

import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { 
  Settings, 
  Save, 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Lock, 
  Eye, 
  EyeOff,
  Palette,
  Monitor,
  Smartphone,
  CheckCircle,
  RefreshCw,
  Download,
  Upload,
  Trash2
} from 'lucide-react'
import { useState } from 'react'

export default function AdministrativoPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Configurações Gerais
    siteName: 'Weather Artificial Intelligence NASA (WAIN)',
    siteDescription: 'Sistema de inteligência artificial para análise meteorológica da NASA',
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR',
    
    // Configurações de Usuário
    adminEmail: 'user@nasa.com.br',
    adminName: 'User',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    
    // Configurações de Notificação
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: true,
    
    // Configurações de Sistema
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: 'daily',
    
    // Configurações de Aparência
    theme: 'light',
    primaryColor: '#3b82f6',
    compactMode: false
  })

  const handleInputChange = (key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Aqui seria implementada a lógica de salvamento
    console.log('Configurações salvas:', settings)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage system settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Restore Defaults
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* System Status */}
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="font-medium text-green-700 dark:text-green-300">System Online</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Running normally</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-blue-700 dark:text-blue-300">Last Update</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-purple-700 dark:text-purple-300">Version</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">v2.1.0</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">System Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder="Enter system name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Description</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  placeholder="System description"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone"
                    className="w-full p-2 border rounded-md"
                    value={settings.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option value="America/Sao_Paulo">São Paulo (UTC-3)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                    <option value="Europe/London">London (UTC+0)</option>
                    <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select 
                    id="language"
                    className="w-full p-2 border rounded-md"
                    value={settings.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adminName">Administrator Name</Label>
                <Input
                  id="adminName"
                  value={settings.adminName}
                  onChange={(e) => handleInputChange('adminName', e.target.value)}
                  placeholder="Full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Administrator Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange('adminEmail', e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={settings.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter your current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification and Security Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Browser notifications</p>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, pushNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Text message notifications</p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked: boolean) => setSettings({...settings, smsNotifications: checked})}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Block system access</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Show debug information</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.debugMode}
                  onChange={(e) => handleInputChange('debugMode', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Lock className="w-4 h-4 mr-2" />
                  Configure 2FA Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Backup and Appearance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Backup */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Automatic Backup</Label>
                  <p className="text-sm text-muted-foreground">Daily data backup</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleInputChange('autoBackup', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Backup Frequency</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={settings.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Download Backup
                </Button>
                <Button variant="outline" className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Restore
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex gap-2">
                  <Button
                    variant={settings.theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('theme', 'light')}
                  >
                    <Monitor className="w-4 h-4 mr-2" />
                    Light
                  </Button>
                  <Button
                    variant={settings.theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleInputChange('theme', 'dark')}
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="w-12 h-8 border rounded"
                  />
                  <Input
                    value={settings.primaryColor}
                    onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">Denser interface</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.compactMode}
                  onChange={(e) => handleInputChange('compactMode', e.target.checked)}
                  className="w-4 h-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <RefreshCw className="w-6 h-6" />
                <span className="font-medium">Clear Cache</span>
                <span className="text-xs text-muted-foreground text-center">
                  Remove temporary files
                </span>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <Download className="w-6 h-6" />
                <span className="font-medium">Export Data</span>
                <span className="text-xs text-muted-foreground text-center">
                  Download all data
                </span>
              </Button>
              
              <Button variant="destructive" className="h-auto p-4 flex flex-col items-center gap-2">
                <Trash2 className="w-6 h-6" />
                <span className="font-medium">Reset System</span>
                <span className="text-xs text-white/80 text-center">
                  Restore settings
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}