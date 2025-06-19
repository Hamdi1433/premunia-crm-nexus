'use client'

import { useState, useEffect } from 'react'

// Types pour l'utilisateur
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'commercial'
  avatar_url?: string
  created_at: string
  updated_at: string
  is_active: boolean
}

// Types pour les prospects
export interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  company: string
  age?: number
  segment: 'Senior' | 'Premium' | 'Standard'
  score: number
  status: 'Nouveau' | 'Qualifié' | 'En cours' | 'Converti' | 'Perdu'
  assigned_to?: string
  created_at: string
  updated_at: string
  source: 'Excel' | 'HubSpot' | 'GoogleSheets' | 'Manuel' | 'Import'
  revenue_potential: number
  last_contact?: string
  notes?: string
  health_situation?: {
    current_insurance: string
    health_issues: string[]
    budget_range: string
    urgency_level: 'low' | 'medium' | 'high'
  }
}

// Hook pour l'authentification
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Vérifier s'il y a un utilisateur en session
    const savedUser = localStorage.getItem('premunia_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Simulation de connexion avec différents rôles
      let role: 'admin' | 'manager' | 'commercial' = 'commercial'
      let name = 'Utilisateur'
      
      if (email.includes('admin')) {
        role = 'admin'
        name = 'Admin Premunia'
      } else if (email.includes('manager')) {
        role = 'manager'
        name = 'Manager Commercial'
      } else {
        role = 'commercial'
        name = 'Commercial Senior'
      }

      const mockUser: User = {
        id: '1',
        email,
        name,
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_active: true
      }

      setUser(mockUser)
      localStorage.setItem('premunia_user', JSON.stringify(mockUser))
      
      return { data: mockUser, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('premunia_user')
    return { error: null }
  }

  return {
    user,
    loading,
    signIn,
    signOut,
  }
}

// Hook pour les prospects avec données de démonstration
export function useProspects() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Données de démonstration pour les prospects seniors
    const mockProspects: Prospect[] = [
      {
        id: '1',
        name: 'Pierre Dubois',
        email: 'pierre.dubois@email.com',
        phone: '0123456789',
        company: 'Retraité',
        age: 68,
        segment: 'Senior',
        score: 85,
        status: 'Qualifié',
        source: 'Manuel',
        revenue_potential: 3500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        health_situation: {
          current_insurance: 'Mutuelle A',
          health_issues: ['Optique', 'Dentaire'],
          budget_range: 'Premium (>100€)',
          urgency_level: 'medium'
        }
      },
      {
        id: '2',
        name: 'Marie Retraite',
        email: 'marie.retraite@email.com',
        phone: '0123456790',
        company: 'Retraitée',
        age: 72,
        segment: 'Senior',
        score: 92,
        status: 'En cours',
        source: 'Excel',
        revenue_potential: 4200,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        health_situation: {
          current_insurance: 'Sécu uniquement',
          health_issues: ['Hospitalisation', 'Médecines douces'],
          budget_range: 'Premium (>100€)',
          urgency_level: 'high'
        }
      },
      {
        id: '3',
        name: 'Jean Actif',
        email: 'jean.actif@email.com',
        phone: '0123456791',
        company: 'Consultant',
        age: 63,
        segment: 'Premium',
        score: 75,
        status: 'Nouveau',
        source: 'HubSpot',
        revenue_potential: 2800,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        health_situation: {
          current_insurance: 'Mutuelle B',
          health_issues: ['Optique'],
          budget_range: 'Standard (50-100€)',
          urgency_level: 'low'
        }
      },
      {
        id: '4',
        name: 'Sophie Senior',
        email: 'sophie.senior@email.com',
        phone: '0123456792',
        company: 'Retraitée',
        age: 69,
        segment: 'Senior',
        score: 88,
        status: 'Qualifié',
        source: 'GoogleSheets',
        revenue_potential: 3900,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        health_situation: {
          current_insurance: 'Mutuelle C',
          health_issues: ['Dentaire', 'Hospitalisation'],
          budget_range: 'Premium (>100€)',
          urgency_level: 'medium'
        }
      },
      {
        id: '5',
        name: 'Robert Martin',
        email: 'robert.martin@email.com',
        phone: '0123456793',
        company: 'Retraité',
        age: 74,
        segment: 'Senior',
        score: 79,
        status: 'Converti',
        source: 'Manuel',
        revenue_potential: 4500,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        health_situation: {
          current_insurance: 'Mutuelle Premium',
          health_issues: ['Optique', 'Dentaire', 'Hospitalisation'],
          budget_range: 'Premium (>100€)',
          urgency_level: 'low'
        }
      }
    ]

    setTimeout(() => {
      setProspects(mockProspects)
      setLoading(false)
    }, 500)
  }, [])

  const createProspect = async (prospect: Omit<Prospect, 'id' | 'created_at' | 'updated_at'>) => {
    const newProspect: Prospect = {
      ...prospect,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    setProspects(prev => [newProspect, ...prev])
    return { data: newProspect, error: null }
  }

  const updateProspect = async (id: string, updates: Partial<Prospect>) => {
    setProspects(prev => prev.map(p => 
      p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
    ))
    return { data: null, error: null }
  }

  const deleteProspect = async (id: string) => {
    setProspects(prev => prev.filter(p => p.id !== id))
    return { error: null }
  }

  return {
    prospects,
    loading,
    createProspect,
    updateProspect,
    deleteProspect,
    reloadProspects: () => {},
  }
}

// Hook pour les opportunités
export function useOpportunities() {
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  return {
    opportunities,
    loading,
    createOpportunity: async () => ({ data: null, error: null }),
    updateOpportunity: async () => ({ data: null, error: null }),
    reloadOpportunities: () => {},
  }
}

// Hook pour les campagnes marketing
export function useMarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  return {
    campaigns,
    loading,
    createCampaign: async () => ({ data: null, error: null }),
    updateCampaign: async () => ({ data: null, error: null }),
    reloadCampaigns: () => {},
  }
}