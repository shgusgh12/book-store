import Button from '../components/common/Button'
import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import InputText from '../components/common/InputText'
import Title from '../components/common/Title'

const Home = () => {
  return (
    <>  
        <Title size='large' color='background'>제목 테스트</Title>
        <div>book store</div>
        <Button size='large' scheme='primary' >버튼 테스트</Button>
        <InputText placeholder='여기에 입력하세요'></InputText>
    </>
  )
}

export default Home
