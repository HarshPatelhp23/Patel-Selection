import{M as ee,O as Fe,B as De,F as _e,S as w,U as K,V as m,d as q,H as X,N as He,C as ke,g as _,h as b,A as Ue,i as ze,R as je,j as We,k as qe,L as Xe,n as Ke,o as Ye,p as Ze,q as Je,r as $e,W as et,l as tt,s as Pe,u as it,P as st,e as at,v as rt,D as ot,w as ye,G as nt,b as lt,T as ut,x as $,y as ht,z as ft,E as ct,I as dt}from"./models-BKUQU1WI.js";const Ne={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class D{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const mt=new Fe(-1,1,1,-1,0,1);class pt extends De{constructor(){super(),this.setAttribute("position",new _e([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new _e([0,2,0,0,2,0],2))}}const vt=new pt;class te{constructor(e){this._mesh=new ee(vt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,mt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class gt extends D{constructor(e,i){super(),this.textureID=i!==void 0?i:"tDiffuse",e instanceof w?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=K.clone(e.uniforms),this.material=new w({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new te(this.material)}render(e,i,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Re extends D{constructor(e,i){super(),this.scene=e,this.camera=i,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,i,r){const a=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let l,u;this.inverse?(l=0,u=1):(l=1,u=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),s.buffers.stencil.setFunc(a.ALWAYS,l,4294967295),s.buffers.stencil.setClear(u),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(a.EQUAL,1,4294967295),s.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),s.buffers.stencil.setLocked(!0)}}class bt extends D{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class xt{constructor(e,i){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),i===void 0){const r=e.getSize(new m);this._width=r.width,this._height=r.height,i=new q(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:X}),i.texture.name="EffectComposer.rt1"}else this._width=i.width,this._height=i.height;this.renderTarget1=i,this.renderTarget2=i.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new gt(Ne),this.copyPass.material.blending=He,this.clock=new ke}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,i){this.passes.splice(i,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const i=this.passes.indexOf(e);i!==-1&&this.passes.splice(i,1)}isLastEnabledPass(e){for(let i=e+1;i<this.passes.length;i++)if(this.passes[i].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const i=this.renderer.getRenderTarget();let r=!1;for(let a=0,s=this.passes.length;a<s;a++){const l=this.passes[a];if(l.enabled!==!1){if(l.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),l.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),l.needsSwap){if(r){const u=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}Re!==void 0&&(l instanceof Re?r=!0:l instanceof bt&&(r=!1))}}this.renderer.setRenderTarget(i)}reset(e){if(e===void 0){const i=this.renderer.getSize(new m);this._pixelRatio=this.renderer.getPixelRatio(),this._width=i.width,this._height=i.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,i){this._width=e,this._height=i;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ae extends D{constructor(e,i,r=null,a=null,s=null){super(),this.scene=e,this.camera=i,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new _}render(e,i,r){const a=e.autoClear;e.autoClear=!1;let s,l;this.overrideMaterial!==null&&(l=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=l),e.autoClear=a}}const Mt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new _(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class F extends D{constructor(e,i,r,a){super(),this.strength=i!==void 0?i:1,this.radius=r,this.threshold=a,this.resolution=e!==void 0?new m(e.x,e.y):new m(256,256),this.clearColor=new _(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);this.renderTargetBright=new q(s,l,{type:X}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let x=0;x<this.nMips;x++){const E=new q(s,l,{type:X});E.texture.name="UnrealBloomPass.h"+x,E.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(E);const P=new q(s,l,{type:X});P.texture.name="UnrealBloomPass.v"+x,P.texture.generateMipmaps=!1,this.renderTargetsVertical.push(P),s=Math.round(s/2),l=Math.round(l/2)}const u=Mt;this.highPassUniforms=K.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new w({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];const h=[3,5,7,9,11];s=Math.round(this.resolution.x/2),l=Math.round(this.resolution.y/2);for(let x=0;x<this.nMips;x++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(h[x])),this.separableBlurMaterials[x].uniforms.invSize.value=new m(1/s,1/l),s=Math.round(s/2),l=Math.round(l/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=i,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=Ne;this.copyUniforms=K.clone(c.uniforms),this.blendMaterial=new w({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:Ue,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new _,this.oldClearAlpha=1,this.basic=new ze,this.fsQuad=new te(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,i){let r=Math.round(e/2),a=Math.round(i/2);this.renderTargetBright.setSize(r,a);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(r,a),this.renderTargetsVertical[s].setSize(r,a),this.separableBlurMaterials[s].uniforms.invSize.value=new m(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2)}render(e,i,r,a,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const l=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=r.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let u=this.renderTargetBright;for(let h=0;h<this.nMips;h++)this.fsQuad.material=this.separableBlurMaterials[h],this.separableBlurMaterials[h].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[h].uniforms.direction.value=F.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[h]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[h].uniforms.colorTexture.value=this.renderTargetsHorizontal[h].texture,this.separableBlurMaterials[h].uniforms.direction.value=F.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[h]),e.clear(),this.fsQuad.render(e),u=this.renderTargetsVertical[h];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(r),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=l}getSeperableBlurMaterial(e){const i=[];for(let r=0;r<e;r++)i.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new w({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new m(.5,.5)},direction:{value:new m(.5,.5)},gaussianCoefficients:{value:i}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new w({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}F.BlurDirectionX=new m(1,0);F.BlurDirectionY=new m(0,1);const Tt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Ct extends D{constructor(){super();const e=Tt;this.uniforms=K.clone(e.uniforms),this.material=new je({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new te(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,i,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},We.getTransfer(this._outputColorSpace)===qe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Xe?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ke?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ye?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ze?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Je?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===$e&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(i),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const St="varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }",wt=`
varying vec2 vUv;
uniform float uTime; uniform vec2 uMouse; uniform vec2 uRes; uniform float uScroll;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.02; a *= .5; } return v; }
void main(){
  vec2 p = (vUv - .5) * vec2(uRes.x/uRes.y, 1.) * 2.;
  float t = uTime * .07;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.*q + vec2(1.7, 9.2) + t*1.5), fbm(p + 3.*q + vec2(8.3, 2.8) - t*1.2));
  float f = fbm(p + 3.*r);
  // linear-light versions of the logo colours #061a5c, #0a2a8f, #1b46c9, #e8161c
  vec3 navy = vec3(.0018, .010, .107), blue = vec3(.003, .023, .275), bright = vec3(.011, .06, .58), red = vec3(.807, .008, .012);
  vec3 col = mix(navy, blue, clamp(f*2., 0., 1.));
  col = mix(col, bright, clamp(length(q)*.7, 0., 1.) * .45);
  col = mix(col, red, smoothstep(.75, 1.25, length(r)) * (.28 + uScroll*.4));
  vec2 m = (uMouse - .5) * vec2(uRes.x/uRes.y, 1.) * 2.;
  float d = length(p - m);
  col += red * .35 * exp(-d*d*3.2);
  col += vec3(.02, .08, .6) * .3 * exp(-d*d*.7);
  col *= mix(.5, 1., smoothstep(1.7, .25, length(p*.72)));
  gl_FragColor = vec4(col, 1.);
  #include <colorspace_fragment>
}`,_t=`
attribute float aSeed; attribute vec3 aColor;
uniform float uTime; uniform float uScale; uniform float uBurst;
varying vec3 vC; varying float vA;
void main(){
  vec3 p = position;
  p.y = mod(p.y + uTime * (.25 + aSeed*.6) + 11., 22.) - 11.;
  p.x += sin(uTime*.5 + aSeed*30.) * .5;
  p += normalize(position + vec3(.001)) * uBurst * (1. + aSeed*3.);
  vec4 mv = modelViewMatrix * vec4(p, 1.);
  gl_PointSize = uScale * (.05 + aSeed*.13) / -mv.z;
  gl_Position = projectionMatrix * mv;
  vC = aColor; vA = .3 + .7*aSeed;
}`,Pt=`
varying vec3 vC; varying float vA;
void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, .0, d);
  gl_FragColor = vec4(vC, a * vA);
  #include <colorspace_fragment>
}`,Ee=[["chair","Delhi Model"],["chair","Paradise"],["chair","Bentley (Relax Chair)"],["stool","Eiffel"],["dining","Party Round Dining Table"],["chair","Texas"],["center","Breeze (Glass Top)"],["chair","Polo Baby Chair"],["cabinet","Power Series, 2 Foot"],["stool","Stool 21"],["shoe","Power Small Shoe Rack"],["chair","Cushion"],["center","Spectra"],["dining","Jaipur Dining Table"]],Be=["#e8161c","#c3d0f5","#2f56d6","#e8161c","#9db4f0","#1b46c9","#c3d0f5"],yt={cabinet:.55,shoe:.65,dining:.8,center:.85},Rt=new b,A=(d,e,i)=>Math.min(i,Math.max(e,d)),At=d=>1+2.70158*Math.pow(d-1,3)+1.70158*Math.pow(d-1,2);function Bt(d,e){const i=innerWidth>900&&!matchMedia("(pointer:coarse)").matches,r=matchMedia("(prefers-reduced-motion:reduce)").matches,a=new et({canvas:d,antialias:!i,powerPreference:"high-performance"});a.setPixelRatio(Math.min(devicePixelRatio||1,i?1.5:2)),a.autoClear=!1,tt(a);const s=new Pe,l=new Fe(-1,1,1,-1,0,1),u=new w({uniforms:{uTime:{value:0},uMouse:{value:new m(.72,.5)},uRes:{value:new m(1,1)},uScroll:{value:0}},vertexShader:St,fragmentShader:wt,depthTest:!1,depthWrite:!1}),h=new ee(new it(2,2),u);h.frustumCulled=!1,s.add(h);const p=new Pe,c=new st(38,1,.1,100);c.position.set(0,.6,15),p.environment=at(a),p.environmentIntensity=.6,p.add(new rt(11454207,1714790,.55));const x=new ot(16777215,1.1);x.position.set(4,7,6),p.add(x);const E=new ye(15210012,90,34);E.position.set(-6,2,-3),p.add(E);const P=new ye(16777215,40,22);P.position.set(0,0,4),p.add(P);const M=new nt;p.add(M);const Y=[],Le=i?Ee.length:9;for(let t=0;t<Le;t++){const[n,o]=Ee[t],f=lt(n,"Patel",o,Be[t%Be.length]),g=t*2.399963,B=2.2+t%5*.82,we=new b(Math.cos(g)*B*1.15,Math.sin(g)*B*.8-.3,-4+t*37%9/9*6),Qe=(.75+t*13%7/7*.55)*(yt[n]??1);f.scale.setScalar(.001),f.position.copy(we),f.rotation.y=t*1.3,M.add(f),Y.push({obj:f,base:we,off:new b,vel:new b,bs:Qe,phase:t*1.7,spin:(t%2?1:-1)*(.25+t%4*.12),boost:0,delay:.25+t*.09})}const ie=[];[[4.4,"#e8161c",2.6],[5.9,"#ffffff",1.6],[7.4,"#3a63e6",2.6]].forEach(([t,n,o],f)=>{const g=new ee(new ut(t,.035,12,180),new ze({color:new _(n).multiplyScalar(o),toneMapped:!1}));g.position.set(0,-.3,-1),g.rotation.x=Math.PI/2.35+f*.12,g.rotation.y=f*.5,M.add(g),ie.push(g)});const L=i?1400:520,se=new Float32Array(L*3),ae=new Float32Array(L),re=new Float32Array(L*3),Oe=[new _("#ffffff"),new _("#ff3a40"),new _("#8fb0ff")];for(let t=0;t<L;t++){se.set([(Math.random()-.5)*34,(Math.random()-.5)*22,-9+Math.random()*16],t*3),ae[t]=Math.random();const n=Oe[Math.random()*3|0];re.set([n.r,n.g,n.b],t*3)}const O=new De;O.setAttribute("position",new $(se,3)),O.setAttribute("aSeed",new $(ae,1)),O.setAttribute("aColor",new $(re,3));const I=new w({uniforms:{uTime:{value:0},uScale:{value:600},uBurst:{value:0}},vertexShader:_t,fragmentShader:Pt,transparent:!0,depthWrite:!1,blending:Ue}),oe=new ht(O,I);oe.frustumCulled=!1,p.add(oe);let v=null,V=null;if(i){v=new xt(a);const t=new Ae(s,l),n=new Ae(p,c);n.clear=!1,n.clearDepth=!0,V=new F(new m(256,256),.5,.7,1),v.addPass(t),v.addPass(n),v.addPass(V),v.addPass(new Ct)}let G=0,Q=0,U=0,z=0,H=!1,ne=0,k=0;const le=new m,ue=new ft,Ie=new ct(new b(0,0,1),0),N=new b,j=new b,T=new b;let W=!1;const Z=t=>{const n=e.getBoundingClientRect(),o=(t.clientX-n.left)/n.width,f=(t.clientY-n.top)/n.height;U=o*2-1,z=f*2-1,le.set(U,-z),H=!0,ne=performance.now(),u.uniforms.uMouse.value.set(o,1-f)},he=()=>{H=!1,U=0,z=0},Ve=()=>{k=1;for(const t of Y)t.obj.getWorldPosition(j),T.copy(j).sub(W&&H?N:Rt).setZ(.5),T.lengthSq()<.01&&T.set(Math.random()-.5,Math.random()-.5,.5),t.vel.addScaledVector(T.normalize(),7+Math.random()*5),t.boost+=(Math.random()-.5)*14},fe=t=>{t.target.closest("a,button")||(Z(t),Ve())},ce=t=>{t.gamma==null||t.beta==null||performance.now()-ne<2500||(U=A(t.gamma/28,-1,1),z=A((t.beta-40)/28,-1,1))};e.addEventListener("pointermove",Z),e.addEventListener("pointerleave",he),e.addEventListener("pointerdown",fe),addEventListener("deviceorientation",ce);let y=1,S=1,de=1,me=1;const Ge=()=>{const t=y/S,n=t>1.15;M.scale.setScalar(n?A(t*.95,.8,1):A(t*1.9,.55,.85)),de=n?1:A(t*1.5,.45,1),me=n?1:.85,M.position.set(n?3.4*Math.min(1,t/1.8):0,n?0:-1.5,0)},pe=()=>{if(y=e.clientWidth,S=e.clientHeight,!(!y||!S)&&(a.setSize(y,S,!1),v&&(v.setPixelRatio(a.getPixelRatio()),v.setSize(y,S)),c.aspect=y/S,c.updateProjectionMatrix(),u.uniforms.uRes.value.set(y,S),I.uniforms.uScale.value=S*a.getPixelRatio()/(2*Math.tan(dt.degToRad(c.fov/2))),Ge(),r)){for(let t=0;t<110;t++)be(.03);xe(.016)}},ve=new ResizeObserver(pe);ve.observe(e);let R=0,C=0,ge=0;const be=t=>{R+=t,G+=(U-G)*Math.min(1,t*4),Q+=(z-Q)*Math.min(1,t*4),ge=A(scrollY/Math.max(1,e.clientHeight),0,1),C+=(ge-C)*Math.min(1,t*5),k*=Math.pow(.02,t),ue.setFromCamera(le,c),W=!!ue.ray.intersectPlane(Ie,N),W&&P.position.set(N.x,N.y,3.5);const n=1+C*1;for(const o of Y){if(o.obj.getWorldPosition(j),H&&W){T.copy(j).sub(N),T.z=0;const g=T.length(),B=3.6;g<B&&g>.001&&(o.vel.addScaledVector(T.normalize(),(B-g)*t*34),o.boost+=(B-g)*t*4*Math.sign(T.x||1))}o.vel.addScaledVector(o.off,-9*t).multiplyScalar(Math.max(0,1-2.4*t)),o.off.addScaledVector(o.vel,t),o.boost*=Math.max(0,1-2*t);const f=A((R-o.delay)/.9,0,1);o.obj.scale.setScalar(Math.max(.001,o.bs*At(f))),o.obj.position.set(o.base.x*n*de+o.off.x,o.base.y*n*me+o.off.y+Math.sin(R*.8+o.phase)*.32,o.base.z*n+o.off.z+C*1.5),o.obj.rotation.y+=(o.spin+o.boost)*t,o.obj.rotation.x=Math.sin(R*.6+o.phase)*.14+o.off.y*.1,o.obj.rotation.z=Math.cos(R*.5+o.phase)*.08-o.off.x*.1}ie.forEach((o,f)=>{o.rotation.z+=t*(.18+f*.07)*(f%2?-1:1)}),M.rotation.y+=(G*.35+C*1.3-M.rotation.y)*Math.min(1,t*3),M.rotation.x+=(Q*.16-M.rotation.x)*Math.min(1,t*3),c.position.x+=(G*.9-c.position.x)*Math.min(1,t*3),c.position.y+=(.6-Q*.5-C*1.2-c.position.y)*Math.min(1,t*3),c.position.z=15+C*9,c.lookAt(0,0,0),u.uniforms.uTime.value=R,u.uniforms.uScroll.value=C,I.uniforms.uTime.value=R,I.uniforms.uBurst.value=k*3,V&&(V.strength=.5+k*.9+C*.3)},xe=t=>{v?v.render(t):(a.clear(),a.render(s,l),a.clearDepth(),a.render(p,c))};let J=0,Me=!0,Te=performance.now();const Ce=t=>{J=requestAnimationFrame(Ce);const n=Math.min(.033,(t-Te)/1e3);Te=t,!(!Me||document.hidden)&&(be(n),xe(n))},Se=new IntersectionObserver(t=>{Me=t[0].isIntersecting});return Se.observe(e),pe(),r||(J=requestAnimationFrame(Ce)),()=>{cancelAnimationFrame(J),Se.disconnect(),ve.disconnect(),e.removeEventListener("pointermove",Z),e.removeEventListener("pointerleave",he),e.removeEventListener("pointerdown",fe),removeEventListener("deviceorientation",ce),p.traverse(t=>{const n=t;n.geometry&&n.geometry.dispose();const o=n.material;o&&(Array.isArray(o)?o:[o]).forEach(f=>f.dispose())}),h.geometry.dispose(),u.dispose(),v==null||v.dispose(),a.dispose(),a.forceContextLoss()}}export{Bt as mountHero};
