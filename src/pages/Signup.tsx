import styled from 'styled-components'
import Title from '../components/common/Title'
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface SignupProps {
    email : string;
    password : string;

}

function Signup() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    // }

    const {register, 
        handleSubmit, 
        formState : { errors }
    } = useForm<SignupProps>();
    const onSubmit = (data : SignupProps) => {
        console.log(data);
    }

    return (
        <>
            <Title size="large">회원가입</Title>
            <SignupStyle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset>
                        <InputText 
                            placeholder='이메일'
                            inputType='email'   
                            {...register('email', {
                                required : true
                            })} 
                            // value={email}
                            // onChange={(e) => {
                            //     setEmail(e.target.value)
                            // }}
                        />
                    </fieldset>
                    <fieldset>
                        <InputText 
                            placeholder='비밀번호'
                            inputType='password'
                            {...register('password', {
                                required : true
                            })}
                        />
                    </fieldset>
                    <fieldset>
                        <Button type="submit" size='medium' scheme='primary'>
                            회원가입
                        </Button>
                    </fieldset>
                    <div className='info'>
                        <Link to='/reset'>비밀번호 초기화</Link>
                    </div>
                </form>
            </SignupStyle>
        </>
    )
}

const SignupStyle = styled.div`
    max-width: ${({theme}) => theme.layout.width.small};
    margin: 80px auto;

    fieldset{
        border: 0;
        padding: 0 0 8px 0;
        .error-text {
            color : red;
        }
    }

    input{
        width : 100%;
    }

    button{
        width :100%;
    }

    .info{
        text-align : center;
        padding: 16px 0 0 0;
    }
`
export default Signup;