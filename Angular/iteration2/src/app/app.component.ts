import { Component } from '@angular/core';

import { AccountService, SchoolService } from './_services';
import { Role, School, User } from './_models';
import { INavData } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, brandSet } from '@coreui/icons';


@Component({ selector: 'app', templateUrl: 'app.component.html', providers: [IconSetService] })
export class AppComponent {
    user: User;
    school: School;
    schoolsCount: number = 0;
    navItems: INavData[] = [
      
    ];

    constructor(private accountService: AccountService, public iconSet: IconSetService, private schoolService: SchoolService) {
        this.accountService.user.subscribe(x => this.user = x)
        if(this.user && this.user.role === Role.Admin) {
          this.schoolService.getSchoolById(this.user.school).subscribe(school => {
            this.school = school;
            console.log( this.school.name )
          });
        }
        this.schoolService.getAllSchools().subscribe(schools => {
          this.schoolsCount = schools.length;
          console.log( this.schoolsCount )
        })
        iconSet.icons = { cilListNumbered, cilPaperPlane, cilHome, cilBank, cilUser, ...brandSet };
    }

    get isAdmin() {
        return this.user && this.user.role === Role.Admin;
    }

    get isSuperAdmin() {
        return this.user && this.user.role === Role.SuperAdmin;
    }

    ngOnInit() {

      this.navItems.push(
      //   {
      //   name: 'User',
      //   title: true
      // },
      // {
      //   name: this.user.fullname,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-user' },
      // },
      // {
      //   name: this.user.position,
      //   url: '#',
      //   attributes: { disabled: true },
      //   iconComponent: { name: 'cil-bank' },
      // },
      {
        name: 'Menu',
        title: true
      },
      // {
      //   name: 'Home',
      //   url: '/',
      //   iconComponent: { name: 'cil-home' },
      // },
      {
        name: 'Requests',
        url: '/offers',
        iconComponent: { name: 'cil-list-numbered' },
      },
    
      // {
      //   name: 'Profile',
      //   url: `/users/edit/${this.user?.id}`,
      //   iconComponent: { name: 'cil-user' },
      // },
      )

      if (this.isSuperAdmin) {
        this.navItems.push(
          {
            name: 'Schools',
            url: '/schools',
            iconComponent: { name: 'cil-bank' },
            // badge: {
            //   color: 'success',
            //   text: ""+this.schoolsCount,
            //   size: 'lg',
            // }
          },
        )
      }

      if (this.isAdmin) {
        this.navItems.push(
          {
            name: 'Offers',
            url: '/requests',
            iconComponent: { name: 'cil-paper-plane' },
            // badge: {
            //   color: 'success',
            //   text: 'NEW',
            //   size: 'lg',
            // }
          },
        )
      }

    }
    
    ngOnDestroy() {
      this.navItems = [];
    }



    logout() {
        this.navItems = [];
        this.accountService.logout();
    }
}