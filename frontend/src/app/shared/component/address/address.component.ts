import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Address } from '../../../../../api';
import { EAddressItem } from '../../enum/address-item';
import { AddressItemComponent } from '../address-item/address-item.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [
    AddressItemComponent
  ],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  @Input() address?: Address;
  itemInEditMode: EAddressItem | null = null;
  items = EAddressItem;

  @Output() saveAddressChange = new EventEmitter<{ key: string, value?: string }>();

  setItemInEditMode(item: EAddressItem | null) {
    this.itemInEditMode = item;
  }

  updateAddressItem(value?: string) {
    const keyIndex = Object.values(this.items)
      .findIndex(value => this.itemInEditMode === value);

    const key = Object.keys(this.items)[keyIndex]
    this.saveAddressChange.emit({ key, value })
    this.setItemInEditMode(null)
  }

}
