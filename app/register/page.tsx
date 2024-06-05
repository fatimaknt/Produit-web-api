import FormWrap from "../components/FormWrap";
import Container from "../components/nav/Container";
import RegisterForm from "./RegisterForm";

const Page = () => {
    return ( 
    <div>
        <Container>
            <FormWrap>
                <RegisterForm />
            </FormWrap>
        </Container>

    </div> );
}
 
export default Page;