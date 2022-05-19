export type OfficeType = 'personal' | 'team' | 'collaborative'
export interface IOffice {
    id: number
    name: string
    address: string
    price: number
    officeType: OfficeType
}
