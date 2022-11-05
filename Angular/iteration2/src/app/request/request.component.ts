import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, SchoolService } from '@app/_services';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { School, Request } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'request.component.html' })
export class RequestComponent implements OnInit {
    schools = null;
    form: FormGroup;
    schoolID: string;
    requestID: string;
    offerID: string;
    isAddMode: boolean;
    school: School;
    requests: Request[];
    loading = false;
    isResource = false;
    submitted = false;
    success = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private schoolService: SchoolService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}


    ngOnInit() {
        console.log(this.accountService.userValue);
        this.schoolService.getSchoolById(this.accountService.userValue.school).subscribe(school => {
            this.school = school;
            this.requests = school.requests;
        });

        
        this.schoolID = this.accountService.userValue.school;
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required],
            studentLevel: ['', Validators.required],
            numberOfStudents: ['', Validators.required],
            status: "NEW",
            resourceType: [''],
            resourceQuantity: [''],
            offers: [[]]
        });

        if (!this.isAddMode) {
            this.schoolService.getSchoolById(this.schoolID)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    addResource() {
        this.isResource = true;
        console.log(this.isResource)
    }

    reset() {
        this.isResource = false;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.form.value)
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }



        this.loading = true;
    
            this.addRequest();
        // } else {
        //     this.updateUser();
        // }
        
    }


    setID(requestID, offerID, status) {
        this.offerID = offerID;
        this.requestID = requestID;
        this.updateStatus(status);
    }

    private addOffer() {
        this.schoolService.addOffer(this.schoolID, this.requestID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/request'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateStatus(status: string) {
        this.schoolService.updateStatus(this.schoolID, this.requestID, this.offerID, status)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Status updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }



    private addRequest() {
        this.schoolService.addRequest(this.schoolID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.success = true;
                    this.router.navigate(['/requests'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                    this.success = false;
                }
            });
    }

}