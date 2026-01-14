import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwugmbmaddwkpklmrxff.supabasehttps://rdfofxjduwbvwvbfmaor.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkZm9meGpkdXdidnd2YmZtYW9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDIxMTYsImV4cCI6MjA3OTgxODExNn0.5rKvE0P4hgrheo29H9z0x-_z0tGZPS-5unLl4wiK4e4";
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
