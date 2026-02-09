import { supabase } from "../../config/supabase.js";
export const getNotifications = async (req, res) => {
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  res.json(data);
};

export const markAsRead = async (req, res) => {
  await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", req.params.id)
    .eq("user_id", req.user.id);

  res.json({ success: true });
};