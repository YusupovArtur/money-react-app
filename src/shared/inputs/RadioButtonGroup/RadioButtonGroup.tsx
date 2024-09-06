import { CSSProperties, Fragment, HTMLProps, useId } from 'react';

type Primitive = number | string | boolean | null | undefined;

type RadioOption<T extends Primitive> = {
  label: string;
  value: T;
  className?: string;
  style?: CSSProperties;
};

type RadioOptionWithID<T extends Primitive> = RadioOption<T> & { id: string };

interface RadioButtonGroupProps<T extends Primitive> extends HTMLProps<HTMLDivElement> {
  option: T;
  options: RadioOption<T>[];
  setOption: (option: T) => any;
}

export const RadioButtonGroup = <T extends Primitive>({
  option: optionState,
  options,
  setOption,
  className,
  style,
  ...props
}: RadioButtonGroupProps<T>) => {
  const optionsWithID: RadioOptionWithID<T>[] = options.map((option) => ({
    ...option,
    id: useId(),
  }));

  return (
    <div
      style={{ maxWidth: '100%', display: 'inline-flex', ...style }}
      className={`btn-group ${className || ''}`}
      role="group"
      {...props}
    >
      {optionsWithID.map((option) => (
        <Fragment key={option.id}>
          <input
            id={option.id}
            type="radio"
            onChange={() => setOption(option.value)}
            className="btn-check"
            autoComplete="off"
            checked={optionState === option.value}
          />
          <label
            className={`btn text-truncate ${option.className ? option.className : ''}`}
            style={option.style}
            htmlFor={option.id}
          >
            {option.label}
          </label>
        </Fragment>
      ))}
    </div>
  );
};

export type RadioOptions<T extends Primitive> = RadioOption<T>[];
