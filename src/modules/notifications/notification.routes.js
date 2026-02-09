router.get("/", auth, getNotifications);
router.patch("/:id/read", auth, markAsRead);