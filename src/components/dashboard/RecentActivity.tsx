
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Activity {
  id: string;
  type: string;
  description: string;
  date: string;
}

export function RecentActivity() {
  const { profile } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      if (!profile) return;

      try {
        // Récupérer les tâches récentes
        const { data: taches } = await supabase
          .from('taches')
          .select('id, titre, date_creation, statut')
          .order('date_creation', { ascending: false })
          .limit(5);

        const activities: Activity[] = [];

        if (taches) {
          taches.forEach(tache => {
            activities.push({
              id: tache.id,
              type: 'tache',
              description: `Tâche "${tache.titre}" ${tache.statut === 'termine' ? 'terminée' : 'créée'}`,
              date: tache.date_creation
            });
          });
        }

        // Trier par date
        activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        setActivities(activities.slice(0, 5));
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }
    };

    fetchRecentActivity();
  }, [profile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
        <CardDescription>
          Vos dernières actions sur la plateforme
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune activité récente</p>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(activity.date), { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
