import supabase from "./supabaseClient";

interface SpendingInfo {
}

export async function deleteSpending(indexToDelete: number, updatedMonthlySpending: any[], emailRedux: string, setupdatedMonthlySpending: React.Dispatch<React.SetStateAction<any>>): Promise<SpendingInfo> {
  const newExpenses = [...updatedMonthlySpending];

  newExpenses.splice(indexToDelete, 1);

  setupdatedMonthlySpending(newExpenses);

  try {
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('email, monthly_expenses')
      .eq('email', emailRedux);

    if (userError) {
      console.error('Greška pri dohvaćanju korisničkih podataka:', userError.message);
    }

    if (userData && userData.length > 0) {
      const updatedUserData = {
        email: emailRedux,
        monthly_spending: newExpenses
      };

      const { data, error } = await supabase
        .from('users')
        .update(updatedUserData)
        .eq('email', emailRedux);

      if (error) {
        console.error('Greška pri ažuriranju korisničkih podataka:', error.message);
      }
      console.log(data)
    } else {
      console.log('Kreiranje novog korisnika:', emailRedux);
      const { data, error } = await supabase
        .from('users')
        .upsert(
          [{
            email: emailRedux,
            monthly_spending: newExpenses,
          }],
          { onConflict: 'email' }
        );

      if (error) {
        console.error('Greška pri upisu korisničkih podataka:', error.message);
      }
      console.log(data)
    }
  } catch (error) {
    console.error('Došlo je do greške');
  }

  return {
    // Povratne informacije ako je potrebno
  };
}