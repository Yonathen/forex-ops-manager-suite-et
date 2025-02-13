import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SelectModule } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';

import { TagModule } from 'primeng/tag';
import { UserPublicDto } from '../../../../../api';
import { EProfileItem } from '../../enum/profile-item';

@Component({
  selector: 'app-user-status',
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    TagModule,
    SelectModule,
    ButtonModule
  ],
  templateUrl: './user-status.component.html',
  styleUrl: './user-status.component.scss'
})
export class UserStatusComponent implements OnInit, OnChanges {
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: EProfileItem | null = null;
  @Input() value?: UserPublicDto.StatusEnum;

  @Output() editProfileItemEvent = new EventEmitter<EProfileItem | null>();
  @Output() saveProfileItemEvent = new EventEmitter<string>();

  editableValue?: string;
  availableStatuses: { status: UserPublicDto.StatusEnum}[] = [];

  ngOnInit(): void {
    this.availableStatuses = Object.values(UserPublicDto.StatusEnum)
      .map(status => ({ status }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.editableValue = changes['value'].currentValue;
    }
  }

  get isEditMode() {
    return EProfileItem.status === this.itemInEditMode;
  }

  isActive(status?: UserPublicDto.StatusEnum) {
    return status === UserPublicDto.StatusEnum.Active;
  }

  setEditMode() {
    this.editableValue = this.value
    this.editProfileItemEvent.emit(EProfileItem.status);
  }

  onCancel() {
    this.editProfileItemEvent.emit(null);
  }

  onSave() {
    this.saveProfileItemEvent.emit(this.editableValue);
  }
}
