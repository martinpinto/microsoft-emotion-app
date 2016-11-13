import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';

import { Storage } from '@ionic/storage';

import User from '../models/User';
import { UserIonic } from '../models/User';
import { Config } from '../config/config';

import { Injectable } from '@angular/core';

'use strict';

@Injectable()
export class UserService {
    config: any = Config.api;

    basePath: string = this.config.protocol + this.config.host + ':' + this.config.port + this.config.root || 'https://localhost/api';
    apiPath: string = this.config.routeUsers;

    defaultHeaders : Headers = new Headers();
    headerParams = this.defaultHeaders;

    private loggedInUser: UserIonic;
    private rawUser: any;

    constructor(private http: Http, private storage: Storage) {
        this.headerParams.append('Content-Type', 'application/json');
        this.headerParams.append('Accept', 'application/json');

        this.loggedInUser = new UserIonic();
    }
    
    public getCurrentUser(): User {
        return this.loggedInUser;
    }

    public createNewUser(email: string, password: string) {
        let user = new UserIonic();
        user.email = email;
        user.password = password;
        
        return this.post(user);
    }

    /**
     * User Profile
     * The User Profile endpoint returns information about the  user that has authorized with the application.
     */
    public login (user: User) { // : Observable<models.User> {
        const path = this.basePath + this.apiPath + '/login';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

        delete user.emailVerified;
        delete user.id;
        delete user.realm;
        
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters,
            body: user
        };
    
        return this.http.request(path, requestOptions)
            .map((response: Response) => { 
                response.json();
                this.saveUserToSession(response);
            });
    }

    /**
     * User Profile
     * The User Profile endpoint returns information about the  user that has authorized with the application.
     */
    public get (extraHttpRequestParams?: any) { // : Observable<models.User> {
        const path = this.basePath + this.apiPath;

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
    public post (user?: User) { //: Observable<models.User> {
        const path = this.basePath + this.apiPath;

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters,
            body: user
        };

        return this.http.request(path, requestOptions)
            .map((response: Response) => {
                response.json();
                this.saveUserToSession(response);
            })
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));            
    }

    private saveUserToSession(response: Response) {
        let rawUser = response.json();

        // strongloop specific fields
        if (typeof rawUser.userId !== 'undefined') {
            this.loggedInUser.id = rawUser.userId;
            this.loggedInUser.token = rawUser.id;
            this.loggedInUser.ttl = rawUser.ttl;
            this.loggedInUser.createdOn = rawUser.created;
        } else {
            this.loggedInUser.id = rawUser.id;
            this.loggedInUser.email = rawUser.email;
        }
                
        // persist user to local session
        this.storage.set("loggedInUser", this.loggedInUser);
    }

}
