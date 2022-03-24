import React, { useRef, useState } from 'react';
import styles from '../../styles/Settings/Settings.module.css';

import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';

export function AccountAndPrivacy() {
	const [ save, setSave ] = useState({ names: false, bio: false, about: false, username: false });
	const [ edit, setEdit ] = useState({ names: true, bio: true, about: true, username: true });
	const [ loading, setloading ] = useState(true);
	const nameRef = useRef();
	const bioRef = useRef();
	const aboutRef = useRef();
	const usernameRef = useRef();
	function editPage(bool, string) {
		switch (string) {
			case 'names':
				document.getElementById(string).removeAttribute('disabled');
				setEdit((prevState) => {
					return { ...prevState, names: bool };
				});
				setSave((prevState) => {
					return { ...prevState, names: !bool };
				});
				break;
			case 'username':
				document.getElementById(string).removeAttribute('disabled');
				setEdit((prevState) => {
					return { ...prevState, username: bool };
				});
				setSave((prevState) => {
					return { ...prevState, username: !bool };
				});
				break;
			case 'bio':
				document.getElementById(string).removeAttribute('disabled');
				setEdit((prevState) => {
					return { ...prevState, bio: bool };
				});
				setSave((prevState) => {
					return { ...prevState, bio: !bool };
				});
				break;
			case 'abouts':
				document.getElementById(string).removeAttribute('disabled');
				setEdit((prevState) => {
					return { ...prevState, about: bool };
				});
				setSave((prevState) => {
					return { ...prevState, about: !bool };
				});
				break;
			default:
				break;
		}
	}
	function savePage(bool, string) {
		switch (string) {
			case 'names':
				document.getElementById(string).setAttribute('disabled', 'true');
				setEdit((prevState) => {
					return { ...prevState, names: !bool };
				});
				setSave((prevState) => {
					return { ...prevState, names: bool };
				});
				break;
			case 'username':
				document.getElementById(string).setAttribute('disabled', 'true');
				setEdit((prevState) => {
					return { ...prevState, username: !bool };
				});
				setSave((prevState) => {
					return { ...prevState, username: bool };
				});
				break;
			case 'bio':
				document.getElementById(string).setAttribute('disabled', 'true');
				setEdit((prevState) => {
					return { ...prevState, bio: !bool };
				});
				setSave((prevState) => {
					return { ...prevState, bio: bool };
				});
				break;
			case 'abouts':
				document.getElementById(string).setAttribute('disabled', 'true');
				setEdit((prevState) => {
					return { ...prevState, about: !bool };
				});
				setSave((prevState) => {
					return { ...prevState, about: bool };
				});
				break;
			default:
				break;
		}
	}
	return (
		<div>
			<div className={styles.profileHeading}>Profile</div>
			<div className={styles.warningNote}>
				This information will be displayed publically , so be carefull what you share.
			</div>
			<div className={styles.profileForm}>
				<form>
					<div className={styles.profileName}>
						<div className={styles.profileNameLabel}>Name</div>
						<div className={styles.nameContainer}>
							<div className={styles.inputField} >
								<input
									
									type="text"
									name="names"
									id="names"
									ref={nameRef}
									disabled
								/>
							</div>
							{edit.names && (
								<div
									className={styles.editing}
									onClick={() => {
										editPage(false, 'names');
									}}
								>
									<EditIcon sx={{ fontSize: 20 }} />
								</div>
							)}
							{save.names && (
								<div
									className={styles.saving}
									onClick={() => {
										savePage(false, 'names');
									}}
								>
									<DoneIcon sx={{ fontSize: 20 }} />
								</div>
							)}
						</div>
					</div>
					<div className={styles.userName}>
						<div className={styles.usernameLabel}>UserName</div>
						<div className={styles.usernameContainer}>
							<div className={styles.inputField}>
								<input
									
									type="text"
									name="username"
									id="username"
									ref={usernameRef}
									disabled
								/>
							</div>
							{edit.username && (
								<div
									className={styles.editing}
									onClick={() => {
										editPage(false, 'username');
									}}
								>
									<EditIcon sx={{ fontSize: 20 }} />
								</div>
							)}
							{save.username && (
								<div
									className={styles.saving}
									onClick={() => {
										savePage(false, 'username');
									}}
								>
									<DoneIcon sx={{ fontSize: 20 }} />
								</div>
							)}{' '}
						</div>
					</div>
					<div className={styles.about}>
						<div className={styles.aboutLabel}>About</div>
						<div className={styles.aboutContainer}>
							<div className={styles.inputField}>
								<input
									
									type="text"
									name="abouts"
									id="abouts"
									ref={aboutRef}
									disabled
								/>
							</div>
							{edit.about && (
								<div
									className={styles.editing}
									onClick={() => {
										editPage(false, 'abouts');
									}}
								>
									<EditIcon sx={{ fontSize: 20 }} />
								</div>
							)}
							{save.about && (
								<div
									className={styles.saving}
									onClick={() => {
										savePage(false, 'abouts');
									}}
								>
									<DoneIcon sx={{ fontSize: 20 }} />
								</div>
							)}
						</div>
					</div>
					<div className={styles.bio}>
						<div className={styles.bioLabel}>Bio</div>
						<div className={styles.bioContainer}>
							<div className={styles.inputField}>
								<input
									type="text"
									name="bio"
									id="bio"
									ref={bioRef}
									disabled
								/>
							</div>
							{edit.bio && (
								<div
									className={styles.editing}
									onClick={() => {
										editPage(false, 'bio');
									}}
								>
									<EditIcon sx={{ fontSize: 20 }} />
								</div>
							)}
							{save.bio && (
								<div
									className={styles.saving}
									onClick={() => {
										savePage(false, 'bio');
									}}
								>
									<DoneIcon sx={{ fontSize: 20 }} />
								</div>
							)}
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
