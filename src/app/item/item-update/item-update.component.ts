import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormComponent } from "src/app/form/form.component";

@Component({
    selector: 'app-item-update',
    standalone: true,
    imports: [CommonModule, FormComponent],
    templateUrl: './item-update.component.html',
    styleUrl: './item-update.component.css',
})
export class ItemUpdateComponent { }