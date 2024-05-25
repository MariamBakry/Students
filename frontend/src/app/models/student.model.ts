export interface Student {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    birthDate: Date | { year: number, month: number, day: number };
    country: string;
    status: string;
}