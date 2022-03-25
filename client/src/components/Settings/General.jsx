import React, { useRef, useState } from "react";
import styles from "../../styles/Settings/Settings.module.css";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useLocalStorage } from "../snippets/useLocalStorage";
import FormLabel from "@mui/material/FormLabel";
import {
  useMantineColorScheme,
  SegmentedControl,
  Group,
  Center,
  Box,
} from "@mantine/core";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export function General() {
  let previousSize = 13;
  const valueRef = useRef();
  const [value, setValue] = useState("12-hours");
  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(event.target.value);
  };
  const switchAccent = (acc) => {
    document.querySelector(":root").style.setProperty("--accent", acc);
    localStorage.setItem("accent", acc);
  };

  //------------------------ fontSize Changer---------------//
  function valuetext(value) {
    let fontSize = value;
    if (fontSize != previousSize) {
      textSizeChanger(fontSize);
      previousSize = fontSize;
    }
    //return `${value}°C`;
    return value;
  }
  //----------after completing the chat field-------------------//
  
  function textSizeChanger(value) {
    console.log(value);
  }

  //-------dark mode--------------------
  return (
    <div>
      <div className={styles.generalHead}>General</div>
      <div className={styles.contentOne}>
        <div className={styles.messageTextSize}>Message Text Size</div>
        <div className={styles.textSizeManager}>
          <div className={styles.sliderMain}>
            <Slider
              aria-label="Temperature"
              defaultValue={13}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={false}
              min={12}
              max={20}
              ref={valueRef}
              sx={{ color: "var(--accent)", }}
            />
          </div>
        </div>
      </div>
      <div className={styles.timeFormat}>
        <FormControl>
          <div className={styles.timeLabel}>Time Format</div>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel
              value="12-hours"
              control={<Radio sx={{ color: "var(--accent)" }} />}
              label="12-hours"
              sx={{fontSize:"1rem"}}
            />
            <FormControlLabel
              value="24-hours"
              control={<Radio sx={{ color: "var(--accent)" }} />}
              label="24-hours"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={styles.contentThree}>
        <div className={styles.colorLabel}>Accent</div>
        <div className={styles.colorContainer}>
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#00e5ff" }}
            onClick={() => {
              switchAccent("#00e5ff");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#00e576" }}
            onClick={() => {
              switchAccent("#00e576");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#ffea00" }}
            onClick={() => {
              switchAccent("#ffea00");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#e51efe" }}
            onClick={() => {
              switchAccent("#e51efe");
            }}
          />
          <div
            className={styles.colorSelect}
            style={{ backgroundColor: "#f40057" }}
            onClick={() => {
              switchAccent("#f40057");
            }}
          />
        </div>
      </div>
     
    </div>
  );
}
