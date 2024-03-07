const places = [
	{
		_id: '5b21ca3eeb7f6fbccd471814',
		customerNumber: '1000',
		name: 'Ahlna',
		fullAddress: 'Ved Kirkebjerg 24, 2605 Brøndby',
		addressLocation: 'Ved Kirkebjerg 24, 2605 Brøndby',
		startDate: '2023-05-04',
		endDate: "",
		basicInfo: {
			summaryData:
				'Small property with 3 stairs, 2 back stairs, laundry and vicevært service',
			importantNotes: 'Dont call in private',
			accessData: {date: "1 april 2023", note: 'Key is in keybox, code 1234'},
			contactData: [
				{
					contactType: { value: 'mainContact', label: 'Main contact' },
					data: [
						{
							label: { value: 'name', label: 'Name' },
							value: 'John Doe',
						},
						{
							label: { value: 'address', label: 'Address' },
							value: 'Jespers hovedgade 25',
						}, 
						{
							label: { value: 'email', label: 'Email' },
							value: 'example@gmail.com',
						},
					],
					contactNotes:
						'He is an old grumpy mean fart, doesnt find any joy in s urroundings and complains at a dust stir. Keep strictly clear of this no good excuse for a creature.',
				},
				{
					contactType: { value: 'boardMember', label: 'Board Member' },
					data: [
						{
							label: { value: 'name', label: 'Name' },
							value: 'John Doe',
						},
						{
							label: { value: 'address', label: 'Address' },
							value: 'Jespers hovedgade 25',
						},
						{
							label: { value: 'email', label: 'Email' },
							value: 'example@gmail.com',
						},
					],
					contactNotes: '',
				},
				{
					contactType: { value: 'resident', label: 'Resident' },
					data: [
						{
							label: { value: 'name', label: 'Name' },
							value: 'John Doe',
						},
						{
							label: { value: 'address', label: 'Address' },
							value: 'Jespers hovedgade 25',
						},
						{
							label: { value: 'email', label: 'Email' },
							value: 'example@gmail.com',
						},
					],
					contactNotes: '',
				},
			],
		},
		workplan: {
			workers: [
				{
					person: {_id: "12345", value: "12345", name: "Joe Blow"},
					workerType: { _id: "3333", value: "3333", Label: "Cleaner"},
					renderOrder: {worker: 0}
				},
				{
					person: {_id: "12346", value: "12346", name: "Mario Bario"},
					workerType: { _id: "3333", value: "3333", Label: "Cleaner"},
					renderOrder: {worker: 2}
				},
				{
					person: {_id: "12347", value: "12347", name: "Peter Hundash"},
					workerType: { _id: "3333", value: "3333", Label: "Cleaner"},
					renderOrder: {worker: 1}
				}
			],
			frequencies: [
				{
					dayOccurence: { value: "1", label: "first"},
					dayType: {value: "workDay", label: "Work days"},
					endDate: "",
					frequencyType: "normal",
					frequency: { value: 'weekly', label: 'Weekly' },
					interval: 2,
					intervalUnit: { value: "week", label: "weeks"},
					isEndDate: false,
					months: [1,2,3,4,5,6,7],
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
						weekdays: [2],
						yearInterval: 1,
					},
					startDate: '2023-05-04',
					weekdays: [2],
					yearInterval: 1,
					renderOrder: {worker: 1, frequency: 1}
				},
				{
					dayOccurence: { value: "1", label: "first"},
					dayType: {value: "workDay", label: "Work days"},
					endDate: "",
					frequencyType: "normal",
					frequency: { value: 'weekly', label: 'Weekly' },
					interval: 2,
					intervalUnit: { value: "week", label: "weeks"},
					isEndDate: false,
					months: [1,2,3,4,5,6,7],
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
						weekdays: [2],
						yearInterval: 1,
					},
					startDate: '2023-05-04',
					weekdays: [2],
					yearInterval: 1,
					renderOrder: {worker: 2, frequency: 2}
				},
				{
					dayOccurence: { value: "1", label: "first"},
					dayType: {value: "workDay", label: "Work days"},
					endDate: "",
					frequencyType: "normal",
					frequency: { value: 'weekly', label: 'Weekly' },
					interval: 2,
					intervalUnit: { value: "week", label: "weeks"},
					isEndDate: false,
					months: [1,2,3,4,5,6,7],
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
						weekdays: [2],
						yearInterval: 1,
					},
					startDate: '2023-05-04',
					weekdays: [2],
					yearInterval: 1,
					renderOrder: {worker: 3, frequency: 3}
				},
			],
			instructions: [
				{
					amount: 2,
					taskType: { value: 'task2', label: 'Stair' },
					taskDescription: "In basement",
					instructViewAlways: false,
					instruction:   
						'Sweep and wash the stairs all the way down to the basement, including under mats.\nRemove spiderwebs. \nChange defective lights. \nShake entrance mat outside.',
					duration: 30,
					notes: 'Always remove the promo on postboxes',
					images: [{url:"",description:""}],
					renderOrder: {worker: 1, frequency: 1, instruction: 1}
				},   
				{
					amount: 1,
					taskType: { value: 'task4', label: 'Pavement' },
					taskDescription: "In basement",
					instructViewAlways: false,
					instruction: 'Sweep and put o der of pavement.',
					duration: 30,
					notes: 'Dont leave any cigarette butts',
					images: [{url:"",description:""}],
					renderOrder: {worker: 1, frequency: 1, instruction: 2}
				},
				{
					amount: 2,
					taskType: { value: 'task2', label: 'Stair' },
					taskDescription: "In basement",
					instructViewAlways: false,
					instruction:   
						'Sweep and wash the stairs all the way down to the basement, including under mats.\nRemove spiderwebs. \nChange defective lights. \nShake entrance mat outside.',
					duration: 30,
					notes: 'Always remove the promo on postboxes',
					images: [{url:"",description:""}],
					renderOrder: {worker: 2, frequency: 1, instruction: 1}

				},   
				{
					amount: 1,
					taskType: { value: 'task4', label: 'Pavement' },
					taskDescription: "In basement",
					instructViewAlways: false,
					instruction: 'Sweep and put o der of pavement.',
					duration: 30,
					notes: 'Dont leave any cigarette butts',
					images: [{url:"",description:""}],
					renderOrder: {worker: 1, frequency: 1, instruction: 2}
				},
			],
		},
		historyData: [
			{
				_id: '123456',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
			{
				_id: '123457',
				label: 'Original Contract',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'primary',
			},
			{
				_id: '123458',
				label: 'Workplan',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'success',
			},
			{
				_id: '123459',
				label: 'Offer',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'secondary',
			},
			{
				_id: '123460',
				label: 'New contract',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'primary',
			},
			{
				_id: '1234524',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
			{
				_id: '1234563',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
			{
				_id: '1234572',
				label: 'Original Contract',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'primary',
			},
			{
				_id: '1234581',
				label: 'Workplan',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'success',
			},
			{
				_id: '12345911',
				label: 'Offer',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'secondary',
			},
			{
				_id: '12345112',
				label: 'New contract',
				creatDate: '26 July 2022',
				path: './dashboard',
				color: 'success',
			},
			{
				_id: '12345213',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
			{
				_id: '12345614',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
			{
				_id: '12345715',
				label: 'Original Contract',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'primary',
			},
			{
				_id: '12345816',
				label: 'Workplan',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'success',
			},
			{
				_id: '12345918',
				label: 'Offer',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'secondary',
			},
			{
				_id: '12345119',
				label: 'New contract',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'primary',
			},
			{
				_id: '12345220',
				label: 'Tilbud',
				creatDate: '25 July 2022',
				path: './dashboard',
				color: 'warning',
			},
		],
	}]

    export function getPlaces() {
        return places;
    }