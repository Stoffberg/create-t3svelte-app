import{a as E,b as j,c as D,d as b,e as N}from"./chunk-QOYKB5RZ.js";var k=j(R=>{R.compile=function(e){var t=R.parse(e),s=t[0],o=t[1];return{accepts:function(n){return n[0]==="/"&&(n=n.slice(1)),o[0].test(n)||!s[0].test(n)},denies:function(n){return n[0]==="/"&&(n=n.slice(1)),!(o[0].test(n)||!s[0].test(n))},maybe:function(n){return n[0]==="/"&&(n=n.slice(1)),o[1].test(n)||!s[1].test(n)}}};R.parse=function(e){return e.split(`
`).map(function(t){return t=t.trim(),t}).filter(function(t){return t&&t[0]!=="#"}).reduce(function(t,s){var o=s[0]==="!";return o&&(s=s.slice(1)),s[0]==="/"&&(s=s.slice(1)),o?t[1].push(s):t[0].push(s),t},[[],[]]).map(function(t){return t.sort().map(K).reduce(function(s,o){return s[0].push(o[0]),s[1].push(o[1]),s},[[],[],[]])}).map(function(t){return[t[0].length>0?new RegExp("^(("+t[0].join(")|(")+"))"):new RegExp("$^"),t[1].length>0?new RegExp("^(("+t[1].join(")|(")+"))"):new RegExp("$^")]})};function K(e){return[v(e),Q(e)]}function v(e){return U(e).replace("**","(.+)").replace("*","([^\\/]+)")}function Q(e){return e.split("/").map(function(t,s){return s?"([\\/]?("+v(t)+"\\b|$))":"("+v(t)+"\\b)"}).join("")}function U(e){return e.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g,"\\$&")}});var P=j((we,L)=>{var q=process.platform==="win32",V=q?"\\\\+":"\\/",F=q?"\\\\":"/",Y="((?:[^/]*(?:/|$))*)",Z="([^/]*)",C=`((?:[^${F}]*(?:${F}|$))*)`,ee=`([^${F}]*)`;function te(e,{extended:t=!1,globstar:s=!1,strict:o=!1,filepath:n=!1,flags:c=""}={}){let f="",u="",g={regex:"",segments:[]},w=!1,m=!1,a=[];function r(l,{split:p,last:S,only:x}={}){x!=="path"&&(f+=l),n&&x!=="regex"&&(g.regex+=l==="\\/"?V:l,p?(S&&(u+=l),u!==""&&(c.includes("g")||(u=`^${u}$`),g.segments.push(new RegExp(u,c))),u=""):u+=l)}let i,d;for(let l=0;l<e.length;l++){if(i=e[l],d=e[l+1],["\\","$","^",".","="].includes(i)){r(`\\${i}`);continue}if(i==="/"){r(`\\${i}`,{split:!0}),d==="/"&&!o&&(f+="?");continue}if(i==="("){if(a.length){r(i);continue}r(`\\${i}`);continue}if(i===")"){if(a.length){r(i);let p=a.pop();r(p==="@"?"{1}":p==="!"?"([^/]*)":p);continue}r(`\\${i}`);continue}if(i==="|"){if(a.length){r(i);continue}r(`\\${i}`);continue}if(i==="+"){if(d==="("&&t){a.push(i);continue}r(`\\${i}`);continue}if(i==="@"&&t&&d==="("){a.push(i);continue}if(i==="!"){if(t){if(m){r("^");continue}if(d==="("){a.push(i),r("(?!"),l++;continue}r(`\\${i}`);continue}r(`\\${i}`);continue}if(i==="?"){if(t){d==="("?a.push(i):r(".");continue}r(`\\${i}`);continue}if(i==="["){if(m&&d===":"){l++;let p="";for(;e[++l]!==":";)p+=e[l];p==="alnum"?r("(\\w|\\d)"):p==="space"?r("\\s"):p==="digit"&&r("\\d"),l++;continue}if(t){m=!0,r(i);continue}r(`\\${i}`);continue}if(i==="]"){if(t){m=!1,r(i);continue}r(`\\${i}`);continue}if(i==="{"){if(t){w=!0,r("(");continue}r(`\\${i}`);continue}if(i==="}"){if(t){w=!1,r(")");continue}r(`\\${i}`);continue}if(i===","){if(w){r("|");continue}r(`\\${i}`);continue}if(i==="*"){if(d==="("&&t){a.push(i);continue}let p=e[l-1],S=1;for(;e[l+1]==="*";)S++,l++;let x=e[l+1];s?S>1&&(p==="/"||p===void 0)&&(x==="/"||x===void 0)?(r(Y,{only:"regex"}),r(C,{only:"path",last:!0,split:!0}),l++):(r(Z,{only:"regex"}),r(ee,{only:"path"})):r(".*");continue}r(i)}c.includes("g")||(f=`^${f}$`,u=`^${u}$`,n&&(g.regex=`^${g.regex}$`));let y={regex:new RegExp(f,c)};return n&&(g.segments.push(new RegExp(u,c)),g.regex=new RegExp(g.regex,c),g.globstar=new RegExp(c.includes("g")?C:`^${C}$`,c),y.path=g),y}L.exports=te});var M=j((xe,I)=>{"use strict";var ne=E("os"),z=E("path"),ie=ne.platform()==="win32",se={"{":"}","(":")","[":"]"},re=/\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\)|(\\).|([@?!+*]\(.*\)))/,oe=/\\(.)|(^!|[*?{}()[\]]|\(\?)/;function H(e,{strict:t=!0}={}){if(e==="")return!1;let s,o=t?re:oe;for(;s=o.exec(e);){if(s[2])return!0;let n=s.index+s[0].length,c=s[1],f=c?se[c]:null;if(c&&f){let u=e.indexOf(f,n);u!==-1&&(n=u+1)}e=e.slice(n)}return!1}function ce(e,{strict:t=!1}={}){ie&&e.includes("/")&&(e=e.split("\\").join("/")),/[\{\[].*[\/]*.*[\}\]]$/.test(e)&&(e+="/"),e+="a";do e=z.dirname(e);while(H(e,{strict:t})||/(^|[^\\])([\{\[]|\([^\)]+$)/.test(e));return e.replace(/\\([\*\?\|\[\]\(\)\{\}])/g,"$1")}function le(e,t={}){let s=ce(e,t),o=H(e,t),n;return s!="."?(n=e.substr(s.length),n.startsWith("/")&&(n=n.substr(1))):n=e,o||(s=z.dirname(e),n=s!=="."?e.substr(s.length):e),n.startsWith("./")&&(n=n.substr(2)),n.startsWith("/")&&(n=n.substr(1)),{base:s,glob:n,isGlob:o}}I.exports=le});var X=j((Se,J)=>{var _=E("fs"),ue=P(),fe=M(),{join:O,resolve:T,relative:ae}=E("path"),ge=/(^|[\\\/])\.[^\\\/\.]/g,W={};function B(e,t,s,o,n="",c=0){let f=s.segments[c],u=T(o.cwd,t,n),g=_.readdirSync(u),{dot:w,filesOnly:m}=o,a=0,r=g.length,i,d,y,l,p;for(;a<r;a++)if(d=O(u,i=g[a]),y=n?O(n,i):i,!(!w&&ge.test(y))){if(p=s.regex.test(y),(l=W[y])===void 0&&(W[y]=l=_.lstatSync(d)),!l.isDirectory()){p&&e.push(ae(o.cwd,d));continue}f&&!f.test(i)||(!m&&p&&e.push(O(t,y)),B(e,t,s,o,y,f&&f.toString()!==s.globstar&&c+1))}}J.exports=function(e,t={}){if(!e)return[];let s=fe(e);if(t.cwd=t.cwd||".",!s.isGlob)try{let c=T(t.cwd,e),f=_.statSync(c);return t.filesOnly&&!f.isFile()?[]:t.absolute?[c]:[e]}catch(c){if(c.code!="ENOENT")throw c;return[]}t.flush&&(W={});let o=[],{path:n}=ue(s.glob,{filepath:!0,globstar:!0,extended:!0});return n.globstar=n.globstar.toString(),B(o,s.base,n,t,".",0),t.absolute?o.map(c=>T(t.cwd,c)):o}});var G=D(k(),1),A=D(X(),1);import h from"fs";import $ from"path";var pe=e=>e.replace(/\/\*\*\*\//g,"").replace(/\/\*\*([\s\S]+?)(@[\s\S]+?)?\*\/([\s\n]+)/g,(t,s,o,n)=>/^\s+(\*\s*)?$/.test(s)?"":`/**${s.replace(/\*\ $/,"")}*/${n}`),he=async e=>{let t=h.readdirSync("templates");for(let s of t){if(s[0]===".")continue;let o=`dist/templates/${s}`,n=`${o}/assets`;b(n);let c=$.resolve("templates",s),f=$.join(c,".gitignore");if(!h.existsSync(f))throw new Error(`"${s}" template must have a .gitignore file`);let u=G.default.compile(h.readFileSync(f,"utf-8")),g=$.join(c,".ignore");if(!h.existsSync(g))throw new Error("Template must have a .ignore file");let w=G.default.compile(h.readFileSync(g,"utf-8")),m=$.join(c,".meta.json");if(!h.existsSync(m))throw new Error("Template must have a .meta.json file");let a=[];(0,A.default)("**/*",{cwd:c,filesOnly:!0,dot:!0}).forEach(r=>{if(r==="package.template.json"){let i=h.readFileSync($.join(c,r),"utf8");i=i.replace(/workspace:\*/g,"next"),h.writeFileSync(`${o}/package.json`,i);return}if(!e.has(r)&&!(!u.accepts(r)||!w.accepts(r)||r===".ignore"))if(/\.(ts|svelte)$/.test(r)){let i=h.readFileSync($.join(c,r),"utf8");r.endsWith(".d.ts")?a.push({name:r,contents:i}):a.push({name:r,contents:pe(i)})}else{let i=$.join(n,r.replace(/^\./,"DOT-"));b($.dirname(i)),h.copyFileSync($.join(c,r),i)}}),h.copyFileSync(m,`${o}/meta.json`),h.writeFileSync(`${o}/files.types=typescript.json`,JSON.stringify(a,null,"	"))}},de=async()=>{let e=$.resolve("shared"),t=new Set,s=[];return(0,A.default)("**/*",{cwd:e,filesOnly:!0,dot:!0}).forEach(o=>{let n=h.readFileSync($.join(e,o),"utf8"),c=[],f=[],u=o;if(o.startsWith("+")||o.startsWith("-")){let[g,...w]=o.split($.sep),m=/([+-])([a-z]+)/g,a;for(;a=m.exec(g);)(a[1]==="+"?c:f).push(a[2]);u=w.join("/")}t.add(u),s.push({name:u,include:c,exclude:f,contents:n})}),s.sort((o,n)=>o.include.length+o.exclude.length-(n.include.length+n.exclude.length)),h.writeFileSync("dist/templates/shared.json",JSON.stringify({files:s},null,"	")),t.delete("package.json"),t},$e=async()=>{N("dist/templates"),b("dist/templates");let e=await de();await he(e)};$e();
//# sourceMappingURL=build.js.map