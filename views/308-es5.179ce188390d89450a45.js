!function(){function e(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}function i(e,i){for(var n=0;n<i.length;n++){var o=i[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(self.webpackChunkdemo1=self.webpackChunkdemo1||[]).push([[308],{85308:function(n,o,t){"use strict";t.r(o),t.d(o,{BuilderModule:function(){return q}});var d=t(38583),l=t(63423),a=t(37716),g=(t(42570),t(83112)),Z=t(72789),r=t(3679),c=["form"];function s(e,i){1&e&&(a.ynx(0),a.TgZ(1,"span",57),a._uU(2,"Preview"),a.qZA(),a.BQk())}function u(e,i){1&e&&(a.ynx(0),a.TgZ(1,"span",58),a._uU(2),a._UZ(3,"span",59),a.qZA(),a.BQk()),2&e&&(a.xp6(1),a.Udp("display","block"),a.xp6(1),a.hij(" Please wait..."," "," "))}function p(e,i){1&e&&(a.ynx(0),a.TgZ(1,"span",57),a._uU(2,"Reset"),a.qZA(),a.BQk())}function T(e,i){1&e&&(a.ynx(0),a.TgZ(1,"span",58),a._uU(2),a._UZ(3,"span",59),a.qZA(),a.BQk()),2&e&&(a.xp6(1),a.Udp("display","block"),a.xp6(1),a.hij(" Please wait..."," "," "))}var m,A=function(){return{class:"h-80px w-80px"}},f=function(e){return{active:e}},h=function(){var n=function(){function n(i){e(this,n),this.layout=i,this.activeTab="Header",this.configLoading=!1,this.resetLoading=!1}var o,t,d;return o=n,(t=[{key:"ngOnInit",value:function(){this.model=this.layout.getConfig()}},{key:"setActiveTab",value:function(e){this.activeTab=e}},{key:"resetPreview",value:function(){this.resetLoading=!0,this.layout.refreshConfigToDefault()}},{key:"submitPreview",value:function(){this.configLoading=!0,this.layout.setConfig(this.model),location.reload()}}])&&i(o.prototype,t),d&&i(o,d),n}();return n.\u0275fac=function(e){return new(e||n)(a.Y36(g.Pb))},n.\u0275cmp=a.Xpm({type:n,selectors:[["app-builder"]],viewQuery:function(e,i){var n;(1&e&&a.Gf(c,7),2&e)&&(a.iGM(n=a.CRH())&&(i.form=n.first))},decls:212,vars:64,consts:[[1,"card","mb-10"],[1,"card-body","d-flex","align-items-center","py-8"],[1,"d-flex","h-80px","w-80px","flex-shrink-0","flex-center","position-relative"],[1,"svg-icon","svg-icon-primary","position-absolute","opacity-15",3,"inlineSVG","setSVGAttributes"],[1,"svg-icon","svg-icon-3x","svg-icon-primary","position-absolute",3,"inlineSVG"],[1,"ms-6"],[1,"list-unstyled","text-gray-600","fw-bold","fs-6","p-0","m-0"],[1,"card","card-custom"],[1,"card-header","card-header-stretch","overflow-auto"],["role","tablist",1,"nav","nav-stretch","nav-line-tabs","fw-bold","border-transparent","flex-nowrap"],[1,"nav-item"],["role","tab",1,"nav-link","cursor-pointer",3,"ngClass","click"],["novalidate","",1,"form",3,"ngSubmit"],["form","ngForm"],[1,"card-body"],[1,"tab-content","pt-3"],[1,"tab-pane",3,"ngClass"],[1,"row","mb-10"],[1,"col-lg-3","col-form-label","text-lg-end"],[1,"col-lg-9","col-xl-4"],[1,"form-check","form-check-custom","form-check-solid","form-switch","mb-5"],["type","checkbox","name","model.header.fixed.desktop",1,"form-check-input",3,"ngModel","ngModelChange"],[1,"form-check-label","text-muted"],[1,"form-check","form-check-custom","form-check-solid","form-switch","mb-3"],["type","checkbox","name","model.header.fixed.tabletAndMobile",1,"form-check-input",3,"ngModel","ngModelChange"],[1,"form-text","text-muted"],["name","model.header.left",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],["value","menu"],["value","page-title"],["name","model.header.width",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],["value","fluid"],["value","fixed"],[1,"form-check","form-check-custom","form-check-solid","form-switch","mb-2"],["type","checkbox","name","model.toolbar.display",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.toolbar.fixed.desktop",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.toolbar.fixed.tabletAndMobileMode",1,"form-check-input",3,"ngModel","ngModelChange"],["name","model.toolbar.width",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],["type","checkbox","name","model.pageTitle.display",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.pageTitle.breadCrumbs",1,"form-check-input",3,"ngModel","ngModelChange"],["name","model.content.width",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],[1,"switch","switch-icon"],["type","checkbox","name","model.aside.display",1,"form-check-input",3,"ngModel","ngModelChange"],["name","model.aside.theme",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],["value","dark"],["value","light"],["type","checkbox","name","model.aside.fixed",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.aside.minimize",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.aside.minimized",1,"form-check-input",3,"ngModel","ngModelChange"],["type","checkbox","name","model.aside.hoverable",1,"form-check-input",3,"ngModel","ngModelChange"],["name","model.footer.width",1,"form-select","form-select-solid",3,"ngModel","ngModelChange"],[1,"card-footer","py-6"],[1,"row"],[1,"col-lg-3"],[1,"col-lg-9"],["type","button",1,"btn","btn-primary","me-2",3,"disabled","click"],[4,"ngIf"],["type","button","id","kt_layout_builder_reset",1,"btn","btn-active-light","btn-color-muted",3,"disabled","click"],[1,"indicator-label"],[1,"indicator-progress"],[1,"spinner-border","spinner-border-sm","align-middle","ms-2"]],template:function(e,i){1&e&&(a.TgZ(0,"div",0),a.TgZ(1,"div",1),a.TgZ(2,"div",2),a._UZ(3,"span",3),a._UZ(4,"span",4),a.qZA(),a.TgZ(5,"div",5),a.TgZ(6,"p",6),a._uU(7," The layout builder is to assist your set and configure your preferred project layout specifications and preview it in real-time and export the HTML template with its includable partials of this demo. The downloaded version does not include the assets folder since the layout builder's main purpose is to help to generate the final HTML code without hassle. Layout builder changes don't affect pages with layout wrappers. "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(8,"div",7),a.TgZ(9,"div",8),a.TgZ(10,"ul",9),a.TgZ(11,"li",10),a.TgZ(12,"a",11),a.NdJ("click",function(){return i.setActiveTab("Header")}),a._uU(13," Header "),a.qZA(),a.qZA(),a.TgZ(14,"li",10),a.TgZ(15,"a",11),a.NdJ("click",function(){return i.setActiveTab("Toolbar")}),a._uU(16," Toolbar "),a.qZA(),a.qZA(),a.TgZ(17,"li",10),a.TgZ(18,"a",11),a.NdJ("click",function(){return i.setActiveTab("PageTitle")}),a._uU(19," Page Title "),a.qZA(),a.qZA(),a.TgZ(20,"li",10),a.TgZ(21,"a",11),a.NdJ("click",function(){return i.setActiveTab("Aside")}),a._uU(22," Aside "),a.qZA(),a.qZA(),a.TgZ(23,"li",10),a.TgZ(24,"a",11),a.NdJ("click",function(){return i.setActiveTab("Content")}),a._uU(25," Content "),a.qZA(),a.qZA(),a.TgZ(26,"li",10),a.TgZ(27,"a",11),a.NdJ("click",function(){return i.setActiveTab("Footer")}),a._uU(28," Footer "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(29,"form",12,13),a.NdJ("ngSubmit",function(){return i.submitPreview()}),a.TgZ(31,"div",14),a.TgZ(32,"div",15),a.TgZ(33,"div",16),a.TgZ(34,"div",17),a.TgZ(35,"label",18),a._uU(36,"Fixed Header:"),a.qZA(),a.TgZ(37,"div",19),a.TgZ(38,"label",20),a.TgZ(39,"input",21),a.NdJ("ngModelChange",function(e){return i.model.header.fixed.desktop=e}),a.qZA(),a.TgZ(40,"span",22),a._uU(41,"Desktop"),a.qZA(),a.qZA(),a.TgZ(42,"label",23),a.TgZ(43,"input",24),a.NdJ("ngModelChange",function(e){return i.model.header.fixed.tabletAndMobile=e}),a.qZA(),a.TgZ(44,"span",22),a._uU(45,"Tablet & Mobile"),a.qZA(),a.qZA(),a.TgZ(46,"div",25),a._uU(47,"Enable fixed header"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(48,"div",17),a.TgZ(49,"label",18),a._uU(50,"Left Content:"),a.qZA(),a.TgZ(51,"div",19),a.TgZ(52,"select",26),a.NdJ("ngModelChange",function(e){return i.model.header.left=e}),a.TgZ(53,"option",27),a._uU(54,"Menu"),a.qZA(),a.TgZ(55,"option",28),a._uU(56,"Page title"),a.qZA(),a.qZA(),a.TgZ(57,"div",25),a._uU(58," Select header left content type. "),a.qZA(),a.qZA(),a.qZA(),a.TgZ(59,"div",17),a.TgZ(60,"label",18),a._uU(61,"Width:"),a.qZA(),a.TgZ(62,"div",19),a.TgZ(63,"select",29),a.NdJ("ngModelChange",function(e){return i.model.header.width=e}),a.TgZ(64,"option",30),a._uU(65,"Fluid"),a.qZA(),a.TgZ(66,"option",31),a._uU(67,"Fixed"),a.qZA(),a.qZA(),a.TgZ(68,"div",25),a._uU(69,"Select header width type."),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(70,"div",16),a.TgZ(71,"div",17),a.TgZ(72,"label",18),a._uU(73,"Display:"),a.qZA(),a.TgZ(74,"div",19),a.TgZ(75,"div",32),a.TgZ(76,"input",33),a.NdJ("ngModelChange",function(e){return i.model.toolbar.display=e}),a.qZA(),a.qZA(),a.TgZ(77,"div",25),a._uU(78,"Display toolbar"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(79,"div",17),a.TgZ(80,"label",18),a._uU(81,"Fixed Toolbar:"),a.qZA(),a.TgZ(82,"div",19),a.TgZ(83,"label",20),a.TgZ(84,"input",34),a.NdJ("ngModelChange",function(e){return i.model.toolbar.fixed.desktop=e}),a.qZA(),a.TgZ(85,"span",22),a._uU(86,"Desktop"),a.qZA(),a.qZA(),a.TgZ(87,"label",23),a.TgZ(88,"input",35),a.NdJ("ngModelChange",function(e){return i.model.toolbar.fixed.tabletAndMobileMode=e}),a.qZA(),a.TgZ(89,"span",22),a._uU(90,"Tablet & Mobile"),a.qZA(),a.qZA(),a.TgZ(91,"div",25),a._uU(92,"Enable fixed toolbar"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(93,"div",17),a.TgZ(94,"label",18),a._uU(95,"Width:"),a.qZA(),a.TgZ(96,"div",19),a.TgZ(97,"select",36),a.NdJ("ngModelChange",function(e){return i.model.toolbar.width=e}),a.TgZ(98,"option",30),a._uU(99,"Fluid"),a.qZA(),a.TgZ(100,"option",31),a._uU(101,"Fixed"),a.qZA(),a.qZA(),a.TgZ(102,"div",25),a._uU(103,"Select layout width type."),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(104,"div",16),a.TgZ(105,"div",17),a.TgZ(106,"label",18),a._uU(107,"Display:"),a.qZA(),a.TgZ(108,"div",19),a.TgZ(109,"div",32),a.TgZ(110,"input",37),a.NdJ("ngModelChange",function(e){return i.model.pageTitle.display=e}),a.qZA(),a.qZA(),a.TgZ(111,"div",25),a._uU(112,"Display page title"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(113,"div",17),a.TgZ(114,"label",18),a._uU(115,"Breadcrumb:"),a.qZA(),a.TgZ(116,"div",19),a.TgZ(117,"div",32),a.TgZ(118,"input",38),a.NdJ("ngModelChange",function(e){return i.model.pageTitle.breadCrumbs=e}),a.qZA(),a.qZA(),a.TgZ(119,"div",25),a._uU(120,"Display page title"),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(121,"div",16),a.TgZ(122,"div",17),a.TgZ(123,"label",18),a._uU(124,"Width:"),a.qZA(),a.TgZ(125,"div",19),a.TgZ(126,"select",39),a.NdJ("ngModelChange",function(e){return i.model.content.width=e}),a.TgZ(127,"option",30),a._uU(128,"Fluid"),a.qZA(),a.TgZ(129,"option",31),a._uU(130,"Fixed"),a.qZA(),a.qZA(),a.TgZ(131,"div",25),a._uU(132,"Select layout width type."),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(133,"div",16),a.TgZ(134,"div",17),a.TgZ(135,"label",18),a._uU(136,"Display:"),a.qZA(),a.TgZ(137,"div",19),a.TgZ(138,"div",40),a.TgZ(139,"div",32),a.TgZ(140,"input",41),a.NdJ("ngModelChange",function(e){return i.model.aside.display=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(141,"div",25),a._uU(142,"Display Aside"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(143,"div",17),a.TgZ(144,"label",18),a._uU(145,"Theme:"),a.qZA(),a.TgZ(146,"div",19),a.TgZ(147,"select",42),a.NdJ("ngModelChange",function(e){return i.model.aside.theme=e}),a.TgZ(148,"option",43),a._uU(149,"Dark"),a.qZA(),a.TgZ(150,"option",44),a._uU(151,"Light"),a.qZA(),a.qZA(),a.TgZ(152,"div",25),a._uU(153," Select header left content type. "),a.qZA(),a.qZA(),a.qZA(),a.TgZ(154,"div",17),a.TgZ(155,"label",18),a._uU(156,"Fixed:"),a.qZA(),a.TgZ(157,"div",19),a.TgZ(158,"div",40),a.TgZ(159,"div",32),a.TgZ(160,"input",45),a.NdJ("ngModelChange",function(e){return i.model.aside.fixed=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(161,"div",25),a._uU(162,"Enable fixed aside"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(163,"div",17),a.TgZ(164,"label",18),a._uU(165,"Minimize:"),a.qZA(),a.TgZ(166,"div",19),a.TgZ(167,"div",40),a.TgZ(168,"div",32),a.TgZ(169,"input",46),a.NdJ("ngModelChange",function(e){return i.model.aside.minimize=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(170,"div",25),a._uU(171,"Enable aside minimization"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(172,"div",17),a.TgZ(173,"label",18),a._uU(174,"Minimized:"),a.qZA(),a.TgZ(175,"div",19),a.TgZ(176,"div",40),a.TgZ(177,"div",32),a.TgZ(178,"input",47),a.NdJ("ngModelChange",function(e){return i.model.aside.minimized=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(179,"div",25),a._uU(180,"Default minimized aside"),a.qZA(),a.qZA(),a.qZA(),a.TgZ(181,"div",17),a.TgZ(182,"label",18),a._uU(183,"Hoverable:"),a.qZA(),a.TgZ(184,"div",19),a.TgZ(185,"div",40),a.TgZ(186,"div",32),a.TgZ(187,"input",48),a.NdJ("ngModelChange",function(e){return i.model.aside.hoverable=e}),a.qZA(),a.qZA(),a.qZA(),a.TgZ(188,"div",25),a._uU(189," Enable hoverable minimized aside "),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(190,"div",16),a.TgZ(191,"div",17),a.TgZ(192,"label",18),a._uU(193,"Width:"),a.qZA(),a.TgZ(194,"div",19),a.TgZ(195,"select",49),a.NdJ("ngModelChange",function(e){return i.model.footer.width=e}),a.TgZ(196,"option",30),a._uU(197,"Fluid"),a.qZA(),a.TgZ(198,"option",31),a._uU(199,"Fixed"),a.qZA(),a.qZA(),a.TgZ(200,"div",25),a._uU(201,"Select layout width type."),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.TgZ(202,"div",50),a.TgZ(203,"div",51),a._UZ(204,"div",52),a.TgZ(205,"div",53),a.TgZ(206,"button",54),a.NdJ("click",function(){return i.submitPreview()}),a.YNc(207,s,3,0,"ng-container",55),a.YNc(208,u,4,3,"ng-container",55),a.qZA(),a.TgZ(209,"button",56),a.NdJ("click",function(){return i.resetPreview()}),a.YNc(210,p,3,0,"ng-container",55),a.YNc(211,T,4,3,"ng-container",55),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA(),a.qZA()),2&e&&(a.xp6(3),a.Q6J("inlineSVG","./assets/media/icons/duotune/abstract/abs051.svg")("setSVGAttributes",a.DdM(39,A)),a.xp6(1),a.Q6J("inlineSVG","./assets/media/icons/duotune/coding/cod009.svg"),a.xp6(8),a.Q6J("ngClass",a.VKq(40,f,"Header"===i.activeTab)),a.xp6(3),a.Q6J("ngClass",a.VKq(42,f,"Toolbar"===i.activeTab)),a.xp6(3),a.Q6J("ngClass",a.VKq(44,f,"PageTitle"===i.activeTab)),a.xp6(3),a.Q6J("ngClass",a.VKq(46,f,"Aside"===i.activeTab)),a.xp6(3),a.Q6J("ngClass",a.VKq(48,f,"Content"===i.activeTab)),a.xp6(3),a.Q6J("ngClass",a.VKq(50,f,"Footer"===i.activeTab)),a.xp6(6),a.Q6J("ngClass",a.VKq(52,f,"Header"===i.activeTab)),a.xp6(6),a.Q6J("ngModel",i.model.header.fixed.desktop),a.xp6(4),a.Q6J("ngModel",i.model.header.fixed.tabletAndMobile),a.xp6(9),a.Q6J("ngModel",i.model.header.left),a.xp6(11),a.Q6J("ngModel",i.model.header.width),a.xp6(7),a.Q6J("ngClass",a.VKq(54,f,"Toolbar"===i.activeTab)),a.xp6(6),a.Q6J("ngModel",i.model.toolbar.display),a.xp6(8),a.Q6J("ngModel",i.model.toolbar.fixed.desktop),a.xp6(4),a.Q6J("ngModel",i.model.toolbar.fixed.tabletAndMobileMode),a.xp6(9),a.Q6J("ngModel",i.model.toolbar.width),a.xp6(7),a.Q6J("ngClass",a.VKq(56,f,"PageTitle"===i.activeTab)),a.xp6(6),a.Q6J("ngModel",i.model.pageTitle.display),a.xp6(8),a.Q6J("ngModel",i.model.pageTitle.breadCrumbs),a.xp6(3),a.Q6J("ngClass",a.VKq(58,f,"Content"===i.activeTab)),a.xp6(5),a.Q6J("ngModel",i.model.content.width),a.xp6(7),a.Q6J("ngClass",a.VKq(60,f,"Aside"===i.activeTab)),a.xp6(7),a.Q6J("ngModel",i.model.aside.display),a.xp6(7),a.Q6J("ngModel",i.model.aside.theme),a.xp6(13),a.Q6J("ngModel",i.model.aside.fixed),a.xp6(9),a.Q6J("ngModel",i.model.aside.minimize),a.xp6(9),a.Q6J("ngModel",i.model.aside.minimized),a.xp6(9),a.Q6J("ngModel",i.model.aside.hoverable),a.xp6(3),a.Q6J("ngClass",a.VKq(62,f,"Footer"===i.activeTab)),a.xp6(5),a.Q6J("ngModel",i.model.footer.width),a.xp6(11),a.Q6J("disabled",i.configLoading||i.resetLoading),a.xp6(1),a.Q6J("ngIf",!i.configLoading),a.xp6(1),a.Q6J("ngIf",i.configLoading),a.xp6(1),a.Q6J("disabled",i.configLoading||i.resetLoading),a.xp6(1),a.Q6J("ngIf",!i.resetLoading),a.xp6(1),a.Q6J("ngIf",i.resetLoading))},directives:[Z.d$,d.mk,r._Y,r.JL,r.F,r.Wl,r.JJ,r.On,r.EJ,r.YN,r.Kr,d.O5],encapsulation:2}),n}(),b=t(93338),q=((m=function i(){e(this,i)}).\u0275fac=function(e){return new(e||m)},m.\u0275mod=a.oAB({type:m}),m.\u0275inj=a.cJS({imports:[[d.ez,r.u5,Z.vi,b.HK,l.Bz.forChild([{path:"",component:h}])]]}),m)}}])}();