import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { School, Request, User, Offer } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class SchoolService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }

    addSchool(school: School) {
        return this.http.post(`${environment.apiUrl}/schools/add`, school);
    }

    getAllSchools() {
        return this.http.get<School[]>(`${environment.apiUrl}/schools`);
    }

    getSchoolById(id: string) {
        return this.http.get<School>(`${environment.apiUrl}/schools/${id}`);
    }

    addRequest(id: string, request: Request) {
        return this.http.post(`${environment.apiUrl}/schools/request/${id}`, request);
    }

    getRequestById(schoolID: string, requestID: string) {
        return this.http.get<Request>(`${environment.apiUrl}/schools/${schoolID}/request/${requestID}`);
    }

    addAdmin(id: string, admin: User) {
        return this.http.post(`${environment.apiUrl}/schools/admin/${id}`, { admin });
    }

    addOffer(schoolID: string, requestID: string, offer: Offer) {
        return this.http.post(`${environment.apiUrl}/schools/${schoolID}/request/${requestID}/offer`, offer);
    }

    updateStatus(schoolID: string, requestID: string, offerID: string, status: string) {
        console.log(schoolID, requestID, offerID, status);
        return this.http.post(`${environment.apiUrl}/schools/${schoolID}/request/${requestID}/offer/${offerID}`, { status });
    }
}