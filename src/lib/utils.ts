export const classNames = (...cssClassNames: (string | null | undefined)[]) =>
  cssClassNames.filter(Boolean).join(' ')
