import { Database } from "../types/supabase";

export type Poll = Database["public"]["Tables"]["polls"]["Row"];