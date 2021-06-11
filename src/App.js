import "./App.css";
import { Form as FinalForm, Field as FinalFormField } from "react-final-form";
import { setIn } from "final-form";
import {
  Button,
  Form as SemanticForm,
  Header,
  Container,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  interests: yup
    .array()
    .of(yup.string())
    .min(1, "Must select at least 1 interest"),
});

const validateFormValues = (schema) => async (values) => {
  const schemaToValidate = typeof schema === "function" ? schema() : schema;

  try {
    await schemaToValidate.validate(values, { abortEarly: false });
  } catch (err) {
    const errors = err.inner.reduce(
      (formError, innerError) =>
        setIn(formError, innerError.path, innerError.message),
      {}
    );

    return errors;
  }
};

const validate = validateFormValues(validationSchema);

const interestOptions = [
  {
    key: "Running",
    text: "Running",
    value: "Running",
  },
  { key: "Hiking", text: "Hiking", value: "Hiking" },
  { key: "Biking", text: "Biking", value: "Biking" },
];

function App() {
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  return (
    <div className="App">
      <FinalForm
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{ firstName: "", lastName: "", interests: [] }}
        render={({ handleSubmit }) => (
          <div>
            <Header as="h1" textAlign="center">
              Simple Form
            </Header>
            <Container>
              <SemanticForm onSubmit={handleSubmit}>
                <SemanticForm.Group widths="equal">
                  <FinalFormField
                    name="firstName"
                    render={({ input, meta }) => (
                      <SemanticForm.Input
                        label="First name"
                        placeholder="First name"
                        error={meta.touched && meta.error}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        fluid
                      />
                    )}
                  />
                  <FinalFormField
                    name="lastName"
                    render={({ input, meta }) => (
                      <SemanticForm.Input
                        label="Last name"
                        placeholder="Last name"
                        error={meta.touched && meta.error}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                        fluid
                      />
                    )}
                  />
                </SemanticForm.Group>
                <SemanticForm.Group widths="equal">
                  <FinalFormField
                    name="interests"
                    render={({ input, meta }) => (
                      <SemanticForm.Select
                        label="Interests"
                        placeholder="Select Interests"
                        error={meta.touched && meta.error}
                        name={input.name}
                        value={input.value}
                        onChange={(e, v) => input.onChange(v.value)}
                        onBlur={input.onBlur}
                        fluid
                        multiple
                        search
                        selection
                        options={interestOptions}
                      />
                    )}
                  />
                </SemanticForm.Group>
                <Button primary>Submit</Button>
              </SemanticForm>
            </Container>
          </div>
        )}
      />
    </div>
  );
}

export default App;
