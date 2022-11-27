import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.scss']
})
export class ContactBarComponent implements OnInit {

  emailIcon = faEnvelope as IconProp;
  phoneIcon = faPhone as IconProp;
  LinkedInIcon = faLinkedin as IconProp;
  GitHubIcon = faGithub as IconProp;
  WhatsAppIcon = faWhatsapp as IconProp;

  @Input() public wrap: boolean = false;
  @Input() public allowHideText: boolean = false;
  @Input() public category: string = "bar";

  constructor() { }

  ngOnInit(): void {
  }

}
