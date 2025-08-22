import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Page d'accueil de Cossí va ?">
      <Image
        src="/logo.png"
        alt="Logo Cossí va ?"
        width={120}
        height={80}
        className="rounded-full sm:w-[100px] sm:h-[80px] lg:w-[140px] lg:h-[70px]"
      />
      <span className="hidden md:block font-bold text-lg sm:text-xl font-headline text-foreground">
        Au pays de la chocolatine
      </span>
    </Link>
  );
}
