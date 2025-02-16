import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { ECustomerItem } from '../../enum/customer-item';

@Component({
  selector: 'app-customer-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './customer-item.component.html',
  styleUrl: './customer-item.component.scss'
})
export class CustomerItemComponent implements OnInit, OnChanges {
  @Input() item?: ECustomerItem;
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: ECustomerItem | null = null;
  @Input() value?: string;

  @Output() editCustomerItemEvent = new EventEmitter<ECustomerItem | null>();
  @Output() saveCustomerItemEvent = new EventEmitter<string>();

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
    this.editCustomerItemEvent.emit(this.item);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') this.editCustomerItemEvent.emit(null);

    if (event.key === 'Enter') {
      this.saveCustomerItemEvent.emit(this.editableValue);
    }
  }
}
