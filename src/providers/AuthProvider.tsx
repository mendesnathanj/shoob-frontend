import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useAuth } from '@/hooks/useAuth';
import { User } from '@/models/v2';

export default function AuthProvider({ children }: React.PropsWithChildren<any>) {
  const { user, setUser } = useAuth();
  const { data, isLoading } = useQuery('currentUser', () => (
    User.where({ me: true }).first().then((res) => res.data)
  ));

  useEffect(() => {
    if (isLoading) return;

    setUser(data);
  }, [isLoading, data?.id]);

  if (isLoading) return null;
  if (!user) return 'Please login.';

  return children;
}
