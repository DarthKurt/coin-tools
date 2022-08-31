/*! For license information please see solver.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkcoins_rotator=self.webpackChunkcoins_rotator||[]).push([[329],{8127:(e,t,r)=>{r.d(t,{default:()=>w});var n=r(3791),a=r(1237),o=r(4014),c=r(7320),i=r(8764).Buffer;function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,o=[],c=!0,i=!1;try{for(r=r.call(e);!(c=(n=r.next()).done)&&(o.push(n.value),!t||o.length!==t);c=!0);}catch(e){i=!0,a=e}finally{try{c||null==r.return||r.return()}finally{if(i)throw a}}return o}}(e,t)||f(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=f(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,c=!0,i=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){i=!0,o=e},f:function(){try{c||null==r.return||r.return()}finally{if(i)throw o}}}}function h(e){return function(e){if(Array.isArray(e))return p(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||f(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){if(e){if("string"==typeof e)return p(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?p(e,t):void 0}}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function d(){d=function(){return e};var e={},t=Object.prototype,r=t.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",c=n.toStringTag||"@@toStringTag";function i(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{i({},"")}catch(e){i=function(e,t,r){return e[t]=r}}function s(e,t,r,n){var a=t&&t.prototype instanceof f?t:f,o=Object.create(a.prototype),c=new S(n||[]);return o._invoke=function(e,t,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return{value:void 0,done:!0}}for(r.method=a,r.arg=o;;){var c=r.delegate;if(c){var i=k(c,r);if(i){if(i===h)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=l(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(e,r,c),o}function l(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}e.wrap=s;var h={};function f(){}function p(){}function g(){}var m={};i(m,a,(function(){return this}));var w=Object.getPrototypeOf,y=w&&w(w(O([])));y&&y!==t&&r.call(y,a)&&(m=y);var v=g.prototype=f.prototype=Object.create(m);function x(e){["next","throw","return"].forEach((function(t){i(e,t,(function(e){return this._invoke(t,e)}))}))}function b(e,t){function n(a,o,c,i){var s=l(e[a],e,o);if("throw"!==s.type){var h=s.arg,f=h.value;return f&&"object"==u(f)&&r.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,c,i)}),(function(e){n("throw",e,c,i)})):t.resolve(f).then((function(e){h.value=e,c(h)}),(function(e){return n("throw",e,c,i)}))}i(s.arg)}var a;this._invoke=function(e,r){function o(){return new t((function(t,a){n(e,r,t,a)}))}return a=a?a.then(o,o):o()}}function k(e,t){var r=e.iterator[t.method];if(void 0===r){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,k(e,t),"throw"===t.method))return h;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=l(r,e.iterator,t.arg);if("throw"===n.type)return t.method="throw",t.arg=n.arg,t.delegate=null,h;var a=n.arg;return a?a.done?(t[e.resultName]=a.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):a:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function A(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function I(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function S(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(A,this),this.reset(!0)}function O(e){if(e){var t=e[a];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,o=function t(){for(;++n<e.length;)if(r.call(e,n))return t.value=e[n],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:E}}function E(){return{value:void 0,done:!0}}return p.prototype=g,i(v,"constructor",g),i(g,"constructor",p),p.displayName=i(g,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===p||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,g):(e.__proto__=g,i(e,c,"GeneratorFunction")),e.prototype=Object.create(v),e},e.awrap=function(e){return{__await:e}},x(b.prototype),i(b.prototype,o,(function(){return this})),e.AsyncIterator=b,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var c=new b(s(t,r,n,a),o);return e.isGeneratorFunction(r)?c:c.next().then((function(e){return e.done?e.value:c.next()}))},x(v),i(v,c,"Generator"),i(v,a,(function(){return this})),i(v,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){for(;t.length;){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=O,S.prototype={constructor:S,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(I),!e)for(var t in this)"t"===t.charAt(0)&&r.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function n(r,n){return c.type="throw",c.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],c=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var i=r.call(o,"catchLoc"),u=r.call(o,"finallyLoc");if(i&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var c=o?o.completion:{};return c.type=e,c.arg=t,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(c)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),I(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;I(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:O(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},e}function g(e,t,r,n,a,o,c){try{var i=e[o](c),u=i.value}catch(e){return void r(e)}i.done?t(u):Promise.resolve(u).then(n,a)}function m(e){return function(){var t=this,r=arguments;return new Promise((function(n,a){var o=e.apply(t,r);function c(e){g(o,n,a,c,i,"next",e)}function i(e){g(o,n,a,c,i,"throw",e)}c(void 0)}))}}const w=function(e){var t=(0,c.createWorker)({logger:function(e){return console.log(e)}}),r=[],u=[],f="",p="";function g(e){return w.apply(this,arguments)}function w(){return(w=m(d().mark((function e(t){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){if(t.complete)return e();t.onload=function(){return e()},t.onerror=function(){return e()}}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){return v.apply(this,arguments)}function v(){return(v=m(d().mark((function e(t){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){return e(t.toDataURL("image/png"))}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e,t,r,n){return b.apply(this,arguments)}function b(){return(b=m(d().mark((function e(t,r,n,a){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){for(var o=0,c=0,i=0;i<r;i++)for(var u=0;u<n;u++){var s=u*r+i,l=t[s];if(0!=u&&u!=n-1||(t[s]=4294967295),4278190080==l)0==o&&(c=u),o++;else{if(o>0&&o<=a)for(;c<u;)t[c*r+i]=4294967295,c++;o=0}}return e(t)}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e){return A.apply(this,arguments)}function A(){return(A=m(d().mark((function e(r){var a,c,i,u,s,l,h,f;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r&&r.src){e.next=3;break}return console.warn("No images found"),e.abrupt("return");case 3:return(a=new Image).crossOrigin="anonymous",a.src=r.src,e.next=8,g(a);case 8:return(c=document.createElement("canvas")).width=a.width,c.height=a.height,(i=c.getContext("2d")).drawImage(a,0,0),u=i.getImageData(0,0,c.width,c.height),i.putImageData(u,0,0),s=(0,n.imread)(c),l=new n.Mat,h=new n.Size(3,3),(0,n.GaussianBlur)(s,l,h,0,0,n.BORDER_DEFAULT),(0,n.imshow)(c,l),s.delete(),l.delete(),e.next=24,y(c);case 24:return f=e.sent,e.next=27,(0,o.default)(t,f);case 27:return e.abrupt("return",e.sent);case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function I(e){return S.apply(this,arguments)}function S(){return(S=m(d().mark((function e(r){var n,a,c,i,u,s,l,h;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r&&r.src){e.next=3;break}return console.warn("No images found"),e.abrupt("return");case 3:return(n=new Image).crossOrigin="anonymous",n.src=r.src,e.next=8,g(n);case 8:for((a=document.createElement("canvas")).width=n.width,a.height=n.height,(c=a.getContext("2d")).drawImage(n,0,0),i=c.getImageData(0,0,a.width,a.height),u=i.data,s=0;s<u.length;s+=4)(u[s]<100||u[s+1]<100||u[s+2]<100)&&u[s+3]>0?(u[s]=0,u[s+1]=0,u[s+2]=0):(u[s]=255,u[s+1]=255,u[s+2]=255),u[s+3]=255;return l=new Uint32Array(u.buffer),e.next=19,x(l,a.width,a.height,1);case 19:return l=e.sent,c.putImageData(i,0,0),e.next=23,y(a);case 23:return h=e.sent,e.next=26,(0,o.default)(t,h);case 26:return e.abrupt("return",e.sent);case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return E.apply(this,arguments)}function E(){return(E=m(d().mark((function e(r){var n,a,c,i,u,s,l,h;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r&&r.src){e.next=3;break}return console.warn("No images found"),e.abrupt("return");case 3:return(n=new Image).crossOrigin="anonymous",n.src=r.src,e.next=8,g(n);case 8:for((a=document.createElement("canvas")).width=n.width,a.height=n.height,(c=a.getContext("2d")).drawImage(n,0,0),i=c.getImageData(0,0,a.width,a.height),u=i.data,s=0;s<u.length;s+=4)(u[s]>100||u[s+1]>100||u[s+2]>100)&&u[s+3]>0?(u[s]=0,u[s+1]=0,u[s+2]=0):(u[s]=255,u[s+1]=255,u[s+2]=255),u[s+3]=255;return l=new Uint32Array(u.buffer),e.next=19,x(l,a.width,a.height,1);case 19:return l=e.sent,c.putImageData(i,0,0),e.next=23,y(a);case 23:return h=e.sent,e.next=26,(0,o.default)(t,h);case 26:return e.abrupt("return",e.sent);case 27:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(e){return L.apply(this,arguments)}function L(){return L=m(d().mark((function e(t){var r,n,a,o,c,i,u;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new Image).crossOrigin="anonymous",r.src=t,e.next=5,g(r);case 5:for((n=document.createElement("canvas")).width=r.width,n.height=r.height,(a=n.getContext("2d")).drawImage(r,0,0),o=a.getImageData(0,0,n.width,n.height),c=o.data,i=0;i<c.length;i+=4)(c[i]<100||c[i+1]<100||c[i+2]<100)&&c[i+3]>0?(c[i]=0,c[i+1]=0,c[i+2]=0):(c[i]=255,c[i+1]=255,c[i+2]=255),c[i+3]=255;return a.putImageData(o,0,0),e.next=16,y(n);case 16:return u=e.sent,e.next=19,q(u);case 19:return e.abrupt("return",e.sent);case 20:case"end":return e.stop()}}),e)}))),L.apply(this,arguments)}function C(e){return M.apply(this,arguments)}function M(){return M=m(d().mark((function e(t){var r,n,a,o,c,i,u,s;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new Image).crossOrigin="anonymous",r.src=t,e.next=5,g(r);case 5:for((n=document.createElement("canvas")).width=r.width,n.height=r.height,(a=n.getContext("2d")).drawImage(r,0,0),o=a.getImageData(0,0,n.width,n.height),c=o.data,i=0;i<c.length;i+=4)c[i]>0&&c[i+1]>0&&c[i+2]>100&&c[i+3]>0?(c[i]=0,c[i+1]=0,c[i+2]=0):(c[i]=255,c[i+1]=255,c[i+2]=255),c[i+3]=255;return u=new Uint32Array(c.buffer),e.next=16,x(u,n.width,n.height,1);case 16:return u=e.sent,a.putImageData(o,0,0),e.next=20,y(n);case 20:return s=e.sent,e.next=23,q(s);case 23:return e.abrupt("return",e.sent);case 24:case"end":return e.stop()}}),e)}))),M.apply(this,arguments)}function _(e){return N.apply(this,arguments)}function N(){return N=m(d().mark((function e(t){var r,n,a,o,c,i,u,s;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new Image).crossOrigin="anonymous",r.src=t,e.next=5,g(r);case 5:for((n=document.createElement("canvas")).width=r.width,n.height=r.height,(a=n.getContext("2d")).drawImage(r,0,0),o=a.getImageData(0,0,n.width,n.height),c=o.data,i=0;i<c.length;i+=4)(c[i]>100||c[i+1]>100||c[i+2]>100)&&c[i+3]>0?(c[i]=0,c[i+1]=0,c[i+2]=0):(c[i]=255,c[i+1]=255,c[i+2]=255),c[i+3]=255;return u=new Uint32Array(c.buffer),e.next=16,x(u,n.width,n.height,1);case 16:return u=e.sent,a.putImageData(o,0,0),e.next=20,y(n);case 20:return s=e.sent,e.next=23,q(s);case 23:return e.abrupt("return",e.sent);case 24:case"end":return e.stop()}}),e)}))),N.apply(this,arguments)}function q(e){return T.apply(this,arguments)}function T(){return T=m(d().mark((function e(t){var r,n,o,c,s,l,h,p,w,y,v,b,k,A,I,S,O,E,D,L,C,M,_;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(r=new Image).crossOrigin="anonymous",r.src=t,e.next=5,g(r);case 5:return(n=document.createElement("canvas")).width=r.width,n.height=r.height,(o=n.getContext("2d")).drawImage(r,0,0),c=o.getImageData(0,0,n.width,n.height),s=c.data,l=0,h=0,p=0,w=0,y=0,v=0,b=0,k=0,A=new Uint32Array(s.buffer),e.next=23,x(A,n.width,n.height,1);case 23:for(A=e.sent,I=Math.floor(.1*n.width);I<n.width;I++){for(S=0,O=0;O<n.height;O++)E=O*n.width+I,4294967295==A[E]&&S++;S>Math.floor(.88*n.height)&&0!=I?I-h==1&&(l+=1):(I-l==1||0==I&&0==l&&I==n.width-1||(l>p?(y=w,k=b,w=p,b=v,p=l,v=I-1):l>w?(y=w,k=b,w=l,b=I-1):l>y&&(y=l,k=I-1)),l=0),h=I}return v-=Math.floor(p/2),b-=Math.floor(w/2),k-=Math.floor(y/2),D=(D=[v,b,k]).sort((function(e,t){return e-t})),c.data.set(A),o.putImageData(c,0,0),e.next=34,f.src.replace(/^data:image\/\w+;base64,/,"");case 34:L=e.sent,C=new i(L,"base64"),(M=[])[0]=D[0]-0,M[1]=D[1]-D[0],M[2]=D[2]-D[1],M[3]=n.width-D[2],_=0;case 42:if(!(_<M.length)){e.next=49;break}if(!(M[_]<Math.floor(.1*n.width))){e.next=46;break}return console.warn("Overlap detected"),e.abrupt("return");case 46:_++,e.next=42;break;case 49:return e.next=51,new Promise((function(e,t){a.default.read(C).then(function(){var t=m(d().mark((function t(r){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.crop(0,0,D[0],f.height).getBase64(a.default.AUTO,function(){var t=m(d().mark((function t(r,n){var a;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=n,t.next=5,g(a);case 5:u[0]=a,e();case 7:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 51:return e.next=53,new Promise((function(e,t){a.default.read(C).then(function(){var t=m(d().mark((function t(r){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.crop(D[0],0,D[1]-D[0],f.height).getBase64(a.default.AUTO,function(){var t=m(d().mark((function t(r,n){var a;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=n,t.next=5,g(a);case 5:u[1]=a,e();case 7:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 53:return e.next=55,new Promise((function(e,t){a.default.read(C).then(function(){var t=m(d().mark((function t(r){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.crop(D[1],0,D[2]-D[1],f.height).getBase64(a.default.AUTO,function(){var t=m(d().mark((function t(r,n){var a;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=n,t.next=5,g(a);case 5:u[2]=a,e();case 7:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 55:return e.next=57,new Promise((function(e,t){a.default.read(C).then(function(){var t=m(d().mark((function t(r){return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r.crop(D[2],0,n.width-D[2],f.height).getBase64(a.default.AUTO,function(){var t=m(d().mark((function t(r,n){var a;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=n,t.next=5,g(a);case 5:u[3]=a,e();case 7:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}));case 57:case"end":return e.stop()}}),e)}))),T.apply(this,arguments)}function P(e){return R.apply(this,arguments)}function R(){return(R=m(d().mark((function e(r){var a,c,i,u,s,l,h;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r&&r.src){e.next=3;break}return console.warn("No images found"),e.abrupt("return");case 3:return(a=new Image).crossOrigin="anonymous",a.src=r.src,e.next=8,g(a);case 8:return(c=document.createElement("canvas")).width=r.width,c.height=r.height,(i=c.getContext("2d")).filter="grayscale(1)",i.drawImage(a,0,0),u=i.getImageData(0,0,c.width,c.height),i.putImageData(u,0,0),s=(0,n.imread)(c),l=new n.Mat,(0,n.medianBlur)(s,l,3),(0,n.imshow)(c,l),s.delete(),l.delete(),e.next=24,y(c);case 24:return h=e.sent,e.next=27,(0,o.default)(t,h);case 27:return e.abrupt("return",e.sent);case 28:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function j(e){return B.apply(this,arguments)}function B(){return(B=m(d().mark((function e(r){var n,a,c,i,u,s,l,h,f,p,m,w;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r,(a=new Image).crossOrigin="anonymous",a.src=n.src,e.next=6,g(a);case 6:for((c=document.createElement("canvas")).width=n.width,c.height=n.height,(i=c.getContext("2d")).drawImage(a,0,0),u=i.getImageData(0,0,c.width,c.height),s=u.data,l=new Map,h=0;h<s.length;h+=4)f=s[h]+","+s[h+1]+","+s[h+2]+","+s[h+3],l.has(f)?l.set(f,l.get(f)+1):l.set(f,1);for(p=[],m=0;m<s.length;m+=4)s[m+3]>130&&s[m]<100&&s[m+1]<100&&s[m+2]<100?(s[m]=0,s[m+1]=0,s[m+2]=0,s[m+3]=255,p[m]=1,p[m+1]=1,p[m+2]=1):(s[m]=255,s[m+1]=255,s[m+2]=255,s[m+3]=255);return i.putImageData(u,0,0),e.next=21,y(c);case 21:return w=e.sent,e.next=24,(0,o.default)(t,w);case 24:return e.abrupt("return",e.sent);case 25:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(e){return G.apply(this,arguments)}function G(){return(G=m(d().mark((function e(r){var a,c,i,u,s,l,h,f,p,m,w;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=r.src,e.next=5,g(a);case 5:for((0,n.imread)(a),(c=document.createElement("canvas")).width=r.width,c.height=r.height,(i=c.getContext("2d")).drawImage(a,0,0),u=i.getImageData(0,0,c.width,c.height),s=u.data,console.log(s),l=0;l<s.length;l+=4)s[l+3]>130&&s[l]<100?(s[l]=255,s[l+1]=255,s[l+2]=255,s[l+3]=255):(s[l]=0,s[l+1]=0,s[l+2]=0,s[l+3]=255);return i.putImageData(u,0,0),h=(0,n.imread)(c),f=new n.Mat,p=n.Mat.ones(2,1,n.CV_8U),m=new n.Point(-1,-1),(0,n.morphologyEx)(h,f,n.MORPH_OPEN,p,m,1,n.BORDER_CONSTANT,(0,n.morphologyDefaultBorderValue)()),(0,n.imshow)(c,f),h=(0,n.imread)(c),p=n.Mat.ones(2,1,n.CV_8U),(0,n.erode)(h,f,p,m,1,n.BORDER_CONSTANT,(0,n.morphologyDefaultBorderValue)()),(0,n.imshow)(c,f),h.delete(),f.delete(),p.delete(),e.next=31,y(c);case 31:return w=e.sent,e.next=34,(0,o.default)(t,w);case 34:return e.abrupt("return",e.sent);case 35:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e){return z.apply(this,arguments)}function z(){return(z=m(d().mark((function e(r){var a,c,i,u,s,l,h,f,p,m,w;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(a=new Image).crossOrigin="anonymous",a.src=r.src,e.next=5,g(a);case 5:for((c=document.createElement("canvas")).width=r.width,c.height=r.height,(i=c.getContext("2d")).drawImage(a,0,0),u=i.getImageData(0,0,c.width,c.height),s=u.data,l=0;l<s.length;l+=4)s[l+3]>130&&s[l]>70?(s[l]=255,s[l+1]=255,s[l+2]=255,s[l+3]=255):(s[l]=0,s[l+1]=0,s[l+2]=0,s[l+3]=255);return i.putImageData(u,0,0),h=(0,n.imread)(c),f=new n.Mat,p=n.Mat.ones(2,1,n.CV_8U),m=new n.Point(-1,-1),(0,n.morphologyEx)(h,f,n.MORPH_OPEN,p,m,1,n.BORDER_CONSTANT,(0,n.morphologyDefaultBorderValue)()),(0,n.imshow)(c,f),h=(0,n.imread)(c),p=n.Mat.ones(2,1,n.CV_8U),(0,n.erode)(h,f,p,m,1,n.BORDER_CONSTANT,(0,n.morphologyDefaultBorderValue)()),(0,n.imshow)(c,f),h.delete(),f.delete(),p.delete(),e.next=29,y(c);case 29:return w=e.sent,e.next=32,(0,o.default)(t,w);case 32:return e.abrupt("return",e.sent);case 33:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(e){return Y.apply(this,arguments)}function Y(){return(Y=m(d().mark((function e(r){var n,a,c,i,u,s,l,h,f,p,m,w,v,x,b,k,A,I;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new Image).crossOrigin="anonymous",n.src=r.src,e.next=5,g(n);case 5:for((a=document.createElement("canvas")).width=r.width,a.height=r.height,(c=a.getContext("2d")).drawImage(n,0,0),i=c.getImageData(0,0,a.width,a.height),u=i.data,s=new Map,l=0;l<u.length;l+=4)h=u[l]+","+u[l+1]+","+u[l+2]+","+u[l+3],s.has(h)?s.set(h,s.get(h)+1):s.set(h,1);for(f=0,p="0,0,0,0",s.forEach((function(e,t){f<e&&"0,0,0,0"!=t&&(p=t,f=e)})),m=p.split(","),w=Number(m[m.length-1]),v=[],x=[],b=0;b<u.length;b+=4)u[b+3]==w?(u[b]=255,u[b+1]=255,u[b+2]=255,u[b+3]=255,v[b]=1,v[b+1]=1,v[b+2]=1):u[b+3]>0?(u[b]=0,u[b+1]=0,u[b+2]=0,u[b+3]=255,x[b]=1,x[b+1]=1,x[b+2]=1):(u[b]=255,u[b+1]=255,u[b+2]=255,u[b+3]=255);for(k=0;k<20;k++)for(A=4;A<u.length;A+=4)0==u[A]&&1==v[A-4]&&(u[A-4]=0,u[A-3]=0,u[A-2]=0,u[A-1]=255);return c.putImageData(i,0,0),e.next=26,y(a);case 26:return I=e.sent,e.next=29,(0,o.default)(t,I);case 29:return e.abrupt("return",e.sent);case 30:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function $(e,t){if(0==e.length)return t.length;if(0==t.length)return e.length;var r,n,a=[];for(r=0;r<=t.length;r++)a[r]=[r];for(n=0;n<=e.length;n++)a[0][n]=n;for(r=1;r<=t.length;r++)for(n=1;n<=e.length;n++)t.charAt(r-1)==e.charAt(n-1)?a[r][n]=a[r-1][n-1]:a[r][n]=Math.min(a[r-1][n-1]+1,Math.min(a[r][n-1]+1,a[r-1][n]+1));return a[t.length][e.length]}function H(e,t){var r=e.length,n=t.length,a=new Array(26),o=new Array(26);a.fill(0),o.fill(0);var c,i=0;for(c=0;c<r;c++)a[e[c].charCodeAt()-"a".charCodeAt()]++;for(c=0;c<n;c++)o[t[c].charCodeAt()-"a".charCodeAt()]++;for(c=0;c<26;c++)i+=Math.min(a[c],o[c]);return i}function W(e,t){return J.apply(this,arguments)}function J(){return(J=m(d().mark((function e(r,n){var a,c;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="",c="",e.next=4,I(r);case 4:if(!((a=e.sent).length>n||a.length>c.length)){e.next=9;break}c=a.trim(),e.next=12;break;case 9:return e.next=11,O(r);case 11:a=e.sent;case 12:if(!(a.length>n||a.length>c.length)){e.next=16;break}c=a.trim(),e.next=19;break;case 16:return e.next=18,(0,o.default)(t,r);case 18:a=e.sent;case 19:if(!(a.length>n||a.length>c.length)){e.next=23;break}c=a.trim(),e.next=26;break;case 23:return e.next=25,k(r);case 25:a=e.sent;case 26:if(!(a.length>n||a.length>c.length)){e.next=30;break}c=a.trim(),e.next=33;break;case 30:return e.next=32,P(r);case 32:a=e.sent;case 33:if(!(a.length>n||a.length>c.length)){e.next=37;break}c=a.trim(),e.next=40;break;case 37:return e.next=39,F(r);case 39:a=e.sent;case 40:if(!(a.length>n||a.length>c.length)){e.next=44;break}c=a.trim(),e.next=47;break;case 44:return e.next=46,j(r);case 46:a=e.sent;case 47:if(!(a.length>n||a.length>c.length)){e.next=51;break}c=a.trim(),e.next=54;break;case 51:return e.next=53,U(r);case 53:a=e.sent;case 54:if(!(a.length>n||a.length>c.length)){e.next=58;break}c=a.trim(),e.next=61;break;case 58:return e.next=60,V(r);case 60:a=e.sent;case 61:return(a.length>n||a.length>c.length)&&(c=a.trim()),a=c,e.abrupt("return",a);case 64:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function K(){return(K=m(d().mark((function e(){var n,a,c,i,m,w,y,v,x,b,A,S,E,L,M,N,q,T,P,R,j,B,U,G,V,z,F,Y,J,K,Q,X,Z,ee,te,re,ne,ae,oe,ce;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n="",a="",c=0,i=0,!(4==document.querySelectorAll(".modal-content [href='/'] img").length&&document.querySelectorAll(".modal-content img").length>=5)){e.next=9;break}a=".modal-content img",n=".modal-content [href='/'] img",e.next=21;break;case 9:if(!document.querySelector(".modal-header img")||4!=document.querySelectorAll(".modal-body [href='/'] img").length){e.next=14;break}a=".modal-header img",n=".modal-body [href='/'] img",e.next=21;break;case 14:if(!document.querySelector(".alert.alert-info img")||4!=document.querySelectorAll(".antibotlinks [href='/'] img").length){e.next=19;break}a=".alert.alert-info img",n=".antibotlinks [href='/'] img",e.next=21;break;case 19:return console.warn("Ab links not detected"),e.abrupt("return");case 21:m=0;case 22:if(!(m<document.querySelectorAll(n).length)){e.next=31;break}if(!(document.querySelector(n).width<=document.querySelector(n).height)){e.next=28;break}return document.querySelector(n).value="####",console.warn("Numeric/Roman captcha Detected , captcha cannot be solved at the moment"),console.warn("Reload the page to see if the captcha changes"),e.abrupt("return");case 28:m++,e.next=22;break;case 31:if(!(document.querySelector(a).width<5*document.querySelector(a).height)){e.next=36;break}return document.querySelector(n).value="####",console.warn("Numeric/Roman captcha Detected , captcha cannot be solved at the moment"),console.warn("Reload the page to see if the captcha changes"),e.abrupt("return");case 36:if(i=document.querySelector(a).width<10*document.querySelector(a).height?2:3,console.log("Solving Ab Links...."),document.querySelector(a)&&document.querySelector(a).src){e.next=42;break}return document.querySelector(n).value="####",console.warn("No image source found for question"),e.abrupt("return");case 42:return f=document.querySelector(a),p=document.querySelector(a).src,e.next=46,g(f);case 46:for(w=[],y=0;y<4;y++)w[y]=document.querySelectorAll(n)[y+c];return e.next=50,I(f);case 50:if((v=(v=e.sent).replace(/,$/,""))&&v.includes(",")&&4==v.split(",").length){e.next=57;break}return e.next=55,O(f);case 55:v=(v=e.sent).replace(/,$/,"");case 57:if(v&&v.includes(",")&&4==v.split(",").length){e.next=62;break}return e.next=60,(0,o.default)(t,f);case 60:v=(v=e.sent).replace(/,$/,"");case 62:if(v&&v.includes(",")&&4==v.split(",").length){e.next=67;break}return e.next=65,k(f);case 65:v=(v=e.sent).replace(/,$/,"");case 67:if(v&&v.includes(",")&&4==v.split(",").length){e.next=93;break}return e.next=70,C(p);case 70:if(!(u.length<4)){e.next=74;break}return u=[],e.next=74,D(p);case 74:if(!(u.length<4)){e.next=78;break}return u=[],e.next=78,_(p);case 78:if(!(u.length<4)){e.next=82;break}return document.querySelector(n).value="####",console.warn("Captcha cannot be solved"),e.abrupt("return");case 82:x=0;case 83:if(!(x<4)){e.next=91;break}return e.next=86,W(u[x],i);case 86:r[x]=e.sent,r[x]=r[x].replaceAll("5","s").replaceAll("3","e").replaceAll(",","").replaceAll("8","b").replaceAll("1","l").replaceAll("@","a").replaceAll("*","").replaceAll("9","g").replaceAll("!","i").replaceAll("0","o").replaceAll("4","a").replaceAll("2","z").toLowerCase();case 88:x++,e.next=83;break;case 91:e.next=96;break;case 93:v=(v=v.toLowerCase()).replaceAll("5","s").replaceAll("3","e").replaceAll("8","b").replaceAll("1","l").replaceAll("@","a").replaceAll("*","").replaceAll("9","g").replaceAll("!","i").replaceAll("0","o").replaceAll("4","a").replaceAll("2","z").toLowerCase(),r=v.split(",");case 96:for(i=1e3,b=0;b<4;b++)r[b].length<i&&(i=r[b].length);i-=1,A=[],S=0;case 101:if(!(S<4)){e.next=109;break}return e.next=104,W(w[S],i);case 104:A[S]=e.sent,A[S]=A[S].replaceAll("5","s").replaceAll("3","e").replaceAll("8","b").replaceAll("1","l").replaceAll("@","a").replaceAll("9","g").replaceAll("!","i").replaceAll("0","o").replaceAll("4","a").replaceAll("2","z").toLowerCase();case 106:S++,e.next=101;break;case 109:return e.next=111,t.terminate();case 111:if(4!=(E=r.length)){e.next=169;break}for(L=new Map,M=0;M<E;M++)for(r[M]=r[M].replaceAll(",","").replaceAll(" ","").trim(),N=0;N<E;N++)A[N]=A[N].replaceAll(",","").replaceAll(" ","").trim(),q=$(r[M],A[N]),L.set(r[M]+"::"+A[N],q);L[Symbol.iterator]=d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(h(this.entries()).sort((function(e,t){return e[1]-t[1]})),"t0",1);case 1:case"end":return e.stop()}}),e,this)})),T=new Map,P=new Map,R="",j=0,B=l(L),e.prev=121,B.s();case 123:if((U=B.n()).done){e.next=134;break}if(G=s(U.value,2),V=G[0],z=G[1],j+=1,R){e.next=130;break}return R=z,T.set(V,z),e.abrupt("continue",132);case 130:R==z?T.set(V,z):(T[Symbol.iterator]=d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(h(this.entries()).sort((function(e,t){return e[0]-t[0]})),"t0",1);case 1:case"end":return e.stop()}}),e,this)})),P=new Map([].concat(h(P),h(T))),(T=new Map).set(V,z),R=z),j==L.size&&(T.set(V,z),T[Symbol.iterator]=d().mark((function e(){return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.delegateYield(h(this.entries()).sort((function(e,t){return e[0]-t[0]})),"t0",1);case 1:case"end":return e.stop()}}),e,this)})),P=new Map([].concat(h(P),h(T))));case 132:e.next=123;break;case 134:e.next=139;break;case 136:e.prev=136,e.t0=e.catch(121),B.e(e.t0);case 139:return e.prev=139,B.f(),e.finish(139);case 142:F=new Map,Y=new Set,J="",K=l(L=P),e.prev=147,K.s();case 149:if((Q=K.n()).done){e.next=157;break}if(X=s(Q.value,1),Z=X[0],J){e.next=154;break}return J=Z,e.abrupt("continue",155);case 154:L.get(J)!=L.get(Z)||J.split("::")[0]!=Z.split("::")[0]||Y.has(J.split("::")[1])||Y.has(Z.split("::")[1])||F.has(J.split("::")[0])||F.has(Z.split("::")[0])?(F.has(J.split("::")[0])||Y.has(J.split("::")[1])||(F.set(J.split("::")[0],J.split("::")[1]),Y.add(J.split("::")[1])),J=Z):(ee=H(J.split("::")[1],J.split("::")[0]),te=H(Z.split("::")[1],Z.split("::")[0]),ee>te?Z=J:J=Z);case 155:e.next=149;break;case 157:e.next=162;break;case 159:e.prev=159,e.t1=e.catch(147),K.e(e.t1);case 162:return e.prev=162,K.f(),e.finish(162);case 165:for(3!=F.size||F.has(J.split("::")[0])||Y.has(J.split("::")[1])||(F.set(J.split("::")[0],J.split("::")[1]),Y.add(J.split("::")[1])),re=new Map,ne=0;ne<E;ne++)re.set(A[ne],ne);for(ae=0;ae<E;ae++)oe=F.get(r[ae]),ce=re.get(oe),console.log("Answer for "+r[ae]+"::"+A[ce]),document.querySelectorAll(n)[ce+c]?document.querySelectorAll(n)[ce+c].click():console.warn("Answer Selector could not be identified");case 169:case"end":return e.stop()}}),e,null,[[121,136,139,142],[147,159,162,165]])})))).apply(this,arguments)}setTimeout((function(){return K.apply(this,arguments)}),e)}}},e=>{e.O(0,[315,82,430],(()=>(8127,e(e.s=8127)))),e.O()}]);