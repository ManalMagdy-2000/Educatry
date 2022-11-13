import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, SchoolService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { School, User } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'offers.component.html' })
export class OfferComponent implements OnInit {
    schools = null;
    form: UntypedFormGroup;
    schoolID: string;
    requestID: string;
    isAddMode: boolean;
    school: School;
    requests: Request[];
    loading = false;
    requestsCount: number;
    countNewReq: number;
    submitted = false;
    user: User;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private schoolService: SchoolService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        this.schoolService.getAllSchools()
            .pipe(first())
            .subscribe(schools => this.schools = schools);

        this.user = this.accountService.userValue;


        // this.schoolID = this.route.snapshot.params['schoolID'];
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            remarks: ['', Validators.required],
            volunteer: this.accountService.userValue,
            request: [this.requestID]
        });

        if (!this.isAddMode) {
            this.schoolService.getSchoolById(this.schoolID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.form)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }



        this.loading = true;
    
            this.addOffer();
        // } else {
        //     this.updateUser();
        // }
        
    }

    countRequests() {
        let count = 0;
        for(let i = 0; i < this.schools.length; i++) {
            for(let j = 0; j < this.schools[i].requests.length; j++) {
                if(this.schools[i].requests[j].status != "CLOSED") {
                    count++;
                }
            }
        }
        return count;
    }

    countPastRequests() {
        let count = 0;
        for(let i = 0; i < this.schools.length; i++) {
            for(let j = 0; j < this.schools[i].requests.length; j++) {
                if(this.schools[i].requests[j].status == "CLOSED") {
                    count++;
                }
            }
        }
        return count;
    }

    //get number of requests for school with status NEW
    countNewRequests(schoolID) {
        let count = 0;
        for(let i = 0; i < this.schools.length; i++) {
            if(this.schools[i].schoolID == schoolID) {
                for(let j = 0; j < this.schools[i].requests.length; j++) {
                    if(this.schools[i].requests[j].status == "NEW") {
                        count++;
                    }
                }
            }
        }
        console.log(count);
        return count;
    }

    //get number of requests for school with status CLOSED
    countClosedRequests(schoolID) {
        let count = 0;
        for(let i = 0; i < this.schools.length; i++) {
            if(this.schools[i].schoolID == schoolID) {
                for(let j = 0; j < this.schools[i].requests.length; j++) {
                    if(this.schools[i].requests[j].status == "CLOSED") {
                        count++;
                    }
                }
            }
        }
        console.log(count);
        return count;
    }


    setID(schoolID, requestID) {
        if(this.user) {
            this.schoolID = schoolID;
            this.requestID = requestID;
        }
        else {
            //redirect to login
            this.router.navigate(['/account/login']);
        }
    }

    private addOffer() {
        this.schoolService.addOffer(this.schoolID, this.requestID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}