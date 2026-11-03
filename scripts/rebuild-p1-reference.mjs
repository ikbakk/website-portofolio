/**
 * Reconstruct the original P1 Normal master PNG from two exact binary git blobs.
 * No images are compressed or regenerated. Node builtins only.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
const root=process.cwd();
const base=join(root,'docs/design/references');
const sources=[
  join(base,'.source/01-normal-master.part-01.bin'),
  join(base,'.source/01-normal-master.part-02.bin')
];
const output=Buffer.concat(sources.map(p=>readFileSync(p)));
const hash=b=>createHash('sha256').update(b).digest('hex');
const expected='64c5116914745e6b3677f0ada5bc238a221afd2e963fdf59f5dc07c91a7fdc57';
if(output.length!==4124397||hash(output)!==expected){
  throw Error('Frozen Normal PNG reconstruction hash mismatch');
}
const dest=join(base,'01-normal-master.png');
if(existsSync(dest)){
  if(hash(readFileSync(dest))!==expected)throw Error('Existing Normal PNG differs from approved original');
  console.log('Normal original already present and verified.');
}else{
  writeFileSync(dest,output);
  console.log('Exact Normal original PNG restored.');
}
for(const [name,expectedHash] of [
  ['02-cryo-variant.png','015d742ea2d4297eaaf2db61ac476e941f467cac0ca4adb9186f0c19ca8109bd'],
  ['03-electro-variant.png','2811e80e892d132647fc2b544d7a6af74cd510baef5254a02367f8707e01a841'],
]){
  if(hash(readFileSync(join(base,name)))!==expectedHash)throw Error(name+' SHA256 mismatch');
  console.log(name+' SHA256 verified.');
}