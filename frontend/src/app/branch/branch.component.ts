import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { Menu, MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { BranchDto, UserPublicDto } from '../../../api';
import { CreateBranchComponent } from './component/create-branch/create-branch.component';
import { fetchAllBranches } from './state/action/branch.action';
import { BranchState } from './state/branch.state';
import { selectAllBranches } from './state/selector/branch.selector';

@Component({
  selector: 'app-branch',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    MenuModule,
    DialogModule,
    CreateBranchComponent
  ],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.scss'
})
export class BranchComponent {

  @ViewChild('menu')
  menu!: Menu;

  selectedBranch!: BranchDto;

  branches: Array<BranchDto> = [];
  users: Array<UserPublicDto> = [];

  loading: boolean = false;
  private branchSubscription!: Subscription;

  rowMenuItems: MenuItem[] = [];
  isCreateBranchDialogVisible: boolean = false;

  constructor(
    private store: Store<BranchState>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.setMenuItems()
    this.loadBranches();

    this.branchSubscription = this.store
      .select(selectAllBranches)
      .subscribe((branches: Array<BranchDto> | null) => {
        this.branches = branches || [];
      });
  }

  ngOnDestroy(): void {
    this.branchSubscription && this.branchSubscription.unsubscribe();
  }

  setMenuItems() {
    this.rowMenuItems = [
      {
        label: 'Open detail',
        icon: 'open_in_new',
        command: () => this.viewBranchDetail()
      },
      {
        label: 'Remove user',
        icon: 'delete',
        command: () => {}
      }
    ];
  }

  loadBranches() {
    this.store.dispatch(fetchAllBranches())
  }

  setCreateBranchDialogVisibility(visible: boolean = true) {
    this.isCreateBranchDialogVisible = visible;
  }

  afterCreateCallback() {
    this.loadBranches();
  }

  toggleMenu(event: any, user: any) {
    this.selectedBranch = user;
    this.menu.toggle(event);
  }

  viewBranchDetail() {
    if (this.selectedBranch) {
      this.router.navigate([ '/dashboard/branches', this.selectedBranch.id ])
    }
  }
}
