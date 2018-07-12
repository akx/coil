export function cleanPresentationProps(props: { [key: string]: any }): void {
  if (props.stroke === '') {
    delete props.stroke;
  }
  if (props.fill === '') {
    delete props.fill;
  }
}
