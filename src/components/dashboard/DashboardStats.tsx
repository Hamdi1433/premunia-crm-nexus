
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Users, FileText, CheckCircle, Target } from 'lucide-react';

interface DashboardStatsProps {
  className?: string;
}

export function DashboardStats({ className }: DashboardStatsProps) {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    contacts: 0,
    propositions: 0,
    contrats: 0,
    taches: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!profile) return;

      try {
        // Contacts
        const { count: contactsCount } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true });

        // Propositions
        const { count: propositionsCount } = await supabase
          .from('propositions')
          .select('*', { count: 'exact', head: true });

        // Contrats
        const { count: contratsCount } = await supabase
          .from('contrats')
          .select('*', { count: 'exact', head: true });

        // Tâches
        const { count: tachesCount } = await supabase
          .from('taches')
          .select('*', { count: 'exact', head: true });

        setStats({
          contacts: contactsCount || 0,
          propositions: propositionsCount || 0,
          contrats: contratsCount || 0,
          taches: tachesCount || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [profile]);

  const statsCards = [
    {
      title: "Contacts",
      value: stats.contacts,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Propositions",
      value: stats.propositions,
      icon: FileText,
      color: "text-green-600"
    },
    {
      title: "Contrats",
      value: stats.contrats,
      icon: CheckCircle,
      color: "text-purple-600"
    },
    {
      title: "Tâches",
      value: stats.taches,
      icon: Target,
      color: "text-orange-600"
    }
  ];

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
