webpackJsonp([7],{Agm1:function(e,t){},J2Sg:function(e,t,n){e.exports=n.p+"static/img/loading.c1486d8.gif"},LQde:function(e,t,n){"use strict";var i=n("Zrlr"),r=n.n(i),a=n("wxAW"),u=n.n(a);new(function(){function e(){r()(this,e)}return u()(e,[{key:"_GetQueryString",value:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null}},{key:"_send1_1",value:function(e,t,n){var i=this,r=localStorage.getItem("uuid")||i._getCookie("uuid"),a=i._uuid();function u(){return null==r?(window.localStorage?localStorage.setItem("uuid",a):i._setCookie("uuid",a),a):r}var o=null==i._GetQueryString("jcnappid")?u():i._GetQueryString("jcnappid"),s=null==i._GetQueryString("jcnuserid")?u():i._GetQueryString("jcnuserid"),l=new Image;l.onload=function(){n&&n()},t&&"string"==typeof t&&(l.src=location.protocol+"//share.j.cn/js/1x1.gif?ucs=UTF-8&un=statistic_channel."+e+"_logname."+t+"_login.0&timestamp="+(new Date-0)+"&jcnappid="+o+"&jcnuserid="+s)}},{key:"_uuid",value:function(){var e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");return Math.uuid=function(t,n){var i,r,a=e,u=[];if(n=n||a.length,t)for(i=0;i<t;i++)u[i]=a[0|Math.random()*n];else for(u[8]=u[13]=u[18]=u[23]="-",u[14]="4",i=0;i<36;i++)u[i]||(r=0|16*Math.random(),u[i]=a[19==i?3&r|8:r]);return u.join("")},Math.uuidFast=function(){for(var t,n=e,i=new Array(36),r=0,a=0;a<36;a++)8==a||13==a||18==a||23==a?i[a]="-":14==a?i[a]="4":(r<=2&&(r=33554432+16777216*Math.random()|0),t=15&r,r>>=4,i[a]=n[19==a?3&t|8:t]);return i.join("")},Math.uuidCompact=function(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},Math.uuidCompact()}},{key:"_setCookie",value:function(e,t){var n=new Date;n.setTime(n.getTime()+2592e6),document.cookie=e+"="+escape(t)+";expires="+n.toGMTString()}},{key:"_getCookie",value:function(e){var t,n=new RegExp("(^| )"+e+"=([^;]*)(;|$)");return(t=document.cookie.match(n))?unescape(t[2]):null}},{key:"_delCookie",value:function(e){var t=new Date;t.setTime(t.getTime()-1);var n=getCookie(e);null!=n&&(document.cookie=e+"="+n+";expires="+t.toGMTString())}},{key:"_getJcn",value:function(){var e=this,t=localStorage.getItem("uuid")||e._getCookie("uuid"),n=e._uuid();function i(){return null==t?(window.localStorage?localStorage.setItem("uuid",n):e._setCookie("uuid",n),n):t}return{jcnappid:null==e._GetQueryString("jcnappid")?i():e._GetQueryString("jcnappid"),jcnuserid:null==e._GetQueryString("jcnuserid")?i():e._GetQueryString("jcnuserid")}}},{key:"_getQueryObj",value:function(){if(""===location.search)return{};var e={};return location.search.slice(1).split("&").forEach(function(t){var n=t.indexOf("="),i=-1===n?t:t.slice(0,n),r=-1===n?null:t.slice(n+1);e[i]=r}),e}}]),e}())},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("7+uW"),r=(n("LQde"),{name:"app",data:function(){return{userId:"",status:""}},methods:{appLoginFinish:function(e,t){200===parseInt(e)&&(this.userId=t||"",this.status=e)},getUserInfos:function(){var e=navigator.userAgent.toLowerCase(),t=e.indexOf("android")>-1,n=e.indexOf("iphone")>-1;window.app_interface&&(t&&(this.userId=JSON.parse(window.app_interface.getUserInfo()).id||""),n&&(e.match(/(?:os\s)(\d+)(?:_\d+)/)[1]<8?this.userId=JSON.parse(window.app_interface.getUserInfo()).id||"":window.app_interface.getHersUserInfo("callback")))},callback:function(e){this.userId=JSON.parse(e).id||""}},created:function(){window.appLoginFinish=this.appLoginFinish,window.callback=this.callback,window.app_interface&&window.app_interface.setTitleVisible(0)},watch:{},mounted:function(){this.getUserInfos()}}),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("keep-alive",[this.$route.meta.keepAlive?t("router-view",{attrs:{userId:this.userId}}):this._e()],1),this._v(" "),this.$route.meta.keepAlive?this._e():t("router-view",{attrs:{userId:this.userId}})],1)},staticRenderFns:[]};var u=n("VU/8")(r,a,!1,function(e){n("Agm1")},null,null).exports,o=n("/ocq");i.default.use(o.a);var s=[{path:"/",redirect:{name:"TrialList"},meta:{keepAlive:!0}},{path:"/triallist",name:"TrialList",component:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"uAXT"))},meta:{keepAlive:!0}},{path:"/mytrial",name:"MyTrial",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"VNXM"))},meta:{keepAlive:!0}},{path:"/product/:productId",name:"Product",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"099G"))},meta:{keepAlive:!1}},{path:"/trialrule",name:"TrialRule",component:function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"psVs"))},meta:{keepAlive:!0}},{path:"/address",name:"Address",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"4S4F"))},meta:{keepAlive:!1}}],l=new o.a({routes:s}),c=n("cTzj"),d=n.n(c),p=n("J2Sg"),f=n.n(p);i.default.use(d.a,{preload:1,loading:f.a}),new i.default({el:"#app",router:l,template:"<App/>",components:{App:u}})}},["NHnr"]);
//# sourceMappingURL=app.8163b73d839853f8c7b4.js.map