import { useEffect, useState } from "react";

import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  MantineProvider,
} from "@mantine/core";
import styles from "../../styles/Landing/Landing.module.css";
// import { Check } from "tabler-icons-react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useLocalStorage } from "../snippets/useLocalStorage";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme == "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 38,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
}));

export default function Landing() {
  const [accent, setAccent] = useState("");

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  useEffect(() => {
    const acc = localStorage.getItem("accent");
    setAccent(acc);
    document.querySelector(":root").style.setProperty("--accent", acc);
  });
  const { classes } = useStyles();
  return (
    <div className={styles.land} data-theme={theme}>
      <button className={styles.switchTheme} onClick={switchTheme}>
        {theme}
      </button>
      <MantineProvider theme={{ colorScheme: theme }}>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={styles.title}>
                A <span className={styles.highlight}>modern</span> <br />{" "}
                decentralized messenger
              </Title>
              <Text color="dimmed" mt="md">
                Secure and decentralized messaging along with voice and video
                calls, accompanied by beautiful user experience and customizable
                ui. Try it out now for free!
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <CheckCircleOutlineIcon size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Decentralized</b> – built on top of Gun framework.
                </List.Item>
                <List.Item>
                  <b>Free and open source</b> – you can review our code to check
                  the security, and contribute features you would like to see in
                  dconvos.
                </List.Item>
                <List.Item>
                  <b>Secure</b> – text messages are end-to-end encrypted (for
                  real). We honestly don't care about your chats.
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  Log In
                </Button>
                <Button radius="xl" size="md" className={classes.control}>
                  Sign Up
                </Button>
                <Button
                  variant="default"
                  radius="xl"
                  size="md"
                  className={classes.control}
                >
                  About
                </Button>
              </Group>
            </div>
            {/* <Image src={image.src} className={classes.image} /> */}
          </div>
        </Container>
      </MantineProvider>
    </div>
  );
}
