import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  name: string;
  category: 'admin' | 'electrical' | 'civil' | 'it' | 'it_service' | 'maintenance' | 'housekeeping' | 'front_office' | 'security' | 'drivers' | 'general_ward' | 'icu' | 'ot' | 'nursing' | 'billing';
}

export const authenticateUser = async (username: string, password: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('swift_users')
      .select('*')
      .eq('name', username)
      .eq('password', password)
      .single();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      category: data.category
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

export const getPortalPath = (category: string): string => {
  switch (category) {
    case 'admin':
      return '/admin';
    case 'electrical':
      return '/electrical';
    case 'civil':
      return '/civil';
    case 'it':
      return '/it';
    case 'it_service':
      return '/it-service';
    case 'maintenance':
      return '/maintenance';
    case 'housekeeping':
      return '/housekeeping';
    case 'front_office':
      return '/front-office';
    case 'security':
      return '/security';
    case 'drivers':
      return '/drivers';
    case 'general_ward':
      return '/general-ward';
    case 'icu':
      return '/icu';
    case 'ot':
      return '/ot';
    case 'nursing':
      return '/nursing';
    case 'billing':
      return '/billing';
    default:
      return '/login';
  }
};

export const getCategoryDisplayName = (category: string): string => {
  switch (category) {
    case 'admin':
      return 'Admin';
    case 'electrical':
      return 'Electrical';
    case 'civil':
      return 'Civil';
    case 'it':
      return 'IT';
    case 'it_service':
      return 'IT Service';
    case 'maintenance':
      return 'Maintenance';
    case 'housekeeping':
      return 'Housekeeping';
    case 'front_office':
      return 'Front Office';
    case 'security':
      return 'Security';
    case 'drivers':
      return 'Drivers';
    case 'general_ward':
      return 'General Ward';
    case 'icu':
      return 'ICU';
    case 'ot':
      return 'OT';
    case 'nursing':
      return 'Nursing';
    case 'billing':
      return 'Billing';
    default:
      return 'Unknown';
  }
};
