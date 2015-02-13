!function t(i,e,s){function r(a,n){if(!e[a]){if(!i[a]){var h="function"==typeof require&&require;if(!n&&h)return h(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=e[a]={exports:{}};i[a][0].call(l.exports,function(t){var e=i[a][1][t];return r(e?e:t)},l,l.exports,t,i,e,s)}return e[a].exports}for(var o="function"==typeof require&&require,a=0;a<s.length;a++)r(s[a]);return r}({1:[function(t){console.log("Compress Library bongiovi");t("../../js/bongiovi/Scheduler.js"),t("../../js/bongiovi/SimpleImageLoader.js"),t("../../js/bongiovi/GLTool.js"),t("../../js/bongiovi/SceneRotation.js"),t("../../js/bongiovi/Scene.js"),t("../../js/bongiovi/Camera.js"),t("../../js/bongiovi/CameraPerspective.js"),t("../../js/bongiovi/Mesh.js"),t("../../js/bongiovi/GLShader.js"),t("../../js/bongiovi/GLTexture.js"),t("../../js/bongiovi/View.js"),t("../../js/bongiovi/ViewCopy.js");console.log(glMatrix),console.log(bongiovi)},{"../../js/bongiovi/Camera.js":2,"../../js/bongiovi/CameraPerspective.js":3,"../../js/bongiovi/GLShader.js":4,"../../js/bongiovi/GLTexture.js":5,"../../js/bongiovi/GLTool.js":6,"../../js/bongiovi/Mesh.js":7,"../../js/bongiovi/Scene.js":8,"../../js/bongiovi/SceneRotation.js":9,"../../js/bongiovi/Scheduler.js":10,"../../js/bongiovi/SimpleImageLoader.js":11,"../../js/bongiovi/View.js":12,"../../js/bongiovi/ViewCopy.js":13}],2:[function(){bongiovi=window.bongiovi||{},function(){var t=function(){this.matrix=mat4.create(),mat4.identity(this.matrix)},i=t.prototype;i.lookAt=function(t,i,e){mat4.identity(this.matrix),mat4.lookAt(this.matrix,t,i,e)},i.getMatrix=function(){return this.matrix},bongiovi.Camera=t}()},{}],3:[function(){bongiovi=window.bongiovi||{},function(){{var t=bongiovi.Camera,i=function(){t.call(this),this.projection=mat4.create(),mat4.identity(this.projection),this.mtxFinal=mat4.create()},e=i.prototype=new t;t.prototype}e.setPerspective=function(t,i,e,s){mat4.perspective(this.projection,t,i,e,s)},e.getMatrix=function(){return mat4.multiply(this.mtxFinal,this.projection,this.matrix),this.mtxFinal},bongiovi.CameraPerspective=i}()},{}],4:[function(){!function(){var t=function(t,i){this.gl=bongiovi.GL.gl,this.idVertex=t,this.idFragment=i,this.parameters=[],this.uniformTextures=[],this.vertexShader=void 0,this.fragmentShader=void 0,this._isReady=!1,this._loadedCount=0,this.init()},i=t.prototype;i.init=function(){this.getShader(this.idVertex,!0),this.getShader(this.idFragment,!1)},i.getShader=function(t,i){var e=new XMLHttpRequest;e.hasCompleted=!1;var s=this;e.onreadystatechange=function(t){4==t.target.readyState&&(i?s.createVertexShaderProgram(t.target.responseText):s.createFragmentShaderProgram(t.target.responseText))},e.open("GET",t,!0),e.send(null)},i.createVertexShaderProgram=function(t){var i=this.gl.createShader(this.gl.VERTEX_SHADER);return this.gl.shaderSource(i,t),this.gl.compileShader(i),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)?(this.vertexShader=i,void 0!=this.vertexShader&&void 0!=this.fragmentShader&&this.attachShaderProgram(),void this._loadedCount++):(console.warn(this.gl.getShaderInfoLog(i)),null)},i.createFragmentShaderProgram=function(t){var i=this.gl.createShader(this.gl.FRAGMENT_SHADER);return this.gl.shaderSource(i,t),this.gl.compileShader(i),this.gl.getShaderParameter(i,this.gl.COMPILE_STATUS)?(this.fragmentShader=i,void 0!=this.vertexShader&&void 0!=this.fragmentShader&&this.attachShaderProgram(),void this._loadedCount++):(console.warn(this.gl.getShaderInfoLog(i)),null)},i.attachShaderProgram=function(){this._isReady=!0,console.log("Create shader : ",this.idVertex,this.idFragment),this.shaderProgram=this.gl.createProgram(),this.gl.attachShader(this.shaderProgram,this.vertexShader),this.gl.attachShader(this.shaderProgram,this.fragmentShader),this.gl.linkProgram(this.shaderProgram)},i.bind=function(){this._isReady&&(this.gl.useProgram(this.shaderProgram),void 0==this.shaderProgram.pMatrixUniform&&(this.shaderProgram.pMatrixUniform=this.gl.getUniformLocation(this.shaderProgram,"uPMatrix")),void 0==this.shaderProgram.mvMatrixUniform&&(this.shaderProgram.mvMatrixUniform=this.gl.getUniformLocation(this.shaderProgram,"uMVMatrix")),bongiovi.GLTool.setShader(this),bongiovi.GLTool.setShaderProgram(this.shaderProgram),this.uniformTextures=[])},i.isReady=function(){return this._isReady},i.uniform=function(t,i,e){if(this._isReady){"texture"==i&&(i="uniform1i");for(var s,r=!1,o=0;o<this.parameters.length;o++)if(s=this.parameters[o],s.name==t){s.value=e,r=!0;break}r?this.shaderProgram[t]=s.uniformLoc:(this.shaderProgram[t]=this.gl.getUniformLocation(this.shaderProgram,t),this.parameters.push({name:t,type:i,value:e,uniformLoc:this.shaderProgram[t]})),-1==i.indexOf("Matrix")?this.gl[i](this.shaderProgram[t],e):this.gl[i](this.shaderProgram[t],!1,e),"uniform1i"==i&&(this.uniformTextures[e]=this.shaderProgram[t])}},i.unbind=function(){},bongiovi.GLShader=t}()},{}],5:[function(){!function(){var t,i,e=function(e,s){s=void 0==s?!1:!0,t=bongiovi.GL.gl,i=bongiovi.GL,s?this.texture=e:(this.texture=t.createTexture(),this._isVideo="VIDEO"==e.tagName,t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),this._isVideo?(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.MIRRORED_REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.MIRRORED_REPEAT),t.generateMipmap(t.TEXTURE_2D)):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.MIRRORED_REPEAT),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.MIRRORED_REPEAT),t.generateMipmap(t.TEXTURE_2D)),t.bindTexture(t.TEXTURE_2D,null))},s=e.prototype;s.updateTexture=function(i){t.bindTexture(t.TEXTURE_2D,this.texture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!0),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,i),this._isVideo?(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR)):(t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR_MIPMAP_NEAREST),t.generateMipmap(t.TEXTURE_2D)),t.bindTexture(t.TEXTURE_2D,null)},s.bind=function(e){void 0==e&&(e=0),t.activeTexture(t.TEXTURE0+e),t.bindTexture(t.TEXTURE_2D,this.texture),t.uniform1i(i.shader.uniformTextures[e],e),this._bindIndex=e},s.unbind=function(){t.bindTexture(t.TEXTURE_2D,null)},bongiovi.GLTexture=e}()},{}],6:[function(){bongiovi=window.bongiovi||{},function(){var t=null,i=function(){this.aspectRatio=window.innerWidth/window.innerHeight,this.fieldOfView=45,this.zNear=5,this.zFar=3e3,this.canvas=null,this.gl=null,this.W=0,this.H=0,this.shader=null,this.shaderProgram=null},e=i.prototype;e.init=function(t){this.canvas=t,this.gl=this.canvas.getContext("experimental-webgl",{antialias:!0}),this.resize();var i=this.gl.getParameter(this.gl.SAMPLES),e=this.gl.getContextAttributes().antialias;console.log("Sample size : ",i,e),this.gl.viewport(0,0,this.gl.viewportWidth,this.gl.viewportHeight),this.gl.enable(this.gl.DEPTH_TEST),this.gl.enable(this.gl.CULL_FACE),this.gl.enable(this.gl.BLEND),this.gl.clearColor(0,0,0,1),this.gl.clearDepth(1),this.matrix=mat4.create(),mat4.identity(this.matrix),this.depthTextureExt=this.gl.getExtension("WEBKIT_WEBGL_depth_texture"),this.floatTextureExt=this.gl.getExtension("OES_texture_float"),console.log("Extentions : ",this.depthTextureExt,this.floatTextureExt),this.enableAlphaBlending();var s=this;window.addEventListener("resize",function(){s.resize()})},e.getGL=function(){return this.gl},e.setShader=function(t){this.shader=t},e.setShaderProgram=function(t){this.shaderProgram=t},e.setViewport=function(t,i,e,s){this.gl.viewport(t,i,e,s)},e.setMatrices=function(t){this.camera=t},e.rotate=function(t){mat4.copy(this.matrix,t)},e.render=function(){null!=this.shaderProgram&&(this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA))},e.enableAlphaBlending=function(){this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)},e.enableAdditiveBlending=function(){this.gl.blendFunc(this.gl.ONE,this.gl.ONE)},e.clear=function(t,i,e,s){this.gl.clearColor(t,i,e,s),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT)},e.draw=function(t){function i(t,i,e){return void 0==i.cacheAttribLoc&&(i.cacheAttribLoc={}),void 0==i.cacheAttribLoc[e]&&(i.cacheAttribLoc[e]=t.getAttribLocation(i,e)),i.cacheAttribLoc[e]}this.gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform,!1,this.camera.getMatrix()),this.gl.uniformMatrix4fv(this.shaderProgram.mvMatrixUniform,!1,this.matrix),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t.vBufferPos);var e=i(this.gl,this.shaderProgram,"aVertexPosition");this.gl.vertexAttribPointer(e,t.vBufferPos.itemSize,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(e),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t.vBufferUV);var s=i(this.gl,this.shaderProgram,"aTextureCoord");this.gl.vertexAttribPointer(s,t.vBufferUV.itemSize,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(s),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,t.iBuffer);for(var r=0;r<t.extraAttributes.length;r++){this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t.extraAttributes[r].buffer);var o=i(this.gl,this.shaderProgram,t.extraAttributes[r].name);this.gl.vertexAttribPointer(o,t.extraAttributes[r].itemSize,this.gl.FLOAT,!1,0,0),this.gl.enableVertexAttribArray(o)}t.drawType==this.gl.POINTS?this.gl.drawArrays(t.drawType,0,t.vertexSize):this.gl.drawElements(t.drawType,t.iBuffer.numItems,this.gl.UNSIGNED_SHORT,0)},e.resize=function(){this.W=window.innerWidth,this.H=window.innerHeight,this.canvas.width=this.W,this.canvas.height=this.H,this.gl.viewportWidth=this.W,this.gl.viewportHeight=this.H,this.gl.viewport(0,0,this.W,this.H),this.aspectRatio=window.innerWidth/window.innerHeight,this.render()},i.getInstance=function(){return null==t&&(t=new i),t},bongiovi.GL=i.getInstance(),bongiovi.GLTool=i.getInstance()}()},{}],7:[function(){!function(){var t=function(t,i,e){this.gl=bongiovi.GLTool.gl,this.vertexSize=t,this.indexSize=i,this.drawType=e,this.extraAttributes=[],this.vBufferPos=void 0,this._floatArrayVertex=void 0,this._init()},i=t.prototype;i._init=function(){},i.bufferVertex=function(t){for(var i=[],e=0;e<t.length;e++)for(var s=0;s<t[e].length;s++)i.push(t[e][s]);if(void 0==this.vBufferPos&&(this.vBufferPos=this.gl.createBuffer()),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vBufferPos),void 0==this._floatArrayVertex)this._floatArrayVertex=new Float32Array(i);else if(t.length!=this._floatArrayVertex.length)this._floatArrayVertex=new Float32Array(i);else for(var e=0;e<t.length;e++)this._floatArrayVertex[e]=t[e];this.gl.bufferData(this.gl.ARRAY_BUFFER,this._floatArrayVertex,this.gl.STATIC_DRAW),this.vBufferPos.itemSize=3},i.bufferTexCoords=function(t){for(var i=[],e=0;e<t.length;e++)for(var s=0;s<t[e].length;s++)i.push(t[e][s]);this.vBufferUV=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,this.vBufferUV),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(i),this.gl.STATIC_DRAW),this.vBufferUV.itemSize=2},i.bufferData=function(t,i,e){for(var s=-1,r=0;r<this.extraAttributes.length;r++)if(this.extraAttributes[r].name==i){this.extraAttributes[r].data=t,s=r;break}for(var o=[],r=0;r<t.length;r++)for(var a=0;a<t[r].length;a++)o.push(t[r][a]);if(-1==s){var n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n);var h=new Float32Array(o);this.gl.bufferData(this.gl.ARRAY_BUFFER,h,this.gl.STATIC_DRAW),this.extraAttributes.push({name:i,data:t,itemSize:e,buffer:n,floatArray:h})}else{var n=this.extraAttributes[s].buffer;this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n);for(var h=this.extraAttributes[s].floatArray,r=0;r<o.length;r++)h[r]=o[r];this.gl.bufferData(this.gl.ARRAY_BUFFER,h,this.gl.STATIC_DRAW)}},i.bufferIndices=function(t){this.iBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.iBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(t),this.gl.STATIC_DRAW),this.iBuffer.itemSize=1,this.iBuffer.numItems=t.length},bongiovi.Mesh=t}()},{}],8:[function(){!function(){var t=function(){this.gl=bongiovi.GLTool.gl,this._init()},i=t.prototype;i._init=function(){this.camera=new bongiovi.CameraPerspective,this.camera.setPerspective(45,window.innerWidth/window.innerHeight,5,3e3);var t=vec3.clone([0,0,500]),i=vec3.create(),e=vec3.clone([0,-1,0]);this.camera.lookAt(t,i,e),this.sceneRotation=new bongiovi.SceneRotation,this.rotationFront=mat4.create(),mat4.identity(this.rotationFront),this.cameraOtho=new bongiovi.Camera,this._initTextures(),this._initViews()},i._initTextures=function(){},i._initViews=function(){},i.loop=function(){this.update(),this.render()},i.update=function(){this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),this.sceneRotation.update(),bongiovi.GLTool.setMatrices(this.camera),bongiovi.GLTool.rotate(this.sceneRotation.matrix)},i.render=function(){},bongiovi.Scene=t}()},{}],9:[function(){bongiovi=window.bongiovi||{},function(){var t=function(t){void 0==t&&(t=document),this._z=0,this._mouseZ=0,this._preZ=0,this._isRotateZ=0,this.matrix=mat4.create(),this.m=mat4.create(),this._vZaxis=vec3.clone([0,0,0]),this._zAxis=vec3.clone([0,0,-1]),this.preMouse={x:0,y:0},this.mouse={x:0,y:0},this._isMouseDown=!1,this._rotation=quat.clone([0,0,1,0]),this.tempRotation=quat.clone([0,0,0,0]),this._rotateZMargin=0,this.diffX=0,this.diffY=0,this._currDiffX=0,this._currDiffY=0,this._offset=.004,this._easing=.1,this._slerp=-1;var i=this;t.addEventListener("mousedown",function(t){i._onMouseDown(t)}),t.addEventListener("touchstart",function(t){i._onMouseDown(t)}),t.addEventListener("mouseup",function(t){i._onMouseUp(t)}),t.addEventListener("touchend",function(t){i._onMouseUp(t)}),t.addEventListener("mousemove",function(t){i._onMouseMove(t)}),t.addEventListener("touchmove",function(t){i._onMouseMove(t)}),t.addEventListener("mousewheel",function(t){i._onMouseWheel(t)}),t.addEventListener("DOMMouseScroll",function(t){i._onMouseWheel(t)})},i=t.prototype;i.getMousePos=function(t){var i,e;return void 0!=t.changedTouches?(i=t.changedTouches[0].pageX,e=t.changedTouches[0].pageY):(i=t.clientX,e=t.clientY),{x:i,y:e}},i._onMouseDown=function(t){if(!this._isMouseDown){var i=this.getMousePos(t),e=quat.clone(this._rotation);this._updateRotation(e),this._rotation=e,this._isMouseDown=!0,this._isRotateZ=0,this.preMouse={x:i.x,y:i.y},i.y<this._rotateZMargin||i.y>window.innerHeight-this._rotateZMargin?this._isRotateZ=1:(i.x<this._rotateZMargin||i.x>window.innerWidth-this._rotateZMargin)&&(this._isRotateZ=2),this._z=this._preZ,this._currDiffX=this.diffX=0,this._currDiffY=this.diffY=0}},i._onMouseMove=function(t){this.mouse=this.getMousePos(t)},i._onMouseUp=function(){this._isMouseDown&&(this._isMouseDown=!1)},i._onMouseWheel=function(t){t.preventDefault();var i=t.wheelDelta,e=t.detail,s=0;s=e?i?i/e/40*e>0?1:-1:-e/3:i/120,this._preZ-=5*s},i.setCameraPos=function(t){if(console.log("Set camera pos : ",t),!(this._slerp>0)){var i=t.clone(this._rotation);this._updateRotation(i),this._rotation=t.clone(i),this._currDiffX=this.diffX=0,this._currDiffY=this.diffY=0,this._isMouseDown=!1,this._isRotateZ=0,this._targetQuat=t.clone(t),this._slerp=1}},i.resetQuat=function(){this._rotation=quat.clone([0,0,1,0]),this.tempRotation=quat.clone([0,0,0,0]),this._targetQuat=void 0,this._slerp=-1},i.update=function(){mat4.identity(this.m),void 0==this._targetQuat?(quat.set(this.tempRotation,this._rotation[0],this._rotation[1],this._rotation[2],this._rotation[3]),this._updateRotation(this.tempRotation)):(this._slerp+=.1*(0-this._slerp),this._slerp<.001?(quat.set(this._rotation,this._targetQuat[0],this._targetQuat[1],this._targetQuat[2],this._targetQuat[3]),this._targetQuat=void 0,this._slerp=-1):(quat.set(this.tempRotation,0,0,0,0),quat.slerp(this.tempRotation,this._targetQuat,this._rotation,this._slerp))),vec3.set(this._vZaxis,0,0,this._z),vec3.transformQuat(this._vZaxis,this._vZaxis,this.tempRotation),mat4.translate(this.m,this.m,this._vZaxis);Math.random()>.95;mat4.fromQuat(this.matrix,this.tempRotation),mat4.multiply(this.matrix,this.matrix,this.m)};i._updateRotation=function(t){if(this._isMouseDown&&!this._isLocked&&(this.diffX=this.mouse.x-this.preMouse.x,this.diffY=-(this.mouse.y-this.preMouse.y),this._isInvert&&(this.diffX=-this.diffX),this._isInvert&&(this.diffY=-this.diffY)),this._currDiffX+=(this.diffX-this._currDiffX)*this._easing,this._currDiffY+=(this.diffY-this._currDiffY)*this._easing,this._isRotateZ>0)if(1==this._isRotateZ){var i=-this._currDiffX*this._offset;i*=this.preMouse.y<this._rotateZMargin?-1:1;var e=quat.clone([0,0,Math.sin(i),Math.cos(i)]);quat.multiply(quat,t,e)}else{var i=-this._currDiffY*this._offset;i*=this.preMouse.x<this._rotateZMargin?1:-1;var e=quat.clone([0,0,Math.sin(i),Math.cos(i)]);quat.multiply(quat,t,e)}else{var s=vec3.clone([this._currDiffX,this._currDiffY,0]),r=vec3.create();vec3.cross(r,s,this._zAxis),vec3.normalize(r,r);var i=vec3.length(s)*this._offset,e=quat.clone([Math.sin(i)*r[0],Math.sin(i)*r[1],Math.sin(i)*r[2],Math.cos(i)]);quat.multiply(t,t,e)}this._z+=(this._preZ-this._z)*this._easing},bongiovi.SceneRotation=t}()},{}],10:[function(){bongiovi=window.bongiovi||{},void 0==window.requestAnimFrame&&(window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}()),function(){var t=function(){this.FRAMERATE=60,this._delayTasks=[],this._nextTasks=[],this._deferTasks=[],this._highTasks=[],this._usurpTask=[],this._enterframeTasks=[],this._idTable=0,requestAnimFrame(this._loop.bind(this))},i=t.prototype;i._loop=function(){requestAnimFrame(this._loop.bind(this)),this._process()},i._process=function(){for(var t=0;t<this._enterframeTasks.length;t++){var i=this._enterframeTasks[t];null!=i&&void 0!=i&&i.func.apply(i.scope,i.params)}for(;this._highTasks.length>0;){var e=this._highTasks.pop();e.func.apply(e.scope,e.params)}for(var s=(new Date).getTime(),t=0;t<this._delayTasks.length;t++){var e=this._delayTasks[t];s-e.time>e.delay&&(e.func.apply(e.scope,e.params),this._delayTasks.splice(t,1))}s=(new Date).getTime();for(var r=1e3/this.FRAMERATE;this._deferTasks.length>0;){var i=this._deferTasks.shift(),o=(new Date).getTime();if(!(r>o-s)){this._deferTasks.unshift(i);break}i.func.apply(i.scope,i.params)}s=(new Date).getTime();for(var r=1e3/this.FRAMERATE;this._usurpTask.length>0;){var i=this._usurpTask.shift(),o=(new Date).getTime();if(!(r>o-s))break;i.func.apply(i.scope,i.params)}this._highTasks=this._highTasks.concat(this._nextTasks),this._nextTasks=[],this._usurpTask=[]},i.addEF=function(t,i,e){e=e||[];var s=this._idTable;return this._enterframeTasks[s]={scope:t,func:i,params:e},this._idTable++,s},i.removeEF=function(t){return void 0!=this._enterframeTasks[t]&&(this._enterframeTasks[t]=null),-1},i.delay=function(t,i,e,s){var r=(new Date).getTime(),o={scope:t,func:i,params:e,delay:s,time:r};this._delayTasks.push(o)},i.defer=function(t,i,e){var s={scope:t,func:i,params:e};this._deferTasks.push(s)},i.next=function(t,i,e){var s={scope:t,func:i,params:e};this._nextTasks.push(s)},i.usurp=function(t,i,e){var s={scope:t,func:i,params:e};this._usurpTask.push(s)},bongiovi.Scheduler=new t}()},{}],11:[function(){bongiovi=window.bongiovi||{},function(){SimpleImageLoader=function(){this._imgs={},this._loadedCount=0,this._toLoadCount=0,this._scope,this._callback,this._callbackProgress};var t=SimpleImageLoader.prototype;t.load=function(t,i,e,s){this._imgs={},this._loadedCount=0,this._toLoadCount=t.length,this._scope=i,this._callback=e,this._callbackProgress=s;for(var r=this,o=0;o<t.length;o++){var a=new Image;a.onload=function(){r._onImageLoaded()};var n=t[o],h=n.split("/"),u=h[h.length-1].split(".")[0];this._imgs[u]=a,a.src=n}},t._onImageLoaded=function(){if(this._loadedCount++,this._loadedCount==this._toLoadCount)this._callback.call(this._scope,this._imgs);else{var t=this._loadedCount/this._toLoadCount;this._callbackProgress&&this._callbackProgress.call(this._scope,t)}}}(),bongiovi.SimpleImageLoader=new SimpleImageLoader},{}],12:[function(){!function(){var t=function(t,i){void 0!=t&&(this.shader=new bongiovi.GLShader(t,i),this._init())},i=t.prototype;i._init=function(){console.log("Should be overwritten by SuperClass")},i.render=function(){console.log("Should be overwritten by SuperClass")},bongiovi.View=t}()},{}],13:[function(){!function(){{var t=bongiovi.View,i=function(i,e){void 0==i&&(i="assets/shaders/copy.vert",e="assets/shaders/copy.frag"),t.call(this,i,e)},e=i.prototype=new t;t.prototype}e._init=function(){var t=[],i=[],e=[0,1,2,0,2,3],s=1;t.push([-s,-s,0]),t.push([s,-s,0]),t.push([s,s,0]),t.push([-s,s,0]),i.push([0,0]),i.push([1,0]),i.push([1,1]),i.push([0,1]),this.mesh=new bongiovi.Mesh(4,6,bongiovi.GLTool.gl.TRIANGLES),this.mesh.bufferVertex(t),this.mesh.bufferTexCoords(i),this.mesh.bufferIndices(e)},e.render=function(t){this.shader.isReady()&&(this.shader.bind(),this.shader.uniform("texture","uniform1i",0),t.bind(0),bongiovi.GLTool.draw(this.mesh))},bongiovi.ViewCopy=i}()},{}]},{},[1]);