import React, { useRef, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css';

import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

export function AccountAndPrivacy() {
	const [ editUserName, setEditUseName ] = useState(true);
	const [ editBio, setEditBio ] = useState(true);
	const [ editName, setEditName ] = useState(true);
	const [ editAbout, setEditAbout ] = useState(true);
	const [ saveName, setSaveName ] = useState(false);
	const [ saveBio, setSaveBio ] = useState(false);
	const [ saveAbout, setSaveAbout ] = useState(false);
	const [ saveUserName, setSaveUserName ] = useState(false);
	const nameRef = useRef();
	const bioRef = useRef();
	const aboutRef = useRef();
	const usernameRef = useRef();

	function editTheName(bool) {
		document.getElementById('nameInput').removeAttribute('disabled');
		setEditName(bool);
		setSaveName(!bool);
	}

	function saveTheName(bool) {
		document.getElementById('nameInput').setAttribute('disabled', 'true');
		setEditName(!bool);
		setSaveName(bool);
	}

	function editTheUserName(bool) {
		document.getElementById('usernameInput').removeAttribute('disabled');
		setEditUseName(bool);
		setSaveUserName(!bool);
	}
	function saveTheUserName(bool) {
		document.getElementById('usernameInput').setAttribute('disabled', 'true');
		setEditUseName(!bool);
		setSaveUserName(bool);
	}

	function editTheBio(bool) {
		document.getElementById('bioInput').removeAttribute('disabled');
		setEditBio(bool);
		setSaveBio(!bool);
	}
	function saveTheBio(bool) {
		document.getElementById('bioInput').setAttribute('disabled', 'true');
		setEditBio(!bool);
		setSaveBio(bool);
	}

	function editTheAbout(bool) {
		document.getElementById('aboutInput').removeAttribute('disabled');

		setEditAbout(bool);
		setSaveAbout(!bool);
	}
	function saveTheAbout(bool) {
		document.getElementById('aboutInput').setAttribute('disabled', 'true');
		setEditAbout(!bool);
		setSaveAbout(bool);
	}

	return (
		<div>
			<div className={styles.Profile}>Profile</div>
			<div className={styles.warningNote}>
				This information will be displayed publically , so be carefull what you share.
			</div>
			<div className={styles.profileElements}>
				<div className={styles.divider}>
					<div className={styles.nameLabel}>Your Name</div>
					<div className={styles.nameContainer}>
						<input type="text" id="nameInput" className={styles.inputField} ref={nameRef} disabled />
						{editName && (
							<div
								className={styles.pencil}
								onClick={() => {
									editTheName(false);
								}}
							>
								<EditIcon sx={{ fontSize: 20 }} />
							</div>
						)}
						{saveName && (
							<div
								className={styles.doneicons}
								onClick={() => {
									saveTheName(false);
								}}
							>
								<DoneIcon sx={{ fontSize: 20 }} />
							</div>
						)}
					</div>
				</div>
				<div className={styles.divider}>
					<div className={styles.userNameLabel}>User name</div>
					<div className={styles.userNameContainer}>
						<input
							type="text"
							id="usernameInput"
							className={styles.inputField}
							ref={usernameRef}
							disabled
						/>
						{editUserName && (
							<div
								className={styles.pencil}
								onClick={() => {
									editTheUserName(false);
								}}
							>
								<EditIcon sx={{ fontSize: 20 }} />
							</div>
						)}
						{saveUserName && (
							<div
								className={styles.doneicons}
								onClick={() => {
									saveTheUserName(false);
								}}
							>
								<DoneIcon sx={{ fontSize: 20 }} />
							</div>
						)}
					</div>
				</div>
				<div className={styles.divider}>
					<div className={styles.AboutLabel}>About</div>
					<div className={styles.AboutContainer}>
						<input type="text" id="aboutInput" className={styles.inputField} ref={aboutRef} disabled />
						{editAbout && (
							<div
								className={styles.pencil}
								onClick={() => {
									editTheAbout(false);
								}}
							>
								<EditIcon sx={{ fontSize: 20 }} />
							</div>
						)}
						{!editAbout && (
							<div
								className={styles.doneicons}
								onClick={() => {
									saveTheAbout(false);
								}}
							>
								<DoneIcon sx={{ fontSize: 20 }} />
							</div>
						)}
					</div>
				</div>
				<div className={styles.divider}>
					<div className={styles.BioLabel}>Bio</div>
					<div className={styles.BioContainer}>
						<input type="text" id="bioInput" className={styles.inputField} ref={bioRef} disabled />
						{editBio && (
							<div
								className={styles.pencil}
								onClick={() => {
									editTheBio(false);
								}}
							>
								<EditIcon sx={{ fontSize: 20 }} />
							</div>
						)}
						{saveBio && (
							<div
								className={styles.doneicons}
								onClick={() => {
									saveTheBio(false);
								}}
							>
								<DoneIcon sx={{ fontSize: 20 }} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
