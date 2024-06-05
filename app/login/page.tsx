import FromWrap from "../components/FormWrap";
import Container from "../components/nav/Container";
import LoginForm from "./LoginForm";

const Page = () => {
    return ( 
        <Container>
           <FromWrap>
            <LoginForm></LoginForm>
           </FromWrap>
        </Container>
     );
}
 
export default Page;