import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SchoolService, AlertService, AccountService } from '@app/_services';
import { Role, School } from '@app/_models';

@Component({ templateUrl: 'add-offer.component.html' })
export class AddOfferComponent implements OnInit {
    form: UntypedFormGroup;
    schoolID: string;
    requestID: string;
    isAddMode: boolean;
    school: School;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private schoolService: SchoolService,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.schoolID = this.route.snapshot.params['schoolID'];
        this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            offerStatus: ['', Validators.required],
            offerDate: ['', Validators.required],
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