import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import * as yup from 'yup'
import { useFormik } from 'formik';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const StyledPaper = styled(Paper)`
  height: 655px;
  margin-top: 12px;
  border-radius: 12px;
`;



const StyledTextField = styled(({isError:string, ...props}): JSX.Element => <TextField {...props}/>)`
  display: flex;
  margin-bottom: ${p => p.isError ? 8 : 12}px;
`;

type FormValueType = {
  questionId: string;
  question: string;
  answer: string;
  choices: Choices
};

type Choices = {
  A: string
  B: string
  C: string
  D: string
}

type Choice = 'A' | 'B' | 'C' | 'D';




type FormErrorType = {
  [P in keyof FormValueType]?: string | Choices;  // FormValueTypeのプロパティと同じですべてオプショナルなtypeを定義。下と同じ
                                        // type FormErrorType = {
                                        //   questionId?: string
                                        //   question?: string
                                        //   answer?: string
                                        // ?
};

const onSubmit = (values: FormValueType) => {
  console.log(values);
}

const validate = (values: FormValueType): FormErrorType => {
  const errors: FormErrorType = {};

  if (!values.questionId) {
    errors.questionId = '問題番号を入力してください。';
  } else if (values.questionId.length > 100) {
    errors.questionId = '登録できる問題数は100個までです。';
  }

  if (!values.question) {
    errors.question = '問題文を入力してください。';
  } else if (values.question.length > 100) {
    errors.question = '問題文は200文字まで入力可能です。';
  }

  if (!values.answer) {
    errors.answer = '問題の正解を入力してください。';
  }

  if (!values.choices.A || !values.choices.B || !values.choices.C || !values.choices.D) {
    errors.choices = {
      A: !values.choices.A ? 'Aに入力してください' : '',
      B: !values.choices.B ? 'Bに入力してください' : '',
      C: !values.choices.C ? 'Cに入力してください' : '',
      D: !values.choices.D ? 'Dに入力してください' : '',
    }
  }
  return errors
};

const validationSchema = yup.object({
  questionId: yup.string().required('問題番号を入力してください。'),
  question: yup.string().required('問題文を入力してください。'),
  answer: yup.string().required('問題の正解を入力してください。'),
  choices: yup.object({
    A: yup.string().required('Aに入力してください'),
    B: yup.string().required('Bに入力してください'),
    C: yup.string().required('Cに入力してください'),
    D: yup.string().required('Dに入力してください'),
  })
})

const AddQuestion: React.FC = () => {
  const [choice, setChoice] = useState<Choice>('A');
  const choices: Choice[] = ['A', 'B', 'C', 'D'];
  const initialValues = {
    questionId: '',
    question: '',
    answer: choice,
    choices: {
      A: '',
      B: '',
      C: '',
      D: '',
    }
  }

  const formik = useFormik<FormValueType>({
    initialValues,
    onSubmit,
    validationSchema
  });

  console.log(formik.touched);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setChoice(e.target.value as Choice)
    formik.handleChange(e)
  }

  const touched = formik.touched
  const isQIdVisited = touched.questionId
  const isQVisited = touched.question
  const isAVisited = touched.choices?.A
  const isBVisited = touched.choices?.B
  const isCVisited = touched.choices?.C
  const isDVisited = touched.choices?.D
  const hasQIdInputErr = formik.errors.questionId
  const hasQInputErr = formik.errors.question
  const hasAInputErr = formik.errors.choices?.A
  const hasBInputErr = formik.errors.choices?.B
  const hasCInputErr = formik.errors.choices?.C
  const hasDInputErr = formik.errors.choices?.D

  return (
    <>
      <StyledPaper>
        <Box
          style={{ padding: '12px' }}
          component="form"
          onSubmit={formik.handleSubmit}
        >
          <StyledTextField
            id="standard-basic"
            name="questionId"
            label="問題番号"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.questionId}
            error={(isQIdVisited && hasQIdInputErr) ? true : false}
            helperText={(isQIdVisited && hasQIdInputErr) ?? ''}
            isError={isQIdVisited && hasQIdInputErr}
          />
          <StyledTextField
            id="outlined-basic"
            name="question"
            label="問題文"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.question}
            error={(isQVisited && hasQInputErr) ? true : false}
            helperText={(isQVisited && hasQInputErr) ?? ''}
            isError={isQVisited && hasQInputErr}
          />
          <StyledTextField
            id="outlined-select-answer"
            select
            label="正解"
            name="answer"
            value={choice}
            onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
            onBlur={formik.handleBlur}
          >
            {choices.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            id="outlined-choice-A"
            name="choices.A"
            label="選択肢A"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.choices.A}
            error={(isAVisited && hasAInputErr) ? true : false}
            helperText={(isAVisited && hasAInputErr) ?? ''}
            isError={isAVisited && hasAInputErr}
          />
          <StyledTextField
            id="outlined-choice-B"
            name="choices.B"
            label="選択肢B"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.choices.B}
            error={(isBVisited && hasBInputErr) ? true : false}
            helperText={(isBVisited && hasBInputErr) ?? ''}
            isError={isBVisited && hasBInputErr}
          />
          <StyledTextField
            id="outlined-choice-C"
            name="choices.C"
            label="選択肢C"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.choices.C}
            error={(isCVisited && hasCInputErr) ? true : false}
            helperText={(isCVisited && hasCInputErr) ?? ''}
            isError={isCVisited && hasCInputErr}
          />
          <StyledTextField
            id="outlined-choice-D"
            name="choices.D"
            label="選択肢D"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.choices.D}
            error={(isDVisited && hasDInputErr) ? true : false}
            helperText={(isDVisited && hasDInputErr) ?? ''}
            isError={isDVisited && hasDInputErr}
          />

          <Button variant="contained" type="submit">送信</Button>
        </Box>
      </StyledPaper>
    </>
  );
};

export default AddQuestion;
