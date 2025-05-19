export interface Page<T>{
    page:number,
    size:number,
    totalRecords:number,
    content:T[]
}