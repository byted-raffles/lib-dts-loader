import { getCurrentRequest } from 'loader-utils';
// import { bundle } from 'dts-bundle';

async function loader(dtsIndexPath: string) {
  // write async loader code here
  return `export default '${dtsIndexPath}';`;
}

export default function (_source) {
  const callback = this.async();
  const parts = getCurrentRequest(this).split('!');
  loader(parts[parts.length - 1]).then(code => callback(null, code));
}
