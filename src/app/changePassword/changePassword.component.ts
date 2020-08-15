import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../share/DataService';
import { Router, ActivatedRoute } from '@angular/router';
import * as jwt_decode from "jwt-decode";
import { MustMatch } from '../must-match.validator';
import { ChangePassword } from '../share/ChangePassword';


@Component({
    selector: 'changePassword-component',
    templateUrl: 'changePassword.component.html',
    styleUrls: ['changePassword.component.css']
})
export class ChangePasswordComponent {
    id: any;
    oldPassword: any;
    newPassword: any;
    
    email: any;
    form: FormGroup;
    submitted: boolean;

        constructor(private data: DataService, private router: Router,private formBuilder: FormBuilder) {}
        
        ngOnInit() {
           this.form = this.formBuilder.group({
                oldPassword: ['', Validators.required],
                newPassword: ['', [Validators.required, 
                                   Validators.minLength(8),
                                   Validators.pattern(/^(?=.*[!@#$%^&*(),.?":<>])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
                                   ]
                              ],
                confirmNewPassword: ['',[Validators.required],[]]
            }, {
                validator: MustMatch('newPassword', 'confirmNewPassword')
            });
            const token = localStorage.getItem('token');
            const decodeToken = jwt_decode(token);
            this.id = decodeToken.jti;
        }

        get f() { return this.form.controls; }

        onSubmit(){
            this.submitted = true;

            if (this.form.invalid) {
                return;
            }
            
            const changePassword = new ChangePassword 
            (
                this.id,
                this.form.value.oldPassword,
                this.form.value.newPassword
            )
            
            this.data.ChangePassword(changePassword).subscribe(response => {
                if(response){
                    alert('Password successfully changed!')
                }else {
                    alert('Invalid old password')
                }
            });
            this.router.navigate(['/login'])
        }
        onReset() {
            this.submitted = false;

        }
}