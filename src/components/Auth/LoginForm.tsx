'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState('admin')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulation de connexion avec différents rôles
    setTimeout(() => {
      onLogin(email || 'admin@premunia.fr', password || 'password')
      setLoading(false)
    }, 1000)
  }

  const handleQuickLogin = (role: string) => {
    setLoading(true)
    setTimeout(() => {
      onLogin(`${role}@premunia.fr`, 'password')
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premunia CRM
          </h1>
          <p className="text-gray-600 mt-2">Mutuelle Santé Seniors - Plateforme Complète</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl text-gray-800">Connexion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@premunia.fr"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Ou connexion rapide</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={() => handleQuickLogin('admin')}
                variant="outline" 
                className="w-full border-blue-200 hover:bg-blue-50"
                disabled={loading}
              >
                👑 Administrateur - Accès Complet
              </Button>
              
              <Button 
                onClick={() => handleQuickLogin('manager')}
                variant="outline" 
                className="w-full border-green-200 hover:bg-green-50"
                disabled={loading}
              >
                🛡️ Gestionnaire - Supervision Équipe
              </Button>
              
              <Button 
                onClick={() => handleQuickLogin('commercial')}
                variant="outline" 
                className="w-full border-purple-200 hover:bg-purple-50"
                disabled={loading}
              >
                🎯 Commercial - Gestion Prospects
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              <p>🚀 Fonctionnalités disponibles :</p>
              <p>• Dashboard Analytics • Marketing Automation</p>
              <p>• Comparateur Oggo • Reporting Avancé</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}