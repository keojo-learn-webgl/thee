varying float vNoise;
varying vec2 vUv;

uniform sampler2D oceanTexture;


void main() {
  // NOTE: why do i have to pass an alpha to see something different
  gl_FragColor = vec4(vec3(vNoise),1.);
}