import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from 'app/models/profile.model';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public path: string = "./assets/profiles/";
  public prefix: string = "profile-";
  public extension: string = ".json";

  public readonly profile$ = new ReplaySubject<Profile | null>(1);

  private _profile: Profile | null = null;
  public get profile(): Profile | null {
    return this._profile;
  }
  public set profile(value: Profile | null) {
    if(this._profile !== value) {
      this._profile = value;
      this.profile$.next(value ?? null);
    }
  }

  constructor(private http: HttpClient) { }

  public load(lang: string = 'en'): void {
    const url = `${this.path}${this.prefix}${lang}${this.extension}`;
    this.http.get<Profile>(url).subscribe(p => this.profile = p);
  }
}
