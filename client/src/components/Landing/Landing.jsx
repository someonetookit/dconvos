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
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "../../styles/Landing/Landing.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLocalStorage } from "../snippets/useLocalStorage";

import Auth from "./Auth";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
                A <span className={styles.highlight}>decentralized</span> <br />{" "}
                modern messenger
              </Title>
              <Text color="dimmed" mt="md">
                Secure and decentralized messaging with voice and video
                calls, beautiful user experience and highly customizable
                ui. Try it out now for free!
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl" color={"green"}>
                    <CheckCircleOutlineIcon size={12}/>
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
                <Button
                  onClick={handleOpen}
                  radius="xl"
                  size="md"
                  className={styles.control}
                >
                  Log In
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <Auth/>
                  </Box>
                </Modal>
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
            <a href="/home">go</a>
          </div>
        </Container>
      </MantineProvider>
    </div>
  );
}
