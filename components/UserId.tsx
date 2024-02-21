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
    <div className=''>
      <a href={`/gallery/${userId}`}>gallery</a>
    </div>
  );
};

export default UserId;
