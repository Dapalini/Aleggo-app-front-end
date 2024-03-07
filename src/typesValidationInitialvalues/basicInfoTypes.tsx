import * as Yup from "yup"

type DateNoteType = {
  date: string,
  note: string
}

type IdLabelType = {
  value: string,
  label: string,
  type: string,
}

type ContactDataItem = {
  label: IdLabelType
  value: string
}

type ContactDataType = {
  contactType: IdLabelType,
  contactDataEntry: [ ContactDataItem ],
  contactNotes: [ DateNoteType ]
}

type AddressLocationType = {
  description: string,
  place_id: string,
}

export type BasicInfoValueTypes = {
  _id: string,
  basicInfo: {
    customerNumber?: string,
    name: string, 
    fullAddress: string,
    addressLocation: AddressLocationType,
    startDate: string,
    endDate: string,
    isEndDate: boolean,
    summaryData: string,
    importantNotes:[ DateNoteType ],
    accessData:[ DateNoteType ]
    contactData: [ ContactDataType ]
  },
} 

const date = new Date(); 

const day = date.getDate(); // Get the day of the month
const month = date.toLocaleString('default', { month: 'short' }); // Get the short month name
const year = date.getFullYear(); // Get the year

const formattedDate = `${day}, ${month} ${year}`;

export const dateNoteInitialValues = {
  date: formattedDate,
  note: `${formattedDate} - `
}

export const idLabelInitialValues = {
  label: "",
  value: "",
  type: "",
}

export const contactDataItemInitialValues = {
  label: {},
  value: "",
}

export const contactDataInitialValues = {
  contactType: idLabelInitialValues,
  contactDataEntry: [ contactDataItemInitialValues ],
  contactNotes: ""
}

export const addressLocationInitialValues = {
  description: "",
  place_id: "",
}

export const basicInfoInitialValues = {
  _id: "",
  basicInfo: {
    customerNumber: "",
    name: "", 
    fullAddress: "",
    addressLocation: addressLocationInitialValues,
    startDate: "",
    endDate: "",
    isEndDate: false,
    summaryData: "",
    importantNotes:[],
    accessData:[],
    contactData: []
  },
} 

const dateNoteValidationSchema = Yup.object({
  date: Yup.string().required("Required"),
  note: Yup.string().required("Required")
})

const idLabelValidationSchema = Yup.object({
  value: Yup.string(),
  label: Yup.string(),
  type: Yup.string(),
}).required("Required")

const contactDataItemValidationSchema = Yup.object({
  label: idLabelValidationSchema,
  value: Yup.string().required("Required"),
}) 

const contactDataValidationSchema = Yup.object({
  contactType: idLabelValidationSchema,
  contactDataEntry: Yup.array().of(contactDataItemValidationSchema),
  contactNotes: Yup.string()
  }
)

const addressLocationValidationSchema = Yup.object({
  description: Yup.string(),
  place_id: Yup.string(),
}).required("Required")

export const basicInfoValidationSchema = Yup.object({
  customerNumber: Yup.string(),
  name: Yup.string().required("Required"),
  fullAddress: Yup.string().required("Required"),
  addressLocation: addressLocationValidationSchema,
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().when('isEndDate', {
    is: (val: any) => val === true,
    then: () => Yup.string().required('End date is required')
  }),
  isEndDate: Yup.boolean(),
  summaryData: Yup.string(),
  importantNotes: Yup.array().of( dateNoteValidationSchema ).required("Required"),
  accessData: Yup.array().of( dateNoteValidationSchema ).required("Required"),
  contactData: Yup.array().of( contactDataValidationSchema ).required("Required")
}).required("Required")

export const placeValidationSchema = Yup.object({
  _id: Yup.string().required("Required"),
  basicInfo: basicInfoValidationSchema
})
