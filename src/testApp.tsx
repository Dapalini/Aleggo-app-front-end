import * as React from 'react';
import FrequencyInputForm from './components/places/workplanEdit/frequencyInputForm';
import InstructInputForm from './components/places/workplanEdit/instructInputForm';
import {Formik} from "formik"
import * as Yup from "yup"
import WorkerInputForm from './components/places/workplanEdit/workerInputForm';


const initialValues = 
{
  workplan: [
			{
				workerType: null,
				assignedWorker: { value: 'worker1', label: 'Peter Hundash' },
				assignment: [
					{
						dayType: {value: "workDay", label: "Work days"},
						frequencyType: "normal",
						frequency: { value: 'weekly', label: 'Weekly' },
						interval: 2,
						intervalUnit: "week",
						dayOccurence: null,
						months: [1,2,3,4,5,6,7],
						startDate: '2023-05-04',
						isEndDate: false,
						endDate: "",
						weekdays: [],
						yearInterval: 1,
						tasks: [
							{
								amount: 2,
								taskType: { value: 'task2', label: 'Stair' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction:   
									'Sweep and wash the stairs all the way down to the basement, including under mats.\nRemove spiderwebs. \nChange defective lights. \nShake entrance mat outside.',
								duration: 30,
								notes: 'Always remove the promo on postboxes',
								images: [{url:"",description:""}]
							},   
							{
								amount: 1,
								taskType: { value: 'task4', label: 'Pavement' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction: 'Sweep and put o der of pavement.',
								duration: 30,
								notes: 'Dont leave any cigarette butts',
								images: [{url:"",description:""}]
							},
						],
					},
				]
			},
			{
				workerType: { value: 'cleaner', label: 'Cleaner' },
				assignedWorker: { value: 'worker1', label: 'Peter Hundash' },
				assignment: [
					{
						frequencyType: "normal",
						frequency: { value: 'weekly', label: 'Weekly' },
						dayOccurence: {value: "1", label: "first"},
						interval: 2,
						intervalUnit: "week",
						yearInterval: 1,
						startDate: '2023-05-04',
						isEndDate: false,
						endDate: "",
						dayType: {value: "workDay", label: "Work days"},
						months: [1,2,3,4,5,6,7],
						weekdays: [1],
						tasks: [
							{
								amount: 2,
								taskType: { value: 'task2', label: 'Stair' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction:
									'Sweep and wash the stairs all the way down to the basement, including under mats.\nRemove spiderwebs. \nChange defective lights. \nShake entrance mat outside.',
								duration: 30,
								notes: 'Always remove the promo on postboxes',
								images: [{url:"",description:""}]				
							},
							{
								amount: 1,
								taskType: { value: 'task4', label: 'Pavement' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction: 'Sweep and put order of pavement.',
								duration: 30,
								notes: 'Dont leave any cigarette butts',
								images: [{url:"",description:""}]
							},
						],
					},
				]
			},
			{
				workerType: { value: 'cleaner', label: 'Cleaner' },
				assignedWorker: { value: 'worker1', label: 'Peter Hundash' },
				assignment: [
					{
						frequencyType: "normal",
						frequency: { value: 'weekly', label: 'Weekly' },
						dayOccurence: null,
						interval: 2,
						intervalUnit: "week",
						startDate: '2023-05-04',
						isEndDate: false,
						endDate: "",
						yearInterval: 1,
						dayType: {value: "workDay", label: "Work days"},
						months: [1,2,3,4,5,6,7],
						weekdays: [1],
						tasks: [
							{
								amount: 2,
								taskType: { value: 'task2', label: 'Stair' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction:
									'Sweep and wash the stairs all the way down to the basement, including under mats.\nRemove spiderwebs. \nChange defective lights. \nShake entrance mat outside.',
								duration: 30,
								notes: 'Always remove the promo on postboxes',
								images: [{url:"",description:""}]				
							},
							{
								amount: 1,
								taskType: { value: 'task4', label: 'Pavement' },
								taskDescription: "In basement",
								instructViewAlways: false,
								instruction: 'Sweep and put order of pavement.',
								duration: 30,
								notes: 'Dont leave any cigarette butts',
								images: [{url:"",description:""}]
							},
						],
					},
				]
			},
		],
} 

const validationSchemaTaskValues = Yup.object().shape({
    amount: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 300"),
    taskType: Yup.object().required("Required"),
    taskDescription: Yup.string(),
    instruction: Yup.string().required("Required"),
    notes: Yup.string(),
    duration: Yup.number().required("Required").min(1, "Min. 1").max(300, "Max 2400"),
    images: Yup.array()
  })


const validationSchemaAssignmentValues = Yup.object({
    startDate: Yup.date().required("Required"),
    endDate: Yup.date().when("isEndDate", {
      is: true,
      then: () => Yup.date().required("Required")
    }),
    frequencyType: Yup.string().required("Required"),
    frequency: Yup.object().required("Required"),
    monthWeekNr: Yup.string().when("frequencyType", {
      is: "customByWeekOccurence",
      then: () => Yup.number().required("Required")
    }),
    interval: Yup.number().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.number().required("Required")
    }),
    intervalMagnitude: Yup.string().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.string().required("Required")
    }),
    yearInterval: Yup.number().required("Required"),
    dayOccurence: Yup.object().required("Required"),
    dayType: Yup.object().when("frequencyType", {
      is: "customByInterval",
      then: () => Yup.object().required("Required")
    }),
    months: Yup.array().when("frequency", {
      is: (value: any) => value.value === "4TimesYear", 
      then: () => Yup.array().length(4, "Select 4 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value.value === "3TimesYear", 
      then: () => Yup.array().length(3, "Select 3 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value.value === "2TimesYear", 
      then: () => Yup.array().length(2, "Select 2 months").required("Required")
    }).when("frequency", {
      is: (value: any) => value.value === "Yearly", 
      then: () => Yup.array().length(1, "Select 1 month").required("Required")
    }).min(1, "Select atleast 1 month").required(),
    weekdays: Yup.array().when("frequencyType",{
      is: "customByOccurence",
      then: () => Yup.array().length(1, "Select 1 weekday").required("Required")
    }).when("frequencyType", {
      is: "normal",
      then: () => Yup.array().min(1, "Select atleast 1 weekday").required("Required")}),
	  tasks: Yup.array().of(validationSchemaTaskValues)
  })

const validationSchemaWorkerValue = Yup.object({
    workerType: Yup.object().required("Required"),
    assignedWorker: Yup.object().required("Required"),
    assignment: Yup.array().of(validationSchemaAssignmentValues)
  })

const validationSchema = Yup.object().shape({
  workplan: Yup.array().of(validationSchemaWorkerValue)
})

const onSubmit = (values: any) => {
  console.log(values)
}

const TestApp = () => {

  return ( 
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="container justify-content-center">
        <div className='row'>
          <div className="border shadow p-4">
            { initialValues.workplan.map((worker, workerIndex) => {
              
              const workerName = `workplan[${workerIndex}].`
              
              return (
                <div key={workerIndex} className='border rounded shadow p-4 m-2'>
                    <WorkerInputForm name={workerName}/>
                        { worker.assignment.map((assign, assignIndex) => {
                          
                          const freqName = `workplan[${workerIndex}].assignment[${assignIndex}].`
                          
                          return (
                            <div key={assignIndex} className='border rounded shadow p-4 m-2'>
                                <FrequencyInputForm name={freqName}/>
                                { assign.tasks.map((task, taskIndex): any => {
                                    
                                    const assignName = `workplan[${workerIndex}].assignment[${assignIndex}].tasks[${taskIndex}].`

                                    return(
                                      <div key={taskIndex} className='border rounded shadow p-4 m-2'>
                                        <InstructInputForm name={assignName}/>
                                      </div>
                                    )
                                })
                                }
                            </div>
                          )
                        }
                        )
                        }
                </div>)})}
          </div>
        </div>
      </div> 
    </Formik>
  );
}
 
export default TestApp;