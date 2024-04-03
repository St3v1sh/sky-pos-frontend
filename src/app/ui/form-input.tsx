import clsx from 'clsx';

interface CredentialsFormInputProps {
  formDetails: {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    readOnly?: boolean;
  };
  children?: React.ReactNode;
  className?: string;
}

export default function CredentialsFormInput({
  formDetails: { id, label, placeholder, type, readOnly },
  className,
  children,
}: CredentialsFormInputProps) {
  return (
    <>
      <label htmlFor={id} className='px-1 mb-1 text-sm'>
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          name={id}
          type={type || 'text'}
          placeholder={placeholder}
          className={clsx(
            'w-full py-1 pl-8 text-xl border-b rounded-t-lg border-color-surface-600',
            className
          )}
          readOnly={readOnly}
        />
        {children}
      </div>
    </>
  );
}
