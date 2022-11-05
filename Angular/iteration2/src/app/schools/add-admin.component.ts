import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SchoolService, AlertService, AccountService } from '@app/_services';
import { Role, School } from '@app/_models';

@Component({ templateUrl: 'add-admin.component.html' })
export class AddAdminComponent implements OnInit {
    form: UntypedFormGroup;
    schoolID: string;
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
        this.schoolID = this.route.snapshot.params['id'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')];
        const emailVal = [ Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')];
        const phoneVal = [Validators.minLength(8)];

        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }
        if (this.isAddMode) {
            emailVal.push(Validators.required);
        }
        if (this.isAddMode) {
            phoneVal.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', passwordValidators],
            role: [Role.Admin],
            school: [this.schoolID]
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
    
            this.createUser();
        // } else {
        //     this.updateUser();
        // }
        
    }

    private addAdmin() {
        this.schoolService.addAdmin(this.schoolID, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['/schools'], { relativeTo: this.route });
                    window.location.reload();
                    
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.addAdmin();
                    this.router.navigate(['../'], { relativeTo: this.route });
                    
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}