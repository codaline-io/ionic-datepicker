import{r as s,c as i,h as t,H as o}from"./p-a9232c04.js";const a=window.luxon.DateTime,r=class{constructor(t){s(this,t),this.displayFormat="DDD",this.disabled=!1,this.pickerOptions={},this.placeholder="Datum",this.nativeOnMobile=!1,this.max=a.local().plus({years:100}).toISODate(),this.min=a.local().minus({years:100}).toISODate(),this.required=!1,this.error=!1,this.popoverOptions={},this.errorClass="ionic-datepicker-error",this.formattedDate="",this.isDesktop=!window.matchMedia("(any-pointer:coarse)").matches,this.handleDateClick=this.handleDateClick.bind(this),this.handleInput=this.handleInput.bind(this),this.changes=i(this,"changes",7)}componentWillLoad(){this.required&&(this.defaultDate&&this.defaultDate.trim()||(this.defaultDate=a.local().toISODate())),this.defaultDate&&(this.date=a.fromISO(this.defaultDate),this.formattedDate=this.date.toFormat(this.displayFormat))}handleInput(s){this.disabled&&(this.date=a.fromISO(s.target.value),this.formattedDate=this.date.toFormat(this.displayFormat),this.changes.emit(this.date.toISODate()))}async handleDateClick(s){if(this.disabled)return;const i=Object.assign(document.createElement("ion-popover"),Object.assign(Object.assign({},this.popoverOptions),{component:"ionic-datepicker-popover",componentProps:{selectedDate:this.date?this.date.toISODate():null,disabled:this.disabled,displayFormat:this.displayFormat,max:this.max,min:this.min,pickerOptions:this.pickerOptions},cssClass:"datepicker-popover",event:s}));document.body.appendChild(i),await i.present();const{data:t}=await i.onWillDismiss();if(t&&t.date){this.date=a.fromISO(t.date),this.formattedDate=this.date.toFormat(this.displayFormat);const s=this.date.toFormat("yyyy-LL-dd");this.changes.emit(s)}}render(){const s=this.disabled?"disabled":"",i=this.error&&this.errorClass?this.errorClass:"";return t(o,null,(this.isDesktop||!this.nativeOnMobile)&&t("span",{onClick:this.handleDateClick,class:`${s} ${i} ${this.formattedDate?"":"placeholder"}`},this.formattedDate||this.placeholder),!this.isDesktop&&this.nativeOnMobile&&t("input",{type:"date",disabled:this.disabled,class:`${s} ${i}`,placeholder:this.placeholder,onInput:this.handleInput,max:this.max,min:this.min,required:this.required,value:this.date?this.date.toISODate():""}))}};r.style=":root,:host{--base-spacing:var(--ion-padding, 16px);--base-spacing-small:calc(var(--base-spacing) * 0.7);--base-spacing-large:calc(var(--base-spacing) * 1.5);--font-size-base:14px;--font-size-small:calc(var(--font-size-base) * 0.9);--font-size-medium:calc(var(--font-size-base) * 1.2);--font-size-large:calc(var(--font-size-base) * 1.4);--text-color:var(--ion-text-color, #424242);--error-color:var(--ion-color-danger, #eb445a);--popover-width:250px;--square-dimension:33px;--square-border-radius:5px;--square-font-weight:normal;--square-hover-color:var(--ion-color-white, #fff);--square-hover-background:var(--ion-color-secondary, #3dc2ff);--controls-padding:5px;--controls-background:var(--ion-color-white, #fff);--square-active-color:var(--ion-color-white, #fff);--square-active-background:var(--ion-color-primary, #3880ff);--square-current-color:var(--ion-color-white, #fff);--square-current-background:var(--ion-color-medium, #92949c)}span{cursor:pointer}:host{padding-right:var(--base-spacing-small)}input{border:0}span.placeholder{font-style:italic}span.disabled,input[disabled],:host.disabled{cursor:not-allowed;background:transparent;opacity:.3}span.ionic-datepicker-error{color:var(--error-color)}";export{r as ionic_datepicker}