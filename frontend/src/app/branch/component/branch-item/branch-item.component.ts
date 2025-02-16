import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { EBranchItem } from '../../enum/branch-item';

@Component({
  standalone: true,
  selector: 'app-branch-item',
  imports: [
    CommonModule,
    FormsModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule
  ],
  templateUrl: './branch-item.component.html',
  styleUrl: './branch-item.component.scss'
})
export class BranchItemComponent implements OnInit, OnChanges {
  @Input() item?: EBranchItem;
  @Input() isHighlighted: boolean = false;
  @Input() editable: boolean = false;
  @Input() itemInEditMode?: EBranchItem | null = null;
  @Input() value?: string;

  @Output() editBranchItemEvent = new EventEmitter<EBranchItem | null>();
  @Output() saveBranchItemEvent = new EventEmitter<string>();

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
    this.editBranchItemEvent.emit(this.item);
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') this.editBranchItemEvent.emit(null);

    if (event.key === 'Enter') {
      this.saveBranchItemEvent.emit(this.editableValue);
    }
  }
}
