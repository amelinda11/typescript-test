import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { TbArrowBigDownLine } from 'react-icons/tb';
import { Code } from '@chakra-ui/react';
import { syntaxFunction } from '../constant/homepage';

const Form = () => {
  const { handleSubmit, register, setValue } = useForm();
  const [isActiveSecondBox, setActive] = useState<boolean>(false);
  const [parentheses, setParentheses] = useState<string>('');
  const [balance, setBalance] = useState<boolean>(false);
  const [isOpenDetail, setOpenDetail] = useState<boolean>(false);

  const onSubmit = (data: any) => {
    setBalance(isBalancedParentheses(data?.parentheses));
    setParentheses(data?.parentheses);
    setActive(true);
  };

  function isBalancedParentheses(parentheses: string) {
    const stack = [];
    for (let i = 0; i < parentheses.length; i++) {
      const c = parentheses.charAt(i);
      if (c === '(') {
        stack.push(c);
      } else if (c === ')') {
        if (stack.length === 0) {
          return false;
        }
        stack.pop();
      }
    }
    return stack.length === 0;
  }

  return (
    <div>
      <div className="flex justify-between flex-col md:flex-row gap-7">
        <Box className="font-mono w-[19rem] md:w-fit">
          <p className="tracking-wide text-base md:text-xl">
            Check are the parentheses balanced?
          </p>
          <div className="pt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputCustom
                type="text"
                placeholder="Input your parentheses"
                {...register('parentheses')}
              />
              <Button
                type="submit"
                className="mt-3 md:mt-4 text-lg text-center"
              >
                Check
              </Button>
            </form>
          </div>
        </Box>
        {isActiveSecondBox && (
          <Box className="font-mono leading-9 w-[19rem] md:w-fit">
            <p>Output :</p>
            <div className="flex gap-3">
              {`"${parentheses}" is`}{' '}
              <StyledText status={balance}>{`${balance}`}</StyledText>
            </div>
            <div
              className="flex items-center space-x-2 cursor-pointer hover:underline"
              onClick={() => setOpenDetail(!isOpenDetail)}
            >
              <TbArrowBigDownLine /> <p>For detail function</p>
            </div>
          </Box>
        )}
      </div>
      {isOpenDetail && (
        <Box className="font-mono mt-9 w-full">
          <Pharase
            dangerouslySetInnerHTML={{
              __html: syntaxFunction?.data,
            }}
          ></Pharase>
        </Box>
      )}
    </div>
  );
};

export default Form;

const Box = styled.div`
  border: 2px solid #eee6e6;
  box-shadow: 5px 3px 14px #bdcdd6;
  padding: 1.5rem;
  border-radius: 10px;
  max-width: none;

  @media (max-width: 450px) {
    padding: 1rem;
    max-width: 19rem;
  }
`;

const InputCustom = styled.input`
  width: 100%;
  padding: 0.7rem 0.5rem;
  border-radius: 17px;
  border: 3px solid #ffffff;
  background: #c9d4d6d4;

  :focus-visible {
    outline: none;
  }

  @media (max-width: 450px) {
    padding: 0.5rem 0.4rem;
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 0.8rem 0.8rem;
  width: 100%;
  color: #434242;

  :hover {
    color: #576f72;
  }
`;

const Pharase = styled.div`
  overflow-x: none;
  #content__syntax {
    margin-left: 15px;
  }

  @media (max-width: 450px) {
    overflow-x: scroll;
  }
`;

type StyledTextProps = {
  status: boolean;
};

const StyledText = styled.div<StyledTextProps>`
  color: ${(props) => (props.status ? 'blue' : 'red')};
`;
