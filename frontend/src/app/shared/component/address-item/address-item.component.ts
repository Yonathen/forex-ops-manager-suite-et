import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { EAddressItem } from '../../enum/address-item';

@Component({
  standalone: true,
  selector: 'app-address-item',
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './address-item.component.html',
  styleUrl: './address-item.component.scss'
})
export class AddressItemComponent implements OnInit, OnChanges {
  @Input() item?: EAddressItem;
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: EAddressItem | null = null;
  @Input() value?: string;

  @Output() editAddressItemEvent = new EventEmitter<EAddressItem | null>();
  @Output() saveAddressItemEvent = new EventEmitter<string>();

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
    this.editAddressItemEvent.emit(this.item);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') this.editAddressItemEvent.emit(null);

    if (event.key === 'Enter') {
      this.saveAddressItemEvent.emit(this.editableValue);
    }
  }
}
