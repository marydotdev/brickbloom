"use client";

import { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";

const UserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  return (
    <div className="text-zinc-400 hover:text-zinc-800">
      <a href={`/gallery/${userId}`}>
          <p className="inline-block">gallery</p>
      </a>
    </div>
  );
};

export default UserId;
