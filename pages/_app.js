import Navbar from '@/components/Navbar';
import '../styles/globals.css';
import { DefaultSeo } from 'next-seo';
import { defaultSeoProps } from '../constants';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo {...defaultSeoProps} />
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
