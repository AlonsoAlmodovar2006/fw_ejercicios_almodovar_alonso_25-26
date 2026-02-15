import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DetailsMeal } from "../details-meal/details-meal";
import { DetailsSave } from "../details-save/details-save";

@Component({
  selector: 'app-details',
  imports: [RouterLink, DetailsMeal, DetailsSave],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {

}
