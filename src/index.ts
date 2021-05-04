import { getCurrentRequest } from 'loader-utils';
// import { bundle } from 'dts-bundle';

export default function loader(_source) {
  const parts = getCurrentRequest(this).split('!');
  return `export default '${parts[parts.length - 1]}';`;
}
