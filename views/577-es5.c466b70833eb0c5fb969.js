!function(){function t(e,o){return(t=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(e,o)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(t){return!1}}();return function(){var r,i=n(t);if(e){var a=n(this).constructor;r=Reflect.construct(i,arguments,a)}else r=i.apply(this,arguments);return o(this,r)}}function o(t,e){if(e&&("object"==typeof e||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}function n(t){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function a(t,e,o){return e&&i(t.prototype,e),o&&i(t,o),t}(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[577],{66577:function(o,n,i){"use strict";i.r(n),i.d(n,{AuthModule:function(){return bt}});var s=i(38583),l=i(3679),u=i(91841),m=i(63423),c=i(37716),g=["root",""],d=function(){var t=function(){function t(){r(this,t),this.today=new Date}return a(t,[{key:"ngOnInit",value:function(){document.body.classList.add("bg-white")}},{key:"ngOnDestroy",value:function(){document.body.classList.remove("bg-white")}}]),t}();return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=c.Xpm({type:t,selectors:[["body","root",""]],attrs:g,decls:14,vars:0,consts:[[1,"d-flex","flex-column","flex-column-fluid","bgi-position-y-bottom","position-x-center","bgi-no-repeat","bgi-size-contain","bgi-attachment-fixed",2,"background-image","url('./assets/media/illustrations/sketchy-1/14.png')"],[1,"d-flex","flex-center","flex-column","flex-column-fluid","p-10","pb-lg-20"],["routerLink","/",1,"mb-12"],["alt","Logo","src","./assets/media/logos/logo-1.svg",1,"h-45px"],[1,"w-lg-500px","bg-white","rounded","shadow-sm","p-10","p-lg-15","mx-auto"],[1,"d-flex","flex-center","flex-column-auto","p-10"],[1,"d-flex","align-items-center","fw-bold","fs-6"],[1,"text-muted","text-hover-primary","px-2","cursor-pointer"]],template:function(t,e){1&t&&(c.TgZ(0,"div",0),c.TgZ(1,"div",1),c.TgZ(2,"a",2),c._UZ(3,"img",3),c.qZA(),c.TgZ(4,"div",4),c._UZ(5,"router-outlet"),c.qZA(),c.qZA(),c.TgZ(6,"div",5),c.TgZ(7,"div",6),c.TgZ(8,"a",7),c._uU(9,"About"),c.qZA(),c.TgZ(10,"a",7),c._uU(11,"Contact"),c.qZA(),c.TgZ(12,"a",7),c._uU(13,"Contact Us"),c.qZA(),c.qZA(),c.qZA(),c.qZA())},directives:[m.yS,m.lC],styles:["[_nghost-%COMP%]{height:100%}"]}),t}(),f=i(28049),p=i(44222),h=i(95935);function v(t,e){if(1&t&&(c.ynx(0),c.TgZ(1,"div",21),c.TgZ(2,"div",22),c._uU(3," Use account "),c.TgZ(4,"strong"),c._uU(5),c.qZA(),c._uU(6," and password "),c.TgZ(7,"strong"),c._uU(8),c.qZA(),c._uU(9," to continue. "),c.qZA(),c.qZA(),c.BQk()),2&t){var o=c.oxw();c.xp6(5),c.Oqu(o.defaultAuth.email),c.xp6(3),c.Oqu(o.defaultAuth.password)}}function b(t,e){1&t&&(c.ynx(0),c.TgZ(1,"div",23),c.TgZ(2,"div",24),c._uU(3," The login details are incorrect "),c.qZA(),c.qZA(),c.BQk())}function Z(t,e){1&t&&(c.ynx(0),c.TgZ(1,"span",25),c._uU(2," Please wait... "),c._UZ(3,"span",26),c.qZA(),c.BQk()),2&t&&(c.xp6(1),c.Udp("display","block"))}function x(t,e){1&t&&(c.ynx(0),c.TgZ(1,"span",27),c._uU(2,"Continue"),c.qZA(),c.BQk())}function w(t,e){if(1&t&&(c.ynx(0),c.TgZ(1,"div",28),c.TgZ(2,"span",29),c._uU(3),c.qZA(),c.qZA(),c.BQk()),2&t){var o=c.oxw().message;c.xp6(3),c.hij(" ",o," ")}}function T(t,e){if(1&t&&c.YNc(0,w,4,1,"ng-container",5),2&t){var o=e.control;c.Q6J("ngIf",o.hasError(e.validation)&&(o.dirty||o.touched))}}var k=function(t,e){return{"is-invalid":t,"is-valid":e}},y=function(t){return{validation:"required",message:"Email is required",control:t}},q=function(t){return{validation:"email",message:"Email is invalid",control:t}},_=function(t){return{validation:"minLength",message:"Email should have at least 3 symbols",control:t}},A=function(t){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:t}},O=function(t){return{validation:"required",message:"Password is required",control:t}},F=function(t){return{validation:"minlength",message:"Password should have at least 3 symbols",control:t}},C=function(t){return{validation:"maxLength",message:"Password should have maximum 100 symbols",control:t}},U=function(){var t=function(){function t(e,o,n,i){r(this,t),this.fb=e,this.authService=o,this.route=n,this.router=i,this.defaultAuth={email:"admin@demo.com",password:"demo"},this.unsubscribe=[],this.isLoading$=this.authService.isLoading$,this.authService.currentUserValue&&this.router.navigate(["/"])}return a(t,[{key:"ngOnInit",value:function(){this.initForm(),this.returnUrl=this.route.snapshot.queryParams["returnUrl".toString()]||"/"}},{key:"f",get:function(){return this.loginForm.controls}},{key:"initForm",value:function(){this.loginForm=this.fb.group({email:[this.defaultAuth.email,l.kI.compose([l.kI.required,l.kI.email,l.kI.minLength(3),l.kI.maxLength(320)])],password:[this.defaultAuth.password,l.kI.compose([l.kI.required,l.kI.minLength(3),l.kI.maxLength(100)])]})}},{key:"submit",value:function(){var t=this;this.hasError=!1;var e=this.authService.login(this.f.email.value,this.f.password.value).pipe((0,f.P)()).subscribe(function(e){e?t.router.navigate([t.returnUrl]):t.hasError=!0});this.unsubscribe.push(e)}},{key:"ngOnDestroy",value:function(){this.unsubscribe.forEach(function(t){return t.unsubscribe()})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(c.Y36(l.qu),c.Y36(p.e),c.Y36(m.gz),c.Y36(m.F0))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-login"]],decls:43,vars:51,consts:[["novalidate","novalidate","id","kt_login_signin_form",1,"form","w-100",3,"formGroup","ngSubmit"],[1,"text-center","mb-10"],[1,"text-dark","mb-3"],[1,"text-gray-400","fw-bold","fs-4"],["routerLink","/auth/registration","id","kt_login_signup",1,"link-primary","fw-bolder"],[4,"ngIf"],[1,"fv-row","mb-10"],[1,"form-label","fs-6","fw-bolder","text-dark"],["type","email","name","email","formControlName","email","autocomplete","off",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"d-flex","justify-content-between","mt-n5"],[1,"d-flex","flex-stack","mb-2"],[1,"form-label","fw-bolder","text-dark","fs-6","mb-0"],["routerLink","/auth/forgot-password","id","kt_login_forgot",1,"link-primary","fs-6","fw-bolder"],["type","password","name","password","autocomplete","off","formControlName","password",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[1,"text-center"],["type","submit","id","kt_sign_in_submit",1,"btn","btn-lg","btn-primary","w-100","mb-5",3,"disabled"],[1,"text-center","text-muted","text-uppercase","fw-bolder","mb-5"],[1,"btn","btn-flex","flex-center","btn-light","btn-lg","w-100","mb-5","cursor-pointer"],["src","./assets/media/svg/brand-logos/google-icon.svg",1,"h-20px","me-3"],["formError",""],[1,"mb-10","bg-light-info","p-8","rounded"],[1,"text-info"],[1,"mb-lg-15","alert","alert-danger"],[1,"alert-text","font-weight-bold"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],[1,"indicator-label"],[1,"fv-plugins-message-container"],["role","alert"]],template:function(t,e){if(1&t&&(c.TgZ(0,"form",0),c.NdJ("ngSubmit",function(){return e.submit()}),c.TgZ(1,"div",1),c.TgZ(2,"h1",2),c._uU(3,"Sign In to Metronic"),c.qZA(),c.TgZ(4,"div",3),c._uU(5," New Here? "),c.TgZ(6,"a",4),c._uU(7),c.ALo(8,"translate"),c.qZA(),c.qZA(),c.qZA(),c.YNc(9,v,10,2,"ng-container",5),c.YNc(10,b,4,0,"ng-container",5),c.TgZ(11,"div",6),c.TgZ(12,"label",7),c._uU(13,"Email"),c.qZA(),c._UZ(14,"input",8),c.GkF(15,9),c.GkF(16,9),c.GkF(17,9),c.GkF(18,9),c.qZA(),c.TgZ(19,"div",6),c.TgZ(20,"div",10),c.TgZ(21,"div",11),c.TgZ(22,"label",12),c._uU(23,"Password"),c.qZA(),c.TgZ(24,"a",13),c._uU(25," Forgot Password ? "),c.qZA(),c.qZA(),c.qZA(),c._UZ(26,"input",14),c.GkF(27,9),c.GkF(28,9),c.GkF(29,9),c.qZA(),c.TgZ(30,"div",15),c.TgZ(31,"button",16),c.YNc(32,Z,4,2,"ng-container",5),c.ALo(33,"async"),c.YNc(34,x,3,0,"ng-container",5),c.ALo(35,"async"),c.qZA(),c.TgZ(36,"div",17),c._uU(37,"or"),c.qZA(),c.TgZ(38,"a",18),c._UZ(39,"img",19),c._uU(40," Continue with Google "),c.qZA(),c.qZA(),c.qZA(),c.YNc(41,T,1,1,"ng-template",null,20,c.W1O)),2&t){var o=c.MAs(42);c.Q6J("formGroup",e.loginForm),c.xp6(7),c.Oqu(c.lcZ(8,25,"AUTH.GENERAL.SIGNUP_BUTTON")),c.xp6(2),c.Q6J("ngIf",!e.hasError),c.xp6(1),c.Q6J("ngIf",e.hasError),c.xp6(4),c.Q6J("ngClass",c.WLB(31,k,e.loginForm.controls.email.invalid,e.loginForm.controls.email.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(34,y,e.loginForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(36,q,e.loginForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(38,_,e.loginForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(40,A,e.loginForm.controls.email)),c.xp6(6),c.Udp("margin-left","5px"),c.xp6(2),c.Q6J("ngClass",c.WLB(42,k,e.loginForm.controls.password.invalid,e.loginForm.controls.password.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(45,O,e.loginForm.controls.password)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(47,F,e.loginForm.controls.password)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(49,C,e.loginForm.controls.password)),c.xp6(2),c.Q6J("disabled",e.loginForm.invalid),c.xp6(1),c.Q6J("ngIf",c.lcZ(33,27,e.isLoading$)),c.xp6(2),c.Q6J("ngIf",!c.lcZ(35,29,e.isLoading$))}},directives:[l._Y,l.JL,l.sg,m.yS,s.O5,l.Fj,l.JJ,l.u,s.mk,s.tP],pipes:[h.X$,s.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),t}(),P=function(){function t(){r(this,t)}return a(t,null,[{key:"MatchPassword",value:function(t){var e,o,n;(null===(e=t.get("password"))||void 0===e?void 0:e.value)!==(null===(o=t.get("cPassword"))||void 0===o?void 0:o.value)&&(null===(n=t.get("cPassword"))||void 0===n||n.setErrors({ConfirmPassword:!0}))}}]),t}(),J=function(o){!function(e,o){if("function"!=typeof o&&null!==o)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(o&&o.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),o&&t(e,o)}(i,o);var n=e(i);function i(){var t;return r(this,i),(t=n.apply(this,arguments)).roles=[],t}return a(i,[{key:"setUser",value:function(t){var e=t;this.id=e.id,this.username=e.username||"",this.password=e.password||"",this.fullname=e.fullname||"",this.email=e.email||"",this.pic=e.pic||"./assets/media/users/default.jpg",this.roles=e.roles||[],this.occupation=e.occupation||"",this.companyName=e.companyName||"",this.phone=e.phone||"",this.address=e.address,this.socialNetworks=e.socialNetworks}}]),i}(i(33223).W);function Q(t,e){1&t&&(c.ynx(0),c.TgZ(1,"div",30),c.TgZ(2,"div",31),c._uU(3," The registration details are incorrect "),c.qZA(),c.qZA(),c.BQk())}function L(t,e){1&t&&(c.ynx(0),c.TgZ(1,"div",32),c.TgZ(2,"div",33),c._uU(3," 'Passsword' and 'Confirm Password' didn't match. "),c.qZA(),c.qZA(),c.BQk())}function I(t,e){1&t&&(c.ynx(0),c.TgZ(1,"span",34),c._uU(2,"Submit"),c.qZA(),c.BQk())}function E(t,e){1&t&&(c.ynx(0),c.TgZ(1,"span",35),c._uU(2," Please wait... "),c._UZ(3,"span",36),c.qZA(),c.BQk()),2&t&&(c.xp6(1),c.Udp("display","block"))}function S(t,e){if(1&t&&(c.ynx(0),c.TgZ(1,"div",32),c.TgZ(2,"div",33),c.TgZ(3,"span",37),c._uU(4),c.qZA(),c.qZA(),c.qZA(),c.BQk()),2&t){var o=c.oxw().message;c.xp6(4),c.hij(" ",o," ")}}function N(t,e){if(1&t&&c.YNc(0,S,5,1,"ng-container",10),2&t){var o=e.control;c.Q6J("ngIf",o.hasError(e.validation)&&(o.dirty||o.touched))}}var G=function(t,e){return{"is-invalid":t,"is-valid":e}},Y=function(t){return{validation:"required",message:"Fullname is required",control:t}},M=function(t){return{validation:"minlength",message:"Fullname should have at least 3 symbols",control:t}},B=function(t){return{validation:"maxLength",message:"Fullname should have maximum 100 symbols",control:t}},V=function(t){return{validation:"required",message:"Email is required",control:t}},K=function(t){return{validation:"email",message:"Email is invalid",control:t}},j=function(t){return{validation:"minlength",message:"Email should have at least 3 symbols",control:t}},W=function(t){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:t}},$=function(t){return{validation:"required",message:"Password is required",control:t}},R=function(t){return{validation:"minlength",message:"Password should have at least 3 symbols",control:t}},X=function(t){return{validation:"maxLength",message:"Password should have maximum 100 symbols",control:t}},H=function(t){return{validation:"required",message:"Confirm Password is required",control:t}},z=function(t){return{validation:"minlength",message:"Confirm Password should have at least 3 symbols",control:t}},D=function(t){return{validation:"maxLength",message:"Confirm Password should have maximum 100 symbols",control:t}},tt=function(){var t=function(){function t(e,o,n){r(this,t),this.fb=e,this.authService=o,this.router=n,this.unsubscribe=[],this.isLoading$=this.authService.isLoading$,this.authService.currentUserValue&&this.router.navigate(["/"])}return a(t,[{key:"ngOnInit",value:function(){this.initForm()}},{key:"f",get:function(){return this.registrationForm.controls}},{key:"initForm",value:function(){this.registrationForm=this.fb.group({fullname:["",l.kI.compose([l.kI.required,l.kI.minLength(3),l.kI.maxLength(100)])],email:["qwe@qwe.qwe",l.kI.compose([l.kI.required,l.kI.email,l.kI.minLength(3),l.kI.maxLength(320)])],password:["",l.kI.compose([l.kI.required,l.kI.minLength(3),l.kI.maxLength(100)])],cPassword:["",l.kI.compose([l.kI.required,l.kI.minLength(3),l.kI.maxLength(100)])],agree:[!1,l.kI.compose([l.kI.required])]},{validator:P.MatchPassword})}},{key:"submit",value:function(){var t=this;this.hasError=!1;var e={};Object.keys(this.f).forEach(function(o){e[o]=t.f[o].value});var o=new J;o.setUser(e);var n=this.authService.registration(o).pipe((0,f.P)()).subscribe(function(e){e?t.router.navigate(["/"]):t.hasError=!0});this.unsubscribe.push(n)}},{key:"ngOnDestroy",value:function(){this.unsubscribe.forEach(function(t){return t.unsubscribe()})}}]),t}();return t.\u0275fac=function(e){return new(e||t)(c.Y36(l.qu),c.Y36(p.e),c.Y36(m.F0))},t.\u0275cmp=c.Xpm({type:t,selectors:[["app-registration"]],decls:65,vars:80,consts:[["novalidate","novalidate","id","kt_login_signup_form",1,"form","w-100","fv-plugins-bootstrap5","fv-plugins-framework",3,"formGroup","ngSubmit"],[1,"mb-10","text-center"],[1,"text-dark","mb-3"],[1,"text-gray-400","fw-bold","fs-4"],["routerLink","/auth/login",1,"link-primary","fw-bolder"],["type","button",1,"btn","btn-light-primary","fw-bolder","w-100","mb-10"],["alt","Logo","src","./assets/media/svg/brand-logos/google-icon.svg",1,"h-20px","me-3"],[1,"d-flex","align-items-center","mb-10"],[1,"border-bottom","border-gray-300","mw-50","w-100"],[1,"fw-bold","text-gray-400","fs-7","mx-2"],[4,"ngIf"],[1,"row","fv-row","mb-7"],[1,"form-label","fw-bolder","text-dark","fs-6"],["type","text","name","fullname","formControlName","fullname","placeholder","Fullname","autocomplete","off",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"fv-row","mb-7"],["type","email","placeholder","Email","name","email","formControlName","email","autocomplete","off",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[1,"mb-10","fv-row"],["type","password","placeholder","Password","name","password","formControlName","password","autocomplete","off",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[1,"fv-row","mb-5"],["type","password","placeholder","Confirm password","name","cPassword","autocomplete","off","formControlName","cPassword",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[1,"fv-row","mb-10"],[1,"form-check","form-check-custom","form-check-solid"],["id","kt_login_toc_agree","type","checkbox","formControlName","agree","name","agree",1,"form-check-input"],["for","kt_login_toc_agree",1,"form-check-label","fw-bold","text-gray-700","fs-6"],["href","https://keenthemes.com/metronic/?page=faq","target","_blank",1,"ms-1","link-primary"],[1,"text-center"],["type","submit","id","kt_sign_up_submit",1,"btn","btn-lg","btn-primary","w-100","mb-5",3,"disabled"],["routerLink","/auth/login","type","button","id","kt_login_signup_form_cancel_button",1,"btn","btn-lg","btn-light-primary","w-100","mb-5"],["formError",""],[1,"mb-lg-15","alert","alert-danger"],[1,"alert-text","font-weight-bold"],[1,"fv-plugins-message-container"],[1,"fv-help-block"],[1,"indicator-label"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],["role","alert"]],template:function(t,e){if(1&t&&(c.TgZ(0,"form",0),c.NdJ("ngSubmit",function(){return e.submit()}),c.TgZ(1,"div",1),c.TgZ(2,"h1",2),c._uU(3,"Create an Account"),c.qZA(),c.TgZ(4,"div",3),c._uU(5," Already have an account? "),c.TgZ(6,"a",4),c._uU(7,"Sign in?"),c.qZA(),c.qZA(),c.qZA(),c.TgZ(8,"button",5),c._UZ(9,"img",6),c._uU(10,"Sign in with Google "),c.qZA(),c.TgZ(11,"div",7),c._UZ(12,"div",8),c.TgZ(13,"span",9),c._uU(14,"OR"),c.qZA(),c._UZ(15,"div",8),c.qZA(),c.YNc(16,Q,4,0,"ng-container",10),c.TgZ(17,"div",11),c.TgZ(18,"label",12),c._uU(19,"Fullname"),c.qZA(),c._UZ(20,"input",13),c.GkF(21,14),c.GkF(22,14),c.GkF(23,14),c.qZA(),c.TgZ(24,"div",15),c.TgZ(25,"label",12),c._uU(26,"Email"),c.qZA(),c._UZ(27,"input",16),c.GkF(28,14),c.GkF(29,14),c.GkF(30,14),c.GkF(31,14),c.qZA(),c.TgZ(32,"div",17),c.TgZ(33,"label",12),c._uU(34,"Password"),c.qZA(),c._UZ(35,"input",18),c.GkF(36,14),c.GkF(37,14),c.GkF(38,14),c.qZA(),c.TgZ(39,"div",19),c.TgZ(40,"label",12),c._uU(41,"Confirm Password"),c.qZA(),c._UZ(42,"input",20),c.GkF(43,14),c.GkF(44,14),c.GkF(45,14),c.YNc(46,L,4,0,"ng-container",10),c.qZA(),c.TgZ(47,"div",21),c.TgZ(48,"div",22),c._UZ(49,"input",23),c.TgZ(50,"label",24),c._uU(51," I Agree the\xa0"),c.TgZ(52,"a",25),c._uU(53,"terms and conditions"),c.qZA(),c._uU(54,". "),c.qZA(),c.qZA(),c.qZA(),c.TgZ(55,"div",26),c.TgZ(56,"button",27),c.YNc(57,I,3,0,"ng-container",10),c.ALo(58,"async"),c.YNc(59,E,4,2,"ng-container",10),c.ALo(60,"async"),c.qZA(),c.TgZ(61,"a",28),c._uU(62," Cancel "),c.qZA(),c.qZA(),c.qZA(),c.YNc(63,N,1,1,"ng-template",null,29,c.W1O)),2&t){var o=c.MAs(64);c.Q6J("formGroup",e.registrationForm),c.xp6(6),c.Udp("margin-left","5px"),c.xp6(10),c.Q6J("ngIf",e.hasError),c.xp6(4),c.Q6J("ngClass",c.WLB(42,G,e.registrationForm.controls.fullname.invalid,e.registrationForm.controls.fullname.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(45,Y,e.registrationForm.controls.fullname)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(47,M,e.registrationForm.controls.fullname)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(49,B,e.registrationForm.controls.fullname)),c.xp6(4),c.Q6J("ngClass",c.WLB(51,G,e.registrationForm.controls.email.invalid,e.registrationForm.controls.email.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(54,V,e.registrationForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(56,K,e.registrationForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(58,j,e.registrationForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(60,W,e.registrationForm.controls.email)),c.xp6(4),c.Q6J("ngClass",c.WLB(62,G,e.registrationForm.controls.password.invalid,e.registrationForm.controls.password.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(65,$,e.registrationForm.controls.password)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(67,R,e.registrationForm.controls.password)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(69,X,e.registrationForm.controls.password)),c.xp6(4),c.Q6J("ngClass",c.WLB(71,G,e.registrationForm.controls.cPassword.invalid,e.registrationForm.controls.cPassword.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(74,H,e.registrationForm.controls.cPassword)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(76,z,e.registrationForm.controls.cPassword)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(78,D,e.registrationForm.controls.cPassword)),c.xp6(1),c.Q6J("ngIf",e.registrationForm.controls.cPassword.errors&&e.registrationForm.controls.cPassword.errors.ConfirmPassword),c.xp6(10),c.Q6J("disabled",e.registrationForm.invalid||!e.registrationForm.controls.agree.value),c.xp6(1),c.Q6J("ngIf",!1===c.lcZ(58,38,e.isLoading$)),c.xp6(2),c.Q6J("ngIf",c.lcZ(60,40,e.isLoading$))}},directives:[l._Y,l.JL,l.sg,m.yS,s.O5,l.Fj,l.JJ,l.u,s.mk,s.tP,l.Wl],pipes:[s.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),t}();function et(t,e){1&t&&(c.ynx(0),c.TgZ(1,"div",14),c.TgZ(2,"div",15),c._uU(3," Sorry, looks like there are some errors detected, please try again. "),c.qZA(),c.qZA(),c.BQk())}function ot(t,e){1&t&&(c.ynx(0),c.TgZ(1,"div",16),c.TgZ(2,"div",17),c._uU(3,"Sent password reset. Please check your email"),c.qZA(),c.qZA(),c.BQk())}function nt(t,e){1&t&&(c.ynx(0),c.TgZ(1,"span",18),c._uU(2," Please wait... "),c._UZ(3,"span",19),c.qZA(),c.BQk())}function rt(t,e){if(1&t&&(c.ynx(0),c.TgZ(1,"div",20),c.TgZ(2,"div",21),c.TgZ(3,"span",22),c._uU(4),c.qZA(),c.qZA(),c.qZA(),c.BQk()),2&t){var o=c.oxw().message;c.xp6(4),c.Oqu(o)}}function it(t,e){if(1&t&&c.YNc(0,rt,5,1,"ng-container",4),2&t){var o=e.control;c.Q6J("ngIf",o.hasError(e.validation)&&(o.dirty||o.touched))}}var at,st,lt,ut=function(t,e){return{"is-invalid":t,"is-valid":e}},mt=function(t){return{validation:"required",message:"Email is required",control:t}},ct=function(t){return{validation:"email",message:"Email is invalid",control:t}},gt=function(t){return{validation:"minLength",message:"Email should have at least 3 symbols",control:t}},dt=function(t){return{validation:"maxLength",message:"Email should have maximum 360 symbols",control:t}},ft=(function(t){t[t.NotSubmitted=0]="NotSubmitted",t[t.HasError=1]="HasError",t[t.NoError=2]="NoError"}(ft||(ft={})),ft),pt=[{path:"",component:d,children:[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:U,data:{returnUrl:window.location.pathname}},{path:"registration",component:tt},{path:"forgot-password",component:(st=function(){function t(e,o){r(this,t),this.fb=e,this.authService=o,this.errorState=ft.NotSubmitted,this.errorStates=ft,this.unsubscribe=[],this.isLoading$=this.authService.isLoading$}return a(t,[{key:"ngOnInit",value:function(){this.initForm()}},{key:"f",get:function(){return this.forgotPasswordForm.controls}},{key:"initForm",value:function(){this.forgotPasswordForm=this.fb.group({email:["admin@demo.com",l.kI.compose([l.kI.required,l.kI.email,l.kI.minLength(3),l.kI.maxLength(320)])]})}},{key:"submit",value:function(){var t=this;this.errorState=ft.NotSubmitted;var e=this.authService.forgotPassword(this.f.email.value).pipe((0,f.P)()).subscribe(function(e){t.errorState=e?ft.NoError:ft.HasError});this.unsubscribe.push(e)}}]),t}(),st.\u0275fac=function(t){return new(t||st)(c.Y36(l.qu),c.Y36(p.e))},st.\u0275cmp=c.Xpm({type:st,selectors:[["app-forgot-password"]],decls:26,vars:26,consts:[["novalidate","novalidate","id","kt_login_password_reset_form",1,"form","w-100","fv-plugins-bootstrap5","fv-plugins-framework",3,"formGroup","ngSubmit"],[1,"text-center","mb-10"],[1,"text-dark","mb-3"],[1,"text-gray-400","fw-bold","fs-4"],[4,"ngIf"],[1,"fv-row","mb-10"],[1,"form-label","fw-bolder","text-gray-900","fs-6"],["type","email","formControlName","email","placeholder","Email","name","email","autocomplete","off",1,"form-control","form-control-lg","form-control-solid",3,"ngClass"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"d-flex","flex-wrap","justify-content-center","pb-lg-0"],["type","submit","id","kt_password_reset_submit",1,"btn","btn-lg","btn-primary","fw-bolder","me-4"],[1,"indicator-label"],["routerLink","/auth/login","id","kt_login_password_reset_form_cancel_button",1,"btn","btn-lg","btn-light-primary","fw-bolder"],["formError",""],[1,"mb-lg-15","alert","alert-danger"],[1,"alert-text","font-weight-bold"],[1,"mb-10","bg-light-info","p-8","rounded"],[1,"text-info"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"],[1,"fv-plugins-message-container"],[1,"fv-help-block"],["role","alert"]],template:function(t,e){if(1&t&&(c.TgZ(0,"form",0),c.NdJ("ngSubmit",function(){return e.submit()}),c.TgZ(1,"div",1),c.TgZ(2,"h1",2),c._uU(3,"Forgotten Password ?"),c.qZA(),c.TgZ(4,"div",3),c._uU(5," Enter your email to reset your password. "),c.qZA(),c.qZA(),c.YNc(6,et,4,0,"ng-container",4),c.YNc(7,ot,4,0,"ng-container",4),c.TgZ(8,"div",5),c.TgZ(9,"label",6),c._uU(10,"Email"),c.qZA(),c._UZ(11,"input",7),c.GkF(12,8),c.GkF(13,8),c.GkF(14,8),c.GkF(15,8),c.qZA(),c.TgZ(16,"div",9),c.TgZ(17,"button",10),c.TgZ(18,"span",11),c._uU(19,"Submit"),c.qZA(),c.YNc(20,nt,4,0,"ng-container",4),c.ALo(21,"async"),c.qZA(),c.TgZ(22,"a",12),c._uU(23," Cancel "),c.qZA(),c.qZA(),c.qZA(),c.YNc(24,it,1,1,"ng-template",null,13,c.W1O)),2&t){var o=c.MAs(25);c.Q6J("formGroup",e.forgotPasswordForm),c.xp6(6),c.Q6J("ngIf",e.errorState===e.errorStates.HasError),c.xp6(1),c.Q6J("ngIf",e.errorState===e.errorStates.NoError),c.xp6(4),c.Q6J("ngClass",c.WLB(15,ut,e.forgotPasswordForm.controls.email.invalid,e.forgotPasswordForm.controls.email.valid)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(18,mt,e.forgotPasswordForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(20,ct,e.forgotPasswordForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(22,gt,e.forgotPasswordForm.controls.email)),c.xp6(1),c.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",c.VKq(24,dt,e.forgotPasswordForm.controls.email)),c.xp6(5),c.Q6J("ngIf",c.lcZ(21,13,e.isLoading$))}},directives:[l._Y,l.JL,l.sg,s.O5,l.Fj,l.JJ,l.u,s.mk,s.tP,m.yS],pipes:[s.Ov],styles:["[_nghost-%COMP%]{width:100%}@media (min-width: 992px){[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]{width:100%;max-width:450px}[_nghost-%COMP%]   .login-form[_ngcontent-%COMP%]   .mat-form-field[_ngcontent-%COMP%]{width:100%}}"]}),st)},{path:"logout",component:(at=function(){function t(e){r(this,t),this.authService=e,this.authService.logout()}return a(t,[{key:"ngOnInit",value:function(){}}]),t}(),at.\u0275fac=function(t){return new(t||at)(c.Y36(p.e))},at.\u0275cmp=c.Xpm({type:at,selectors:[["app-logout"]],decls:2,vars:0,template:function(t,e){1&t&&(c.TgZ(0,"p"),c._uU(1,"logout works!"),c.qZA())},styles:[""]}),at)},{path:"",redirectTo:"login",pathMatch:"full"},{path:"**",redirectTo:"dashboard",pathMatch:"full"}]}],ht=function(){var t=function t(){r(this,t)};return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=c.oAB({type:t}),t.\u0275inj=c.cJS({imports:[[m.Bz.forChild(pt)],m.Bz]}),t}(),vt=i(87292),bt=((lt=function t(){r(this,t)}).\u0275fac=function(t){return new(t||lt)},lt.\u0275mod=c.oAB({type:lt}),lt.\u0275inj=c.cJS({imports:[[s.ez,vt.q,ht,l.u5,l.UX,u.JF]]}),lt)}}])}();