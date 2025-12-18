import { supabase } from "./../util/supabase";

export async function register(email, password, firstName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: firstName, // 👈 display name
      },
    },
  });

  return { data, error };
}
