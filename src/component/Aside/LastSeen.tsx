import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

interface LastSeenProps {
    date: Date | string;
}

export function LastSeen({ date }: LastSeenProps) {
    const formatLastSeen = (input: Date | string): string => {
        const d = input instanceof Date ? input : new Date(input);

        if (isNaN(d.getTime())) {
            return '';
        }

        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMin = diffMs / 1000 / 60;

        if (diffMin < 1) return "à l'instant";
        if (diffMin < 60) return formatDistanceToNow(d, { addSuffix: true, locale: fr });
        if (isToday(d)) return format(d, 'HH:mm');
        if (isYesterday(d)) return `hier à ${format(d, 'HH:mm')}`;
        return format(d, 'dd/MM/yyyy', { locale: fr });
    };

    return <span>{formatLastSeen(date)}</span>;
}