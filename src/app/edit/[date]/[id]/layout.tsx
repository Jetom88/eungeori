'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { pointer } from '@/app/styles/global.css';
import { paddingSprinkles } from '@/app/styles/padding.css';
import { recordContainer } from '@/app/record/styles/record.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <section className={recordContainer}>
      <article className={`${paddingSprinkles({ paddingBottom: 's32' })} ${pointer}`}>
        <Image
          src="/svgs/prev.svg"
          alt="back"
          width={17}
          height={21}
          onClick={() => {
            router.push('/record');
          }}
        />
      </article>

      {children}
    </section>
  );
}
