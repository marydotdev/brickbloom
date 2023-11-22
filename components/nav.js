import Link from "next/link";
import Image from "next/image";


export default function Nav() {
  return (
    <nav className="p-4">
      <div className="flex gap-2 items-center">
        <div>
          <Image
            src="/brickbloom.png"
            alt="Brick Bloom"
            width={40}
            height={40}
          />
        </div>
        <div>
          <Link href="/">
            <h1 className='text-4xl uppercase font-bold'>Brick Bloom</h1>
          </Link>
        </div>
      </div>
    </nav>
  );
}
