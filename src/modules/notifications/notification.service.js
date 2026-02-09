import { supabase } from "../../config/supabase.js";
import admin from "../../config/firebase.js"; // استيراد الفايربيز اللي انت جهزته

export const createNotification = async ({
  userId,
  fcmToken, // لازم تستلم التوكن الخاص بجهاز المستخدم هنا
  title,
  body,
  type,
  data
}) => {
  // أولاً: حفظ في قاعدة البيانات (Supabase)
  const { error } = await supabase
    .from("notifications")
    .insert([{ user_id: userId, title, body, type, data }]);

  if (error) throw error;

  // ثانياً: إرسال الإشعار للموبايل عبر Firebase
  if (fcmToken) {
    const message = {
      token: fcmToken,
      notification: { title, body },
      data: data || {} // بيانات إضافية لو حابب
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message:", response);
    } catch (fcmError) {
      console.error("FCM Error:", fcmError);
      // اختياري: لا توقف العملية لو فشل الإرسال طالما تخزن في الداتابيز
    }
  }
};