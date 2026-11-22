import{r as o,j as C}from"./index-7jk--PEB.js";import{u as x}from"./MeshTransmissionMaterial-Dc9KzKlo.js";import{a as L,e as V}from"./constants-wssvzRQC.js";import{S as E,aK as z,aG as m,as as A,G as N,m as P}from"./three.core-CjW0feT3.js";class U extends N{constructor(n=12,r=!1){super(),this.uniforms={_transmission:{value:1},transmission:{value:0},transmissionMap:{value:null},roughness:{value:0},thickness:{value:0},thicknessMap:{value:null},attenuationDistance:{value:1/0},attenuationColor:{value:new P("white")},buffer:{value:null},spectralAbbe:{value:9.5},spectralRefraction:{value:.55}},this.onBeforeCompile=a=>{a.uniforms={...a.uniforms,...this.uniforms},r?a.defines.USE_SAMPLER="":a.defines.USE_TRANSMISSION="",a.fragmentShader=`
        uniform sampler2D buffer;
        uniform float spectralAbbe;
        uniform float spectralRefraction;

        float spectralIor(float lambda, float n_d, float V_d) {
          return max(n_d + (n_d - 1.0) / V_d * (523655.0 / (lambda * lambda) - 1.5168), 1.0);
        }

        float spectralLobe(float lambda, float mu, float s1, float s2) {
          float sigma = lambda < mu ? s1 : s2;
          float t = (lambda - mu) / sigma;
          return exp(-0.5 * t * t);
        }

        vec3 spectralCieXyz(float lambda) {
          float x =  0.362 * spectralLobe(lambda, 442.0, 16.0, 26.7)
                   + 1.056 * spectralLobe(lambda, 599.8, 37.9, 31.0)
                   - 0.065 * spectralLobe(lambda, 501.1, 20.4, 26.2);
          float y =  0.821 * spectralLobe(lambda, 568.8, 46.9, 40.5)
                   + 0.286 * spectralLobe(lambda, 530.9, 16.3, 31.1);
          float z =  1.217 * spectralLobe(lambda, 437.0, 11.8, 36.0)
                   + 0.681 * spectralLobe(lambda, 459.0, 26.0, 13.8);
          return vec3(x, y, z);
        }

        vec3 spectralXyzToLinearSrgb(vec3 xyz) {
          mat3 transform = mat3(
             3.2404542, -0.9692660,  0.0556434,
            -1.5371385,  1.8760108, -0.2040259,
            -0.4985314,  0.0415560,  1.0572252
          );
          return transform * xyz;
        }

        float spectralFresnel(float cosTheta, float ior) {
          float f0 = pow((ior - 1.0) / (ior + 1.0), 2.0);
          float k = 1.0 - clamp(cosTheta, 0.0, 1.0);
          return f0 + (1.0 - f0) * k * k * k * k * k;
        }
      `+a.fragmentShader,a.fragmentShader=a.fragmentShader.replace("#include <transmission_pars_fragment>",`
          #ifdef USE_TRANSMISSION
            uniform float _transmission;
            uniform float thickness;
            uniform float attenuationDistance;
            uniform vec3 attenuationColor;
            #ifdef USE_TRANSMISSIONMAP
              uniform sampler2D transmissionMap;
            #endif
            #ifdef USE_THICKNESSMAP
              uniform sampler2D thicknessMap;
            #endif
            uniform vec2 transmissionSamplerSize;
            uniform sampler2D transmissionSamplerMap;
            uniform mat4 modelMatrix;
            uniform mat4 projectionMatrix;
            varying vec3 vWorldPosition;

            vec3 getSpectralRay(
              const in vec3 n,
              const in vec3 v,
              const in float thicknessValue,
              const in float ior,
              const in vec3 modelScale
            ) {
              vec3 direction = refract(-v, n, 1.0 / ior);
              return normalize(direction) * thicknessValue * modelScale * spectralRefraction;
            }

            float spectralRoughness(const in float roughnessValue, const in float ior) {
              return roughnessValue * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
            }

            vec4 getSpectralBufferSample(const in vec2 coord, const in float roughnessValue, const in float ior) {
              float lod = log2(transmissionSamplerSize.x) * spectralRoughness(roughnessValue, ior);
              #ifdef USE_SAMPLER
                #ifdef texture2DLodEXT
                  return texture2DLodEXT(transmissionSamplerMap, coord, lod);
                #else
                  return texture2D(transmissionSamplerMap, coord, lod);
                #endif
              #else
                return texture2D(buffer, coord);
              #endif
            }

            vec3 getSpectralRefraction(
              const in vec3 n,
              const in vec3 v,
              const in float roughnessValue,
              const in vec3 diffuseColor,
              const in vec3 position,
              const in vec3 modelScale,
              const in vec3 attenuationCoefficient,
              const in mat4 viewMatrixValue,
              const in mat4 projectionMatrixValue,
              const in float ior,
              const in float thicknessValue,
              const in float attenuationDistanceValue
            ) {
              vec3 ray = getSpectralRay(n, v, thicknessValue, ior, modelScale);
              vec3 exitPosition = position + ray;
              vec4 ndc = projectionMatrixValue * viewMatrixValue * vec4(exitPosition, 1.0);
              vec2 coord = ndc.xy / ndc.w * 0.5 + 0.5;
              vec3 light = getSpectralBufferSample(coord, roughnessValue, ior).rgb;
              if (!isinf(attenuationDistanceValue)) {
                // Refraction strength is an art-direction control for the
                // screen-space displacement only. Absorption still sees the
                // full physical path, otherwise lowering the displacement also
                // bleaches the emerald into a grey pane.
                light *= exp(-attenuationCoefficient * length(ray) / max(spectralRefraction, 0.0001));
              }
              return light * diffuseColor;
            }
          #endif
        `),a.fragmentShader=a.fragmentShader.replace("#include <transmission_fragment>",`
          material.transmission = _transmission;
          material.transmissionAlpha = 1.0;
          material.thickness = thickness;
          material.attenuationDistance = attenuationDistance;
          material.attenuationColor = attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            material.transmission *= texture2D(transmissionMap, vUv).r;
          #endif
          #ifdef USE_THICKNESSMAP
            material.thickness *= texture2D(thicknessMap, vUv).g;
          #endif

          if (material.transmission != 0.0) {
            vec3 pos = vWorldPosition;
            vec3 viewDirection = normalize(cameraPosition - pos);
            vec3 worldNormal = inverseTransformDirection(normal, viewMatrix);
            vec3 modelScale = vec3(
              length(vec3(modelMatrix[0].xyz)),
              length(vec3(modelMatrix[1].xyz)),
              length(vec3(modelMatrix[2].xyz))
            );
            vec3 attenuationCoefficient = vec3(0.0);
            if (!isinf(material.attenuationDistance)) {
              attenuationCoefficient = -log(material.attenuationColor) / material.attenuationDistance;
            }

            float cosTheta = max(dot(viewDirection, worldNormal), 0.0);
            vec3 spectralLight = vec3(0.0);
            vec3 spectralWeight = vec3(0.0);
            for (float i = 0.0; i < ${n}.0; i++) {
              float progress = (i + 0.5) / float(${n});
              float lambda = mix(380.0, 700.0, progress);
              float wavelengthIor = spectralIor(lambda, material.ior, spectralAbbe);
              vec3 weight = max(spectralXyzToLinearSrgb(spectralCieXyz(lambda)), vec3(0.0));
              vec3 sampleLight = getSpectralRefraction(
                worldNormal,
                viewDirection,
                material.roughness,
                material.diffuseColor,
                pos,
                modelScale,
                attenuationCoefficient,
                viewMatrix,
                projectionMatrix,
                wavelengthIor,
                material.thickness,
                material.attenuationDistance
              );
              float fresnel = spectralFresnel(cosTheta, wavelengthIor);
              spectralLight += sampleLight * weight * (1.0 - fresnel);
              spectralWeight += weight;
            }

            vec3 reconstructed = spectralLight / max(spectralWeight, vec3(0.0001));
            totalDiffuse = mix(totalDiffuse, reconstructed, material.transmission);
          }
        `)};for(const a of Object.keys(this.uniforms))Object.defineProperty(this,a,{get:()=>this.uniforms[a].value,set:i=>{this.uniforms[a].value=i}})}}V({SpectralTransmissionMaterial:U});const F=o.forwardRef(function({buffer:n,transmissionSampler:r=!1,backside:a=!1,side:i=A,transmission:u=1,thickness:p=0,backsideThickness:b=0,backsideEnvMapIntensity:y=1,samples:k=12,resolution:d=512,backsideResolution:w,background:v,...D},R){const c=o.useRef(null),[f]=o.useState(()=>new E({vertexShader:"void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",fragmentShader:"void main(){ discard; }"})),g=n?1:d,h=n?1:w??d,S=x(h,h),s=x(g,g);return o.useEffect(()=>()=>f.dispose(),[f]),L(t=>{const e=c.current;if(!e||e.uniforms.buffer.value!==s.texture||r)return;const l=e.__r3f?.parent?.object;if(!l||!e.visible||e.uniforms._transmission.value===0)return;const T=t.gl.toneMapping,_=t.scene.background,I=e.envMapIntensity;t.gl.toneMapping=z,v&&(t.scene.background=v),l.material=f,a&&(t.gl.setRenderTarget(S),t.gl.render(t.scene,t.camera),l.material=e,e.uniforms.buffer.value=S.texture,e.uniforms.thickness.value=b,e.side=m,i!==m&&(e.needsUpdate=!0),e.envMapIntensity=y),t.gl.setRenderTarget(s),t.gl.render(t.scene,t.camera),l.material=e,e.uniforms.thickness.value=p,e.side=i,a&&i!==m&&(e.needsUpdate=!0),e.uniforms.buffer.value=s.texture,e.envMapIntensity=I,t.scene.background=_,t.gl.setRenderTarget(null),t.gl.toneMapping=T}),o.useImperativeHandle(R,()=>c.current,[]),C.jsx("spectralTransmissionMaterial",{args:[k,r],ref:c,...D,buffer:n||s.texture,_transmission:u,transmission:r?u:0,thickness:p,side:i})});export{F as S};
