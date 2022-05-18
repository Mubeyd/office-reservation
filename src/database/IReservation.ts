export type PeriodType = "day" | "month" | "year"

export interface IReservation {
    id: number
    userId: number
    officeId: number
    date: Date
    cost: number
    period: number
    periodType: PeriodType
}