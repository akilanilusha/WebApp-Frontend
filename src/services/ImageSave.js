import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwugmbmaddwkpklmrxff.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3dWdtYm1hZGR3a3BrbG1yeGZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MzI0NzgsImV4cCI6MjA3NzQwODQ3OH0.o6H8y7LP4ccWq1yIugvUosKqRLd_qYiJBexifvmmXGU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImageToSupabase = async (file) => {
  try {
    const filePath = `public/${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (error) return null;

    const { data: urlData } = supabase.storage
      .from("images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error(err);
    return null;
  }
};
