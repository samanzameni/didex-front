(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{NUQi:function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));var n=r("8Y7J"),i=r("vD/m"),o=r("iInd");let a=(()=>{class t{constructor(t,e){this.authService=t,this.router=e}canActivate(t,e){return!!this.authService.isAuthorized||(alert("You are not signed in, will be redirected to the main page"),this.router.parseUrl("/"))}}return t.\u0275prov=n.Yb({factory:function(){return new t(n.Zb(i.a),n.Zb(o.l))},token:t,providedIn:"root"}),t})()}}]);