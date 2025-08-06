import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Page d'accueil de Cossí va ?">
      <Image
        src="http://bilingue31.free.fr/Logo_Tolosa_Rose.jpg"
        alt="Logo Cossí va ?"
        width={80}
        height={80}
        className="rounded-full sm:w-[80px] sm:h-[80px] lg:w-[110px] lg:h-[70px]"
      />
      <span className="hidden md:block font-bold text-lg sm:text-xl font-headline text-foreground">
        Au pays de la chocolatine
      </span>
    </Link>
  );
}
