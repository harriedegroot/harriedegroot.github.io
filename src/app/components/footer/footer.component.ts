import { Component, Input, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  emailIcon = faEnvelope as IconProp;
  phoneIcon = faPhone as IconProp;
  LinkedInIcon = faLinkedin as IconProp;
  GitHubIcon = faGithub as IconProp;
  WhatsAppIcon = faWhatsapp as IconProp;

  @Input() public wrap: boolean = false;
  @Input() public category: string = "footer";

  constructor() { }

  ngOnInit(): void {
  }

}
