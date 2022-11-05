import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, SchoolService } from '@app/_services';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Role, School } from '@app/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '@coreui/angular';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    schools = null;
    form: UntypedFormGroup;
    form2: UntypedFormGroup;
    schoolID: string;
    requestID: string;
    isAddMode: boolean;
    school: School;
    requests: Request[];
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private schoolService: SchoolService,
        private accountService: AccountService,
        private alertService: AlertService,
        private modal: ModalService
    ) {}


    ngOnInit() {
        this.schoolService.getAllSchools()
            .pipe(first())
            .subscribe(schools => this.schools = schools);


        // this.schoolID = this.route.snapshot.params['schoolID'];
        // this.requestID = this.route.snapshot.params['requestID'];
        this.isAddMode = !this.schoolID;
        
        // password not required in edit mode
        const passwordValidators = [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')];
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
            name: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            requests: [[]],
            admins: [[]]
        });

        console.log(this.schoolID)
        this.form2 = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            username: ['', Validators.required],
            password: ['', passwordValidators],
            phone: ['', Validators.required],
            staffID: ['', Validators.required],
            position: ['', Validators.required],
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

    get f2() { return this.form2.controls; }

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
    
            this.createSchool();
        // } else {
        //     this.updateUser();
        // }
        
    }

    //check phone for numbers
    checkPhone() {
        var phone = this.form2.controls.phone.value;
        if (isNaN(phone)) {
            this.form2.controls.phone.setErrors({ 'incorrect': true });
        }
    }

    onSubmit2() {
        this.submitted = true;
        this.checkPhone()
        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form2.invalid) {
            return;
        }



        this.loading = true;
        //toggle modal

        this.form2.patchValue({school: this.schoolID});
        this.createUser();
        // } else {
        //     this.updateUser();
        // }
        
    }


    setID(schoolID: string) {
        this.schoolID = schoolID;
    }

    private createSchool() {
        this.schoolService.addSchool(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('School added successfully', { keepAfterRouteChange: true });       
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private addAdmin() {
        this.schoolService.addAdmin(this.schoolID, this.form2.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // this.alertService.success('Request added successfully', { keepAfterRouteChange: true });
                    // this.router.navigate(['/schools'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private createUser() {
        this.accountService.register(this.form2.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Admin added successfully', { keepAfterRouteChange: true });
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