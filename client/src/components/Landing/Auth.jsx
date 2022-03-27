import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from "@mantine/core";

export default function Auth() {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: false,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <Paper radius="md" p="xl" withBorder>
      <Text size="lg" weight={500}>
        Welcome to <span className="accentIt">dconvos</span> , {type} with
      </Text>

      <Divider my="lg" />

      <form onSubmit={form.onSubmit(() => {})}>
        <Group direction="column" grow>
          <TextInput
            required
            label="Username"
            placeholder=""
            value={form.values.userName}
            onChange={(event) =>
              form.setFieldValue("name", event.currentTarget.value)
            }
          />

          {/* {type === "register" && (
            <>
              <TextInput
                required
                label="Email"
                placeholder="hello@dconvos.tk"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
              />
              <Anchor
                component="button"
                type="button"
                color="gray"
                size="xs"
                align="left"
              >
                why email?
              </Anchor>
            </>
          )} */}

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}
