export declare enum TaskStatus {
    PENDENTE = "pendente",
    FEITO = "feito"
}
export declare class UpdateTaskDto {
    title?: string;
    status?: TaskStatus;
}
