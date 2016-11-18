import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

import { Config } from '../config/config';

import { Injectable } from '@angular/core';

'use strict';

@Injectable()
export class EmotionService {
    config: any = Config;

    apiPath: string = this.config.emotion.host;

    defaultHeaders : Headers = new Headers();
    headerParams = this.defaultHeaders;

    constructor(private http: Http, private storage: Storage) {
        this.headerParams.append('Content-Type', 'application/json');
        this.headerParams.append('Accept', 'application/json');
        this.headerParams.append('Ocp-Apim-Subscription-Key', this.config.emotion.token);
    }

    /**
     * User Profile
     * The User Profile endpoint returns information about the  user that has authorized with the application.
     */
    public get (extraHttpRequestParams?: any) { // : Observable<models.User> {
        const path = this.apiPath;

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };
        
        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                response.json(); 
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));            
    }

    /**
     * User Profile
     * The User Profile inserts a new user to the application.
     */
    public post (emotions?) { //: Observable<models.User> {
        const path = this.apiPath;

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters,
            body: emotions
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                response.json();
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));            
    }

}
