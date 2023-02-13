import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Profile } from 'app/models/profile.model';
import { getDoc } from 'firebase/firestore';
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

  constructor(private http: HttpClient, private store: Firestore) { }

  public async load(lang: string = 'en'): Promise<void> {
    // const url = `${this.path}${this.prefix}${lang}${this.extension}`;
    // this.http.get<Profile>(url)
    //   .pipe(tap(p => this.saveToFireStore(p, `harriedegroot-${lang}`)))
    //   .subscribe(p => this.profile = p);
    const id = `harriedegroot-${lang}`;
    this.profile = await this.loadFromFireStore(id);
  }

  async loadFromFireStore(id: string): Promise<Profile | null> {
    const container = collection(this.store, 'profiles');
    const docRef = doc<Profile>(container, id);
    const docData = await getDoc(docRef);
    return docData.data() ?? null;
  }


  async saveToFireStore(profile: Profile, id: string): Promise<void> {
    const container = collection(this.store, 'profiles');
    const document = doc(container, id);
    return setDoc(document, profile);
  }
}
