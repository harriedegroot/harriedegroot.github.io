export enum EmploymentType {
  Unknown,
  FullTime,
  PartTime,
  Owner,
  Freelance
}

export interface Profile {
  contact?: Contact;
  title?: string;
  headline?: string;
  about?: string;
  description?: string;
  charasteristics?: Charasteristic[];
  specialities?: Skill[];
  experience?: Experience[];
  skills?: Skill[];
  education?: Education[];
  languages?: Language[];
  interests?: Interest[];
  hobbies?: Hobby[];
}

export interface Section {
  header?: string;
  body?: string[];
}

export interface Charasteristic {
  name: string;
}

export interface Contact {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  linkedIn?: string;
  twitter?: string;
  website?: string;
  gitHub?: string;
  location?: Location;
  company?: Company;
  birthday?: string;
}

export interface Company {
  name: string;
  description?: string;
  location?: Location;
  logo?: string;
  kvk?: string;
  btw?: string;
  contact?: Contact;
  services?: Service[];
}

export interface Location {
  // name: string;
  city?: string;
  country?: string;
  lat?: number;
  long?: number;
}

export interface Experience {
  company?: Company;
  roles?: Role[];
  projects?: Project[];
}

export interface Role {
  title: string;
  type: EmploymentType;
  present?: boolean;
  timespan: TimeSpan;
  description: string | string[];
}

export interface Project {
  name: string;
  description: string;
  role?: Role
  responsibility?: string;
  company?: Company;
  technologies?: Skill[];
  website?: string;
  youtube?: string;
  image?: string;
  current?: boolean;
  timespan?: TimeSpan;
}

export interface Skill {
  name: string;
  description?: string;
  proficiency?: number; // percentage?
  tags?: string[];
  projects?: Project[];
  activity?: TimeSpan[];
  website?: string;
  logo?: string;
  min?: number;
}

export interface Education {

}

export interface Language {
  name: string;
  code: string;
  proficiency: LanguageProficiency
}

export enum LanguageProficiency {
  Native,
  Professional,
  Limited,
  Elementary
}

export interface Interest {
  name: string;
}

export interface TimeSpan {
  from: Date | string;
  to: Date | string;
}

export interface Hobby {
  name: string;
}

export interface Service {
  name: string;
}
