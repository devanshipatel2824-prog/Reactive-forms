export interface Student {
    id: string;
    name: string;
    phone: number;
    email: string;
    address: string;
    gender: Gender
}
export interface Teacher{
    id: string;
    name: string;
    phone: number;
    email: string;
    address: string;
    gender: Gender
}
export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'

}