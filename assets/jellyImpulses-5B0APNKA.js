import{a as C}from"./BufferGeometryUtils-BHgOX4qu.js";import{V as y,aw as I,S as P,c as A,n as _,ax as F,au as R,ay as z,M as E,d as N}from"./three.core-CjW0feT3.js";import{r as S,j as c,v as D}from"./index-7jk--PEB.js";import{u as U,E as B,L as b}from"./usePageField-C5jVh2rI.js";import{u as L,a as k}from"./constants-wssvzRQC.js";function j(e,o,n){const a=Math.PI*(3-Math.sqrt(5));for(let t=0;t<e;t+=1){const r=e===1?0:1-t/(e-1)*2,i=Math.sqrt(Math.max(0,1-r*r)),s=a*t;n.push(new y(Math.cos(s)*i,r,Math.sin(s)*i).multiplyScalar(o))}}function X(){const e=[];return j(48,.72,e),j(14,.36,e),e.push(new y),{centers:e,radii:e.map(()=>.32),k:16}}function V(e,o){const n=C(new I(1,e)),a=n.attributes.position,t=new y,r=[];let i=0;for(let s=0;s<a.count;s+=1){t.fromBufferAttribute(a,s).normalize(),r.length=0;let m=-1/0;for(let f=0;f<o.centers.length;f+=1){const w=o.centers[f],g=o.radii[f],v=w.dot(t),l=v*v-(w.lengthSq()-g*g);if(l<0)continue;const x=v+Math.sqrt(l);r.push(x),m=Math.max(m,x)}if(!r.length){a.setXYZ(s,t.x*.2,t.y*.2,t.z*.2);continue}let p=0;for(const f of r)p+=Math.exp(o.k*(f-m));const d=m+Math.log(p)/o.k;i=Math.max(i,d),a.setXYZ(s,t.x*d,t.y*d,t.z*d)}return n.scale(1/i,1/i,1/i),n.computeVertexNormals(),n.attributes.position.needsUpdate=!0,{geometry:n,scale:1/i}}const h=8,K=`
#define IMP_MAX ${h}

uniform vec3  uImpPos[IMP_MAX];
uniform float uImpAge[IMP_MAX];
uniform float uImpStr[IMP_MAX];

uniform float uJelly;       // interaction strength (radial amplitude)
uniform float uDamping;     // exp(-uDamping * age)
uniform float uWaveSpeed;   // how fast the front travels across the surface
uniform float uWaveFreq;    // spatial frequency of the wobble
uniform float uWaveOmega;   // temporal frequency of the wobble
uniform float uRingTight;   // width of the travelling band
uniform float uLife;        // age past which a slot contributes nothing
uniform float uMaxAmp;      // hard clamp -- the restraint guard
uniform float uNormalK;     // how hard the gradient bends the normal

float jellyImpulses(vec3 p) {
  float total = 0.0;
  for (int i = 0; i < IMP_MAX; i++) {
    float age = uImpAge[i];
    if (age > uLife) continue;          // spent slots cost nothing
    float dist  = length(p - uImpPos[i]);
    float shell = dist - age * uWaveSpeed;
    float ring  = exp(-uRingTight * shell * shell);
    float osc   = cos(dist * uWaveFreq - age * uWaveOmega);
    float decay = exp(-uDamping * age);
    total += osc * ring * decay * uImpStr[i];
  }
  return total;
}

float jellyAt(vec3 p) {
  return clamp(uJelly * jellyImpulses(p), -uMaxAmp, uMaxAmp);
}

/**
 * The normal of the BASE body is passed in rather than assumed to be
 * normalize(p): the baked membrane is a cluster of cells, not a sphere, and
 * pushing its vertices radially instead of along their own normal would shear
 * the lobes.
 */
vec3 jellyPos(vec3 p, vec3 n) {
  return p + n * jellyAt(p);
}

/**
 * Analytic normal: central differences of the same field on three axes, then
 * bend the base normal against the gradient. Without this the wobble reads as a
 * silhouette wiggle; with it the light follows the surface and it reads as soft
 * material.
 */
vec3 jellyNormal(vec3 p, vec3 n) {
  const float E = 0.035;
  float dx = jellyAt(p + vec3(E, 0.0, 0.0)) - jellyAt(p - vec3(E, 0.0, 0.0));
  float dy = jellyAt(p + vec3(0.0, E, 0.0)) - jellyAt(p - vec3(0.0, E, 0.0));
  float dz = jellyAt(p + vec3(0.0, 0.0, E)) - jellyAt(p - vec3(0.0, 0.0, E));
  vec3 grad = vec3(dx, dy, dz) * (1.0 / (2.0 * E));
  return normalize(n - grad * uNormalK);
}
`,u=Object.freeze({jelly:.0275,damping:2.2,waveSpeed:1.15,waveFreq:8,waveOmega:10,ringTight:7,life:3.4,maxAmp:.09,normalK:.7});function Y(){const e=U(),{gl:o}=L(),n=S.useMemo(()=>new P({uniforms:{uField:{value:e},uFrame:{value:new _},uSize:{value:new A}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.9999, 1.0);
      }
    `,fragmentShader:`
      uniform sampler2D uField;
      uniform vec4 uFrame;
      uniform vec2 uSize;
      varying vec2 vUv;
      void main() {
        vec2 pixel = vec2(vUv.x, 1.0 - vUv.y) * uSize;
        vec2 imageUv = (pixel - uFrame.xy) / uFrame.zw;
        imageUv.y = 1.0 - imageUv.y;
        gl_FragColor = vec4(texture2D(uField, imageUv).rgb, 1.0);
        #include <colorspace_fragment>
      }
    `,depthTest:!1,depthWrite:!1,toneMapped:!1}),[e]);return k(()=>{const a=o.domElement.getBoundingClientRect(),t=D(e.image,a);n.uniforms.uFrame.value.set(t.x,t.y,t.width,t.height),n.uniforms.uSize.value.set(a.width,a.height)},-30),S.useEffect(()=>()=>n.dispose(),[n]),c.jsxs("mesh",{frustumCulled:!1,renderOrder:-1e3,children:[c.jsx("planeGeometry",{args:[2,2]}),c.jsx("primitive",{object:n,attach:"material"})]})}function $(){return c.jsxs(B,{resolution:64,frames:1,children:[c.jsx("color",{attach:"background",args:["#e6e4e0"]}),c.jsx(b,{intensity:.85,position:[0,5,1],rotation:[Math.PI/2,0,0],scale:[9,5,1]}),c.jsx(b,{intensity:.5,position:[4.5,.5,1.5],rotation:[0,-Math.PI/2,0],scale:[6,5,1],color:"#eef1f2"}),c.jsx(b,{intensity:3.2,position:[1.4,2.4,3],rotation:[Math.PI/3,0,.4],scale:[.28,4,1]}),c.jsx(b,{intensity:.28,position:[0,-4,1],rotation:[-Math.PI/2,0,0],scale:[9,5,1],color:"#e4dfda"}),c.jsx(b,{intensity:.22,position:[-3,0,-2],rotation:[0,.8,0],scale:[2,7,1],color:"#173039"})]})}function G(e,o){if(!e||e.userData.cellRounding)return;const n=e.onBeforeCompile,a=e.customProgramCacheKey?.bind(e);e.onBeforeCompile=(t,r)=>{n?.call(e,t,r),t.uniforms.uCellRound=o,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform float uCellRound;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
objectNormal = normalize(mix(objectNormal, normalize(position), uCellRound));`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed = mix(transformed, normalize(position) * 0.5, uCellRound);`)},e.customProgramCacheKey=()=>`${a?.()??""}|rounded-cell-v1`,e.userData.cellRounding=!0,e.needsUpdate=!0}function Z(e,o){if(!e||e.userData.berryFusion)return;const n=e.onBeforeCompile,a=e.customProgramCacheKey?.bind(e);e.onBeforeCompile=(t,r)=>{n?.call(e,t,r),t.uniforms.uFusion=o,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform float uFusion;
attribute vec3 aContactPosition;
attribute vec3 aContactNormal;`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
objectNormal = normalize(mix(aContactNormal, objectNormal, uFusion));`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed = mix(aContactPosition, transformed, uFusion);`),t.fragmentShader=t.fragmentShader.replace("float thickness_smear = thickness *","float thickness_smear = .20 * thickness *")},e.customProgramCacheKey=()=>`${a?.()??""}|glass-berry-fusion-v1`,e.userData.berryFusion=!0,e.needsUpdate=!0}function H(e,o){if(!e||e.userData.berryJelly)return;const n=e.onBeforeCompile,a=e.customProgramCacheKey?.bind(e);e.onBeforeCompile=(t,r)=>{n?.call(e,t,r),Object.assign(t.uniforms,o),t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
${K}`).replace("#include <beginnormal_vertex>",`#include <beginnormal_vertex>
objectNormal = jellyNormal(position, normalize(normal));`).replace("#include <begin_vertex>",`#include <begin_vertex>
transformed = jellyPos(position, normalize(normal));`)},e.customProgramCacheKey=()=>`${a?.()??""}|glass-berry-jelly-v1`,e.userData.berryJelly=!0,e.needsUpdate=!0}function Q(e){return{uImpPos:{value:e.positions},uImpAge:{value:e.ages},uImpStr:{value:e.strengths},uJelly:{value:u.jelly},uDamping:{value:u.damping},uWaveSpeed:{value:u.waveSpeed},uWaveFreq:{value:u.waveFreq},uWaveOmega:{value:u.waveOmega},uRingTight:{value:u.ringTight},uLife:{value:u.life},uMaxAmp:{value:u.maxAmp},uNormalK:{value:u.normalK}}}const ee={transmissionSampler:!0,transmission:1,color:"#fff7fb",attenuationColor:"#e66d9f",attenuationDistance:1.35,roughness:.028,ior:1.47,clearcoat:.72,clearcoatRoughness:.055,chromaticAberration:.002,anisotropicBlur:.035,distortion:0,temporalDistortion:0,envMapIntensity:.9,backside:!1,resolution:256,samples:4,transparent:!1},te={transmissionSampler:!0,transmission:1,color:"#f4f7f6",attenuationColor:"#d92f86",attenuationDistance:3,roughness:.035,ior:1.52,clearcoat:1,clearcoatRoughness:.06,chromaticAberration:.025,anisotropicBlur:.06,distortion:0,temporalDistortion:0,envMapIntensity:1,backside:!1,resolution:16,backsideResolution:16,samples:4,transparent:!1};function oe(){const e=Array.from({length:h},()=>new y),o=new Float32Array(h).fill(99),n=new Float32Array(h);return{positions:e,ages:o,strengths:n,spawn(a,t){let r=0,i=-1;for(let s=0;s<h;s+=1)o[s]>i&&(i=o[s],r=s);e[r].copy(a),o[r]=0,n[r]=t},advance(a){for(let t=0;t<h;t+=1)o[t]+=a},alive(){let a=0;for(let t=0;t<h;t+=1)o[t]<=u.life&&(a+=1);return a},reset(){o.fill(99),n.fill(0)}}}function ne(e){const o=new A,n=new F,a=new R(new y,1.02),t=new z,r=new E,i=new y,s=new y;let m=!1,p=!1,d=-1/0;const f=45,w=.045;return{track(g,v){const l=v.getBoundingClientRect();!l.width||!l.height||(o.set((g.clientX-l.left)/l.width*2-1,-((g.clientY-l.top)/l.height)*2+1),m=!0)},forget(){m=!1,p=!1},update(g,v,l){if(!m)return!1;if(m=!1,n.setFromCamera(o,g),r.copy(v.matrixWorld).invert(),t.copy(n.ray).applyMatrix4(r),t.direction.normalize(),!t.intersectSphere(a,i))return p=!1,!1;if(i.normalize(),l-d<f)return!1;let x=1;if(p){const M=i.distanceTo(s);if(M<w)return!1;x=N.clamp(.45+M*14,.35,1.6)}return e.spawn(i,x),d=l,s.copy(i),p=!0,!0}}}export{te as B,ee as C,Y as N,$ as S,V as a,X as b,oe as c,ne as d,Q as e,Z as f,H as g,G as i};
