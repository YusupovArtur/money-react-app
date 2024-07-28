const getValidityClassName = (
  validity: boolean | undefined,
  validClassName: string = 'is-valid',
  invalidClassName: string = 'is-invalid',
): string | undefined => {
  if (validity !== undefined) {
    return validity ? validClassName : invalidClassName;
  }
  return undefined;
};

export default getValidityClassName;
