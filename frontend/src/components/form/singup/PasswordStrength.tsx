// components/PasswordStrength.tsx
import {useEffect, useState} from 'react';

type Strength = 'weak' | 'medium' | 'strong' | 'empty';

export const PasswordStrength = ({password}: { password: string }) => {
    const [strength, setStrength] = useState<Strength>('empty');
    const [width, setWidth] = useState('0%');

    useEffect(() => {
        const calculateStrength = () => {
            if (password.length === 0) return 'empty';
            if (password.length < 6) return 'weak';
            if (password.length >= 6 && password.length <= 10) return 'medium';
            if (password.length > 10 || /[!@#$%^&*]/.test(password)) return 'strong';
            return 'medium';
        };

        const newStrength = calculateStrength();
        setStrength(newStrength);

        const widths = {
            empty: '0%',
            weak: '33%',
            medium: '66%',
            strong: '100%'
        };

        setWidth(widths[newStrength]);
    }, [password]);

    const getColor = () => {
        switch (strength) {
            case 'weak':
                return 'bg-red-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'strong':
                return 'bg-green-500';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="mt-2 space-y-1">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className={`${getColor()} h-full transition-all duration-500 ease-out`}
                    style={{width}}
                />
            </div>
            {strength !== 'empty' && (
                <span className={`text-sm font-medium ${getColor().replace('bg', 'text')}`}>
          {strength.charAt(0).toUpperCase() + strength.slice(1)} Password
        </span>
            )}
        </div>
    );
};