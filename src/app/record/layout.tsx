import { Metadata } from 'next';
import Navigation from '../_components/common/navigation';
import { recordContainer, recordWrapper } from './_styles/record.css';

export const metadata: Metadata = {
  title: '캘린더',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={recordWrapper}>
      <article className={recordContainer}>{children}</article>
      <Navigation />
    </section>
  );
};

export default layout;
