import { useFormikContext } from "formik"

export const GetFormikValues = () => {
  const { values } = useFormikContext()
  return values
}