import * as React from 'react';

const CustomButton = (props: any) => {
  const {
    text = "button",
    disabled = false,
    action = () => console.log("pressed"),
    className,
    ...rest
  } = props

  return (
    <button
      className={`btn btn-primary btn-sm ${className}`} 
      disabled={disabled}
      onClick={action}
      {...rest}
    >
      {text}
    </button>
  );
}
 
export default CustomButton;