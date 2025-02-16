import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { EExchangeRateItem } from '../../enum/exchange-rate-item';

@Component({
  selector: 'app-exchangeRate-item',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './exchange-rate-item.component.html',
  styleUrl: './exchange-rate-item.component.scss'
})
export class ExchangeRateItemComponent implements OnInit, OnChanges {
  @Input() item?: EExchangeRateItem;
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: EExchangeRateItem | null = null;
  @Input() value?: string | number;

  @Output() editExchangeRateItemEvent = new EventEmitter<EExchangeRateItem | null>();
  @Output() saveExchangeRateItemEvent = new EventEmitter<string | number>();

  editableValue?: string | number;

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
    this.editExchangeRateItemEvent.emit(this.item);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') this.editExchangeRateItemEvent.emit(null);

    if (event.key === 'Enter') {
      this.saveExchangeRateItemEvent.emit(this.editableValue);
    }
  }
}
