"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[26],{26:(m,s,e)=>{e.r(s),e.d(s,{DeletactPageModule:()=>P});var l=e(6895),b=e(433),i=e(2723),r=e(2598),t=e(8256),d=e(1881);const p=[{path:"",component:(()=>{class n{constructor(o,c,g){this.location=o,this.router=c,this.rest=g}ngOnInit(){}goBack(){this.location.back()}godelete(){this.rest.presentToast("Your requested is submitted. Your account will be removed soon."),this.location.back()}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(l.Ye),t.Y36(r.F0),t.Y36(d.v))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-deletact"]],decls:21,vars:0,consts:[[1,"bg"],["size","2",1,"centerall"],["src","assets/imgs/backbtn.svg",2,"height","25px","width","25px",3,"click"],["size","8",1,"centerall"],[1,"titlefont","work_sans"],[2,"--background","#262626"],[2,"width","90%","text-align","center","margin","5% auto"],["src","assets/imgs/delete.svg",2,"height","275px","margin-top","40px"],[1,"work_sans",2,"font-style","normal","font-weight","400","font-size","16px","line-height","150%","text-align","center","letter-spacing","0.3px","color","#ffffff"],[1,"btm"],[1,"btnbg","work_sans",2,"margin-top","20px",3,"click"],[1,"btnbgred","work_sans",2,"margin-top","20px",3,"click"]],template:function(o,c){1&o&&(t.TgZ(0,"ion-header")(1,"ion-toolbar",0)(2,"ion-row")(3,"ion-col",1)(4,"img",2),t.NdJ("click",function(){return c.goBack()}),t.qZA()(),t.TgZ(5,"ion-col",3)(6,"ion-title",4),t._uU(7,"Delete Account"),t.qZA()(),t._UZ(8,"ion-col",1),t.qZA()()(),t.TgZ(9,"ion-content",5)(10,"div",6),t._UZ(11,"img",7),t.TgZ(12,"p",8),t._uU(13," Are you sure you want to "),t._UZ(14,"br"),t._uU(15," delete your account? "),t.qZA(),t.TgZ(16,"div",9)(17,"ion-button",10),t.NdJ("click",function(){return c.goBack()}),t._uU(18,"NO"),t.qZA(),t.TgZ(19,"ion-button",11),t.NdJ("click",function(){return c.godelete()}),t._uU(20,"YES"),t.qZA()()()())},dependencies:[i.YG,i.wI,i.W2,i.Gu,i.Nd,i.wd,i.sr],styles:['.titlefont[_ngcontent-%COMP%]{font-weight:700;font-size:16px;text-align:center;text-transform:capitalize;color:#fff}.bg[_ngcontent-%COMP%]{--background: linear-gradient(270deg, #AC3DBA 0%, #7825CB 100%);padding:0}.or_cls[_ngcontent-%COMP%]{margin-left:15px;font-style:normal;font-weight:600;font-size:12px;line-height:14px;text-align:center;letter-spacing:-.3px;text-transform:uppercase;color:#fff;margin-right:15px}@media (orientation: landscape){.btm[_ngcontent-%COMP%]{text-align:center;margin-top:30px}}.img[_ngcontent-%COMP%], .activeimg[_ngcontent-%COMP%]{width:21.5px;height:21.5px}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]{--border: 0;--background: #181818;position:absolute;bottom:0;left:0;right:0;width:100%;box-shadow:#00000029 0 0 16px;padding:10px 0;max-height:62px;height:60px}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]:after{content:" ";width:100%;bottom:0;background:var(--ion-color-light);height:env(safe-area-inset-bottom);position:absolute}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]{background:#181818}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#42474f}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button.comments[_ngcontent-%COMP%]{margin-right:0;border-top-right-radius:18px}.md[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button.notifs[_ngcontent-%COMP%]{margin-left:0}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]{--border: 0;--background: #181818;position:absolute;bottom:0;left:0;right:0;width:100%;box-shadow:#00000029 0 0 16px;padding:10px 0 45px;max-height:65px;height:62px}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]:after{content:" ";width:100%;bottom:0;background:var(--ion-color-light);height:env(safe-area-inset-bottom);position:absolute}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]{background:#181818}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{color:#42474f}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button.comments[_ngcontent-%COMP%]{margin-right:0;border-top-right-radius:18px}.ios[_ngcontent-%COMP%]   ion-tabs[_ngcontent-%COMP%]   ion-tab-bar[_ngcontent-%COMP%]   ion-tab-button.notifs[_ngcontent-%COMP%]{margin-left:0}.ios[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:85%;margin:29% 17% 24% 8%}.md[_ngcontent-%COMP%]   .topmargin[_ngcontent-%COMP%]{display:flex;align-items:center;padding-top:5%}.ios[_ngcontent-%COMP%]   .topmargin[_ngcontent-%COMP%]{display:flex;align-items:center;padding-top:12%}.font[_ngcontent-%COMP%]{font-style:normal;font-weight:500;font-size:12px;line-height:14px;text-align:center;color:#9d9d9d}.fontactive[_ngcontent-%COMP%]{font-style:normal;font-weight:500;font-size:12px;line-height:14px;text-align:center;color:#ac3dba}.centerall[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}@media (orientation: landscape){.btm[_ngcontent-%COMP%]{text-align:center;margin-top:10px}}@media (orientation: portrait){.btm[_ngcontent-%COMP%]{text-align:center;position:absolute;bottom:20px;width:90%}}']}),n})()}];let u=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[r.Bz.forChild(p),r.Bz]}),n})(),P=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,b.u5,i.Pc,u]}),n})()}}]);