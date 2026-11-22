const l={p:0,invalidate:()=>{},subs:new Set,minFrameMs:0,_last:0,_pending:0,setFpsCap(t){this.minFrameMs=t>0?1e3/t:0},set(t){this.p=t;for(const e of this.subs)e(t);const a=performance.now(),s=this.minFrameMs-(a-this._last);if(s<=0){this._last=a,this.invalidate();return}this._pending||(this._pending=setTimeout(()=>{this._pending=0,this._last=performance.now(),this.invalidate()},s))},subscribe(t){return this.subs.add(t),t(this.p),()=>this.subs.delete(t)}},i="#fdfefe",o=.132,r={clear:{label:"CLEAR",title:"Бесцветное",swatch:"#ffffff",body:"#ffffff",attenuationColor:"#ffffff",attenuationDistance:1/0,thickness:o},ice:{label:"ICE",title:"Голубое",swatch:"#c9dcdf",body:"#c9dcdf",attenuationColor:"#e1edf0",attenuationDistance:3.2,thickness:o},emerald:{label:"EMERALD",title:"Изумрудное",swatch:"#1E5F55",attenuationColor:"#18ad88",attenuationDistance:.43,thickness:o},rose:{label:"ROSE",title:"Розовое",swatch:"#a85f6b",attenuationColor:"#e08196",attenuationDistance:.48,thickness:o},amber:{label:"AMBER",title:"Янтарное",swatch:"#8a6636",attenuationColor:"#d9a45e",attenuationDistance:.46,thickness:o}},c=["clear","ice","emerald","rose","amber"];function m(t,a,s="off"){const e=r[t];return{color:e.body??i,attenuationColor:e.attenuationColor,attenuationDistance:e.attenuationDistance,thickness:e.thickness,transmission:1,roughness:.025,ior:1.52,chromaticAberration:.012,anisotropicBlur:.04,distortion:0,temporalDistortion:0,samples:a.samples,resolution:a.resolution,backside:a.backside,backsideThickness:e.thickness*.5,backsideResolution:Math.round(a.resolution/2),clearcoat:.35,clearcoatRoughness:.06,envMapIntensity:.8,iridescence:s==="pearl"?.45:0,iridescenceIOR:1.33,iridescenceThicknessRange:[110,260],toneMapped:!0}}const d={color:"#dcd8d0",roughness:.85,metalness:0,envMapIntensity:1.5};function u(t,a){if(!t||t.userData.polishedOptics)return;const s=t.onBeforeCompile;t.onBeforeCompile=(e,n)=>{s.call(t,e,n),a&&Object.assign(e.uniforms,a),e.vertexShader=`varying vec3 vMasterLocal;
varying vec3 vMasterLocalNormal;
`+e.vertexShader,e.vertexShader=e.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
 vMasterLocal = position;
 vMasterLocalNormal = normal;`),e.fragmentShader=`varying vec3 vMasterLocal;
      varying vec3 vMasterLocalNormal;
      uniform float uAuraMode,uAuraTime;
      `+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace("#include <roughnessmap_fragment>",`
        #include <roughnessmap_fragment>
        float masterUnderside = (1.0 - smoothstep(0.001, 0.008, vMasterLocal.y))
          * smoothstep(0.65, 0.95, -normalize(vMasterLocalNormal).y);
        roughnessFactor = mix(roughnessFactor, 0.30, masterUnderside);
      `).replaceAll("material.transmission = _transmission;","material.transmission = _transmission * mix(1.0, 0.04, masterUnderside);"),e.fragmentShader=e.fragmentShader.replace("float thickness_smear = thickness *","float thickness_smear = 0.12 * thickness *").replace("material.thickness = thickness;",`
        // Solid chord, not a thin shell: each pin's diameter follows its STEP
        // profile. The bar keeps its larger crossing. Bounded approximation;
        // no mesh displacement, normal edits or changes to Snell/Fresnel.
        float h = max(0.0, vMasterLocal.y - 0.1507024);
        float diameter = 0.076628;
        diameter = mix(diameter, 0.051086, smoothstep(0.084291,0.102171,h));
        diameter = mix(diameter, 0.024266, smoothstep(0.114943,0.127714,h));
        diameter = mix(diameter, 0.005108, smoothstep(0.130907,0.142401,h));
        float facing = abs(dot(normalize(normal), normalize(vViewPosition)));
        float chord = diameter * mix(0.18, 1.0, facing);
        material.thickness = vMasterLocal.y > 0.151 ? chord : thickness;
      `),e.fragmentShader=e.fragmentShader.replace("#include <opaque_fragment>",`
      #include <opaque_fragment>
      // Local optical coating, inspired by Aura Silk / Shimmer. It follows
      // the real surface normal and CAD coordinates, never displaces a vertex
      // or changes the Beer/Snell/Fresnel calculation above. Artistic overlay.
      if(uAuraMode>.5){
        float edge=pow(1.-abs(dot(normalize(normal),normalize(vViewPosition))),2.1);
        float travel=sin(vMasterLocal.x*8.5-vMasterLocal.y*3.-uAuraTime*.34);
        float sweep=pow(max(0.,travel),22.);
        float folds=cos(vMasterLocal.x*49.+vMasterLocal.y*35.+sin(vMasterLocal.z*61.)-uAuraTime*.23);
        float caustic=pow(max(0.,folds),18.);
        float phase=.5+.5*cos(vMasterLocal.y*15.+edge*4.+uAuraTime*.08);
        vec3 teal=vec3(.085,.38,.30);
        vec3 pearl=vec3(.44,.38,.65);
        vec3 coat=mix(teal,pearl,phase*.9*step(1.5,uAuraMode));
        float strength=clamp(edge*.50+sweep*.62+caustic*.12*(1.-step(1.5,uAuraMode)),0.,.72);
        gl_FragColor.rgb=mix(gl_FragColor.rgb,coat,strength);
        gl_FragColor.rgb+=vec3(.10,.18,.15)*sweep*.32;
      }
    `)},t.customProgramCacheKey=()=>"masterform-polished-aura-v4-ground-underside",t.userData.polishedOptics=!0,t.userData.auraUniforms=a,t.needsUpdate=!0}export{d as C,c as T,m as g,u as i,l as s};
