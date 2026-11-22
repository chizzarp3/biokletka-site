import{i as A,e as We}from"./tour-DlEZGHTX.js";import{r as u,j as p}from"./index-7jk--PEB.js";import{v as Le,U as ue,u as Ce,a as B,P as He}from"./constants-wssvzRQC.js";import{R as Pe}from"./RoundedBoxGeometry-C9jsqwkW.js";import{P as j,w as fe,b as Ne,a as Oe,c as Ve,d as V,e as ke,f as de,G as K,g as qe,h as Ye}from"./geometry-s48Tax1g.js";import{az as Qe,j as pe,aA as re,an as W,aB as $e,l as oe,au as ze,V as g,S as Xe,aC as he,c as Re,aa as ie,n as H,aD as Ke,M as Ue,d as m,m as D,Q as $,av as J,G as Je,o as Ze,v as et,q as tt,E as nt,t as st,aE as rt,aF as it,r as ot,a7 as me,aG as at,aH as ct}from"./three.core-CjW0feT3.js";import{_ as ve}from"./usePageField-C5jVh2rI.js";import{M as ge}from"./MeshTransmissionMaterial-Dc9KzKlo.js";const Be=Le>=125?"uv1":"uv2",ye=new oe,q=new g;class ae extends Qe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],r=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(r),this.setAttribute("position",new pe(e,3)),this.setAttribute("uv",new pe(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,r=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),r.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const r=new re(t,6,1);return this.setAttribute("instanceStart",new W(r,3,0)),this.setAttribute("instanceEnd",new W(r,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let r;e instanceof Float32Array?r=e:Array.isArray(e)&&(r=new Float32Array(e));const n=new re(r,t*2,1);return this.setAttribute("instanceColorStart",new W(n,t,0)),this.setAttribute("instanceColorEnd",new W(n,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new $e(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new oe);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),ye.setFromBufferAttribute(t),this.boundingBox.union(ye))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ze),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const r=this.boundingSphere.center;this.boundingBox.getCenter(r);let n=0;for(let i=0,o=e.count;i<o;i++)q.fromBufferAttribute(e,i),n=Math.max(n,r.distanceToSquared(q)),q.fromBufferAttribute(t,i),n=Math.max(n,r.distanceToSquared(q));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}class je extends ae{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const t=e.length-3,r=new Float32Array(2*t);for(let n=0;n<t;n+=3)r[2*n]=e[n],r[2*n+1]=e[n+1],r[2*n+2]=e[n+2],r[2*n+3]=e[n+3],r[2*n+4]=e[n+4],r[2*n+5]=e[n+5];return super.setPositions(r),this}setColors(e,t=3){const r=e.length-t,n=new Float32Array(2*r);if(t===3)for(let i=0;i<r;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];else for(let i=0;i<r;i+=t)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5],n[2*i+6]=e[i+6],n[2*i+7]=e[i+7];return super.setColors(n,t),this}fromLine(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class ce extends Xe{constructor(e){super({type:"LineMaterial",uniforms:he.clone(he.merge([ue.common,ue.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Re(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${Le>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(t){this.uniforms.diffuse.value=t}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(t){this.uniforms.linewidth.value=t}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(t){!!t!="USE_DASH"in this.defines&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(t){this.uniforms.dashScale.value=t}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(t){this.uniforms.dashSize.value=t}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(t){this.uniforms.dashOffset.value=t}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(t){this.uniforms.gapSize.value=t}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(t){this.uniforms.opacity.value=t}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(t){this.uniforms.resolution.value.copy(t)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(t){!!t!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),t===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}const Z=new H,Se=new g,we=new g,w=new H,x=new H,z=new H,ee=new g,te=new Ue,b=new Ke,xe=new g,Y=new oe,Q=new ze,R=new H;let U,F;function be(s,e,t){return R.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),R.multiplyScalar(1/R.w),R.x=F/t.width,R.y=F/t.height,R.applyMatrix4(s.projectionMatrixInverse),R.multiplyScalar(1/R.w),Math.abs(Math.max(R.x,R.y))}function lt(s,e){const t=s.matrixWorld,r=s.geometry,n=r.attributes.instanceStart,i=r.attributes.instanceEnd,o=Math.min(r.instanceCount,n.count);for(let a=0,l=o;a<l;a++){b.start.fromBufferAttribute(n,a),b.end.fromBufferAttribute(i,a),b.applyMatrix4(t);const c=new g,f=new g;U.distanceSqToSegment(b.start,b.end,f,c),f.distanceTo(c)<F*.5&&e.push({point:f,pointOnLine:c,distance:U.origin.distanceTo(f),object:s,face:null,faceIndex:a,uv:null,[Be]:null})}}function ut(s,e,t){const r=e.projectionMatrix,i=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,f=Math.min(a.instanceCount,l.count),d=-e.near;U.at(1,z),z.w=1,z.applyMatrix4(e.matrixWorldInverse),z.applyMatrix4(r),z.multiplyScalar(1/z.w),z.x*=i.x/2,z.y*=i.y/2,z.z=0,ee.copy(z),te.multiplyMatrices(e.matrixWorldInverse,o);for(let v=0,S=f;v<S;v++){if(w.fromBufferAttribute(l,v),x.fromBufferAttribute(c,v),w.w=1,x.w=1,w.applyMatrix4(te),x.applyMatrix4(te),w.z>d&&x.z>d)continue;if(w.z>d){const h=w.z-x.z,_=(w.z-d)/h;w.lerp(x,_)}else if(x.z>d){const h=x.z-w.z,_=(x.z-d)/h;x.lerp(w,_)}w.applyMatrix4(r),x.applyMatrix4(r),w.multiplyScalar(1/w.w),x.multiplyScalar(1/x.w),w.x*=i.x/2,w.y*=i.y/2,x.x*=i.x/2,x.y*=i.y/2,b.start.copy(w),b.start.z=0,b.end.copy(x),b.end.z=0;const E=b.closestPointToPointParameter(ee,!0);b.at(E,xe);const L=m.lerp(w.z,x.z,E),C=L>=-1&&L<=1,I=ee.distanceTo(xe)<F*.5;if(C&&I){b.start.fromBufferAttribute(l,v),b.end.fromBufferAttribute(c,v),b.start.applyMatrix4(o),b.end.applyMatrix4(o);const h=new g,_=new g;U.distanceSqToSegment(b.start,b.end,_,h),t.push({point:_,pointOnLine:h,distance:U.origin.distanceTo(_),object:s,face:null,faceIndex:v,uv:null,[Be]:null})}}}class Te extends ie{constructor(e=new ae,t=new ce({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,r=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)Se.fromBufferAttribute(t,o),we.fromBufferAttribute(r,o),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+Se.distanceTo(we);const i=new re(n,2,1);return e.setAttribute("instanceDistanceStart",new W(i,1,0)),e.setAttribute("instanceDistanceEnd",new W(i,1,1)),this}raycast(e,t){const r=this.material.worldUnits,n=e.camera;n===null&&!r&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const i=e.params.Line2!==void 0&&e.params.Line2.threshold||0;U=e.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;F=l.linewidth+i,a.boundingSphere===null&&a.computeBoundingSphere(),Q.copy(a.boundingSphere).applyMatrix4(o);let c;if(r)c=F*.5;else{const d=Math.max(n.near,Q.distanceToPoint(U.origin));c=be(n,d,l.resolution)}if(Q.radius+=c,U.intersectsSphere(Q)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Y.copy(a.boundingBox).applyMatrix4(o);let f;if(r)f=F*.5;else{const d=Math.max(n.near,Y.distanceToPoint(U.origin));f=be(n,d,l.resolution)}Y.expandByScalar(f),U.intersectsBox(Y)!==!1&&(r?lt(this,t):ut(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Z),this.material.uniforms.resolution.value.set(Z.z,Z.w))}}class ft extends Te{constructor(e=new je,t=new ce({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}}const k=u.forwardRef(function({points:e,color:t=16777215,vertexColors:r,linewidth:n,lineWidth:i,segments:o,dashed:a,...l},c){var f,d;const v=Ce(C=>C.size),S=u.useMemo(()=>o?new Te:new ft,[o]),[M]=u.useState(()=>new ce),E=(r==null||(f=r[0])==null?void 0:f.length)===4?4:3,L=u.useMemo(()=>{const C=o?new ae:new je,I=e.map(h=>{const _=Array.isArray(h);return h instanceof g||h instanceof H?[h.x,h.y,h.z]:h instanceof Re?[h.x,h.y,0]:_&&h.length===3?[h[0],h[1],h[2]]:_&&h.length===2?[h[0],h[1],0]:h});if(C.setPositions(I.flat()),r){t=16777215;const h=r.map(_=>_ instanceof D?_.toArray():_);C.setColors(h.flat(),E)}return C},[e,o,r,E]);return u.useLayoutEffect(()=>{S.computeLineDistances()},[e,S]),u.useLayoutEffect(()=>{a?M.defines.USE_DASH="":delete M.defines.USE_DASH,M.needsUpdate=!0},[a,M]),u.useEffect(()=>()=>{L.dispose(),M.dispose()},[L]),u.createElement("primitive",ve({object:S,ref:c},l),u.createElement("primitive",{object:L,attach:"geometry"}),u.createElement("primitive",ve({object:M,attach:"material",color:t,vertexColors:!!r,resolution:[v.width,v.height],linewidth:(d=n??i)!==null&&d!==void 0?d:1,dashed:a,transparent:E===4},l)))}),ne=[["origin",.03,.13],["grid",.11,.3],["sketch",.26,.36],["section",.36,.42],["extrude",.42,.53],["profile",.56,.64],["revolve",.65,.755],["pattern",.82,.92],["body",.94,.98]];function dt(s){let e=-1;for(let n=0;n<ne.length;n++)s>=ne[n][1]&&(e=n);if(e<0)return{stage:-1,progress:0};const[,t,r]=ne[e];return{stage:e,progress:We((s-t)/(r-t))}}function Tt(s){const e=dt(s);return{p:s,stage:e.stage,stageProgress:e.progress,origin:A(.03,.12,s),grid:A(.11,.3,s),gridRecede:A(.44,.9,s)*.88,sketch:A(.26,.36,s),section:A(.36,.415,s),sectionFade:1-A(.525,.55,s),patternLayout:A(.785,.815,s),profile:A(.56,.64,s),sketchFade:1-A(.42,.54,s),profileFade:1-A(.745,.78,s),revolve:A(.65,.755,s),extrude:A(.42,.53,s),pattern:A(.82,.92,s),solid:A(.94,.98,s),linesFade:A(.925,.98,s),keyLight:A(.42,.94,s)}}const It=[{at:0,pos:[1.05,2.8,1.9],look:[0,0,0]},{at:.13,pos:[1.05,2.8,1.9],look:[0,0,0]},{at:.26,pos:[0,2.85,.05],look:[0,0,0]},{at:.35,pos:[0,2.85,.05],look:[0,0,0]},{at:.415,pos:[-.8,1.05,2.3],look:[0,.12,0]},{at:.53,pos:[-.8,1.05,2.3],look:[0,.12,0]},{at:.56,pos:[-.18,.75,.88],look:[-.45,.25,.045]},{at:.755,pos:[-.18,.75,.88],look:[-.45,.25,.045]},{at:.815,pos:[.6,.88,2.3],look:[0,.16,0]},{at:1,pos:[.6,.88,2.3],look:[0,.16,0]}],N={fov:38,aspect:1.6,maxFov:58};function Dt(s){const e=i=>i*Math.PI/180;if(s>=N.aspect)return{fov:N.fov,dolly:1};const r=Math.tan(e(N.fov)/2)*N.aspect/s,n=Math.min(r,Math.tan(e(N.maxFov)/2));return{fov:2*Math.atan(n)*180/Math.PI,dolly:r/n}}const Ie=s=>m.clamp(s,0,1);function O(s,e,t){if(s===e)return t>=e?1:0;const r=Ie((t-s)/(e-s));return r*r*r*(r*(r*6-15)+10)}const G=Object.freeze({MACRO:"macro-profile",TRACE:"trace-outline",FLIP:"flip-to-well",DROP:"cell-drop",FORM:"spheroid-forming",COMPLETE:"complete"});function Me(s){const e=Ie(s),t=O(0,.16,e),r=O(.1,.34,e),n=O(.27,.41,e),i=O(.4,.58,e),o=O(.6,.875,e),a=O(.79,.97,e),l=O(.91,1,e);let c=G.MACRO;return e>=.1&&(c=G.TRACE),e>=.4&&(c=G.FLIP),e>=.6&&(c=G.DROP),e>=.79&&(c=G.FORM),e>=.992&&(c=G.COMPLETE),{progress:e,phase:c,focus:t,trace:r,solidFade:n,flip:i,cells:o,aggregate:a,finish:l}}function y(s,e,t){const r=Math.sin((s+1)*91.791+e*47.113+t*.017)*43758.5453;return r-Math.floor(r)}function De(s){return m.clamp(Math.round(Number(s)||18),14,20)}function Ee(s,e){if(e<=1)return new g;const t=1-s/(e-1)*2,r=Math.sqrt(Math.max(0,1-t*t)),n=s*Math.PI*(3-Math.sqrt(5));return new g(Math.cos(n)*r,t,Math.sin(n)*r)}function pt(s){const e=new g(...j.spheroidCenter),t=Math.max(8,Math.round((s-1)*.68)),r=s-t-1,n=[];for(let i=0;i<t;i+=1){const o=Ee(i,t);n.push(e.clone().add(new g(o.x*.172,o.y*.164,o.z*.13)))}for(let i=0;i<r;i+=1){const o=Ee(i,r);n.push(e.clone().add(new g(o.x*.082,o.y*.078,o.z*.065)))}return n.push(e),n}function ht(s=18,e=731){const t=De(s),r=pt(t),n=j.cellSize*.48;return r.map((i,o)=>{const a=(o+Math.round(y(o,1,e)))%2?1:-1,l=m.lerp(.18,.58,y(o,2,e)),c=a*Math.max(.08,fe(l)-n),f=m.lerp(-.03,.22,y(o,3,e)),d=Math.max(.09,fe(f)-n*1.2),v=(y(o,4,e)*2-1)*d*.72,S=(y(o,5,e)*2-1)*.105,M=new g(a*m.lerp(.06,.34,y(o,6,e)),j.openingY+m.lerp(.5,1.02,y(o,7,e)),S),E=new g(c,l,S*.7),L=new g(a*-m.lerp(.025,.15,y(o,8,e)),l+m.lerp(.14,.3,y(o,9,e)),-S*.3),C=new g(v,f,S*.45);return{delay:y(o,10,e)*.28,start:M,hit:E,rebound:L,settle:C,target:i,fallControl:new g(M.x*.94,m.lerp(M.y,E.y,.58),S),bounceControl:new g(E.x-a*.12,Math.max(E.y,L.y)+.2,0),settleControl:new g(L.x*.5,C.y+.18,0),startQuaternion:new $().setFromEuler(new J(y(o,11,e)*Math.PI,y(o,12,e)*Math.PI,y(o,13,e)*Math.PI)),flightQuaternion:new $().setFromEuler(new J(y(o,14,e)*Math.PI*2,y(o,15,e)*Math.PI*2,y(o,16,e)*Math.PI*2)),targetQuaternion:new $().setFromEuler(new J(y(o,17,e)*.34,y(o,18,e)*.34,y(o,19,e)*.34)),size:.88+y(o,20,e)*.22}})}function se(s,e,t,r,n){const i=1-r;return n.copy(s).multiplyScalar(i*i).addScaledVector(e,2*i*r).addScaledVector(t,r*r)}function mt(s,e,t,r,n,i,o){const a=O(s.delay,Math.min(1,s.delay+.68),e);a<.43?se(s.start,s.fallControl,s.hit,a/.43,n):a<.72?se(s.hit,s.bounceControl,s.rebound,(a-.43)/.29,n):se(s.rebound,s.settleControl,s.settle,(a-.72)/.28,n);const l=O(s.delay*.22,.82+s.delay*.18,t);n.lerp(s.target,l);const c=j.spheroidCenter,f=m.lerp(1,.9,r);n.x=c[0]+(n.x-c[0])*f,n.y=c[1]+(n.y-c[1])*f,n.z=c[2]+(n.z-c[2])*f,i.copy(s.startQuaternion).slerp(s.flightQuaternion,a),i.slerp(s.targetQuaternion,l);const d=O(s.delay,s.delay+.075,e);return o.setScalar(s.size*d*m.lerp(1,.97,r)),{travel:a,gather:l,appear:d}}const vt=["contour","sketch","contour-glass","sketch-glass"],gt=()=>{const s=typeof location<"u"&&new URLSearchParams(location.search).get("outline");return vt.includes(s)?s:"sketch-glass"},X=s=>O(.44,.58,s.progress),yt=.72;function St(){const s=new rt,e=new it(20,24,16),t=new Float32Array(e.attributes.position.count*3),r=new D("#ffffff"),n=new D("#f3f5fb"),i=new D("#dde3f0"),o=new D;for(let l=0;l<e.attributes.position.count;l+=1){const c=e.attributes.position.getY(l)/20;c>=0?o.copy(n).lerp(r,c):o.copy(n).lerp(i,-c),t.set([o.r,o.g,o.b],l*3)}e.setAttribute("color",new ot(t,3)),s.add(new ie(e,new me({vertexColors:!0,side:at})));const a=(l,c,f,d)=>{const v=new ie(new ct(...f),new me({color:new D(l).multiplyScalar(c)}));v.position.set(...d),v.lookAt(0,0,0),s.add(v)};return a("#ffffff",1.6,[7,4],[-4,5,4]),a("#f2f5fd",1.1,[5,6],[5,1,2]),a("#ffffff",2.6,[1.1,9],[-2.2,.5,5.5]),a("#f6f8ff",1.7,[.7,9],[2.6,.2,5.2]),s}const _e=new WeakMap;function wt(){const{gl:s}=Ce();return u.useMemo(()=>{let e=_e.get(s);if(!e){const t=new He(s);e=t.fromScene(St(),.02).texture,t.dispose(),_e.set(s,e)}return e},[s])}const Ae={transmission:1,thickness:.12,roughness:.02,ior:1.49,chromaticAberration:.003,anisotropicBlur:.008,samples:6,resolution:512,backside:!1,clearcoat:1,clearcoatRoughness:.05,color:"#f5f7fb",attenuationColor:"#e4e9f3",attenuationDistance:2.6,envMapIntensity:.38};function Fe({story:s,kind:e,opacity:t,bodyFade:r}){const n=u.useRef(null),i=u.useRef(null),o=u.useRef(null),a=wt(),l=u.useMemo(()=>{if(e==="vessel"){const v=new tt(ke(),64,Math.PI/2,Math.PI);return v.computeVertexNormals(),v}const d=new nt(de(Ye,K),{depth:qe,bevelEnabled:!0,bevelSize:K,bevelThickness:K,bevelSegments:4,curveSegments:12});return d.translate(0,0,-.036),d.computeVertexNormals(),d},[e]),c=u.useMemo(()=>e==="vessel"?new st(de(),12):null,[e]);u.useEffect(()=>()=>{l.dispose(),c?.dispose()},[l,c]);const f=u.useMemo(()=>new g,[]);return B(({camera:d})=>{const v=s.current,S=X(v);if(n.current.visible=S>.002,!n.current.visible)return;if(e==="frame"){const E=d.position.distanceTo(n.current.getWorldPosition(f)),L=m.clamp(E/4.5,.3,1);n.current.scale.z=m.lerp(.12,1,S)*L}const M=e==="vessel"?S*yt*m.clamp(T(r),0,1):S*m.clamp(T(t),0,1);i.current.opacity=M,o.current&&(o.current.opacity=M)}),p.jsxs("mesh",{ref:n,geometry:l,name:`profile-glass-${e}`,visible:!1,renderOrder:-2,children:[e==="vessel"?p.jsx(ge,{ref:i,...Ae,transmissionSampler:!0,thickness:.035,chromaticAberration:.008,anisotropicBlur:.015,color:"#e8eef8",envMap:a,envMapIntensity:1.15,specularIntensity:2.4,fog:!1,transparent:!0,opacity:0}):p.jsx(ge,{ref:i,...Ae,envMap:a,fog:!1,transparent:!0,opacity:0}),c&&p.jsx("mesh",{geometry:c,name:"profile-glass-vessel-cut",renderOrder:-1,children:p.jsx("meshPhysicalMaterial",{ref:o,color:"#f7f9fd",roughness:.12,transmission:.7,thickness:.01,ior:1.49,clearcoat:.6,clearcoatRoughness:.08,envMap:a,envMapIntensity:.38,fog:!1,transparent:!0,opacity:0})})]})}const T=s=>typeof s=="number"?s:typeof s=="function"?s():s?.current??0;function xt({story:s,enabled:e,children:t}){const r=u.useRef(null);return B(()=>{if(!e){r.current.position.set(0,0,0),r.current.rotation.set(0,0,0),r.current.scale.setScalar(1);return}const n=s.current,i=m.lerp(.78,1,n.focus),o=m.lerp(1,1.22,n.finish);r.current.scale.setScalar(i*o),r.current.position.y=m.lerp(-.08,.105,n.finish),r.current.rotation.y=m.lerp(.34,0,n.focus)},-3),p.jsx("group",{ref:r,children:t})}function bt({story:s,color:e}){const t=u.useRef(null),r=u.useRef(null),n=u.useRef(null),i=u.useMemo(()=>Ne(),[]),o=u.useMemo(()=>new Pe(1.42,.16,.62,5,.045),[]);return u.useEffect(()=>()=>{i.dispose(),o.dispose()},[i,o]),B(()=>{const a=1-s.current.solidFade;t.current.visible=a>.002,r.current.opacity=a*.84,n.current.opacity=a*.58}),p.jsxs("group",{ref:t,name:"macro-forming-pin",children:[p.jsx("mesh",{geometry:i,castShadow:!0,renderOrder:1,children:p.jsx("meshPhysicalMaterial",{ref:r,color:e,roughness:.2,metalness:0,transmission:.18,thickness:.34,ior:1.44,clearcoat:.38,clearcoatRoughness:.24,transparent:!0,opacity:.84,depthWrite:!1})}),p.jsx("mesh",{geometry:o,position:[0,-.81,0],castShadow:!0,renderOrder:0,children:p.jsx("meshPhysicalMaterial",{ref:n,color:e,roughness:.24,transmission:.12,transparent:!0,opacity:.58,depthWrite:!1})})]})}function Mt({story:s,color:e,opacity:t,glassFade:r=1,turnProgress:n,glass:i=!1,glassKind:o="frame"}){const a=u.useRef(null),l=u.useRef(null),c=u.useMemo(()=>Oe(),[]),f=c.length-1;return B(()=>{const d=s.current;if(a.current.rotation.z=Math.PI*d.flip,i){const v=n===void 0?d.flip:T(n);a.current.rotation.y=Math.PI*2*v}a.current.visible=d.trace>.001,l.current&&(l.current.geometry.instanceCount=Math.ceil(f*d.trace),l.current.material.opacity=d.trace*m.lerp(1,.58,d.finish)*m.clamp(T(t),0,1)*(i?1-X(d):1))}),p.jsxs("group",{ref:a,name:"profile-outline",visible:!1,children:[i&&p.jsx(Fe,{story:s,kind:o,opacity:t,bodyFade:r}),p.jsx(k,{ref:l,points:c,color:e,lineWidth:V,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1,renderOrder:10})]})}function Et({story:s,ring:e,color:t,opacity:r,glass:n=!1}){const i=u.useRef(null),o=u.useRef(null);B(()=>{const l=s.current,f=m.smoothstep(l.trace,e.at,Math.min(1,e.at+.12))*m.lerp(1,.58,l.finish)*m.clamp(T(r),0,1)*(n?1-X(l):1);i.current&&(i.current.material.opacity=f),o.current&&(o.current.material.opacity=f*(e.base?1:.8))});const a={color:t,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1,renderOrder:10};return p.jsxs(p.Fragment,{children:[p.jsx(k,{ref:i,points:e.near,lineWidth:V,...a}),e.base?p.jsx(k,{ref:o,points:e.far,lineWidth:V,...a}):p.jsx(k,{ref:o,points:e.far,lineWidth:V*.85,dashed:!0,dashSize:.026,gapSize:.018,...a})]})}function _t({story:s,color:e,opacity:t,glass:r=!1}){const n=u.useRef(null),i=u.useRef(null),o=u.useMemo(()=>Oe(),[]),a=u.useMemo(()=>Ve(),[]),l=o.length-1;return B(()=>{const c=s.current;n.current.rotation.z=Math.PI*c.flip,n.current.visible=c.trace>.001,i.current&&(i.current.geometry.instanceCount=Math.ceil(l*c.trace),i.current.material.opacity=c.trace*m.lerp(1,.58,c.finish)*m.clamp(T(t),0,1)*(r?1-X(c):1))}),p.jsx(p.Fragment,{children:p.jsxs("group",{ref:n,name:"profile-outline-sketch",visible:!1,children:[r&&p.jsx(Fe,{story:s,kind:"vessel",opacity:t,bodyFade:glassFade}),p.jsx(k,{ref:i,points:o,color:e,lineWidth:V,transparent:!0,opacity:0,depthTest:!1,depthWrite:!1,toneMapped:!1,renderOrder:10}),a.map((c,f)=>p.jsx(Et,{story:s,ring:c,color:e,opacity:t,glass:r},f))]})})}function At({story:s,count:e,seed:t,color:r}){const n=u.useRef(null),i=u.useMemo(()=>new Pe(j.cellSize,j.cellSize,j.cellSize,5,.032),[]),o=u.useMemo(()=>new Je({color:r,roughness:.2,metalness:0,transmission:.2,thickness:.18,ior:1.39,clearcoat:.44,clearcoatRoughness:.2,transparent:!0,opacity:.94}),[r]),a=u.useMemo(()=>ht(e,t),[e,t]),l=u.useMemo(()=>({matrix:new Ue,position:new g,quaternion:new $,scale:new g}),[]);return u.useLayoutEffect(()=>{if(!n.current)return;n.current.instanceMatrix.setUsage(Ze);const c=new D;for(let f=0;f<e;f+=1)c.set(r).offsetHSL((f%4-1.5)*.004,0,(f%5-2)*.012),n.current.setColorAt(f,c);n.current.instanceColor&&(n.current.instanceColor.needsUpdate=!0)},[r,e]),u.useEffect(()=>()=>{i.dispose(),o.dispose()},[i,o]),B(()=>{const c=s.current;if(n.current.visible=c.cells>.001,!!n.current.visible){for(let f=0;f<e;f+=1)mt(a[f],c.cells,c.aggregate,c.finish,l.position,l.quaternion,l.scale),l.matrix.compose(l.position,l.quaternion,l.scale),n.current.setMatrixAt(f,l.matrix);n.current.instanceMatrix.needsUpdate=!0}}),p.jsx("instancedMesh",{ref:n,name:"profile-stage-cells",args:[i,o,e],frustumCulled:!1,visible:!1,renderOrder:5})}function Lt({story:s,color:e}){const t=u.useRef(null),r=u.useRef(null);return B(()=>{const n=s.current.aggregate*.7+s.current.finish*.3;t.current.visible=n>.01,t.current.scale.setScalar(m.lerp(.86,1,n)),t.current.rotation.y=n*.16,r.current.opacity=n*.115}),p.jsxs("mesh",{ref:t,name:"glass-berry-envelope",position:j.spheroidCenter,visible:!1,renderOrder:4,children:[p.jsx("icosahedronGeometry",{args:[.275,4]}),p.jsx("meshPhysicalMaterial",{ref:r,color:e,roughness:.16,metalness:0,transmission:.72,thickness:.28,ior:1.37,clearcoat:.52,transparent:!0,opacity:0,depthWrite:!1,side:et})]})}function Ft({progress:s=0,position:e=[0,0,0],rotation:t=[0,0,0],scale:r=1,visible:n=!0,cellCount:i=18,seed:o=731,pinColor:a="#c7e1e8",lineColor:l="#15171a",cellColor:c="#ed83aa",showPin:f=!0,showOutline:d=!0,showCells:v=!0,showEnvelope:S=!0,framing:M=!0,outlineOpacity:E=1,glassFade:L=1,turnProgress:C,outlineStyle:I=gt(),onPhaseChange:h,..._}){const Ge=De(i),P=u.useRef(Me(T(s))),le=u.useRef(P.current.phase);return B(()=>{P.current=Me(T(s)),P.current.phase!==le.current&&(le.current=P.current.phase,h?.(P.current.phase,P.current))},-4),p.jsx("group",{..._,name:"profile-spheroid-stage",position:e,rotation:t,scale:r,visible:n,children:p.jsxs(xt,{story:P,enabled:M,children:[f&&p.jsx(bt,{story:P,color:a}),d&&(I==="sketch"?p.jsx(_t,{story:P,color:l,opacity:E}):p.jsx(Mt,{story:P,color:l,opacity:E,glassFade:L,turnProgress:C,glass:I.endsWith("-glass"),glassKind:I==="sketch-glass"?"vessel":"frame"})),v&&p.jsx(At,{story:P,count:Ge,seed:o,color:c}),S&&p.jsx(Lt,{story:P,color:c})]})})}export{It as A,Ft as P,Tt as a,Dt as f};
