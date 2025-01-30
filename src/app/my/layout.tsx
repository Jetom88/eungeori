import { Metadata } from 'next';
import Navigation from '../_components/common/navigation';
import { myContainer, myWrapper } from './_my.css';

export const metadata: Metadata = {
  title: '마이 페이지',
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={myWrapper}>
      <article className={myContainer}>{children}</article>
      <Navigation />
    </section>
  );
};

export default layout;
