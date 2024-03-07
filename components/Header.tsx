"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import UserId from "@/components/UserId";

export function Header() {
  return (
    <header>
      <nav>
        <Container className="w-full relative z-50 flex justify-between py-8">
          <div className="w-full relative z-10 flex justify-between items-center">
            <div className="w-full">
              <Link href="/" aria-label="Home">
                <div className="w-full flex items-center gap-2">
                  <Image
                    src="/logo.png"
                    alt="brickbloom"
                    width={32}
                    height={32}
                  />
                  <h1 className="text-xl md:text-2xl font-bold font-protest">brickbloom</h1>
                </div>
              </Link>
            </div>
            <div className='flex gap-2 items-center'>
              <UserId />
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}
