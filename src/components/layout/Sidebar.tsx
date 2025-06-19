
"use client";

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { 
  Home, 
  Users, 
  FileText, 
  Target, 
  CheckSquare, 
  LifeBuoy, 
  Settings,
  Workflow,
  Mail
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const adminNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/contacts', label: 'Contacts', icon: Users },
  { href: '/propositions', label: 'Propositions', icon: FileText },
  { href: '/contrats', label: 'Contrats', icon: FileText },
  { href: '/taches', label: 'Tâches', icon: CheckSquare },
  { href: '/tickets', label: 'Support', icon: LifeBuoy },
  { href: '/objectifs', label: 'Objectifs', icon: Target },
  { href: '/campagnes', label: 'Campagnes', icon: Mail },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
  { href: '/utilisateurs', label: 'Utilisateurs', icon: Users },
  { href: '/settings', label: 'Paramètres', icon: Settings },
];

const conseillerNavItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/contacts', label: 'Mes Contacts', icon: Users },
  { href: '/propositions', label: 'Mes Propositions', icon: FileText },
  { href: '/contrats', label: 'Mes Contrats', icon: FileText },
  { href: '/taches', label: 'Mes Tâches', icon: CheckSquare },
  { href: '/objectifs', label: 'Mes Objectifs', icon: Target },
];

export function Sidebar() {
  const { profile } = useAuth();
  const location = useLocation();

  if (!profile) return null;

  const navItems = profile.role === 'admin' ? adminNavItems : conseillerNavItems;

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  variant={location.pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    location.pathname === item.href && "bg-blue-100 text-blue-700"
                  )}
                  asChild
                >
                  <Link to={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
