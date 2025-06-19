
"use client";

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/components/auth/AuthProvider';

export default function DashboardPage() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bonjour {profile?.prenom} !
        </h1>
        <p className="text-muted-foreground">
          Voici un aperçu de votre activité sur Premunia CRM
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        
        <div className="space-y-4">
          {profile?.role === 'admin' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900">Administration</h3>
              <p className="text-sm text-blue-700 mt-1">
                Vous avez accès à tous les modules d'administration du CRM
              </p>
            </div>
          )}
          
          {profile?.role === 'gestionnaire' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-900">Gestion d'équipe</h3>
              <p className="text-sm text-green-700 mt-1">
                Supervisez votre équipe et leurs performances
              </p>
            </div>
          )}
          
          {profile?.role === 'conseiller' && (
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="font-medium text-purple-900">Commercial</h3>
              <p className="text-sm text-purple-700 mt-1">
                Gérez vos contacts et votre pipeline de vente
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
