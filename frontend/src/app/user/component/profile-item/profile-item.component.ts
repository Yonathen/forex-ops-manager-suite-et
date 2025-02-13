import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { EProfileItem } from '../../enum/profile-item';

@Component({
  selector: 'app-profile-item',
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './profile-item.component.html',
  styleUrl: './profile-item.component.scss'
})
export class ProfileItemComponent implements OnInit, OnChanges {
  @Input() item?: EProfileItem;
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: EProfileItem | null = null;
  @Input() value?: string;

  @Output() editProfileItemEvent = new EventEmitter<EProfileItem | null>();
  @Output() saveProfileItemEvent = new EventEmitter<string>();

  editableValue?: string;

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.editableValue = changes['value'].currentValue;
    }
  }

  get isEditMode() {
    return this.item === this.itemInEditMode;
  }

  setEditMode() {
    this.editableValue = this.value
    this.editProfileItemEvent.emit(this.item);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') this.editProfileItemEvent.emit(null);

    if (event.key === 'Enter') {
      this.saveProfileItemEvent.emit(this.editableValue);
    }
  }
}
