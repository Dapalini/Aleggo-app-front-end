import * as Yup from "yup"
import { DateTime } from 'luxon';

// Task values types, validation and initialvalues

type TaskValuesType = {
  amount: number,
	duration: number,
	instruction: string,
  images: object[] | []
  notes: string,
  taskDescription: string,
  taskValue: object,
}

export const initialTaskValues: TaskValuesType = {
  amount: 1,
	duration: 30,
	instruction: "",
  images: [], 
  notes: "",
  taskDescription: "",
  taskValue: {},
}

const validationSchemaTaskValues = Yup.object().shape({
    amount: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 300"),
    taskType: Yup.object().required("Required"),
    taskDescription: Yup.string(),
    instruction: Yup.string(),
    notes: Yup.string(),
    duration: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 2400"),
    images: Yup.array().of(Yup.object())
  })

// Assignment (frequency), types, values and validation

type AssignmentValuesType = {
  dayOccurence: object,
	dayType: object,
  endDate: string,
  frequency: object,
  frequencyType: "normal" | "customByWeekOccurence" | "customByInterval",
	interval: number,
	intervalUnit: object,
  isEndDate: boolean,
	months: number[],
  isSeasonal: boolean,
  seasonal: {
    dayOccurence: object,
    dayType: object,
    endDate: string,
    frequency: object,
    frequencyType: "normal" | "customByWeekOccurence" | "customByInterval",
    interval: number,
    intervalUnit: object,
    isEndDate: boolean,
    months: number[],
    weekdays: number[],
    yearInterval: number,
  },
  startDate: string,
	tasks: TaskValuesType[] | [],
  weekdays: number[],
	yearInterval: number,
}

export const initialAssignmentValues: AssignmentValuesType = {
	dayOccurence: { value: "1", label: "first"},
	dayType: {},
  endDate: "",
  frequency: { value: "weekly", label: "Weekly"},
  frequencyType: "normal",
	interval: 1,
	intervalUnit: { value: "weeks", label: "week(s)"},
  isEndDate: false,
  months: [1,2,3,4,5,6,7,8,9,10,11,12],
  isSeasonal: false,
	seasonal: {
    dayOccurence: { value: "1", label: "first"},
  	dayType: {},
    endDate: "",
    frequency: { value: "weekly", label: "Weekly"},
    frequencyType: "normal",
	  interval: 1,
	  intervalUnit: { value: "weeks", label: "week(s)"},
    isEndDate: false,
    months: [1,2,3,4,5,6,7,8,9,10,11,12],
    weekdays: [1],
    yearInterval: 1,
  },
  startDate: "",
	tasks: [initialTaskValues],
  weekdays: [1],
	yearInterval: 1,
}

export const validationSchemaAssignmentValues = Yup.object({
    dayOccurence: Yup.object().when("frequencyType", {
      is: "customByWeekOccurence",
      then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
    }),
    dayType: Yup.object().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
    }),  
    endDate: Yup.date().when("isEndDate", {
      is: true,
      then: () => Yup.date().required("Required")
    }),
    frequency: Yup.object().required("Required"),
    frequencyType: Yup.string().required("Required"),
    interval: Yup.number().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.number().required("Required")
    }),
    intervalUnit: Yup.object().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
    }),
    isEndDate: Yup.boolean().required("Required"),
    months: Yup.array().when("frequency", {
      is: (value: any) => value?.value === "4TimesYear", 
      then: () => Yup.array().length(4, "Select 4 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value?.value === "3TimesYear", 
      then: () => Yup.array().length(3, "Select 3 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value?.value === "2TimesYear", 
      then: () => Yup.array().length(2, "Select 2 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value?.value === "Yearly", 
      then: () => Yup.array().length(1, "Select 1 month").required("Required")
    }).min(1, "Select atleast 1 month").required(),
    isSeasonal: Yup.boolean().required("Required"),
    seasonal: Yup.object().when("isSeasonal", {
      is: true,
      then: () => Yup.object().shape({
        dayOccurence: Yup.object().when("frequencyType", {
        is: "customByWeekOccurence",
        then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
        }),
        dayType: Yup.object().when("frequencyType", {
          is: "customByInterval",
          then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
        }),  
        frequency: Yup.object().required("Required"),
        frequencyType: Yup.string().required("Required"),
        interval: Yup.number().when("frequencyType", {
          is: "customByInterval",
          then: () => Yup.number().required("Required")
        }),
        intervalUnit: Yup.object().when("frequencyType", {
          is: "customByInterval",
          then: () => Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required")
        }),
        isEndDate: Yup.boolean().required("Required"),
        months: Yup.array().when("frequency", {
          is: (value: any) => value?.value === "4TimesYear", 
          then: () => Yup.array().length(4, "Select 4 months").required("Required")
        }).when("frequency", {
          is: (value: any) => value?.value === "3TimesYear", 
          then: () => Yup.array().length(3, "Select 3 months").required("Required")
        }).when("frequency", {
          is: (value: any) => value?.value === "2TimesYear", 
          then: () => Yup.array().length(2, "Select 2 months").required("Required")
        }).when("frequency", {
          is: (value: any) => value?.value === "Yearly", 
          then: () => Yup.array().length(1, "Select 1 month").required("Required")
        }).min(1, "Select atleast 1 month").required(),
        startDate: Yup.date().required("Required"),
        tasks: Yup.array().of(validationSchemaTaskValues),
        weekdays: Yup.array().when("frequencyType",{
          is: "customByOccurence",
          then: () => Yup.array().length(1, "Select 1 weekday").required("Required")
        }).when("frequencyType", {
          is: "normal",
          then: () => Yup.array().min(1, "Select atleast 1 weekday").required("Required")}),
        yearInterval: Yup.number().required("Required"),
      }),
    }),
    startDate: Yup.date().required("Required"),
    tasks: Yup.array().of(validationSchemaTaskValues),
    weekdays: Yup.array().when("frequencyType",{
      is: "customByOccurence",
      then: () => Yup.array().length(1, "Select 1 weekday").required("Required")
    }).when("frequencyType", {
      is: "normal",
      then: () => Yup.array().min(1, "Select atleast 1 weekday").required("Required")}),
    yearInterval: Yup.number().required("Required"),
  })

export type WorkerValuesType = {
  assignedWorker: object | null,
	assignment: AssignmentValuesType[] | [],
  workerType: object | null,
}

export const initialWorkerValues: WorkerValuesType = {
  assignedWorker: null,
  assignment: [initialAssignmentValues],
  workerType: null,
}

export const validationSchemaWorkerValues = Yup.object({
    workerType: Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required"),
    assignedWorker: Yup.object().shape({value: Yup.string(), label: Yup.string()}).required("Required"),
    assignment: Yup.array().of(validationSchemaAssignmentValues)
  })

// Workplan values

export type WorkplanValuesType = {
  workplan: WorkerValuesType[] | [],
}

export const initialWorkplanValues: WorkplanValuesType = {
  workplan: [initialWorkerValues]
}

export const validationSchema = Yup.object().shape({
  workplan: Yup.array().of(validationSchemaWorkerValues)
})


// workplanEdit states, initial states

export type WorkplanEditStates = {
  _id: string,
  addressLocation: string,
  customerNumber: string,
  dragIndex: {},
  endDate: string,
  fullAddress: string,
  index: {},
  isDragging: any
  itemDragged: string,
  name: string,
  startDate: any,
  taskOptions: any,
  workerOptions: any,
  workerTypeOptions: any,
}

const today = DateTime.now().toISO()

export const initialWorkplanEditStates: WorkplanEditStates = {
  _id: "",
  addressLocation: "",
  customerNumber: "",
  dragIndex: {},
  endDate: "",
  fullAddress: "",
  index: {WORKER: 0, ASSIGNMENT: 0, INSTRUCT: 0},
  isDragging: false,
  itemDragged: "",
  name: "",
  startDate: today,
  taskOptions: [],
  workerOptions: [],
  workerTypeOptions: [],
}
 
export type UseWorkplanEditStateType = {
  state: any,
  onDragStart: (itemDragged: string, index: number | null, isDragging: any) => void
  onDragEnd: () => void
  onDrop: (item: string, oldIndex: any, newIndex: any ) => void
  addItem: (index: any, itemType: string) => void
  deleteItem: (index: any, itemType: string) => void
}

export const initialWorkplanEditContextStates: UseWorkplanEditStateType = {
  state: initialWorkplanEditStates,
  onDragStart: (itemDragged: string, index: number | null, isDragging: any) => {},
  onDragEnd: () => {},
  onDrop: (item: string, oldIndex: any, newIndex: any ) => {},
  addItem: (index: any, itemType: string) => {},
  deleteItem: (index: any, itemType: string) => {}
}