"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
export const Breadcrumb = () => {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const crumbs = [{ href: '/', label: 'Home' }, ...parts.map((p, i) => ({
            href: '/' + parts.slice(0, i + 1).join('/'),
            label: p.charAt(0).toUpperCase() + p.slice(1),
        }))];
    return (<nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex items-center text-sm text-secondaryText">
        {crumbs.map((c, idx) => (<li key={c.href} className="flex items-center">
            <Link href={c.href} className="hover:underline">
              {c.label}
            </Link>
            {idx < crumbs.length - 1 && (<ChevronRightIcon className="h-4 w-4 mx-2" aria-hidden="true"/>)}
          </li>))}
      </ol>
    </nav>);
};
