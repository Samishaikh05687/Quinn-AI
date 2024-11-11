import Image from 'next/image';
import * as React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-3 font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        <Image
          src="/images/logo.png"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '150px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
      </div>
      <ul className="flex gap-8 justify-between self-stretch my-auto text-lg leading-5 text-neutral-700 max-md:flex-wrap max-md:max-w-full font-normal md:flex relative">
        {['/', '/pricing','/newspage', '/features', '/contact'].map((path, index) => {
          const titles = ["Home", "Pricing","News Room", "Features", "Contact Us"];
          return (
            <li key={index} className="relative group">
              <Link href={path} className="transition duration-300 text-neutral-700 hover:text-orange relative z-10">
                {titles[index]}
              </Link>
              <span className="absolute left-0 bottom-6 w-full h-0.2 bg-orange transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </li>
          );
        })}
      </ul>
      <Button className="bg-orange px-4 py-2 font-bold rounded-sm text-pretty text-white">
        <Link href="/dashboard">Free Trial</Link>
      </Button>
    </div>
  );
}

export default NavBar;
