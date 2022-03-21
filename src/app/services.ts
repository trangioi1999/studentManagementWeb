import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { StudentDetailDTO, StudentDTO } from './data/student.data';
import { environment } from 'src/environments/environment';
import { ErrorDTO } from './data/error';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const baseUrl = `${environment.apiUrl}/student`;

@Injectable({ providedIn: 'root' })
export class StudentService {
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<any>(baseUrl)
        .pipe(
            catchError((err) => this.handleError(err))
        );
    }

    create(params: StudentDTO) {
        return this.httpClient.post(baseUrl, params)
            .pipe(
                catchError((err) => this.handleError(err))
            );
    }

    update(params: StudentDTO) {
        return this.httpClient.put(`${baseUrl}`, params)
            .pipe(
                catchError((err) => this.handleError(err))
            );
    }

    delete(studentID: string) {
        let params = new HttpParams()
        .set('id', studentID)
        return this.httpClient.delete(`${baseUrl}`,{ params })
        .pipe(
            catchError((err) => this.handleError(err))
        );
    }

    handleError(error: HttpErrorResponse) {
        let errorDTO: ErrorDTO;

        if (error.status == 0) {
            // Not talk with server yet, probably server is not up
            errorDTO = {
                errorCode: 'error/client',
                errorMessage: 'Fail to connect to the server',
                language: 'en',
            };
        } else {
            // Server return ErrorDTO
            let message = error.error?.errorMessage;
            let code = error.error?.errorCode;
            let language = error.error?.language;
            errorDTO = {
                errorCode: code ? code : error.statusText,
                errorMessage: message ? message : error.message,
                language: language ? language : 'en',
            };
        }
        return throwError(errorDTO);
    }
}