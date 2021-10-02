import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css'
import 'styles/base/_base.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} className={'test'} />
);

export default App;
