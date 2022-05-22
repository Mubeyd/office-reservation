export type OfficeType = 'personal' | 'team' | 'collaborative'
export interface IOffice {
    id: number
    name: string
    active: boolean
    address: string
    price: number
    officeType: OfficeType
    imageUrl: string
    description: string
}
