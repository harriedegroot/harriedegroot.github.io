import { Component, Input, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  LinkedInIcon = faLinkedin;
  GitHubIcon = faGithub;
  WhatsAppIcon = faWhatsapp;

  @Input() public wrap: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
