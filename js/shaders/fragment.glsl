varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;
uniform sampler2D oceanTexture;

void main() {
  vec2 newUV = vUv;
  vec4 image = texture2D(uImage, newUV);

  //gl_FragColor = vec4(vNoise,0.,0.,1.);
  gl_FragColor = image;
  gl_FragColor.rgb += 0.03 * vec3(vNoise);
}