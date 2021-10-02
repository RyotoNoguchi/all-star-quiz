import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { ChangeEvent, useState } from 'react';

const StyledPaper = styled(Paper)`
  height: 655px;
  margin-top: 12px;
  border-radius: 12px;
`;

const StyledTextField = styled(TextField)`
  display: flex;
  margin-bottom: 12px;
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



const initialValues = {
  questionId: '',
  question: '',
  answer: '',
  choices: {
    A: '',
    B: '',
    C: '',
    D: '',
  }
}

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



const AddQuestion: React.FC = () => {
  const [choice, setChoice] = useState<Choice>('A');
  const choices: Choice[] = ['A', 'B', 'C', 'D'];
  const formik = useFormik<FormValueType>({
    initialValues,
    onSubmit,
    validate
  });

  console.log(formik.errors);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setChoice(e.target.value as Choice)
    formik.handleChange(e)
  }

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
            value={formik.values.questionId}
          />
          <StyledTextField
            id="outlined-basic"
            name="question"
            label="問題文"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.question}
          />
          <StyledTextField
            id="outlined-select-answer"
            select
            label="正解"
            name="answer"
            value={choice}
            onChange={(e) => handleChange(e)}
            helperText="正解をA, B, C, Dの中から選んでください"
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
            value={formik.values.choices.A}
          />
          <StyledTextField
            id="outlined-choice-B"
            name="choices.B"
            label="選択肢B"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.choices.B}
          />
          <StyledTextField
            id="outlined-choice-C"
            name="choices.C"
            label="選択肢C"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.choices.C}
          />
          <StyledTextField
            id="outlined-choice-D"
            name="choices.D"
            label="選択肢D"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.choices.D}
          />

          <Button type="submit">送信</Button>
        </Box>
      </StyledPaper>
    </>
  );
};

export default AddQuestion;
