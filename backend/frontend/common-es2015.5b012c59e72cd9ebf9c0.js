(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{B4Ql:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n("IheW"),r=n("AytR"),s=n("8Y7J");new o.g({"Content-Type":"application/json",Authorization:""});let i=(()=>{class t{constructor(t){this.http=t,this.baseUrl=r.a.backendBaseUrl+"/api"}loginSalon(t){return this.http.post(this.baseUrl+"/login",t)}signUpSalon(t){return this.http.post(this.baseUrl+"/register",t)}}return t.ngInjectableDef=s.Sb({factory:function(){return new t(s.Tb(o.c))},token:t,providedIn:"root"}),t})()},MJk2:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n("2Vo4"),r=n("8Y7J"),s=n("iInd");let i=(()=>{class t{constructor(t){this.myRoute=t,this.idSource=new o.a(""),this.currentIds=this.idSource.asObservable()}sendToken(t){localStorage.setItem("LoggedInUser",t)}getToken(){return localStorage.getItem("LoggedInUser")}isLoggedIn(){return null!==this.getToken()}logout(){localStorage.removeItem("LoggedInUser"),this.myRoute.navigate(["salon"])}sendIdS(t){this.idSource.next(t)}}return t.ngInjectableDef=r.Sb({factory:function(){return new t(r.Tb(s.k))},token:t,providedIn:"root"}),t})()}}]);