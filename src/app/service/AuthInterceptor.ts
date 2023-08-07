import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token= localStorage.getItem("token") || "";
    const username= localStorage.getItem("username") || "";
    const httpHeaders = new HttpHeaders().set("Authorization", token).set("username", username);
    const authReq = req.clone({
      headers: httpHeaders
      });

    return next.handle(authReq);
  }
}
