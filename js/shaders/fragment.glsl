varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D oceanTexture;


void main() {
  vec2 newUV = vUv;
  vec4 image = texture2D(uImage, newUV);
  
  gl_FragColor = vec4(vNoise,0.,0.,1.);
}