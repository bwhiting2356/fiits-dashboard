import { Event } from 'src/app/models/event.model';

export const mockEvents: Event[] = [
    {
        id: 1,
        time: '1970-01-01T00:00:01.000+0000',
        potentialLowInv: 1,
        potentialHighInv: 1
    },
    {
        id: 2,
        time: '1971-01-01T00:00:01.000+0000',
        potentialLowInv: 2,
        potentialHighInv: 1
    }
];
