import { supabase } from "../../../../SandMerchantAvent/packages/util/supabase";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
}
