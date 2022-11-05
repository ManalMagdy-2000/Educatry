import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '@app/_models';

// array in local storage for registered users
const usersKey = 'users';
let users = JSON.parse(localStorage.getItem(usersKey)) || [];
users.push({ id: 1, username: 'admin', password: 'admin', fullname: 'Admin', school: 0, role: Role.SuperAdmin });

//array in local storage for schools
const schoolsKey = 'schools';
let schools = JSON.parse(localStorage.getItem(schoolsKey)) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                //get current user
                case url.endsWith('/users/current') && method === 'GET':
                    return currentUser();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'PUT':
                    return updateUser();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                case url.endsWith('/schools') && method === 'GET':
                    return getSchools();
                case url.endsWith('/schools/add') && method === 'POST':
                    return addSchool();
                case url.match(/\/schools\/\d+$/) && method === 'GET':
                    return getSchoolById();
                case url.match(/\/schools\/request\/\d+$/) && method === 'POST':
                    return addRequest();
                //add admin to school
                case url.match(/\/schools\/admin\/\d+$/) && method === 'POST':
                    return addAdmin();
                //add offer to request as schools/:schoolID/request/:requestID/offer
                case url.match(/\/schools\/\d+\/request\/\d+\/offer$/) && method === 'POST':
                    return addOffer();
                //get request by id as schools/:schoolID/request/:requestID
                case url.match(/\/schools\/\d+\/request\/\d+$/) && method === 'GET':
                    return getRequestById();
                //update status /schools/${schoolID}/request/${requestID}/offer/${offerID}
                case url.match(/\/schools\/\d+\/request\/\d+\/offer\/\d+$/) && method === 'POST':
                    return updateStatus();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                ...basicDetails(user),
                token: `fake-jwt-token.${user.id}`
            })
        }

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            if(user.role === Role.SuperAdmin && users.find(x => x.staffID === user.staffID)) {
                return error('Staff ID "' + user.staffID + '" already exists!')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users.map(x => basicDetails(x)));
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(basicDetails(user));
        }

        function updateUser() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let user = users.find(x => x.id === idFromUrl());

            // only update password if entered
            if (!params.password) {
                delete params.password;
            }

            // update and save user
            Object.assign(user, params);
            localStorage.setItem(usersKey, JSON.stringify(users));

            return ok();
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem(usersKey, JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function error(message) {
            return throwError({ error: { message } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function basicDetails(user) {
            const { id, username, fullname, email, role, school, dateOfBirth, phone, occupation, position } = user;
            return { id, username, fullname, email, role, school, dateOfBirth, phone, occupation, position };
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function isSuperAdmin() {
            return isLoggedIn() && currentUser().role === Role.SuperAdmin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }

        function getSchools() {
            if (!isLoggedIn()) return unauthorized();
            return ok(schools.map(x => schoolDetails(x)));
        }

        function schoolDetails(school) {
            const { schoolID, name, address, city, admins, requests } = school;
            return { schoolID, name, address, city, admins, requests };
        }

        function addSchool() {
            const school = body

            if (schools.find(x => x.name === school.name) && schools.find(x => x.city === school.city)) {
                return error('School "' + school.name + '" already exists in this city!')
            }

            school.schoolID = schools.length ? Math.max(...schools.map(x => x.schoolID)) + 1 : 1;
            schools.push(school);
            localStorage.setItem(schoolsKey, JSON.stringify(schools));
            return ok();
        }

        function getSchoolById() {
            if (!isLoggedIn()) return unauthorized();

            const school = schools.find(x => x.schoolID === idFromUrl());
            return ok(schoolDetails(school));
        }

        function addRequest() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let school = schools.find(x => x.schoolID === idFromUrl());
            console.log(params)
            console.log(school.requests.length)
            params.requestID = school.requests.length + 1;

            console.log(school)
            // update and save school
            school.requests.push(params);
            localStorage.setItem(schoolsKey, JSON.stringify(schools));

            return ok();
        }

        function getRequestById() {
            if (!isLoggedIn()) return unauthorized();

            const school = schools.find(x => x.schoolID === idFromUrl());
            const request = school.requests.find(x => x.requestID === idFromUrl());
            return ok(request);
        }

        function addAdmin() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            let school = schools.find(x => x.schoolID === idFromUrl());
 
            school.admins.push(params.admin);
            localStorage.setItem(schoolsKey, JSON.stringify(schools));

            return ok();
        }

        function addOffer() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            //get schoolID from url without idFromUrl()
            let sID = url.split('/')[4];

            let school = schools.find(x => x.schoolID === parseInt(sID));
            //get requestID from url without idFromUrl()
            console.log(school)
            let rID = url.split('/')[6];
            let request = school.requests.find(x => x.requestID === parseInt(rID));
            console.log(rID)
            console.log(request.offers.length)
            params.offerID = request.offers.length + 1;
            params.offerStatus = "PENDING";
            params.offerDate = new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear();
            request.offers.push(params);

            let user = users.find(x => x.id === params.volunteer.id);
            user.offers.push(params);
            localStorage.setItem(usersKey, JSON.stringify(users));
            localStorage.setItem(schoolsKey, JSON.stringify(schools));

            return ok();
        }

        function updateStatus() {
            if (!isLoggedIn()) return unauthorized();

            let params = body;
            //get schoolID from url without idFromUrl()
            let sID = url.split('/')[4];

            let school = schools.find(x => x.schoolID === parseInt(sID));
            //get requestID from url without idFromUrl()
   
            let rID = url.split('/')[6];


            let request = school.requests.find(x => x.requestID === parseInt(rID));
            request.status = "CLOSED";
            
            let oID = url.split('/')[8];

            if(oID != null){
                let offer = request.offers.find(x => x.offerID === parseInt(oID));
                offer.offerStatus = params.status;
            }

            localStorage.setItem(schoolsKey, JSON.stringify(schools));


            return ok();
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};