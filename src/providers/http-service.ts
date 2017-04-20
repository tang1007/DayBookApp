import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { RestEntity } from '../domain/RestEntity';

@Injectable()
export class HttpService {
    hostUrl:string = "http://192.168.1.1:9971";
    constructor(
        private http: Http
        ) {
        //this.local = new Storage(LocalStorage);
    }
    /**带身份验证的get请求 */
    public httpGetWithAuth(url: string):Promise<RestEntity> {
        url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Authorization',   'username-password');
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(url,options).toPromise()
            .then(res => res.json() as RestEntity)
            .catch(err => {
                this.handleError(err);
            });
    } 
    /**不需身份验证的get请求 */
    public httpGetNoAuth(url: string) {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url, options).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }
     /**不带身份验证的post请求 */
    public httpPostNoAuth(url: string, body: any) :Promise<RestEntity>{
          url = `${this.hostUrl}/${url}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, body,options).toPromise()
            .then(res => res.json())
            .catch(err => {
                this.handleError(err);
            });
    }


    private handleError(error: Response) {
        console.log("请求错误"+error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}