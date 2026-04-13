import { useState } from 'react';

export default function useAuth() {
  const [user, setUser] = useState(null);
  // Add auth logic here
  return { user, setUser };
}
