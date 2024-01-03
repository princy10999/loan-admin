// material
import { Container} from '@mui/material';
import LeadForm from '../sections/auth/register/LeadForm';
// components
import Page from '../components/Page';

export default function AddLead() {
  return (
    <Page title="Lead: Add Lead">
      <Container> 
         <LeadForm/>
      </Container>
    </Page>
  );
}
