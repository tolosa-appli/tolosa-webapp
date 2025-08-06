import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Page d'accueil de Cossí va ?">
      <Image
        src="http://bilingue31.free.fr/Logo_Tolosa_Rose.jpg"
        alt="Logo Cossí va ?"
        width={100}
        height={100}
        className="rounded-full"
      />
      <span className="font-bold text-xl font-headline text-foreground group-data-[collapsible=icon]:hidden">
        Au pays de la chocolatine
      </span>
    </Link>
  );
}
