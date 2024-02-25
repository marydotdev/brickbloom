"use client";

import { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";
import { Images } from 'lucide-react';

const UserId = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userId = getUserId();
    setUserId(userId);
  }, []);

  return (
    <div>
      <a href={`/gallery/${userId}`}>
        <div className='flex items-center gap-2'>
          <Images className="h-4 w-4" />
          <p className="inline-block">Gallery</p>
        </div>
      </a>
    </div>
  );
};

export default UserId;
