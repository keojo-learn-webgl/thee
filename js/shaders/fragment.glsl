varying float vNoise;
varying vec2 vUv;

uniform sampler2D oceanTexture;


void main() {
  vec3 color2 = vec3(1.0,0.,0.);
  vec3 color1 = vec3(0.,0.,1.);
  vec3 final = mix(color1,color2, (vNoise + 1.)*0.5);

  vec2 newUv = vUv;

  newUv = vec2(newUv.x, newUv.y + vUv.x);

  vec4 oceanView = texture2D(oceanTexture, newUv);

  gl_FragColor = oceanView;
}