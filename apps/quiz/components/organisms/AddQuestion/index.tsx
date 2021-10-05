import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import FormTextField from '../../atoms/FormTextField';
import { Formik, Form, FastField } from 'formik';
import { ChangeEvent, useState } from 'react';
import onSubmit from '../../utils/onSubmit';
import validationSchema from '../../utils/validationSchema';

const StyledPaper = styled(Paper)`
  height: 680px;
  margin-top: 12px;
  border-radius: 12px;
`;

type Choice = 'A' | 'B' | 'C' | 'D';

const AddQuestion: React.FC<{nextQuestionId: string}> = ({nextQuestionId}) => {
  const [choice, setChoice] = useState<Choice>('A');
  const choices: Choice[] = ['A', 'B', 'C', 'D'];
  const initialValues = {
    questionId: nextQuestionId,
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
                <FastField id="questionId" name="questionId" label="問題番号" disabled component={FormTextField}/>

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
