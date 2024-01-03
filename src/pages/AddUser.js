// material
import { Container } from '@mui/material';
import UserForm from '../sections/auth/register/UserForm';
// components
import Page from '../components/Page';

export default function AddUser() {
  return (
    <Page title="User: Add User">
      <Container>
        <UserForm />
      </Container>
    </Page>
  );
}
