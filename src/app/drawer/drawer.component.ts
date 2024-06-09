import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.css',
})
export class DrawerComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Output() toggleDrawer = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onToggleDrawer() {
    this.toggleDrawer.emit();
  }
}
