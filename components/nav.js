import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import seeds from "../lib/seeds";

export default function Nav() {
  const router = useRouter();
  const { id } = router.query;
  const [linkCopied, setLinkCopied] = useState(false);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(window.location.toString());
    setLinkCopied(true);
  };

  const redirectToRandom = () => {
    if (router.pathname == "/memories") {
      router.pathname = "/";
      router.push(router);
    } else {
      const seed = seeds[Math.floor(Math.random() * seeds.length)];
      router.query.id = seed;

      router.push(router);
      setTimeout(() => {
        router.reload();
      }, 500);
    }
  };

  // Clear the "Copied!" message after 4 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLinkCopied(false);
    }, 4 * 1000);

    return () => clearInterval(intervalId);
  }, [id]);

  const logoRef = useRef(null);


  return (
    <nav className="p-5 border-t-4 border-t-brand">
      <div className="flex gap-2 items-center">
        <div>
          <Image
            src="/brickbloom.png"
            alt="Brick Bloom"
            width={50}
            height={50}
          />
        </div>
        <div>
          <h1 className='text-4xl uppercase font-bold'>Brick Bloom</h1>
        </div>
      </div>
    </nav>
  );
}
