import { Field } from 'formik';
import { useEffect } from 'react';
import { useField } from 'formik';

const InputFormik = (props: any) => {

  const {label, name, className, actionIcons,...rest} = props
	
  const adjustHeight = (text: string = '') => {
    const textAreaBox: HTMLElement | null  = document.getElementById(`textArea${name}`)
    const boxWidth = textAreaBox?.offsetWidth
    const pureRows: string[] = text.split('\n');
    let finalRowsCount: number = 0;
    if(boxWidth && boxWidth >= 800) {
      pureRows.forEach((item) => {
      const actualRows = Math.ceil(item.length / 100);
      finalRowsCount += actualRows;
      if( item.length === 0 ){
        finalRowsCount++;
      } 
      })
    }
    if(boxWidth && boxWidth < 800){
      pureRows.forEach((item) => {
      const actualRows = Math.ceil(item.length / (boxWidth / 8.5));
      finalRowsCount += actualRows;
      if( item.length === 0 ){
        finalRowsCount++;
      } 
      })
    }
    if (finalRowsCount < 2) {
      finalRowsCount = 1;
    }
    let finalRows = (finalRowsCount + 1) * 24;
    if(textAreaBox){
      textAreaBox.style.height = `${finalRows}px`;
    }
  }
  
  const [field ] = useField(name)
  
  useEffect(()=>{
    adjustHeight(field.value)
  })

  window.addEventListener("resize", () => adjustHeight(field.value)) 

  return (
    <>
      <Field
        name={name}
      >
        {
          ({field, form}: any) => {
            const { touched, errors } = form

            return (
              <div>
                <div style={{display: "inline-block"}}>
                  <label className="form-label mb-0 me-3" htmlFor={`textArea${name}`}>
                    {label}
                  </label>
                  <div style={{display: "inline-block"}}>
                    {actionIcons}
                  </div>
                </div>
                <textarea
                  id={`textArea${name}`}
                  type="textArea"
                  className={`form-control ${errors[name] && touched[name] ? "is-invalid" : null}`}
                  name={name}
                  {...rest}
                  {...field}
                />
                {errors[name] && touched[name] ? 
                  <div 
                    className="invalid-feedback"
                  >
                    {errors[name]}
                  </div> 
                  : null
                }
              </div>
            )
          }
        }
      </Field>
    </>
   );
}
 
export default InputFormik;