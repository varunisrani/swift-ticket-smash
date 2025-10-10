import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  name: string;
  category: 'admin' | 'electrical' | 'security' | 'it_service';
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
    case 'security':
      return '/security';
    case 'it_service':
      return '/it-service';
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
    case 'security':
      return 'Security';
    case 'it_service':
      return 'IT Service';
    default:
      return 'Unknown';
  }
};
