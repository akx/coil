import Module from '../Module';
import Context from '../../universe/Context';
export default {
  variables: [
    { group: 'Document', name: 'width', default: '800' },
    { group: 'Document', name: 'height', default: '800' },
    { group: 'Document', name: 'background', default: '', type: 'color' },
  ],
  acceptsChildren: false,
  noUniversalVariables: true,

  render(context: Context) {
    throw new Error('Document.render() should not be called');
  },
} as Module;
