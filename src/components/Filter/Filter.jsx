import PropTypes from 'prop-types';
import { Label, Input, Container, SubTitle } from './Filter.styled';

export const Filter = ({ onChange, value }) => {
  return (
    <Container>
      <SubTitle>Find contacts by name</SubTitle>
      <Label>
        <Input type="text" onChange={onChange} value={value} />
      </Label>
    </Container>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};
