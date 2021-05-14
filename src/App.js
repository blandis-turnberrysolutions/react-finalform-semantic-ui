import "./App.css";
import { Form as FinalForm, Field as FinalFormField } from "react-final-form";
import {
  Button,
  Form as SemanticForm,
  Header,
  Container,
  Dropdown,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function App() {
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };
  const required = (value) => (value ? undefined : "Required");
  const notEmpty = (value) => (value?.length > 0 ? undefined : "Required");

  return (
    <div className="App">
      <FinalForm
        onSubmit={onSubmit}
        initialValues={{ firstName: "", lastName: "", interests: [] }}
        render={({ handleSubmit }) => (
          <div>
            <Header as="h1" textAlign="center">
              Simple Form
            </Header>
            <Container>
              <SemanticForm onSubmit={handleSubmit}>
                <SemanticForm.Group widths="equal">
                  <FinalFormField name="firstName" validate={required}>
                    {({ input, meta }) => (
                      <SemanticForm.Input
                        fluid
                        label="First name"
                        placeholder="First name"
                        error={meta.touched && meta.error}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                        onBlur={input.onBlur}
                      />
                    )}
                  </FinalFormField>
                  <FinalFormField name="lastName" validate={required}>
                    {({ input, meta }) => (
                      <SemanticForm.Input
                        fluid
                        label="Last name"
                        placeholder="Last name"
                        error={meta.touched && meta.error}
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                      />
                    )}
                  </FinalFormField>
                </SemanticForm.Group>
                <SemanticForm.Group widths="equal">
                  <FinalFormField name="interests" validate={notEmpty}>
                    {({ input, meta }) => (
                      <SemanticForm.Field error={meta.touched && meta.error}>
                        <label htmlFor="interests">Interests</label>
                        <Dropdown
                          multiple
                          search
                          selection
                          placeholder="Select Interests"
                          fluid
                          options={[
                            {
                              key: "Running",
                              text: "Running",
                              value: "Running",
                            },
                            { key: "Hiking", text: "Hiking", value: "Hiking" },
                            { key: "Biking", text: "Biking", value: "Biking" },
                          ]}
                          name={input.name}
                          value={input.value}
                          onChange={(e, v) => input.onChange(v.value)}
                        />
                      </SemanticForm.Field>
                    )}
                  </FinalFormField>
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
