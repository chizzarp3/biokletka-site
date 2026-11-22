import{r as n,j as d}from"./index-7jk--PEB.js";import{C as A,u as _}from"./usePageField-C5jVh2rI.js";import{S as F,e as H,u as G,M as U,D as Q,a as K,b as J,O as X,L as Y}from"./OpticalScene-BAwpDhtc.js";import{D as T,a as Z,R as $,H as ee,L as te,N as oe,M as B,b as re,V as ae,S as ne,c as ie,d as W}from"./three.core-CjW0feT3.js";import{u as se,a as le}from"./constants-wssvzRQC.js";import"./BufferGeometryUtils-BHgOX4qu.js";import"./SpectralTransmissionMaterial-B3xkcI-T.js";import"./MeshTransmissionMaterial-Dc9KzKlo.js";function q(t,s,o){let c=!1,f=1/0;for(let m=0,a=o.length-1;m<o.length;a=m++){const e=o[m],u=o[a],r=u.x-e.x,i=u.y-e.y,l=Math.max(0,Math.min(1,((t-e.x)*r+(s-e.y)*i)/(r*r+i*i||1)));f=Math.min(f,(t-e.x-l*r)**2+(s-e.y-l*i)**2),e.y>s!=u.y>s&&t<(u.x-e.x)*(s-e.y)/(u.y-e.y)+e.x&&(c=!c)}return Math.sqrt(f)*(c?-1:1)}function ce(){const t={shell:[],core:[]};for(const a of new F().parse(H).paths){const e=a.userData.style.fill.toLowerCase()==="#1e5f55";for(const u of F.createShapes(a)){const{shape:r,holes:i}=u.extractPoints(1),l=[r,...i].map(v=>v.map(x=>{const g=e?176+(x.x-176)*.84*.9:x.x,h=e?148+(x.y-148)*.84*.9:x.y;return{x:(g-168)/341.2,y:(h-160)/341.2}}));t[e?"core":"shell"].push(l)}}const s=(a,e,u)=>Math.min(...u.map(([r,...i])=>{let l=q(a,e,r);for(const v of i)l=Math.max(l,-q(a,e,v));return l})),o=512,c=1.5,f=new Uint16Array(o*o*4);for(let a=0;a<o;a++)for(let e=0;e<o;e++){const u=((e+.5)/o-.5)*c,r=((a+.5)/o-.5)*c,i=(a*o+e)*4;f[i]=T.toHalfFloat(s(u,r,t.shell)),f[i+1]=T.toHalfFloat(s(u,r,t.core)),f[i+3]=T.toHalfFloat(1)}const m=new Z(f,o,o,$,ee);return m.minFilter=m.magFilter=te,m.generateMipmaps=!1,m.needsUpdate=!0,m}const ue=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`,de=`
precision highp float;
uniform sampler2D uShape;
uniform sampler2D uBackdrop;
uniform mat4 uCameraToLocal;
uniform mat3 uLocalToWorld;
uniform mat4 uModel;
uniform mat4 uViewProjection;
uniform vec2 uLens;
uniform float uTime;
uniform float uProgress;
uniform float uOpacity;
varying vec2 vUv;

float ease(float a, float b, float x) { return smoothstep(a, b, x); }
float unionSoft(float a, float b, float k) {
  float h = clamp(.5 + .5 * (b - a) / k, 0., 1.);
  return mix(b, a, h) - k * h * (1. - h);
}
float ellipsoid(vec3 p, vec3 r) {
  float k0 = length(p / r), k1 = length(p / (r * r));
  return k0 * (k0 - 1.) / max(k1, .00001);
}
float extrude(float d, float z, float halfDepth, float bevel) {
  vec2 w = vec2(d, abs(z) - halfDepth);
  return min(max(w.x, w.y), 0.) + length(max(w, 0.)) - bevel;
}
vec2 mark(vec3 p) {
  vec2 field = texture2D(uShape, p.xy / 1.5 + .5).rg;
  return vec2(extrude(field.r, p.z, .0381, .00762), extrude(field.g, p.z, .0264, .003));
}
float sceneDistance(vec3 p) {
  float settle = ease(.20, .83, uProgress);
  float flow = 1. - ease(.34, .88, uProgress);
  float time = uTime * .83;
  vec3 q = p;
  q.x += flow * (.038 * sin(p.y * 10. + time * 1.2) + .024 * sin(p.z * 15. - time));
  q.y += flow * (.040 * sin(p.x * 8. - time) + .026 * cos(p.z * 12. + time * .9));
  q.z += flow * (.060 * sin(p.y * 7. + p.x * 6. + time) + .035 * cos(p.x * 11. - time));

  float body = ellipsoid(q - vec3(-.015, .015, 0.), vec3(.46, .44, .25));
  float lobe = ellipsoid(q - vec3(-.26, -.20, .075), vec3(.205, .26, .23));
  body = unionSoft(body, lobe, .16);
  lobe = ellipsoid(q - vec3(.25, .23, -.035), vec3(.24, .23, .22));
  body = unionSoft(body, lobe, .14);
  // A moving concavity folds the fluid into a thick, translucent membrane.
  float hollow = length(q - vec3(.10 + .045 * sin(time), -.025, -.28)) - .30;
  body = max(body, -hollow);
  vec2 logo = mark(q);
  float solid = min(logo.x, logo.y);
  float d = mix(body, solid, settle);

  float drops = 1. - ease(.25, .65, uProgress);
  if (drops > .001) {
    for (int i = 0; i < 4; i++) {
      float f = float(i), a = f * 2.399 + time * .12;
      vec3 centre = vec3(cos(a) * (.57 + .025 * sin(time + f)), sin(a) * .53, sin(a * 1.8) * .13);
      float drop = length(p - centre) - (.017 + .009 * sin(f * 3. + 1.)) * drops;
      d = unionSoft(d, drop, .045 * drops + .001);
    }
  }
  return d;
}
vec3 normalAt(vec3 p) {
  vec2 e = vec2(.0015, 0.);
  return normalize(vec3(sceneDistance(p + e.xyy) - sceneDistance(p - e.xyy), sceneDistance(p + e.yxy) - sceneDistance(p - e.yxy), sceneDistance(p + e.yyx) - sceneDistance(p - e.yyx)));
}
// Broad studio windows, a narrow softbox and the dark room between them.
// No coloured spectral fringes: the water stays clear against the page field.
vec3 studio(vec3 r) {
  vec3 col = mix(vec3(.09, .13, .18), vec3(.43, .50, .58), smoothstep(-.65, .8, r.y));
  float windowA = exp(-pow((r.x + .42) / .28, 4.) - pow((r.y - .4) / .72, 4.));
  float windowB = exp(-pow((r.x - .55) / .095, 2.) - pow((r.y - .18) / .70, 6.));
  float ceiling = pow(max(0., dot(r, normalize(vec3(.1, .9, .35)))), 24.);
  col = mix(col, vec3(.99, .995, 1.), clamp(windowA * .9 + windowB + ceiling * .8, 0., 1.));
  float dark = exp(-pow((r.x + .1) / .13, 2.) - pow((r.y + .1) / .8, 4.));
  return mix(col, vec3(.022, .035, .055), dark * .88);
}
void main() {
  vec2 screen = vUv * 2. - 1.;
  vec3 ro = (uCameraToLocal * vec4(0., 0., 0., 1.)).xyz;
  vec3 rd = normalize((uCameraToLocal * vec4(screen * uLens, -1., 0.)).xyz);
  vec3 inv = 1. / rd;
  vec3 nearBox = (-vec3(.75, .75, .60) - ro) * inv;
  vec3 farBox = (vec3(.75, .75, .60) - ro) * inv;
  float start = max(max(min(nearBox.x, farBox.x), min(nearBox.y, farBox.y)), min(nearBox.z, farBox.z));
  float end = min(min(max(nearBox.x, farBox.x), max(nearBox.y, farBox.y)), max(nearBox.z, farBox.z));
  if (end < max(start, 0.)) discard;
  float travel = max(start, 0.);
  bool hit = false;
  vec3 p;
  for (int i = 0; i < LIQUID_STEPS; i++) {
    p = ro + travel * rd;
    float d = sceneDistance(p);
    if (d < .0011) { hit = true; break; }
    travel += max(d * .62, .0007);
    if (travel > end) break;
  }
  if (!hit) discard;
  vec3 n = normalAt(p);
  vec3 worldNormal = normalize(uLocalToWorld * n);
  vec3 worldRay = normalize(uLocalToWorld * rd);
  float facing = clamp(dot(-rd, n), 0., 1.);
  float fresnel = .025 + .975 * pow(1. - facing, 4.);
  float fluid = 1. - ease(.50, .91, uProgress);
  // Trace the entry and exit of the fluid volume. The background sample is
  // the actual ray/word-plane intersection, so type folds through the water.
  float ior = mix(1.49, 1.36, fluid);
  vec3 insideRay = refract(rd, n, 1. / ior);
  vec3 exitPoint = p + insideRay * .007;
  float depth = .007;
  for (int j = 0; j < 24; j++) {
    float d = sceneDistance(exitPoint);
    if (d > .0005) break;
    float stepSize = clamp(abs(d) * .8, .003, .07);
    depth += stepSize;
    exitPoint += insideRay * stepSize;
  }
  vec3 exitNormal = normalAt(exitPoint);
  vec3 outRay = refract(insideRay, -exitNormal, ior);
  float internal = 1. - step(.001, length(outRay));
  outRay = normalize(mix(outRay, rd, internal));
  vec3 exitWorld = (uModel * vec4(exitPoint, 1.)).xyz;
  vec3 outWorld = normalize(mat3(uModel) * outRay);
  float toPlane = max(0., -exitWorld.z / min(outWorld.z, -.015));
  vec4 projected = uViewProjection * vec4(exitWorld + outWorld * toPlane, 1.);
  vec2 refractedUV = clamp(projected.xy / projected.w * .5 + .5, vec2(.001), vec2(.999));
  vec3 through = texture2D(uBackdrop, refractedUV).rgb;
  through *= exp(-vec3(.10, .065, .035) * depth);
  vec3 reflection = studio(reflect(worldRay, worldNormal));
  vec3 col = mix(through, reflection, clamp(.16 + .76 * fresnel + internal * .22, 0., .94));
  float rim = pow(1. - facing, 9.);
  col += vec3(.06, .072, .09) * rim;
  vec2 logo = mark(p);
  float core = (1. - smoothstep(-.003, .005, logo.y - logo.x)) * ease(.67, .91, uProgress);
  col *= mix(vec3(1.), vec3(.31, .72, .58), core * .88);
  gl_FragColor = vec4(col, uOpacity);
  #include <colorspace_fragment>
}
`,N=5.2,fe=(t,s,o)=>{const c=Math.max(0,Math.min(1,(o-t)/(s-t)));return c*c*(3-2*c)};function me({layout:t,host:s,quality:o,backdrop:c,onReady:f,onFailure:m,visible:a,reduced:e,replay:u}){const r=n.useRef(null),i=n.useRef(null),l=n.useRef(0),v=n.useRef(!0),x=n.useRef(!1),g=n.useRef({onReady:f,onFailure:m});g.current={onReady:f,onFailure:m};const{camera:h,viewport:I,gl:P,invalidate:b}=se(),M=n.useMemo(ce,[]),k=n.useMemo(()=>new B,[]),S=n.useMemo(()=>new re,[]),z=I.getCurrentViewport(h,new ae(0,0,1.85)),O=t.object.width/t.width*z.width*.96,V=[(t.object.x/t.width-.5)*z.width,(.5-t.object.y/t.height)*z.height,1.85],j=NaN,y=n.useMemo(()=>new ne({defines:{LIQUID_STEPS:o===U?76:96},uniforms:{uShape:{value:M},uBackdrop:{value:c},uCameraToLocal:{value:k},uLocalToWorld:{value:S},uModel:{value:new B},uViewProjection:{value:new B},uLens:{value:new ie},uTime:{value:0},uProgress:{value:0},uOpacity:{value:1}},vertexShader:ue,fragmentShader:de,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),[M,c,k,S,o]);return n.useEffect(()=>()=>y.dispose(),[y]),n.useEffect(()=>()=>M.dispose(),[M]),n.useEffect(()=>{l.current=0,v.current=!0,b()},[u,b]),n.useEffect(()=>{v.current=!0,a&&b()},[a,b]),n.useEffect(()=>{const D=P.domElement,L=p=>{p.preventDefault(),g.current.onFailure()};return D.addEventListener("webglcontextlost",L),()=>D.removeEventListener("webglcontextlost",L)},[P]),le((D,L)=>{if(!a||!r.current)return;v.current?v.current=!1:l.current+=Math.min(L,.1);const p=e?1:Number.isFinite(j)?W.clamp(j,0,1):Math.min(1,l.current/N),C=Number.isFinite(j)?p*N:l.current;r.current.updateWorldMatrix(!0,!0);let w;if(r.current.traverse(E=>{!w&&E.isMesh&&(w=E)}),!w)return;k.copy(w.matrixWorld).invert().multiply(h.matrixWorld),S.getNormalMatrix(w.matrixWorld),y.uniforms.uModel.value.copy(w.matrixWorld),y.uniforms.uViewProjection.value.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse);const R=Math.tan(W.degToRad(h.fov/2));y.uniforms.uLens.value.set(R*h.aspect,R),y.uniforms.uTime.value=C,y.uniforms.uProgress.value=p,y.uniforms.uOpacity.value=1-fe(.89,1,p),r.current.visible=p>=.88,i.current.visible=p<1,s.current.dataset.liquidProgress=p.toFixed(3),s.current.dataset.liquidPhase=p<.2?"fluid":p<.88?"forming":p<1?"settling":"complete",P.domElement.dataset.material="liquid-to-spectral-emblem",x.current||(x.current=!0,queueMicrotask(()=>g.current.onReady())),p<1&&!Number.isFinite(j)&&b()}),d.jsxs(d.Fragment,{children:[d.jsx("group",{ref:r,position:V,rotation:[0,0,-.065],children:d.jsx(Y,{quality:o,core:"flat",level:"dark",reduced:!0,coreMotion:!1,opticalMode:"spectral",scale:O,buffer:c})}),d.jsxs("mesh",{ref:i,frustumCulled:!1,renderOrder:1e3,children:[d.jsx("planeGeometry",{args:[2,2]}),d.jsx("primitive",{object:y,attach:"material"})]})]})}function pe(t){const s=_(),o=K(t.layout,t.host,s.image);return d.jsxs(d.Fragment,{children:[d.jsx(J,{}),d.jsx(X,{texture:o}),d.jsx(me,{...t,backdrop:o})]})}function je({host:t,onReady:s,onFailure:o,replay:c=0}){const f=G(t),[m,a]=n.useState(!document.hidden),[e,u]=n.useState(()=>matchMedia("(prefers-reduced-motion:reduce)").matches);if(n.useEffect(()=>{let i=!0;const l=()=>a(i&&!document.hidden),v=new IntersectionObserver(([h])=>{i=h.isIntersecting,l()});v.observe(t.current),document.addEventListener("visibilitychange",l);const x=matchMedia("(prefers-reduced-motion:reduce)"),g=()=>u(x.matches);return x.addEventListener("change",g),()=>{v.disconnect(),document.removeEventListener("visibilitychange",l),x.removeEventListener("change",g)}},[t]),!f)return null;const r=f.width<=700?U:Q;return d.jsxs(A,{frameloop:m?"demand":"never",dpr:[1,r.dpr],camera:{position:[0,0,6],fov:35,near:.1,far:40},gl:{antialias:!0,alpha:!1,powerPreference:"high-performance",toneMapping:oe,toneMappingExposure:1.05},children:[d.jsx("color",{attach:"background",args:["#cdd8e7"]}),d.jsx(n.Suspense,{fallback:null,children:d.jsx(pe,{layout:f,host:t,quality:r,onReady:s,onFailure:o,visible:m,reduced:e,replay:c})})]})}export{N as LIQUID_DURATION,je as default};
