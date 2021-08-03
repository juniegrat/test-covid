import { useEffect } from 'react';
import { Modal } from '@redq/reuse-modal';
import '@redq/reuse-modal/es/index.css';
import 'common/assets/css/flaticon.css';
import 'swiper/swiper-bundle.css';
import firebase from 'common/lib/firebase/firebase';
import { AuthUserProvider } from 'common/contexts/AuthProvider';
import 'common/components/Timer/timer.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

export default function CustomApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      firebase.analytics();
    }
  }, []);
  return (
    <AuthUserProvider>
      <Modal>
        <Component {...pageProps} />
      </Modal>
    </AuthUserProvider>
  );
}
