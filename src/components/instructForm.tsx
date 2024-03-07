import { Formik, Form } from 'formik';
import * as React from 'react';
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { AlignHorizontalLeft } from '@mui/icons-material';

interface InstructFormValues {
	instruction: string;
	notes: string;
}

interface InstructFormProps {
	onSubmit: (values: InstructFormValues) => void;
}

const InstructForm: React.FC<InstructFormProps> = ({onSubmit}) => {
	return (
		<Formik initialValues={{instruction: "",notes: "",}} 
			onSubmit={values => 
			{onSubmit(values)}}
			>
			{({values, handleChange, handleBlur}) =>
				<Form>
					<Container sx={{
							backGround: 'white',
							boxShadow: 3,
							borderRadius: 2,
							p: 2,
							marginTop: 5,
							width: "1000px"
						}}
						>
						<Grid container spacing={2} >
							<Grid item
								xs={12}
							>
								<Box 
									component="h2"
									marginTop={2}
									marginLeft={2}
									sx={{
										textAlign: "left"
									}}
								>
									Job Instructions
								</Box>
							</Grid>
							<Grid item xs={1}>
								<TextField
									InputLabelProps={{ shrink: true }}
									inputProps={{ 
										inputMode: 'numeric', 
										pattern: '[0-9]*',
										min: 1,
										max: 50
									}}
									label="Nbr."
									size="small"
									type="number"
								/>
							</Grid>
							<Grid item xs={5}>
								<TextField
									fullWidth
									label="Instruction"
									multiline
									name="instruction" 
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Instructions'
									size="small"
									value={values.instruction}
								/>
							</Grid>
							<Grid item xs={5}>
								<TextField
									fullWidth
									label="Notes" 
									multiline
									name="notes" 
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder='Notes'
									size="small"
									value={values.notes} 
								/>
							</Grid>
						</Grid>
					</Container>
				</Form>
			}
		</Formik> 
	)
}
 
export default InstructForm;