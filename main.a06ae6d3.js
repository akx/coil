!function(e){function t(t){for(var n,i,d=t[0],u=t[1],l=t[2],c=0,f=[];c<d.length;c++)i=d[c],o[i]&&f.push(o[i][0]),o[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(s&&s(t);f.length;)f.shift()();return a.push.apply(a,l||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],n=!0,d=1;d<r.length;d++){var u=r[d];0!==o[u]&&(n=!1)}n&&(a.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},o={1:0},a=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="./";var d=window.webpackJsonp=window.webpackJsonp||[],u=d.push.bind(d);d.push=t,d=d.slice();for(var l=0;l<d.length;l++)t(d[l]);var s=u;a.push([60,0]),r()}([,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(3);function o(e,t){var r=n.default[t.module];if(!r)throw new Error("not registered "+t.module);try{return e.status.addVariables(t.id,e.variables),r.render(e.subcontext(t,{},t.id))}catch(e){return console.error(e),[]}}t.renderNode=o,t.renderNodesInto=function(e,t,r){for(var n=0;n<t.length;n++)for(var a=o(r,t[n]),i=0;i<a.length;i++)e.push(a[i])}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(49),o=r(48),a=r(47),i=r(46),d=r(44),u=r(43),l=r(42),s=r(41),c={Choose:n.default,Ellipse:o.default,LinearArray:a.default,Ngon:i.default,Rect:d.default,RectArray:u.default,RemoveChildren:l.default,Xform:s.default};t.default=c,Object.keys(c).forEach(function(e){c[e].render.displayName="render_"+e})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1),o=function(e,t){return{a:e.a*t.a+e.c*t.b,b:e.b*t.a+e.d*t.b,c:e.a*t.c+e.c*t.d,d:e.b*t.c+e.d*t.d,e:e.a*t.e+e.c*t.f+e.e,f:e.b*t.e+e.d*t.f+e.f}};function a(e){var t=e.x,r=e.y,a=e.r,i=e.sx,d=e.sy,u=n.translate(isFinite(t)?t:0,isFinite(r)?r:0);return isFinite(a)&&(u=o(u,n.rotateDEG(a))),isFinite(i)&&isFinite(d)&&(u=o(u,n.scale(i,d))),u}t.makeMatrix=a,t.splitMatrixAndProps=function(e){var t=a(e),r=Object.assign({},e);return delete r.x,delete r.y,delete r.r,delete r.sx,delete r.sy,{matrix:t,props:r}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="Transform";t.default=[{name:"x",default:"0",group:n},{name:"y",default:"0",group:n},{name:"r",default:"0",group:n},{name:"sx",default:"1",group:n},{name:"sy",default:"1",group:n}]},,,,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="Presentation";t.default=[{name:"fill",default:"#333",group:n,type:"color"},{name:"stroke",default:"",group:n,type:"color"},{name:"strokeWidth",default:"0",group:n,type:"number"},{name:"opacity",default:"1",group:n}]},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getVariableDefaults=function(e){var t={};return e.variables.forEach(function(e){t[e.name]=e.default}),t},t.UniversalVariables=[{name:"seed",default:"",group:"Randomness"}]},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(11),o=r(3),a=r(8);function i(){return""+Math.floor(4294967295*Math.random()).toString(36)}t.duplicate=function(e){return function e(t){return{id:i(),module:t.module,config:a.cloneDeep(t.config),children:t.children.map(e)}}(e)},t.configure=function(e,t,r){void 0===r&&(r=[]);var a=o.default[e],d=n.getVariableDefaults(a);return{id:i(),module:e,config:Object.assign({},d,t),children:r}}},,,,,,,function(e,t,r){},,,function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(0);t.default=function(e){var t=e.path,r=e.props;return o.createElement("svg",n({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},r),o.createElement("path",{d:t}))}},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(22),i=r(9),d={fileTree:r(21),save:r(20)},u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this,t=[{id:"tree",icon:d.fileTree},{id:"file",icon:d.save}];return o.createElement("div",{id:"global-toolbar",className:"toolbar"},t.map(function(t){return o.createElement("div",{key:t.id,className:i("btn",{active:e.props.activeTab===t.id}),title:t.id,onClick:function(){return e.props.onChangeTab(t.id)}},o.createElement(a.default,{path:t.icon}))}))},t}(o.Component);t.default=u},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){this.nodeErrors={},this.nodeVariables={}}return e.prototype.addError=function(e,t){e in this.nodeErrors||(this.nodeErrors[e]=[]),this.nodeErrors[e].push(t)},e.prototype.getErrorsForNode=function(e){return e in this.nodeErrors?this.nodeErrors[e]:[]},e.prototype.addVariables=function(e,t){e in this.nodeVariables||(this.nodeVariables[e]=[]),this.nodeVariables[e].push(Object.assign({},t))},e.prototype.getVariablesForNode=function(e){if(!(e in this.nodeVariables))return[];var t=new Set;return this.nodeVariables[e].forEach(function(e){Object.keys(e).forEach(function(e){return t.add(e)})}),Array.from(t).sort()},e}();t.default=n},,,,function(e,t,r){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var n=r(12),o=r(8),a=function(){function t(){this.tree=[],this.nodeCache={},this.treeUpdateListeners=[]}return t.prototype.replaceTree=function(e){this.tree=o.cloneDeep(e),this.updateNodeCache(),this.invokeTreeUpdateListeners()},t.prototype.updateNodeCache=function(){var e={};this.tree.forEach(function(t){return function t(r,n){e[r.id]={node:r,parent:n},r.children.forEach(function(e){return t(e,r)})}(t,null)}),this.nodeCache=e},t.prototype.invokeTreeUpdateListeners=function(){var t=this;e(function(){t.treeUpdateListeners.forEach(function(e){e(t.tree)})})},t.prototype.getNodeOrNull=function(e){var t=this.getNodeCacheEntry(e,!1);return t?t.node:null},t.prototype.getNodeParentOrNull=function(e){var t=this.getNodeCacheEntry(e,!1);return t?t.parent:null},t.prototype.getNode=function(e){return this.getNodeCacheEntry(e).node},t.prototype.getNodeParent=function(e){return this.getNodeCacheEntry(e).parent},t.prototype.getNodeCacheEntry=function(e,t){void 0===t&&(t=!0);var r=this.nodeCache[e];if(t&&!r)throw new Error("invalid node "+e);return r||null},t.prototype.replaceOrEmsiblingNode=function(e,t,r,n){var o=null===e?this.tree:e.children,a=o.indexOf(t);if(a>-1){var i=[a,n?1:0].concat(r);o.splice.apply(o,i)}},t.prototype.getTree=function(){return this.tree},t.prototype.addTreeUpdateListener=function(e){this.treeUpdateListeners.push(e)},t.prototype.changeNodeVariable=function(e,t,r){this.getNode(e).config[t]=r,this.invokeTreeUpdateListeners()},t.prototype.addChildNode=function(e,t){var r=n.configure(t,{});return this.addChildInternal(e,r),this.updateNodeCache(),this.invokeTreeUpdateListeners(),r},t.prototype.addChildInternal=function(e,t){if(e){var r=this.getNode(e);return r.children.push(t),r}return this.tree.push(t),null},t.prototype.wrapNode=function(e,t){var r=this.getNode(e),o=this.getNodeParent(e),a=n.configure(t,{},[r]);return this.replaceOrEmsiblingNode(o,r,[a],!0),this.updateNodeCache(),this.invokeTreeUpdateListeners(),a},t.prototype.deleteNode=function(e,t){var r=this.getNode(e),n=this.getNodeParent(e);this.replaceOrEmsiblingNode(n,r,t?[]:r.children,!0),this.updateNodeCache(),this.invokeTreeUpdateListeners()},t.prototype.addSiblingNode=function(e,t){var r=n.configure(t,{}),o=this.getNode(e),a=this.getNodeParent(e);this.replaceOrEmsiblingNode(a,o,[r],!1),this.updateNodeCache(),this.invokeTreeUpdateListeners()},t.prototype.moveNode=function(e,t){if(e===t)return!1;var r=this.getNode(e),n=this.getNodeParent(e);return this.replaceOrEmsiblingNode(n,r,[],!0),this.addChildInternal(t,r),this.updateNodeCache(),this.invokeTreeUpdateListeners(),!0},t.prototype.copyNode=function(e,t){var r=n.duplicate(this.getNode(e));return this.addChildInternal(t,r),this.updateNodeCache(),this.invokeTreeUpdateListeners(),!0},t}();t.TreeManager=a}).call(this,r(27).setImmediate)},,,,,,function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(33),i=r(3);function d(e){return e&&i.default[e.module]&&i.default[e.module].acceptsChildren}var u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.dropdowns={},t}return n(t,e),t.prototype.handleAddNode=function(e,t){var r=this.props,n=r.treeManager,o=r.selectedNode;switch(e){case"child":n.addChildNode(o?o.id:null,t);break;case"sibling":n.addSiblingNode(o.id,t);break;case"wrap":n.wrapNode(o.id,t)}this.hideDropdowns()},t.prototype.handleDeleteNode=function(e){var t=this.props,r=t.treeManager,n=t.selectedNode;r.deleteNode(n.id,e)},t.prototype.hideDropdowns=function(){Object.values(this.dropdowns).forEach(function(e){return e.hide()})},t.prototype.render=function(){var e=this,t=this.props.selectedNode,r=null,n="Node",u=!1;if(null===t&&(r="child",n="Node"),d(t)&&(r="child",n="Child"),t){var l=this.props.treeManager.getNodeParentOrNull(t.id);(null===l||d(l))&&(u=!0)}return o.createElement("div",{id:"tree-toolbar",className:"toolbar"},o.createElement(a.default,{disabled:!t,ref:function(t){e.dropdowns.wrap=t}},o.createElement(a.DropdownTrigger,{className:"btn"},"Wrap..."),o.createElement(a.DropdownContent,{className:"node-select"},Object.keys(i.default).filter(function(e){return i.default[e].acceptsChildren}).map(function(t){return o.createElement("a",{href:"#",key:t,onClick:function(){return e.handleAddNode("wrap",t)}},t)}))),o.createElement(a.default,{disabled:!r,ref:function(t){e.dropdowns.addChild=t}},o.createElement(a.DropdownTrigger,{className:"btn"},"Add ",n,"..."),o.createElement(a.DropdownContent,{className:"node-select"},Object.keys(i.default).map(function(t){return o.createElement("a",{href:"#",key:t,onClick:function(){return e.handleAddNode("child",t)}},t)}))),o.createElement(a.default,{disabled:!u,ref:function(t){e.dropdowns.addSibling=t}},o.createElement(a.DropdownTrigger,{className:"btn"},"Add Sibling..."),o.createElement(a.DropdownContent,{className:"node-select"},Object.keys(i.default).map(function(t){return o.createElement("a",{href:"#",key:t,onClick:function(){return e.handleAddNode("sibling",t)}},t)}))),o.createElement("div",{className:"btn "+(t?"":"disabled"),title:"Shift-click to delete with hierarchy",onClick:function(t){e.handleDeleteNode(t.shiftKey),t.preventDefault()}},"Delete"))},t}(o.Component);t.default=u},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={};t.evaluateExpression=function(e,t){return e.startsWith("=")?(e in n?n[e]:n[e]=new Function("namespace","with(namespace) { return "+e.slice(1)+"}"))(t()):/[+-][0-9.]+/.test(e)?parseFloat(e):""+e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=e?function(e){for(var t=0,r=0;r<e.length;r++)t^=r%16<<e.charCodeAt(r);return t}(e):2147483647*Math.random();return function(){return((t=16807*t%2147483647)-1)/2147483646}}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(36),a=r(35),i=r(2);function d(e,t,r,n,o,i){void 0===i&&(i=null);try{return a.evaluateExpression(n,o)}catch(n){return e.addError(t.id,r+": "+n),console.warn(n),i}}var u=function(){function e(e,t,r,n,o){void 0===r&&(r=null),void 0===n&&(n={}),void 0===o&&(o=""),this.status=e,this.node=t,this.parent=r,this.variables=n,this.idPrefix=o,this.defaultNamespace=this.prepareNamespace()}return e.prototype.subcontext=function(t,r,n){void 0===r&&(r={}),void 0===n&&(n="");var o=Object.assign({},this.variables,r);return new e(this.status,t,this,o,this.idPrefix+"."+n)},e.prototype.random=function(e,t){if(!this.rng){var r=this.evaluateFromNodeConfig("seed");this.rng=o.default(r)}var n=this.rng();return void 0!==e?void 0===t?n*e:e+n*(t-e):n},e.prototype.prepareNamespace=function(e){var t=this;return function(e){var t;return function(){return void 0===t&&(t=e()),t}}(function(){return n({rand:t.random.bind(t)},t.variables,e)})},e.prototype.evaluateFromNodeConfig=function(e){var t=this.node.config[e];return void 0===t?null:d(this.status,this.node,e,t,this.defaultNamespace)},e.prototype.evaluate=function(e,t,r){var n=this.prepareNamespace(r);return d(this.status,this.node,e,t,n)},e.prototype.evaluateAll=function(e,t,r){var n={},o=this.prepareNamespace(r);for(var a in t){var i=t[a];null!==i&&(n[a]=d(this.status,this.node,a,i,o))}return n},e.prototype.evaluateNodeConfig=function(e){return void 0===e&&(e=this.node),this.evaluateAll(e,e.config)},e.prototype.getId=function(e){return void 0===e&&(e=this.node.id),this.idPrefix+e},e.prototype.renderChildren=function(e){void 0===e&&(e=this);var t=[];return i.renderNodesInto(t,this.node.children,e),t},e}();t.default=u},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(3),i=r(11),d=r(8),u=function(e){var t=e.variable,r=e.nodeConfig,n=e.onChange,a=(e.status,null),i=null,d=function(e){return n(r,t.name,e.target.value.toString())};return i=t.choices?o.createElement("select",{value:r.config[t.name]||"",onChange:d},t.choices.map(function(e){return o.createElement("option",{key:e,value:e},e)})):o.createElement("input",{type:"text",value:r.config[t.name]||"",onChange:d}),"color"===t.type&&(a=o.createElement("input",{type:"color",value:r.config[t.name]||"",onChange:d})),o.createElement("tr",{className:"variable-config-row"},o.createElement("th",null,t.name),o.createElement("td",null,i),o.createElement("td",null,a))},l=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n(t,e),t.prototype.render=function(){var e=this,t=this.props,r=t.nodeConfig,n=t.status,l=a.default[r.module].variables.concat(i.UniversalVariables),s=d.groupBy(l,function(e){return e.group||"Other"});return o.createElement("div",null,o.createElement("table",null,o.createElement("tbody",null,Object.keys(s).sort().map(function(t){return o.createElement(o.Fragment,{key:t},o.createElement("tr",{key:"#"+t,className:"group-separator"},o.createElement("th",{colSpan:3},t)),s[t].map(function(t){return o.createElement(u,{key:t.name,variable:t,nodeConfig:r,status:n,onChange:e.props.onChange})}))}))),o.createElement("div",{className:"debug"},"Variables last render: ",n.getVariablesForNode(r.id).join(", ")),o.createElement("ul",{className:"errors"},n.getErrorsForNode(r.id).map(function(e,t){return o.createElement("li",{key:t},e)})))},t}(o.Component);t.default=l},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(3),a=function(e){var t=e.nodeConfig,r=e.selectedNode,a=e.onSelectNode,d=e.onRepositionNode;return n.createElement("li",{className:r===t?"selected":""},n.createElement("a",{href:"#",draggable:!0,onClick:function(e){a(t),e.preventDefault(),e.stopPropagation()},onDragStart:function(e){e.dataTransfer.clearData(),e.dataTransfer.setData("application/x-coil-nodeid",t.id),e.dataTransfer.effectAllowed="all"},onDragOver:function(e){e.dataTransfer.dropEffect="none",e.dataTransfer.types.indexOf("application/x-coil-nodeid")>-1&&o.default[t.module].acceptsChildren&&(e.dataTransfer.dropEffect=e.altKey?"copy":"link",e.preventDefault())},onDrop:function(e){var r=e.dataTransfer.getData("application/x-coil-nodeid");e.dataTransfer.dropEffect=e.altKey?"copy":"link";var n="copy"===e.dataTransfer.dropEffect;d(r,t.id,n)}},t.module),t.children.length?n.createElement(i,{nodeConfigs:t.children,selectedNode:r,onSelectNode:a,onRepositionNode:d}):null)},i=function(e){var t=e.nodeConfigs,r=e.selectedNode,o=e.onSelectNode,i=e.onRepositionNode;return n.createElement("ul",null,t.map(function(e){return n.createElement(a,{key:e.id,nodeConfig:e,selectedNode:r,onSelectNode:o,onRepositionNode:i})}))};t.default=function(e){var t=e.nodeConfigs,r=e.selectedNode,o=e.onSelectNode,a=e.onRepositionNode;return n.createElement("div",{id:"tree",onClick:function(e){"tree"===e.currentTarget.id&&o(null)}},n.createElement(i,{nodeConfigs:t,selectedNode:r,onSelectNode:o,onRepositionNode:a}))}},,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(5),a=r(1),i=r(4);t.default={acceptsChildren:!0,variables:o.default.concat([{name:"opacity",default:"1"}]),render:function(e){var t=e.renderChildren(),r=i.splitMatrixAndProps(e.evaluateNodeConfig()),o=r.props,d=r.matrix,u=o.opacity;return[n.createElement("g",{transform:a.toSVG(d),opacity:u},t)]}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2);t.default={acceptsChildren:!0,variables:[{name:"keep",default:"=rand() < .5"},{name:"indexVariable",default:"i"}],render:function(e){var t=e.node,r=e.evaluateFromNodeConfig("indexVariable"),o=[];n.renderNodesInto(o,t.children,e);var a=e.subcontext(t),i=t.config.keep;return o.filter(function(e,t){var n;return a.evaluate("keep "+t,i,((n={})[r]=t,n))})}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2),o=Math.sqrt(3),a=o/2;t.default={acceptsChildren:!0,variables:[{name:"numberX",default:"5"},{name:"numberY",default:"5"},{name:"variableX",default:"vx"},{name:"variableY",default:"vy"},{name:"hex",default:"none",choices:["none","flat","pointy"]}],render:function(e){var t,r=e.node,i=e.evaluateNodeConfig(r),d=i.numberX,u=i.numberY,l=i.variableX,s=i.variableY,c=i.hex,f=[];d=Math.round(parseFloat(d)),u=Math.round(parseFloat(u));for(var p=0;p<u;p++)for(var h=0;h<d;h++){var v=((t={})[l]=h,t[s]=p,t[l+"F"]=h/(d-1),t[s+"F"]=p/(u-1),t);"flat"===c?(v[l+"Hex"]=1.5*h,v[s+"Hex"]=a*h+o*p):"pointy"===c&&(v[l+"Hex"]=o*h+a*p,v[s+"Hex"]=1.5*p);var m=e.subcontext(r,v,h+"x"+p);n.renderNodesInto(f,r.children,m)}return f}}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(1),i=r(5),d=r(4),u=r(10);t.default={variables:i.default.concat(u.default).concat([{name:"width",default:"20"},{name:"height",default:"20"}]),render:function(e){var t=e.node,r=d.splitMatrixAndProps(e.evaluateNodeConfig(t)),i=r.props,u=r.matrix;return[o.createElement("rect",n({x:-i.width/2,y:-i.height/2,transform:a.toSVG(u),key:e.getId()},i))]}}},function(e,t,r){"use strict";var n=this&&this.__read||function(e,t){var r="function"==typeof Symbol&&e[Symbol.iterator];if(!r)return e;var n,o,a=r.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=a.next()).done;)i.push(n.value)}catch(e){o={error:e}}finally{try{n&&!n.done&&(r=a.return)&&r.call(a)}finally{if(o)throw o.error}}return i},o=this&&this.__spread||function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(n(arguments[t]));return e};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t={},r=function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var a=r.join("");return a in t?t[a]:t[a]=e.apply(void 0,o(r))};return r.memo=t,r}},function(e,t,r){"use strict";var n=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e};Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(5),i=r(4),d=r(10),u=r(1),l=r(45),s=2*Math.PI,c=l.default(function(e,t,r,n,o){var a=[];t=parseFloat(t),r=parseFloat(r),n=parseFloat(n),o=parseFloat(o);for(var i=0;i<e;i++){var d=i%2==0?t:r,u=(i/e+(i%2==0?n:o))*s,l=Math.cos(u)*d,c=Math.sin(u)*d;isNaN(l)||isNaN(c)||a.push((0===i?"M":"L")+l.toFixed(3)+","+c.toFixed(3))}return a.length>0&&a.push("z"),a.join(" ")});t.default={variables:a.default.concat(d.default).concat([{name:"vertices",default:"5"},{name:"radius1",default:"5"},{name:"radius2",default:"5"},{name:"tilt1",default:"0"},{name:"tilt2",default:"0"}]),render:function(e){var t=e.node,r=i.splitMatrixAndProps(e.evaluateNodeConfig(t)),a=r.props,d=r.matrix,l=c(a.vertices,a.radius1,a.radius2,a.tilt1,a.tilt2);return delete a.vertices,delete a.radius1,delete a.radius2,delete a.tilt1,delete a.tilt2,[o.createElement("path",n({d:l},a,{key:e.getId(t.id),transform:u.toSVG(d)}))]}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2);t.default={acceptsChildren:!0,variables:[{name:"number",default:"5"},{name:"variable",default:"i"}],render:function(e){for(var t,r=e.evaluateNodeConfig(),o=r.number,a=r.variable,i=[],d=Math.round(parseFloat(o)),u=e.node,l=0;l<d;l++){var s=e.subcontext(u,((t={})[a]=l,t[a+"F"]=l/(d-1),t),""+l);n.renderNodesInto(i,u.children,s)}return i}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(1),a=r(5),i=r(4);t.default={variables:a.default.concat([{name:"radiusX",default:"20"},{name:"radiusY",default:"20"},{name:"fill",default:"#333"},{name:"opacity",default:"1"}]),render:function(e){var t=i.splitMatrixAndProps(e.evaluateNodeConfig()),r=t.props,a=t.matrix,d=r.radiusX,u=r.radiusY,l=r.fill,s=r.opacity;return[n.createElement("ellipse",{cx:0,cy:0,rx:d,ry:u,fill:l,opacity:s,transform:o.toSVG(a),key:e.getId()})]}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(2);t.default={acceptsChildren:!0,variables:[{name:"childIndex",default:"0"},{name:"indexVariable",default:"u"}],render:function(e){var t,r=e.node,o=e.evaluateNodeConfig(r),a=o.childIndex,i=o.indexVariable,d=parseInt(a,10),u=r.children[d%r.children.length],l=[];if(u){var s=e.subcontext(r,((t={})[i]=a,t),"child"+a);n.renderNodesInto(l,[u],s)}return l}}},function(e,t,r){"use strict";var n=this&&this.__extends||function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var o=r(0),a=r(12),i=r(39),d=r(38),u=r(37),l=r(34),s=r(28),c=r(24),f=r(23),p=[a.configure("RemoveChildren",{seed:"foo"},[a.configure("RectArray",{numberX:"7",numberY:"7",variableX:"i",variableY:"j"},[a.configure("Ngon",{radius1:"15",radius2:"5",vertices:"10",x:"=15 + i * 30",y:"=30 + j * 30",fill:"blue"})])])],h=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.treeManager=new s.TreeManager,t.state={selectedNodeId:null,rendered:null,status:new c.default,activeTab:"tree"},t.onSelectNode=function(e){t.setState({selectedNodeId:e?e.id:null})},t.onChangeNodeVariable=function(e,r,n){t.treeManager.changeNodeVariable(e.id,r,n),t.forceUpdate()},t.onRepositionNode=function(e,r,n){n?t.treeManager.copyNode(e,r):t.treeManager.moveNode(e,r)},t.onChangeTab=function(e){t.setState({activeTab:e})},t}return n(t,e),t.prototype.componentDidMount=function(){var e=this;this.treeManager.addTreeUpdateListener(function(t){e.renderDrawing(t)}),this.treeManager.replaceTree(p)},t.prototype.renderDrawing=function(e){var t=new c.default,r={id:"root",module:"root",config:{},children:e},n=new u.default(t,r).renderChildren();this.setState({rendered:n,status:t})},t.prototype.render=function(){var e=this.state,t=e.selectedNodeId,r=e.rendered,n=e.status,a=e.activeTab,u=this.treeManager,s=u.getNodeOrNull(t),c=null;switch(a){case"tree":c=o.createElement(o.Fragment,null,o.createElement("div",{id:"hierarchy"},o.createElement(l.default,{treeManager:u,selectedNode:s}),o.createElement(i.default,{nodeConfigs:u.getTree(),selectedNode:s,onSelectNode:this.onSelectNode,onRepositionNode:this.onRepositionNode})),o.createElement("div",{id:"props"},s?o.createElement(d.default,{nodeConfig:s,status:n,onChange:this.onChangeNodeVariable}):null))}return o.createElement(o.Fragment,null,o.createElement("div",{id:"config"},o.createElement(f.default,{activeTab:a,onChangeTab:this.onChangeTab}),c),o.createElement("div",{id:"drawing"},o.createElement("svg",{width:800,height:800},r)))},t}(o.Component);t.default=h},,,,,,,,,function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),o=r(13),a=r(50);r(19);var i=document.createElement("div");i.id="wrapper",document.body.appendChild(i),o.render(n.createElement(a.default,null),i)},function(e,t,r){e.exports=r(59)}]);
//# sourceMappingURL=main.a06ae6d3.js.map