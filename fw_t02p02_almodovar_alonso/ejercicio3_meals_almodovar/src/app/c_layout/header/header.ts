import { Component } from '@angular/core';
import { LoginWidget } from '../login-widget/login-widget';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [LoginWidget, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
