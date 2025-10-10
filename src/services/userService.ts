import { supabase } from '@/integrations/supabase/client';

export interface SwiftUser {
  id: string;
  name: string;
  password: string;
  created_at: string;
  category: 'admin' | 'electrical' | 'security' | 'it_service';
}

export const getAllUsers = async (): Promise<SwiftUser[]> => {
  try {
    const { data, error } = await supabase
      .from('swift_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userData: Omit<SwiftUser, 'id' | 'created_at'>): Promise<SwiftUser> => {
  try {
    const { data, error } = await supabase
      .from('swift_users')
      .insert([userData])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: Partial<SwiftUser>): Promise<SwiftUser> => {
  try {
    const { data, error } = await supabase
      .from('swift_users')
      .update(userData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('swift_users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const getUserById = async (id: string): Promise<SwiftUser | null> => {
  try {
    const { data, error } = await supabase
      .from('swift_users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};
