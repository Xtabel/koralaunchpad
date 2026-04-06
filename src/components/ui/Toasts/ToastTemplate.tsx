
import '@/index.css'
import { type ReactNode } from 'react';

const ToastTemplate = ({message, icon}:{message:string; icon?:ReactNode}) => {
  return (
    <div className="custom-toast">
      {icon}
      <div className="divider" />
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default ToastTemplate;