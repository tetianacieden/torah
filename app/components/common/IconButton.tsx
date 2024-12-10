import { type FC, type ButtonHTMLAttributes } from 'react';
import { buttonStyles } from '@/styles/buttons';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.icon;
  icon: React.ComponentType<{ className?: string }>;
}

export const IconButton: FC<IconButtonProps> = ({ 
  variant = 'primary',
  icon: Icon,
  className = '',
  ...props 
}) => {
  return (
    <button 
      className={`${buttonStyles.icon.base} ${buttonStyles.icon[variant]} ${className}`}
      {...props}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}; 