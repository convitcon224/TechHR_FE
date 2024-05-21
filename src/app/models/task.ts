export interface Task {
    id: string;
    name: string;
    description?: string;
    difficulty: string;
    createTime: string;
    deadline: string;
    status: string;
    type: string;
    document?: string;
}
