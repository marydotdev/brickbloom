"use client";

import { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";

const UserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = getUserId();
    console.log(`User ID: ${userId}`);
    setUserId(userId);
  }, []);

  return (
    <a href={`/gallery/${userId}`}>{userId}</a>
  );
};

export default UserId;
