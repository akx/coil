import { NodeConfig } from '../types';
import { configure } from '../universe/configure';

export default function makeDefaultConfig(): NodeConfig[] {
  return [
    configure(
      'RemoveChildren',
      {
        seed: 'foo',
      },
      [
        configure(
          'RectArray',
          {
            numberX: '7',
            numberY: '7',
            variableX: 'i',
            variableY: 'j',
          },
          [
            configure('Ngon', {
              radius1: '15',
              radius2: '5',
              vertices: '10',
              x: '=15 + i * 30',
              y: '=30 + j * 30',
              fill: 'blue',
            }),
          ],
        ),
      ],
    ),
  ];
}
