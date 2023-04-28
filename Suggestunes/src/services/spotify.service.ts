import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
@Injectable()
export class SpotifyService{
  access_token:string | undefined;
  constructor(private http:HttpClient) {
    this.access_token = this.getAccessToken();
  }
  getAccessToken() {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `access_token=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return undefined;
  }
  public get<T>(endpoint:string){

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.access_token)

    return this.http.get<T>(endpoint,{'headers' : headers});
  }

}
