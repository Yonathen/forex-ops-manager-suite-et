
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Subscription } from 'rxjs';
import { RoleDto, UserPublicDto } from '../../../../../api';
import { AuthService } from '../../../auth/service/auth.service';
import { addRoleToUser, fetchAllRoles } from '../../state/action/user.action';
import { selectAllRoles } from '../../state/selector/user.selector';
import { UserState } from '../../state/user.state';

@Component({
  selector: 'app-add-role',
  imports: [
    Button,
    FloatLabel,
    MultiSelectModule,
    SelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.scss'
})
export class AddRoleComponent {
  public submitted: boolean = false;
  public addRoleMode: boolean = true;
  public addRoleForm: FormGroup = new FormGroup({});
  public savedRoleData: any = null;
  public roles: Array<{ label?: string, value?: string }> = [];
  private roleSubscription!: Subscription;
  
  @Input() userDetail!: UserPublicDto | null;
  @Output() cancelAddFormEmitter = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<UserState>,
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.setUpForm();
    this.roles.length === 0 && this.loadRoles();
    
    this.roleSubscription = this.store
      .select(selectAllRoles)
      .subscribe((roles) => {
        this.roles = roles?.map((role: RoleDto) => ({
          label: role.name?.replace("_", " ")?.toLowerCase(), value: role.id
        })) || [];
      })
  }

  ngOnDestroy() {
    this.setUpForm();
    this.roleSubscription && this.roleSubscription.unsubscribe();
  }

  loadRoles() {
    this.store.dispatch(fetchAllRoles())
  }

  setUpForm() {
    this.addRoleForm = this.fb.group({
      role: [ {value: null, disabled: false}, [Validators.required] ]
    })
  }

  getFormControl(name: string) {
    return this.addRoleForm.get(name)
  }

  onSubmit() {
    this.submitted = true;

    const roleId = this.addRoleForm.get('role')?.value;
    const userId = this.userDetail?.id;

    if (this.addRoleForm.valid && roleId && userId) {
      this.store.dispatch(addRoleToUser({ userId, roleId }))
    }
  }

  onCancel() {
    this.cancelAddFormEmitter.emit(false);
  }

  addAnother() {
    this.setUpForm();
    this.savedRoleData = null;
    this.addRoleMode = true;
  }
}
