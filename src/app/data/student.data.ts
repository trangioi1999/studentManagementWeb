export class Student {
    studentID!: string;
    studentName!: string;
    studentClass!: string;
    isDeleting: boolean = false;
}

export interface StudentDetailDTO {
        studentID: string,
        studentName: string,
        studentClass: string,
        studentAccountActive: boolean
}
export interface StudentDTO {
    studentID: string,
    studentName: string,
    studentClass: string,
}

