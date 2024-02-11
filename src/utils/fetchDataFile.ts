// fetchDataFile.ts

import { useState, useEffect } from 'react';
import supabase  from './supabaseClient'; // Make sure to replace with the correct path

// Fetch data
interface User {
  email: string;
  monthly_budget: number | null;
}

export const useFetchData = () => {
  const [fetchError ] = useState(null);
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    async function getUserData() {
      try {
        // fetch user data
        const { data, error } = await supabase.from('users').select();

        if (data) {
          console.log('Data from Supabase:', data);
          setUsers(data);
        }
        if (error) {
          console.error('Error fetching data:', error);
        }
      } catch (error) {
        console.error('Error in async operation:', error);
      }
    }
    getUserData();
  }, []);

  console.log(users, 'SUPAdb');

  return { fetchError, users };
};
