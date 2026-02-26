import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  show: boolean;
  onClose: () => void;
}

export function Notification({ type, message, show, onClose }: NotificationProps) {
  const config = {
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-[#10B981]',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-[#EF4444]',
    },
  };

  const { icon: Icon, bg, border, text } = config[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 right-4 z-50"
        >
          <div className={`${bg} ${border} border rounded-lg p-4 flex items-center gap-3 max-w-md`}>
            <Icon className={text} size={24} />
            <p className="text-[#111827] font-medium flex-1">{message}</p>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}