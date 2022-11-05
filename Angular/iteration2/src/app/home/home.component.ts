import { Component } from '@angular/core';

import { Role, School, User } from '@app/_models';
import { AccountService, SchoolService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    school: School;
    isAdmin: boolean;

    constructor(private accountService: AccountService, private schoolService: SchoolService) {
        this.user = this.accountService.userValue;
        console.log(this.user)
        this.isAdmin = this.user && this.user.role === Role.Admin;
        if(this.isAdmin) {
          this.schoolService.getSchoolById(this.user.school).subscribe(school => {
            this.school = school;
            console.log( this.school.name )
          });
        }
    }


    logout() {
        this.accountService.logout();
    }
}