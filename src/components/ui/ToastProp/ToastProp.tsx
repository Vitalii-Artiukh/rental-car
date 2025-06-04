import { Toaster } from 'react-hot-toast';
import { FC } from 'react';

const ToastProp: FC = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        success: {
          style: {
            color: 'var(--button-hover)',
            backgroundColor: 'var(--gray-light)',
            fontWeight: 'serif',
            padding: '8px 30px',
            borderRadius: '10px',
            fontSize: 16,
            lineHeight: 1.2,
            width: 700,
          },
          duration: 4000,
        },
      }}
    />
  );
};

export default ToastProp;
