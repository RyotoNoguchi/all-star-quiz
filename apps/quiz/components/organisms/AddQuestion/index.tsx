import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import FormTextField from '../../atoms/FormTextField';
import * as yup from 'yup';
import { Formik, Form, FastField, FormikProps } from 'formik';
import { ChangeEvent, useState } from 'react';
import React from 'react';

const StyledPaper = styled(Paper)`
  height: 680px;
  margin-top: 12px;
  border-radius: 12px;
`;

type FormValueType = {
  questionId: string;
  question: string;
  answer: string;
  choices: Choices;
};

type Choices = {
  A: string;
  B: string;
  C: string;
  D: string;
};

type Choice = 'A' | 'B' | 'C' | 'D';

// TODO firebaseの"questions"コレクションに追加する処理追記
const onSubmit = (values: FormValueType, onSubmitProps: FormikProps<FormValueType>): void => {
  console.log(values);
  console.log('onSubmitProps', onSubmitProps);
  onSubmitProps.setSubmitting(false)
  onSubmitProps.resetForm()
};

yup.addMethod<yup.NumberSchema>(yup.number, 'noWhitespace', function () {
  return this.transform((value, originalValue) => /\s/.test(originalValue) ? NaN : value );
});

const validationSchema = yup.object({
  questionId: yup.number().required('問題番号を入力してください。').integer('問題番号は整数を入力してください').min(1, '問題番号は1以上を入力してください').max(100, '登録できる問題数は100個までです。')?.noWhitespace(),
  // ↑ https://github.com/jquense/yup/issues/312#issuecomment-745034006（TSでのメソッドの定義追加）
  // ↑ https://github.com/jquense/yup/issues/694#issuecomment-663613804（noWhitespace()を追加するコード）
  question: yup.string().strict().trim('スペースは除いてください。').required('問題文を入力してください。'),
  answer: yup.string().required('問題の正解を入力してください。'),
  choices: yup.object({
    A: yup.string().strict().trim('スペースは除いてください。').required('Aに入力してください'),
    B: yup.string().strict().trim('スペースは除いてください。').required('Bに入力してください'),
    C: yup.string().strict().trim('スペースは除いてください。').required('Cに入力してください'),
    D: yup.string().strict().trim('スペースは除いてください。').required('Dに入力してください'),
  }),
});

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
    },
  };

  return (
    <>
      <StyledPaper>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {(formik) => {
            return (
              <Form style={{ padding: '12px' }}>
                <FastField id="questionId" name="questionId" label="問題番号" component={FormTextField}/>

                <FastField id="answerSelector" label="正解" name="answer" component={FormTextField} select 
                onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setChoice(e.currentTarget.value as Choice)}>
                  {choices.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                </FastField>

                <FastField id="question" name="question" label="問題文" fullWidth multiline maxRows={4} component={FormTextField}/>

                <FastField id="choiceA" name="choices.A" label="選択肢A" fullWidth component={FormTextField}/>
                <FastField id="choiceB" name="choices.B" label="選択肢B" fullWidth component={FormTextField}/>
                <FastField id="choiceC" name="choices.C" label="選択肢C" fullWidth component={FormTextField}/>
                <FastField id="choiceD" name="choices.D" label="選択肢D" fullWidth component={FormTextField}/>

                <Button variant="contained" type="submit" disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting} style={{marginRight: '8px'}}>送信</Button>
                <Button type="reset" color="secondary" variant="contained" disabled={!formik.dirty || formik.isSubmitting}>リセット</Button>
              </Form>
            );
          }}
        </Formik>
      </StyledPaper>
    </>
  );
};

export default React.memo(AddQuestion);
